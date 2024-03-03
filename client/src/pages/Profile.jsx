import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateUserSuccess, updateUserFailure, updateUserStart, deleteUserFailure,deleteUserStart, deleteUserSuccess, signOut } from '../redux/user/userSlice';

const Profile = () => {

  const [formData, setFormData] =useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const {currentUser, error} = useSelector(state=>state.user) 
  const dispatch = useDispatch();

  const handleChange =(e) => {
    setFormData({...formData,[e.target.id]: e.target.value})
  }
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body : JSON.stringify(formData)
      })
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(updateUserFailure(data))
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json'
        },
        body : JSON.stringify(formData)
      })
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(deleteUserFailure(data))
        return;
      }
      dispatch(deleteUserSuccess(data));
      // setUpdateSuccess(true);
    } catch (error) {
      dispatch(deleteUserFailure(error))
    }
  }

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch(error){
      console.log(error)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input defaultValue={currentUser.username} type='text' placeholder='Username' id='username' className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}></input>
        <input defaultValue={currentUser.email} type='email' placeholder='Email' id='email' className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}></input>
        <input type='password' placeholder='Password' id='password' className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}></input>
        
        <button  className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          Update
        </button>
      </form>
      
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-500">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-500">Sign out</span>
      </div>
      <p className="text-red-600 my-3">{error ? error.message || "Something went wrong!" :''}</p>
      <p className="text-green-600 my-3">{updateSuccess && 'User updated'}</p>
    </div>
  )
}

export default Profile