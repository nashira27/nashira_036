import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  
  const [ formData, setFormData ] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  console.log(formData)
  
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent refreshing the page when refreshing the data
    try {
      const res = await fetch('/api/auth/signin', {
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
      navigate('/')
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }
  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input  id="email" type="email" placeholder="Email" className="bg-slate-200 p-3 rounded-lg" onChange={handleChange}></input>
        <input  id="password" type="password" placeholder="Password" className="bg-slate-200 p-3 rounded-lg" onChange={handleChange}></input>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          {loading ? "Loading" : "Sign In"}
        </button>
        
      </form>
      <div className="flex mt-5">
        <p>No account?</p>
        <Link to='/sign-up'><span className="text-blue-500">Sign Up</span></Link>
      </div>
      <p className="text-red-600 my-3">{error && "Something went wrong!"}</p>
    </div>
  )
}

export default SignIn