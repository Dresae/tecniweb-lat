/**
 * Response caching system for RAG service
 * Provides caching for frequently asked questions to improve response time
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const textProcessing = require('./textProcessing');

// Cache file path
const cacheDir = path.join(__dirname, '../../data/cache');
const cacheFilePath = path.join(cacheDir, 'response-cache.json');

// Ensure cache directory exists
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

// Initialize cache if it doesn't exist
if (!fs.existsSync(cacheFilePath)) {
  fs.writeFileSync(cacheFilePath, JSON.stringify({
    entries: {},
    stats: {
      hits: 0,
      misses: 0,
      lastCleanup: new Date().toISOString()
    },
    config: {
      cleanupInterval: 24 * 60 * 60 * 1000, // 24 hours between cleanups
      lastStartupTime: new Date().toISOString()
    }
  }, null, 2));
}

/**
 * Generate a cache key for a query
 * @param {string} query - User query
 * @returns {string} - Cache key
 */
const generateCacheKey = (query) => {
  // Normalize and preprocess the query
  const { processed } = textProcessing.preprocessText(query);
  
  // Create hash for the processed query
  return crypto.createHash('md5').update(processed).digest('hex');
};

/**
 * Get a cached response if available
 * @param {string} query - User query
 * @returns {Object|null} - Cached response or null if not found
 */
const getCachedResponse = (query) => {
  try {
    // Load cache with error handling
    // Generate cache key
    const cacheKey = generateCacheKey(query);
    
    // Load cache with error handling
    let cache;
    try {
      const cacheData = fs.readFileSync(cacheFilePath, 'utf8');
      if (!cacheData || cacheData.trim() === '') {
        console.warn('Cache file is empty, initializing new cache');
        throw new Error('Empty cache file');
      }
      cache = JSON.parse(cacheData);
    } catch (readError) {
      console.error('Error reading cache file:', readError.message);
      // Initialize a new cache if reading fails
      cache = {
        entries: {},
        stats: {
          hits: 0,
          misses: 1, // Count this as a miss
          lastCleanup: new Date().toISOString()
        },
        config: {
          cleanupInterval: 24 * 60 * 60 * 1000, // 24 hours between cleanups
          lastStartupTime: new Date().toISOString()
        }
      };
      
      // Try to save the new cache, but don't throw if it fails
      try {
        const tempFilePath = `${cacheFilePath}.tmp`;
        fs.writeFileSync(tempFilePath, JSON.stringify(cache, null, 2));
        fs.renameSync(tempFilePath, cacheFilePath);
      } catch (writeError) {
        console.error('Failed to initialize cache file:', writeError.message);
      }
      
      console.log('❌ Cache miss (cache initialization) for query');
      return null;
    }
    
    // Check if cache structure is valid
    if (!cache.entries || !cache.stats) {
      console.error('Invalid cache structure, reinitializing');
      cache = {
        entries: {},
        stats: {
          hits: 0,
          misses: 1,
          lastCleanup: new Date().toISOString()
        },
        config: cache.config || {
          cleanupInterval: 24 * 60 * 60 * 1000,
          lastStartupTime: new Date().toISOString()
        }
      };
    }
    
    // Check if query is in cache
    if (cache.entries && cache.entries[cacheKey]) {
      const entry = cache.entries[cacheKey];
      const now = new Date();
      const expiresAt = new Date(entry.expiresAt);
      
      // Check if entry is expired
      if (expiresAt > now) {
        // Update stats
        cache.stats.hits++;
        entry.hits++;
        entry.lastAccessed = now.toISOString();
        
        // Save updated cache with error handling
        try {
          // Use atomic write operation
          const tempFilePath = `${cacheFilePath}.tmp`;
          fs.writeFileSync(tempFilePath, JSON.stringify(cache, null, 2));
          fs.renameSync(tempFilePath, cacheFilePath);
          console.log(`🔍 Cache hit for query: "${query.substring(0, 50)}..."`);
        } catch (writeError) {
          console.error('Error updating cache stats after hit:', writeError.message);
          // Continue execution even if write fails
        }
        
        return entry.response;
      } else {
        // Entry expired, remove it
        delete cache.entries[cacheKey];
        cache.stats.misses++;
        
        // Save updated cache with error handling
        try {
          // Use atomic write operation
          const tempFilePath = `${cacheFilePath}.tmp`;
          fs.writeFileSync(tempFilePath, JSON.stringify(cache, null, 2));
          fs.renameSync(tempFilePath, cacheFilePath);
          console.log(`⏰ Cache entry expired for query: "${query.substring(0, 50)}..."`);
        } catch (writeError) {
          console.error('Error removing expired cache entry:', writeError.message);
          // Continue execution even if write fails
        }
      }
    }
    
    // Cache miss
    cache.stats.misses += 1;
    try {
      // Use atomic write operation
      const tempFilePath = `${cacheFilePath}.tmp`;
      fs.writeFileSync(tempFilePath, JSON.stringify(cache, null, 2));
      fs.renameSync(tempFilePath, cacheFilePath);
    } catch (writeError) {
      console.error('Error updating cache miss stats:', writeError.message);
      // Continue execution even if write fails
    }
    
    console.log(`❌ Cache miss for query: "${query.substring(0, 50)}..."`);
    return null;
  } catch (error) {
    console.error('Error accessing cache:', error);
    return null;
  }
};

