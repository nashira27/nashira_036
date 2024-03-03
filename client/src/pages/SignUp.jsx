import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  console.log(formData)
  
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent refreshing the page when refreshing the data
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body : JSON.stringify(formData)
      })
      const data = await res.json();
      console.log(data)
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }
  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input  id="firstname" type="text" placeholder="First Name"className="bg-slate-200 p-3 rounded-lg" onChange={handleChange}></input>
        <input  id="lastname" type="text" placeholder="Last Name" className="bg-slate-200 p-3 rounded-lg" onChange={handleChange}></input>
        <input  id="username" type="text" placeholder="Username"className="bg-slate-200 p-3 rounded-lg" onChange={handleChange}></input>
        <input  id="email" type="email" placeholder="Email" className="bg-slate-200 p-3 rounded-lg" onChange={handleChange}></input>
        <input  id="password" type="password" placeholder="Password" className="bg-slate-200 p-3 rounded-lg" onChange={handleChange}></input>
        <input  id="password2" type="password" placeholder="Confirm Password" className="bg-slate-200 p-3 rounded-lg" onChange={handleChange}></input>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          {loading ? "Loading" : "Sign Up"}
        </button>
        
      </form>
      <div className="flex mt-5">
        <p>Have an account?</p>
        <Link to='/sign-in'><span className="text-blue-500">Sign In</span></Link>
      </div>
      <p className="text-red-600 my-3">{error && "Something went wrong!"}</p>
    </div>
  )
}

export default SignUp