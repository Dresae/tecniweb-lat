import React from 'react';
import TechStackCarousel from './TechStackCarousel';

// Import tech stack icons
import kubernetes from '../assets/servicios-pics/tech-stack/kubernetes.webp';
import docker from '../assets/servicios-pics/tech-stack/docker.webp';
import linux from '../assets/servicios-pics/tech-stack/linux_15465695.webp';
import photonOS from '../assets/servicios-pics/tech-stack/photonOS.webp';
import proxmox from '../assets/servicios-pics/tech-stack/proxmox.webp';
import cpanel from '../assets/servicios-pics/tech-stack/cpanel.webp';
import nginx from '../assets/servicios-pics/tech-stack/nginx.webp';
import git from '../assets/servicios-pics/tech-stack/git.webp';
import github from '../assets/servicios-pics/tech-stack/github.webp';
import terraform from '../assets/servicios-pics/tech-stack/terraform.webp';
import ngrok from '../assets/servicios-pics/tech-stack/ngrok.webp';
import otka from '../assets/servicios-pics/tech-stack/otka.webp';
import keycloak from '../assets/servicios-pics/tech-stack/keycloak.webp';
import gcp from '../assets/servicios-pics/tech-stack/GCP.webp';
import aws from '../assets/servicios-pics/tech-stack/aws.webp';
import mysql from '../assets/servicios-pics/tech-stack/mysql.webp';
import php from '../assets/servicios-pics/tech-stack/php.webp';
import postgresql from '../assets/servicios-pics/tech-stack/postgresql.webp';
import sqlite from '../assets/servicios-pics/tech-stack/sqlite.webp';
import couchdb from '../assets/servicios-pics/tech-stack/couchdb.webp';
import chroma from '../assets/servicios-pics/tech-stack/chroma.webp';
import spark from '../assets/servicios-pics/tech-stack/apache_spark.webp';
import kafka from '../assets/servicios-pics/tech-stack/apache_kafka.webp';
import rabbitmq from '../assets/servicios-pics/tech-stack/rabbitmq.webp';
import redis from '../assets/servicios-pics/tech-stack/redis.webp';
import elasticsearch from '../assets/servicios-pics/tech-stack/elastic_search.webp';
import powerbi from '../assets/servicios-pics/tech-stack/powerbi.webp';
import tableau from '../assets/servicios-pics/tech-stack/tableau.webp';
import nodejs from '../assets/servicios-pics/tech-stack/nodejs.webp';
import react from '../assets/servicios-pics/tech-stack/React.webp';
import express from '../assets/servicios-pics/tech-stack/expressjs.webp';
import tailwind from '../assets/servicios-pics/tech-stack/tailwind.webp';
import pyspark from '../assets/servicios-pics/tech-stack/pyspark.webp';
import fastapi from '../assets/servicios-pics/tech-stack/Fastapi.webp';
import django from '../assets/servicios-pics/tech-stack/django.webp';
import flutter from '../assets/servicios-pics/tech-stack/flutter.webp';
import dart from '../assets/servicios-pics/tech-stack/dart.webp';
import n8n from '../assets/servicios-pics/tech-stack/n8n.webp';
import powershell from '../assets/servicios-pics/tech-stack/powershell.webp';
import gemini from '../assets/servicios-pics/tech-stack/gemini.webp';
import llamacpp from '../assets/servicios-pics/tech-stack/llama-cpp.webp';
import cuda from '../assets/servicios-pics/tech-stack/cuda.webp';
import opencv from '../assets/servicios-pics/tech-stack/opencv.webp';
import huggingface from '../assets/servicios-pics/tech-stack/huggingface.webp';

// Standardized technologies data used across all service pages
const standardTechnologies = [
  { name: 'Kubernets', image: kubernetes },
  { name: 'Docker', image: docker },
  { name: 'Linux', image: linux },
  { name: 'PhotonOS', image: photonOS },
  { name: 'Proxmox', image: proxmox },
  { name: 'Cpanel', image: cpanel },
  { name: 'Enginx', image: nginx },
  { name: 'Git', image: git },
  { name: 'Github', image: github },
  { name: 'Terraform', image: terraform },
  { name: 'Ngrok', image: ngrok },
  { name: 'Otka', image: otka },
  { name: 'Keycloak', image: keycloak },
  { name: 'GCP', image: gcp },
  { name: 'AWS', image: aws },
  { name: 'MySQL', image: mysql },
  { name: 'PHP', image: php },
  { name: 'PostgreSQL', image: postgresql },
  { name: 'SQLite', image: sqlite },
  { name: 'CouchDB', image: couchdb },
  { name: 'Chroma DB', image: chroma },
  { name: 'Spark', image: spark },
  { name: 'Kafka', image: kafka },
  { name: 'RabbitMQ', image: rabbitmq },
  { name: 'Redis', image: redis },
  { name: 'ElasticSearch', image: elasticsearch },
  { name: 'PowerBI', image: powerbi },
  { name: 'Tableau', image: tableau },
  { name: 'NodeJS', image: nodejs },
  { name: 'React', image: react },
  { name: 'Express', image: express },
  { name: 'Tailwind', image: tailwind },
  { name: 'PySpark', image: pyspark },
  { name: 'FastApi', image: fastapi },
  { name: 'Django', image: django },
  { name: 'Flutter', image: flutter },
  { name: 'Dart', image: dart },
  { name: 'N8n', image: n8n },
  { name: 'PowerShell', image: powershell },
  { name: 'Google Gemini', image: gemini },
  { name: 'LLaMAc++', image: llamacpp },
  { name: 'Cuda', image: cuda },
  { name: 'OpenCV', image: opencv },
  { name: 'HuggingFace', image: huggingface }
];

// Reusable component that wraps the TechStackCarousel with standard technologies
const StandardTechStack = () => {
  return <TechStackCarousel technologies={standardTechnologies} />;
};

export default StandardTechStack;
