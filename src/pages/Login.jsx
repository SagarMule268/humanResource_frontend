import { useState } from "react";
import { useNavigate, useLocation,   } from "react-router-dom"
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const location = useLocation();
  const navigate =useNavigate();
  const {login} = useAuth() ;
   const message = location.state?.message;
   const [errors ,setErrors] =useState({});
   const [formData ,setFormData] = useState({
    email:"",
    password:""
   });
  //  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{4,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 

   const handleChange = (e) =>{
        setFormData(
          {...formData,
          [e.target.name]: e.target.value
        }
        )
   }

   const validate = (e) =>{
      const {name ,value} = e.target ;
      const newErrors ={...errors};
      switch (name){
        case "email" :
          if(!EMAIL_REGEX.test(value)){
              newErrors.email = "Email format is not valid";
          }else {
            delete newErrors.email
          }

          break;
        
        


          default:
            break;

      }

      setErrors(newErrors);
   }

   const handleSubmit = async(e) =>{
      e.preventDefault();
      if(Object.keys(errors).length>0){
        alert('Entered data is not correct !');
      }
      
      try {
        const response = await axios.post('auth/login',formData,{
          headers:{ "Content-Type":"application/json" },
          withCredentials:true
        })
        if(response.data.success){
            login(response.data.user)
            localStorage.setItem("token",response.data.token)
            if(response.data.user.role==="admin"){
                navigate('/admin-dashboard')
            }else{
                navigate('/employee-dashboard')

            }
        }
        console.log(response)
      } catch (error) {
          console.log(error)
      }
     
     

   }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
        { message && <p className="text-green-400 px-7">{message }</p>}
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            onBlur={validate}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
           {errors.email &&<p className="text-pink-400 text-sm ">{ errors.email }</p>}
          
          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={validate}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {errors.password && <p className="text-pink-400 text-sm ">{ errors.password }</p>}
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
        
        <p className="text-gray-200 text-center mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-pink-300 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
