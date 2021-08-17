import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function NotFoundPage() {
  return (
    <Layout>
      <div className='container'>
        <h1>404 Page Not Found!</h1>
        <Link to='/'>Go Back</Link>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
