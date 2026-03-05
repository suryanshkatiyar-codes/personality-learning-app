const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const authRoutes=require('./routes/auth.routes')
const quizRoutes=require('./routes/quiz.routes');
const roadmapRoutes=require('./routes/roadmap.routes');

const app=express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/quiz',quizRoutes);
app.use('/api/roadmap',roadmapRoutes);

module.exports=app;