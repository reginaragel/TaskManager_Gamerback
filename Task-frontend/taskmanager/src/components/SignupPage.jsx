import React ,{useState}from "react";
import { Link } from "react-router-dom";
import {  signupUser } from "../slices/UserSlice";
import { useDispatch } from "react-redux";
const SignupPage=()=>{

    // const [input,setInput]=useState('');
    const [userName,setUserName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    const dispatch=useDispatch();

    const handleSignup=async(e)=>{
        e.preventDefault();
        // if(input){
        //     dispatch(signupUser(input))
        //     console.log(input);
        //     setInput('')
        // }
        try{
            const response=await fetch('http://localhost:5001/signup',{
                method:'POST',
                body:JSON.stringify({userName,email,password}),
                headers:{'Content-Type':'application/json'},
                credentials:'include',
            })
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            const data=await response.json();
            dispatch(signupUser(data));
            console.log('Registration Successful');
            alert('User registered Successfully')
            setUserName('');
            setEmail('');
            setPassword('');
        }catch(err){
            console.error('Error while registering user',err);
            alert('register Failed')
        }
    }
    

    return(
        <form onSubmit={handleSignup}>
            <div className="flex justify-center items-center h-screen bg-[url('')]">
            
                <div className="w-96  p-12 shadow-4g bg-custom-back rounded">
                    <h1 className="text-3xl block text-center font-semibold">Task Manager</h1>
                    <input type="text" id="username"placeholder="Your Name"
                    value={userName} onChange={(e)=>setUserName(e.target.value)}
                    className="border w-full text-base px-3 py-2 focus:ring-0 focus:border-gray-600 mt-8 rounded"/>

                    <input type="text" id="useremail"placeholder="Your email"
                    value={email} onChange={(e)=>setEmail(e.target.value)}
                    className="border w-full text-base px-3 py-2 focus:ring-0 focus:border-gray-600 mt-8 rounded"/>

                    <input type="password" id="userpassword" placeholder="Password"
                    value={password} onChange={(e)=>setPassword(e.target.value)}
                    className="border w-full text-base px-3 py-2 focus:ring-0 focus:border-gray-600 mt-4 rounded" />

                    <button  type="submit" className="w-full bg-blue-500 text-white py-2 mt-6 rounded font-bold hover:bg-blue-600">Signup</button>
                    
                    <h3 className="mt-4">Already have an account? <span><Link to={'/login'}>Login</Link></span></h3>
                </div>
            </div>

        </form>
    )
}
export default SignupPage