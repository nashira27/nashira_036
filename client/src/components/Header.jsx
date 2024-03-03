import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector, useDispatch,  } from 'react-redux';
import { signOut } from '../redux/user/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state)=> state.user)
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
      navigate('/')
    } catch(error){
      console.log(error)
    }
  }
  return (
    <div className="bg-slate-700  text-black">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link><h1 className="font-bold">Recipe Box</h1></Link>
            <ul className="flex gap-4">  
                <Link to='/'><li>Home</li></Link>
                { currentUser ? (
                  <Link to='/profile'><li>Profile</li></Link>
                  
                  ):(
                    <Link to='/sign-in'><li>Sign In</li></Link>
                  )}
                { currentUser && <li onClick={handleSignOut}>Sign Out</li>}
            </ul>
        </div>
    </div>
  )
}

export default Header