import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from'react-hot-toast'
 function Login() {

 

  const handleLogin=async(e)=>{
    e.preventDefault()

    if(!email || !password){
    toast.error("please fill all fields")
    }
  
   

      // console.log("📦 Sending form data:");
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(data)
      toast.success("user login  sucessfully")
      setEmail("")
      setPassword("")
     

    } catch (error) {
      console.log(error)
       toast.error("please fill valid credentials");
    }


  }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
   return (
     <div>
       <div className="min-h-screen flex items-center justify-center bg-gray-300">
         <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
           <form action="" onSubmit={handleLogin}>
             <div className="font-semibold text-xl items-center text-center">
               Uni-<span className="text-blue-500">Assist</span>
             </div>
             <h1 className="text-xl font-semibold mb-6">Login Now</h1>
            
             <div>
               <input
                 type="text"
                 placeholder=" Your Email Address"
                 onChange={(e) => setEmail(e.target.value)}
                 value={email}
                 className="w-full p-2 mb-4 border rounded-md"
               />
             </div>
           
             <div>
               <input
                 type="password"
                 placeholder="Enter Your Password"
                 onChange={(e) => setPassword(e.target.value)}
                 value={password}
                 className="w-full p-2 mb-4 border rounded-md"
               />
             </div>
            
            
             <p className="text-center mb-4 font-semibold">
               New Account?{" "}
               <Link to="/register" className="text-blue-600">Register Now</Link>
             </p>
             <button
               type="submit"
               className="w-full bg-blue-500 hover:bg-sky-400 duration-300 rounded-md text-white p-2"
             >
               Login
             </button>
           </form>
         </div>
       </div>
     </div>
   );
 }
 export default Login;