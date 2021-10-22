import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'redux/actions/adminActions';
// COMPONENTS
import Layout from 'components/Layout';
import Breadcrumb from 'components/Breadcrumb';
import Loader from 'components/Loader';
// REACT ICONS
import { RiAdminFill } from 'react-icons/ri';

const UserListPage = ({ match }) => {
  const dispatch = useDispatch();
  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Layout pageTitle='- Dashboard'>
      <div className='container'>
        <Breadcrumb match={match} />
        <div className='profile__banner  dashboard__banner'>
          <div className='profile__banner-wrap'>
            <div className='greeting'>
              <h2 className='title'>User List</h2>
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <table className='user__table'>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Activated</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map(user => (
                  <tr key={user.id}>
                    <td data-label='Username'>
                      {user.isAdmin && <RiAdminFill />} {user.username}
                    </td>
                    <td data-label='Email'>{user.email}</td>
                    <td data-label='Admin'>
                      {user.isAdmin ? (
                        <span className='text-success'>Yes</span>
                      ) : (
                        <span className='text-danger'>No</span>
                      )}
                    </td>
                    <td data-label='Activated'>
                      {user.isActivated ? (
                        <span className='text-success'>Yes</span>
                      ) : (
                        <span className='text-danger'>No</span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/dashboard/users/${user.id}/edit`}
                        className='btn btn-sm btn-default-outline'
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default UserListPage;
