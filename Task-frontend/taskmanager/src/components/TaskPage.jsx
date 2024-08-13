import React from "react";
import { assets } from "../assets/image";
import { useParams } from "react-router-dom";
const TaskPage=({task,onEdit})=>{
   

    
    return(
        <div className="relative flex flex-col justify-between items-start p-5 h-70 w-80 shadow-lg bg-custom-back rounded-md m-7">
            <button onClick={()=>onEdit()}>
            <img src={assets.pen_icon} className="absolute top-2 right-2 w-6 h-6 "/>

            </button>
           
            <h2 className="font-bold text-3xl text-black">{task.title}</h2>
            <h3 className="text-black">{task.task}</h3>
        </div>
    )
}
export default TaskPage