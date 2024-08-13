const express=require('express');
const dotenv=require('dotenv');
const path=require('path');
const db=require('./config/config');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const User=require('./models/User');
const Task=require('./models/Task')
const bcrypt=require('bcrypt');
const app=express();

dotenv.config({path:path.join(__dirname,'config','config.env')});

const salt=bcrypt.genSaltSync(10);
const secret='ragelwefh4643';
const options={
    expiresIn:'1h'
}
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser())
db();


function extractUsername(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    console.log(token);

    if(!token){
        return res.status(401).json({error:'No token provided'})
    }
     
    jwt.verify(token,secret,(err,user)=>{
        if(err){
            return res.status(403).json({error:'Invalid token'})
        }
        console.log(user.id);
        req.user=user;
        next();
    })
}
app.post('/signup',async(req,res)=>{
    const {userName,email,password}=req.body;

    try{
        const user=new User({
            userName,
            email,
            password:bcrypt.hashSync(password,salt),
        });
        await user.save();
        res.status(201).json({message:'User registered Successfully'})
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Failed to register user'})
    }
})

app.post('/login',async(req,res)=>{
    
    const {email,password}=req.body;

    const user=await User.findOne({email});
    console.log(user);
    if(!user){
        return res.status(400).json({error:'User not found'})
    }
    const pass=bcrypt.compareSync(password,user.password);
    if(pass){
        const payload={
            id:user._id
        }
        const token=jwt.sign(payload,secret,options);

        res.cookie('token',token).json({
            id:user._id,
            email:user.email,
            userName:user.userName,
            token:token,
        })
    }else{
        res.status(400).json('wrong credentials')
    }
})

app.post('/createTask',extractUsername,async(req,res)=>{

    const {title,status,task}=req.body;
    const userId=req.user.id;
    // const userId =  extractUsername(req, res);
    console.log(userId)
    const tasks =new Task({
        title,
        status,
        task,
        userId,
    });
    console.log(tasks)
    try{
        await tasks.save();
         res.status(201).json({message:'Task created Successfully'});
    }catch(error){
         res.status(500).json({error:'Failed to task',error})
    }
    
});
app.put('/tasks/:id',async(req,res)=>{
    const {title,status,task}=req.body;
    const { id } = req.params;
    console.log(req.body)
    const tasks=await Task.findById(id);
  try{
    await tasks.updateOne({
      title,
      status,
      task,
      id,
    })
    res.json("updated sucessfuly")
  }
  catch(err){
      console.log(err)
  }
})    

app.get('/tasks',extractUsername,async(req,res)=>{
    const user_id=req.user.id;
    console.log(user_id);
    try{
        const tasks=await Task.find({userId:user_id})
        res.json(tasks);
    }catch(err){
        res.status(500).json({message:'Error Fetching tasks',err})
    }
})
app.post('/logout',(req,res)=>{
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
    return res.json({ message: 'Logout successful' });
});
app.get('/',(req,res)=>{
    res.json('hello')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on  port ${process.env.PORT}`)
})