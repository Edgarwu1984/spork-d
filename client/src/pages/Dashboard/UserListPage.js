import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// REACT REDUX
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from 'redux/actions/adminActions';
// COMPONENTS
import Layout from 'components/Layout';
import Breadcrumb from 'components/Breadcrumb';
import Loader from 'components/Loader';
import AlertMessage from 'components/AlertMessage';
// REACT ICONS
import { RiAdminFill, RiDeleteBin2Fill, RiPencilFill } from 'react-icons/ri';

const UserListPage = ({ match }) => {
  const dispatch = useDispatch();
  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector(state => state.userDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = userDelete;

  useEffect(() => {
    dispatch(getUsers());
    if (deleteSuccess) {
      toast.success('User deleted.');
    } else if (deleteError) {
      toast.error(deleteError);
    }
  }, [deleteError, deleteSuccess, dispatch]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

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
        {loading || deleteLoading ? (
          <Loader />
        ) : error ? (
          <AlertMessage message={error} variant='danger' />
        ) : (
          <table className='user__table'>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Activated</th>
                <th>Edit / Delete</th>
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
                        className='table-edit__btn'
                        to={`/dashboard/users/${user.id}/edit`}
                      >
                        <RiPencilFill />
                      </Link>
                      <button
                        className='table-delete__btn'
                        onClick={() => deleteHandler(user.id)}
                      >
                        <RiDeleteBin2Fill />
                      </button>
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
