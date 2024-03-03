import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const {currentUser} = useSelector((state)=> state.user)
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
                { currentUser && <Link to='/'><li>Sign Out</li></Link>}
            </ul>
        </div>
    </div>
  )
}

export default Header