import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import './outlet-users-style/outlet-users.css';
import axios from 'axios';

export const OutletUsers = () => {
  
  const [users, setUsers] = useState([]);
  const [showPopUpAdmin, setShowPopUpAdmin] = useState(false);
  const [showPopUpMakeUser, setShowPopUpMakeUser] = useState(false);
  const [showPopUpDeleteUser, setShowPopUpDeleteUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getUsers = async () => {
    try {
      const response = await axios.get('/api/v1/user/get-all-users');
      setUsers(response.data.data.findAllUsers);
    } catch(err) {
      console.log(err);
    };
  };

  const promotingDemotingUsers = async () => {
    try {

      // console.log('selected user:', selectedUser);

      const selectedUserData = users.find(user => user._id === selectedUser);
      const currentRole = selectedUserData.role;
      const newRole = currentRole === 'admin' ? 'user' : 'admin';

      const response = await axios.patch(`/api/v1/user/update-user/promote-demote/${selectedUser}`);
      // console.log(response); 
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user._id === selectedUser) {
            return { ...user, role: newRole };
          };
          return user;
        });
      });
      if (newRole === 'admin') {
        setShowPopUpAdmin(false);
      } else {
        setShowPopUpMakeUser(false);
      };
      
    } catch(err) {
      console.log(err);
    };
  };

  const deleteUser = async () => {
    try {
      if (!selectedUser) {
        console.log('user not found');
        return;
      };
      const response = await axios.delete(`/api/v1/user/delete-user/${selectedUser}`);
      console.log(response);
      if (response.status === 204) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== selectedUser));
        deleteUserPop(false);
      };
    } catch(err) {
      console.log('error deleting user:', err);
    }
  };

  const makeAdmin = () => {
    setShowPopUpAdmin(!showPopUpAdmin);
  };

  const makeUser = () => {
    setShowPopUpMakeUser(!showPopUpMakeUser);
  }

  const deleteUserPop = () => {
    setShowPopUpDeleteUser(!showPopUpDeleteUser);
  };

  useEffect(() => {
    getUsers();
  }, []);


  return (
    <div id="outlet-users">
      <div className="users-admin">
        { users && users
          .map((user, i) => {
            return(
            <div key={i} className="users-admin-flex">
              <div className="users-admin-flex-left">
                <img 
                src={
                  user.image.startsWith('user-')
                  ? `/${user.image}` 
                  : `/images/${user.image}`
                }
                className="users-admin-image" 
                alt={user.name} 
                />
                <div className="users-admin-flex-left-content">
                  <p className="users-admin-name">{user.name}</p>
                  <p className="users-admin-email">{user.email}</p>
                </div>
              </div>
              <div className="users-admin-flex-right">
                { user.role === 'admin' && (
                  <>
                    <Link 
                      className="users-admin-make-user-btn" 
                      onClick={() => {
                      setSelectedUser(user._id);
                      makeUser();
                    }}
                    >
                      Make User
                    </Link>
                  </>
                )}
                { user.role === 'user' && (
                  <>
                    <Link 
                      className="users-admin-make-btn"
                      onClick={() => {
                      setSelectedUser(user._id);
                      makeAdmin()
                    }}>
                      Make Admin
                    </Link>
                  </>
                )}
                
                <Link 
                  className="users-admin-delete-btn"
                  onClick={() => {
                  setSelectedUser(user._id);
                  deleteUserPop();
                  }}>
                    Delete User
                </Link>
              </div>
            </div> 
            )
          })
        }
      </div>
      <>
        {showPopUpAdmin && (
          <div className="popup-admin-make-admin">
            <h2 className="popup-admin-title-make-admin">Are you sure?</h2>
            <p className="popup-admin-text-make-admin">You are about to make a user administrator of the system. Please proceed with caution.</p>
            <div className="popup-admin-flex-make-admin">
              <Link 
              className="popup-cancel-make-admin" 
              onClick={() => 
                setShowPopUpAdmin(false)}>Cancel</Link>
              <Link 
              className="popup-make-admin-btn" 
              onClick={() => {
                promotingDemotingUsers(selectedUser);
              }}>Make user admin</Link>
            </div>
          </div>
        )}
      </>
      <>
        {showPopUpDeleteUser && (
          <div className="popup-admin-delete-user">
            <h2 className="popup-admin-title-delete-user">Are you sure?</h2>
            <p className="popup-admin-text-delete-user">You are about to delete a user. Please proceed with caution.</p>
            <div className="popup-admin-flex-delete-user">
              <Link className="popup-cancel-delete-user" onClick={() => setShowPopUpDeleteUser(false)}>Cancel</Link>
              <Link 
              className="popup-delete-user-btn"
              onClick={() => {
                deleteUser(selectedUser);
              }}
              >Delete User</Link>
            </div>
          </div>
        )}
      </>
      <>
        {showPopUpMakeUser && (
          <div className="popup-admin-make-user">
            <h2 className="popup-admin-title-make-user">Are you sure?</h2>
            <p className="popup-admin-text-make-user">You are about to downgrade a user from administrator. Please proceed with caution.</p>
            <div className="popup-admin-flex-make-user">
              <Link className="popup-cancel-make-user" onClick={() => setShowPopUpMakeUser(false)}>Cancel</Link>
              <Link 
              className="popup-make-user-btn"
              onClick={() => {
                promotingDemotingUsers(selectedUser);
              }}
              >Downgrade user</Link>
            </div>
          </div>
        )}
      </>
    </div>
  )
};