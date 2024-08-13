import React ,{useState,useEffect}from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../slices/UserSlice";
import { useDispatch ,useSelector} from "react-redux";

const LoginPage=()=>{

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);
    const dispatch=useDispatch();
    const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            setRedirect(true);
        }
    }, [isAuthenticated]);


    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch('http://localhost:5001/login',{
                method:'POST',
                body:JSON.stringify({email,password}),
                headers:{'Content-Type':'application/json'},
                credentials:'include',
            })
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            const data=await response.json();
            dispatch(loginUser(data));
            console.log(data.token);
            console.log('Login Successful');
            setEmail('');
            setPassword('');
            setRedirect(true)
        }catch(err){
            console.error('Error while logging in',err);
            alert('Login Failed')
        }
    }
    if(redirect || isAuthenticated){
       return  <Navigate to={'/mainpage'}/>
    }
    return(
        <form  onSubmit={handleLogin}>
            <div className="flex justify-center items-center h-screen bg-[url('')]">
                <div className="w-96  p-12 shadow-4g bg-custom-back rounded">
                    <h1 className="text-3xl block text-center font-semibold">Task Manager</h1>

                    <input type="text" id="useremail"placeholder="Your email"
                    value={email} onChange={(e)=>setEmail(e.target.value)}
                    className="border w-full text-base px-3 py-2 focus:ring-0 focus:border-gray-600 mt-8 rounded"/>

                    <input type="password" id="userpassword" placeholder="Password"
                    value={password} onChange={(e)=>setPassword(e.target.value)}
                    className="border w-full text-base px-3 py-2 focus:ring-0 focus:border-gray-600 mt-4 rounded" />

                    <button  type="submit" className=" w-full bg-blue-500 text-white py-2 mt-6 rounded font-bold hover:bg-blue-600">Login</button>
                    
                    <h3 className="mt-4">Don't have an account? <span><Link to={'/signup'}>SignUp</Link></span></h3>
                </div>
            </div>

        </form>
    )
    
}
export default LoginPage