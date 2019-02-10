import React, { memo } from 'react';
import { Layout } from '../components';
import { ExchangeForm, UpdateStatus } from '.';

export default memo(function App() {
  return (
    <Layout footer={<UpdateStatus />}>
      <ExchangeForm />
    </Layout>
  );
});
