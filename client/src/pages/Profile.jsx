import { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { updateUserSuccess, updateUserFailure, updateUserStart, deleteUserFailure,deleteUserStart, deleteUserSuccess, signOut } from '../redux/user/userSlice';

const Profile = () => {

  const [formData, setFormData] =useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const {currentUser, error} = useSelector(state=>state.user) 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recipeList, setRecipeList] = useState([])

  const handleChange =(e) => {
    setFormData({...formData,[e.target.id]: e.target.value})
  }
  console.log(formData)
  const getList = async () => {
    try{
      const res = await fetch('/api/recipe/filter', {
        method: 'GET',
        headers: {
          'Content-Type':'application/json'
        },
        body : JSON.stringify()
      })
      const data = await res.json();
  
      setRecipeList(data);
    } catch (error) {
      console.log(error)
    } 
  }
  useEffect(() => {
    getList();    
  }, [])

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
      navigate('/')
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
    <div className="max-w-lg mx-auto p-4">
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

      <h2 className="text-3xl text-center font-semibold my-7">My Recipe Collection</h2>

      <ul role="list" class="divide-y divide-gray-100">
        {recipeList.map((recipe, index) => {
        <li class="flex justify-between gap-x-6 py-5">
          <div class="flex min-w-0 gap-x-4">
            <div class="min-w-0 flex-auto">
              <p class="text-sm font-semibold leading-6 text-gray-900">{recipe.name}</p>
              <p class="mt-1 truncate text-xs leading-5 text-gray-500">`Rating: ${recipe.rating}`</p>
            </div>
          </div>
          <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 text-gray-900">`Takes around ${recipe.cookingTime} minutes`</p>
            <p class="mt-1 text-xs leading-5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
          </div>
        </li>})}
      </ul>
    </div>
    
  )
}

export default Profile