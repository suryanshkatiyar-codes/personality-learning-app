const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const authRoutes=require('./routes/auth.route')
const quizRoutes=require('./routes/quiz.route');
const roadmapRoutes=require('./routes/roadmap.route');
const userRoute=require('./routes/user.route');

const app=express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/quiz',quizRoutes);
app.use('/api/roadmap',roadmapRoutes);
app.use('/api/user',userRoute);

module.exports=app;