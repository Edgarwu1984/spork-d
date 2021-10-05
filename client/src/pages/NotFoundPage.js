import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// REACT-ICONS
import { BiError } from 'react-icons/bi';
// COMPONENTS
import Layout from 'components/Layout';

function NotFoundPage({ history }) {
  // SET BACK TO HOME PAGE
  const [time, setTime] = useState(7);

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      history.push('/');
    }
    return () => {
      clearTimeout(time);
    };
  }, [history, time]);
  return (
    <Layout>
      <div className='container'>
        <div className='notfound__wrap'>
          <div className='info'>
            <h2 className='error__message'>
              <BiError />
              Oops.. Page Not Found.
            </h2>
            <p className='countdown__message'>
              Back to Home page in <strong>{time}</strong> seconds...
            </p>
            <Link className='btn btn-outline' to='/'>
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
