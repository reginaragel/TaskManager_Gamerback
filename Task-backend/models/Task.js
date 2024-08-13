const mongoose=require('mongoose');
const {Schema,model}=mongoose;


const TaskSchema=new Schema({

    title:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    task:{
        type:String,
        required:true,
    },
    userId:mongoose.Schema.Types.ObjectId,
})

const TaskModel=model('Task',TaskSchema);

module.exports=TaskModel;