/**
 * Cache a response
 * @param {string} query - User query
 * @param {Object} response - Response object to cache
 * @param {Object} options - Cache options
 * @returns {boolean} - Success status
 */
const cacheResponse = (query, response, options = {}) => {
  try {
    const {
      ttl = 2 * 60 * 60 * 1000, // Default TTL: 2 hours
      minQueryLength = 10,       // Minimum query length to cache
      similarityThreshold = 0.8  // Similarity threshold for similar queries
    } = options;
    
    // Don't cache very short queries
    if (query.length < minQueryLength) {
      return false;
    }
    
    // Load cache with error handling
    let cache;
    try {
      const cacheData = fs.readFileSync(cacheFilePath, 'utf8');
      cache = JSON.parse(cacheData);
    } catch (readError) {
      console.error('Error reading cache file, creating new cache:', readError.message);
      // Initialize a new cache if reading fails
      cache = {
        entries: {},
        stats: {
          hits: 0,
          misses: 0,
          lastCleanup: new Date().toISOString()
        },
        config: {
          cleanupInterval: 24 * 60 * 60 * 1000, // 24 hours between cleanups
          lastStartupTime: new Date().toISOString()
        }
      };
    }
    
    // Generate cache key
    const cacheKey = generateCacheKey(query);
    
    // Calculate expiry time
    const now = new Date();
    const expiresAt = new Date(now.getTime() + ttl);
    
    // Create cache entry
    cache.entries[cacheKey] = {
      query,
      response,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      lastAccessed: now.toISOString(),
      hits: 0,
      processed: textProcessing.preprocessText(query).processed
    };
    
    // Save updated cache with error handling
    try {
      // Use atomic write operation
      const tempFilePath = `${cacheFilePath}.tmp`;
      fs.writeFileSync(tempFilePath, JSON.stringify(cache, null, 2));
      fs.renameSync(tempFilePath, cacheFilePath);
      console.log(`💾 Cached response for query: "${query.substring(0, 50)}..."`);
    } catch (writeError) {
      console.error('Error saving cache entry:', writeError.message);
      // Continue execution even if write fails
    }
    
    return true;
  } catch (error) {
    console.error('Error caching response:', error);
    return false;
  }
};

/**
 * Find similar cached queries
 * @param {string} query - User query
 * @param {number} threshold - Similarity threshold (0-1)
 * @returns {Array} - Array of similar cached entries
 */
const findSimilarCachedQueries = (query, threshold = 0.8) => {
  try {
    // Load cache
    const cache = JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
    
    // Process the query
    const { processed: processedQuery } = textProcessing.preprocessText(query);
    const queryTerms = processedQuery.split(' ');
    
    // Find similar entries
    const similarEntries = [];
    
    for (const key in cache.entries) {
      const entry = cache.entries[key];
      
      // Skip expired entries
      const now = new Date();
      const expiryDate = new Date(entry.expiresAt);
      if (now > expiryDate) continue;
      
      // Calculate Jaccard similarity between query terms
      const entryTerms = entry.processed.split(' ');
      
      // Find intersection
      const intersection = queryTerms.filter(term => entryTerms.includes(term));
      
      // Calculate similarity
      const union = new Set([...queryTerms, ...entryTerms]);
      const similarity = intersection.length / union.size;
      
      if (similarity >= threshold) {
        similarEntries.push({
          ...entry,
          similarity
        });
      }
    }
    
    // Sort by similarity (descending)
    return similarEntries.sort((a, b) => b.similarity - a.similarity);
  } catch (error) {
    console.error('Error finding similar queries:', error);
    return [];
  }
};

