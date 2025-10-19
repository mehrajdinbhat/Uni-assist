import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
 function Register() {

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);

    if (!file) {
      console.warn("No file selected!");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
    reader.readAsDataURL(file);
  };


  const handleRegister=async(e)=>{
    e.preventDefault()
    const formData=new FormData()
    formData.append('name',name)
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("education", education);
    formData.append("photo", photo);
    formData.append("password", password);

      // console.log("📦 Sending form data:");
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/register",
        formData
      );
      console.log(data)
      toast.success("user registerd sucessfully")
      setName("")
      setEmail("")
      setPhone("")
      setEducation("")
      setPassword("")
      setPhoto("")
      setPhotoPreview("")

    } catch (error) {
      console.log(error)
      toast.error( "please fill the required fields")
    }


  }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [education, setEducation] = useState("");
    const [photo, setPhoto] = useState("");
    const [photoPreview, setPhotoPreview] = useState("");
   return (
     <div>
       <div className="min-h-screen flex items-center justify-center bg-gray-300">
         <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
           <form action="" onSubmit={handleRegister}>
             <div className="font-semibold text-xl items-center text-center">
               Uni-<span className="text-blue-500">Assist</span>
             </div>
             <h1 className="text-xl font-semibold mb-6">Register</h1>
             <div>
               <input
                 type="text"
                 placeholder="Your Name"
                 onChange={(e) => setName(e.target.value)}
                 value={name}
                 className="w-full p-2 mb-4 border rounded-md"
               />
             </div>
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
                 type="text"
                 placeholder="Enter Your Number"
                 onChange={(e) => setPhone(e.target.value)}
                 value={phone}
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
             <div>
               <select
                 value={education}
                 onChange={(e) => setEducation(e.target.value)}
                 className="w-full p-2 mb-4 border rounded-md"
               >
                 <option value="">Select Your Education</option>
                 <option value="B.TECH">B.TECH</option>
                 <option value="M.TECH">M.TECH</option>
                 <option value="BCA">BCA</option>
                 <option value="MCA">MCA</option>
                 <option value="BA">BA</option>
                 <option value="MBA">MBA</option>
                 <option value="B.COM">B.COM</option>
                 <option value="M.COM">M.COM</option>
               </select>
             </div>
             <div className="flex items-center mb-4">
               <div className="phot w-20 h-20 mr-4">
                 {photoPreview && (
                   <img
                     src={photoPreview}
                     alt="photo"
                     className="w-full h-full object-cover"
                   />
                 )}{" "}
               </div>
               <input
                 type="file"
                 onChange={changePhotoHandler}
                 className="w-full p-2 border rounded-md"
               />
             </div>
             <p className="text-center mb-4 font-semibold">
               Already Registerd?{" "}
               <Link to="/login" className="text-blue-600">Login Now</Link>
             </p>
             <button
               type="submit"
               className="w-full bg-blue-500 hover:bg-sky-400 duration-300 rounded-md text-white p-2"
             >
               Register
             </button>
           </form>
         </div>
       </div>
     </div>
   );
 }
 export default Register;