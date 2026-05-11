import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const Register = ({setMode}) => {


    const [formData,setFormData] = useState({
        fullName :"",
        email:"",
        password :""
    })

    useEffect(()=>{
        console.log(formData)
    },[formData])

    const handleChange = (e,field) =>{
        setFormData((prev)=>({
            ...prev,
            [field] : e.target.value
        }))
    }

    





 return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Register
        </h2>
        
        
        <form className="space-y-6">
          <div className='flex justify-between gap-5'>
            <div>
                <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700 mb-2"
                >
                Full Name
                </label>
                <input
                type=" name"
                id="name"
                name="name"
                // onChange={(e)=>setFormData((prev)=> ({...prev,fullName : e.target.value})  )}
                onChange={(e)=>handleChange(e,"fullName")}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="John Doe"
                />
            </div>
            <div>
                <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
                >
                Email Address
                </label>
                <input
                type="email"
                id="email"
                name="email"
                // onChange={(e)=>setFormData((prev)=> ({...prev,email : e.target.value})  )}
                onChange={(e)=>handleChange(e,"email")}

                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
                />
            </div>
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
            //    onChange={(e)=>setFormData((prev)=> ({...prev,password : e.target.value})  )}
              onChange={(e)=>handleChange(e,"password")}

              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your password"
            />
          </div>


          <button
            type="submit"

            className={`w-full   py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 hover:shadow-lg
            `}
          >Register
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600">
            I have an account!{' '}
            <span onClick={()=>setMode("login")}   className="text-blue-600  cursor-pointer hover:text-blue-500 font-semibold">
              Login
            </span>
          </p>
       
      </div>
    </div>
  );
}

export default Register