/**
 * Clean up expired cache entries
 * @param {boolean} force - Force cleanup regardless of interval
 * @returns {number} - Number of entries removed
 */
const cleanupCache = (force = false) => {
  try {
    // Load cache with error handling
    let cache;
    try {
      const cacheData = fs.readFileSync(cacheFilePath, 'utf8');
      cache = JSON.parse(cacheData);
    } catch (readError) {
      console.error('Error reading cache file during cleanup, creating new cache:', readError.message);
      // Initialize a new cache if reading fails
      cache = {
        entries: {},
        stats: {
          hits: 0,
          misses: 0,
          lastCleanup: new Date().toISOString()
        },
        config: {
          cleanupInterval: 24 * 60 * 60 * 1000, // 24 hours between cleanups
          lastStartupTime: new Date().toISOString()
        }
      };
    }
    
    const now = new Date();
    
    // Check if cleanup is needed based on interval
    if (!force && cache.config) {
      const lastCleanup = new Date(cache.stats.lastCleanup);
      const interval = cache.config.cleanupInterval || (24 * 60 * 60 * 1000); // Default: 24 hours
      
      if ((now - lastCleanup) < interval) {
        console.log(`⏱️ Skipping cache cleanup - next cleanup in ${Math.round((interval - (now - lastCleanup)) / (60 * 60 * 1000))} hours`);
        return 0;
      }
    }
    
    let removedCount = 0;
    
    // Remove expired entries
    for (const key in cache.entries) {
      const entry = cache.entries[key];
      const expiryDate = new Date(entry.expiresAt);
      
      if (now > expiryDate) {
        delete cache.entries[key];
        removedCount++;
      }
    }
    
    // Update stats
    cache.stats.lastCleanup = now.toISOString();
    
    // Ensure config exists
    if (!cache.config) {
      cache.config = {
        cleanupInterval: 24 * 60 * 60 * 1000, // 24 hours between cleanups
        lastStartupTime: now.toISOString()
      };
    }
    
    // Save updated cache with error handling
    try {
      // Write to a temporary file first
      const tempFilePath = `${cacheFilePath}.tmp`;
      fs.writeFileSync(tempFilePath, JSON.stringify(cache, null, 2));
      
      // Rename the temporary file to the actual cache file (atomic operation)
      fs.renameSync(tempFilePath, cacheFilePath);
    } catch (writeError) {
      console.error('Error writing cache file during cleanup:', writeError.message);
      // Continue execution even if writing fails
    }
    
    if (removedCount > 0) {
      console.log(`🧹 Cleaned up ${removedCount} expired cache entries`);
    }
    return removedCount;
  } catch (error) {
    console.error('Error cleaning up cache:', error);
    return 0;
  }
};

/**
 * Get cache statistics
 * @returns {Object} - Cache statistics
 */
const getCacheStats = () => {
  try {
    // Load cache
    const cache = JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
    
    // Count active entries
    const now = new Date();
    let activeEntries = 0;
    let expiredEntries = 0;
    
    for (const key in cache.entries) {
      const entry = cache.entries[key];
      const expiryDate = new Date(entry.expiresAt);
      
      if (now <= expiryDate) {
        activeEntries++;
      } else {
        expiredEntries++;
      }
    }
    
    return {
      ...cache.stats,
      activeEntries,
      expiredEntries,
      totalEntries: Object.keys(cache.entries).length,
      hitRate: cache.stats.hits / (cache.stats.hits + cache.stats.misses || 1)
    };
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return {
      hits: 0,
      misses: 0,
      activeEntries: 0,
      expiredEntries: 0,
      totalEntries: 0,
      hitRate: 0,
      lastCleanup: new Date().toISOString()
    };
  }
};

// Run cleanup on module load
cleanupCache();

module.exports = {
  getCachedResponse,
  cacheResponse,
  findSimilarCachedQueries,
  cleanupCache,
  getCacheStats
};
