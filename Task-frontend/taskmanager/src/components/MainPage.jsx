import React, { useState ,useEffect} from "react";
import { assets } from "../assets/image";
import { Link, Navigate } from "react-router-dom";
import TaskPage from "./TaskPage";
import { useSelector } from "react-redux";
const MainPage=()=>{

    const [isTaskVisible,setIsTaskVisible]=useState(false);
    const [task,setTask]=useState('')
    const [tasks,setTasks]=useState([]);
    const [title,setTitle]=useState('');
    const [status,setStatus]=useState('');
    const [redirect,setRedirect]=useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [editingtask,setEditingTask]=useState(null);
    

    const {token,userName } = useSelector((state) => state.users);
    // const user = useSelector((state) => state.user.user);
    

    const handleTask=()=>{
         setIsTaskVisible(!isTaskVisible);
    }
    
    const addTask=async(e)=>{
        e.preventDefault();
        if(task.trim() && title.trim()){
           
        }
       
        if(!status || !title ||!task){
            alert('Provide Details');
            return;
        }
        if (!token) {
            alert('You are not authenticated. Please login.');
            return;
        }

        console.log("Token:", token);
    
        const data={
            status,title,task,
        }
        console.log(data);
        try{
            const response=await fetch('http://localhost:5001/createTask',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`,
                },
                body:JSON.stringify(data),
                credentials:'include',
            })
            if(response.ok){
                const newTask=await response.json()
                setTasks([...tasks,newTask]);
                alert('Task saved Successfully')
                setTask('');
                setStatus('');
                setTitle('');
                setIsTaskVisible(false);
                await fetchTasks();
            }else{
                console.error('Failed to add task',await response.json())
            }

        }catch(err){
            console.error('Error while adding task',err)
        }
        
        
    }
    
    const updateTask=async(e)=>{
        e.preventDefault();
        if(task.trim() && title.trim() && status.trim()){
            if(!token){
                alert('You are not authenticated.Please Login');
                return
            }
            const data={
                title,
                status,
                task,
            }
            try{
                const response=await fetch(`http://localhost:5001/tasks/${editingtask}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body:JSON.stringify(data),
                    credentials:'include',
                });
                if(response.ok){
                    const updatedTask=await response.json();
                    setTasks(tasks.map(task=>task._id===editingtask?updatedTask:task))
                    alert('Task Updated Successfully');
                    resetTaskForm();
                    await fetchTasks();
                }else{
                    console.error('Failed to update task',await response.json())
                }
            }catch(err){
                console.error('Error while updating task',err)
            }
        }else{
            alert('Please fill all the fields')
        }
    }
    const fetchTasks=async()=>{
        const response=await fetch('http://localhost:5001/tasks',{
            method:'GET',
            headers:{
                Authorization: `Bearer ${token}`
            },
            credentials:'include',
        })
        console.log(fetchTasks);
        if(response.ok){
            const data=await response.json()
            setTasks(data);
            console.log(data);
        }else{
            console.error('Failed to fetch tasks',await response.json())
        }
    }
    useEffect(()=>{
        if (token) {
            fetchTasks();
        }
    },[token]);
    const handleLogout=async()=>{
        try{
            const response=await fetch('http://localhost:5001/logout',{
                credentials:'include',
                method:'POST',
            })
            if(response.ok){
               setRedirect(true);
            }else{
                console.error('Failed to logout',await response.json())
            }

        }catch(err){
            console.error('Error while logging out',err)
        }
        
    }
    const startEditing=(task)=>{
        setTitle(task.title);
        setTask(task.task);
        setStatus(task.status);
        setEditingTask(task._id);
        setIsEditing(true);
        setIsTaskVisible(true);
    }
    const resetTaskForm=()=>{
        setTitle('');
        setTask('');
        setStatus('');
        setIsEditing(false);
        setEditingTask(null);
        setIsTaskVisible(false);
    }
    if(redirect){
        return <Navigate to={'/signup'}/>
    }
    const groupedTasks={
        'To Do':tasks.filter(task=>task.status==='To Do'),
        'In Progress':tasks.filter(task=>task.status==='In Progress'),
        Finished:tasks.filter(task=>task.status==='Finished'),
    }
    
    
    
    return(
        <div className="flex flex-col md:flex-row h-screen">
            <div className="w-full md:w-60 shadow-4g bg-custom-back" >
                <div className="dashboard">
                    <div className="half-dash">
                        <div className="top-content">
                            <div className="image-name flex items-center justify-between p-4">
                                <img src={assets.user_icon} id="img1" alt="User" className="h-12 w-12 mt-1.5 ml-4 rounded" />
                                <button className="flex w-24 p-2 shadow-4g bg-logout rounded mt-2 font-bold pl-5 " onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                        <div className="icons  ">
                            <div className="icon flex flex-row items-center justify-between p-4">
                                <img src={assets.bell_icon} id="icon1" alt="Bell" />
                                <img src={assets.frame_icon} id="icon2" alt="Frame" />
                                <img src={assets.arrow_icon} id="icon3" alt="Arrow" />
                            </div>
                        </div>
                        <div className="navbar">
                            <div className="sidebar">
                                <div className="home flex flex-row items-center justify-evenly p-4">
                                    <img src={assets.home_icon} id="home" alt="Home" />
                                    <span>Home</span>
                                </div>
                            <div className="board flex flex-row items-center justify-evenly p-4">
                                <img src={assets.board_icon} id="board" alt="Board" />
                                <span>Board</span>
                            </div>
                            <div className="setting flex flex-row items-center justify-evenly p-4">
                                <img src={assets.setting_icon} id="setting" alt="Settings" />
                                <span>Settings</span>
                            </div>
                            <div className="teams flex flex-row items-center justify-evenly p-4">
                                <img src={assets.team_icon} id="team" alt="Teams" />
                                <span>Teams</span>
                            </div>
                            <div className="analytics flex flex-row items-center justify-evenly p-4">
                                <img src={assets.analytics_icon} id="analytics" alt="Analytics" />
                                <span>Analytics</span>
                            </div>
                        </div>
                    </div>
                    <div className="new-task flex flex-row items-center justify-evenly p-4 bg-logout rounded font-bold ml-3 mr-3">
                        <h3 onClick={handleTask} className="cursor-pointer">Create new task</h3>
                        <span><img src={assets.newplus_icon} alt="Plus" /></span>
                    </div>
                </div>
            </div>
        </div>
            <div className="main flex-1 bg-white p-4 mt-9">
                      <span className="font-bold text-3xl m-4 pb-4">Hello, {userName}</span>
                <div className=" flex flex-row items-center justify-evenly p-2 bg-logout rounded">
                    <img src={assets.search_icon} />
                    <input type="text" placeholder="Search ....." className=" bg-logout h-12 w-full p-6 focus:outline-none focus:border-transparent" />
                </div>
                <div className="  flex flex-col md:flex-row  items-center justify-between w-auto ml-10 mr-12">
                    <div className="relative todo flex flex-col items-center justify-between bg-todo todo font-bold rounded mt-4 h-12 p-2 w-60">
                        <span >To Do</span>
                        <img src={assets.dash_icon} className="absolute top-2 right-2 w-6 h-6"/>
                        {groupedTasks['To Do'].map(task=>(
                            <TaskPage key={task._id} task={task} onEdit={()=>startEditing(task)}/>
                        ))}
                    </div>
                    <div className="relative progress flex flex-col items-center justify-between bg-progress todo font-bold p-2 rounded mt-4 h-12 w-60">
                        <span>In Progress</span>
                        <img src={assets.dash_icon}  className="absolute top-2 right-2 w-6 h-6"/>
                        {groupedTasks['In Progress'].map((task)=>(
                            <TaskPage key={task._id} task={task} onEdit={()=>startEditing(task)}/>
                        ))}
                    </div>
                    <div className="done relative flex flex-col items-center justify-between bg-finished todo font-bold p-2 rounded mt-4 h-12 w-60 ">
                        <span>Finished</span>
                        <img src={assets.dash_icon} className="absolute top-2 right-2 w-6 h-6"/>
                        {groupedTasks['Finished'].map((task)=>(
                            <TaskPage key={task._id} task={task} onEdit={()=>startEditing(task)}/>
                        ))}
                    </div>
                    
                </div>
                {isTaskVisible && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg p-4 shadow-lg">
                        <h3 className="text-lg font-bold mb-2">{isEditing ? "Edit Task" : "New Task"}</h3>
                        <form onSubmit={isEditing ? updateTask : addTask}>
                            <input className="w-full border p-2 mb-2" type="text"placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea className="w-full border p-2 mb-2" placeholder="Task"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}/>
                            <select className="w-full border p-2 mb-2" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Select Status</option>
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Finished">Finished</option>
                            </select>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                                    {isEditing ? "Update Task" : "Add Task"}
                                </button>
                                <button type="button" onClick={resetTaskForm} className="bg-red-500 text-white px-4 py-2 rounded">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}
export default MainPage