import React from 'react';
import styled from 'styled-components';
import BotAdmin from '../components/BotAdmin';

const AdminPageContainer = styled.div`
  padding: 40px 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const AdminPage = () => {
  return (
    <AdminPageContainer>
      <BotAdmin />
    </AdminPageContainer>
  );
};

export default AdminPage;
