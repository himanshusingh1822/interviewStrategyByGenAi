process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config();
const express = require('express') ;
const connectToDb = require('./config/database');
const userRouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const interviewRouter = require('./routes/interviewReportReoutes');

const app = express();
app.use(cors(
    {
    origin:'http://localhost:5173',
    credentials:true
}
) )
app.use(express.json());
app.use(cookieParser()); 



connectToDb();

app.get('/', (req,res)=>{
    res.send('Himanshu Singh')
});

app.use('/api/auth',userRouter);
app.use('/api/interview',interviewRouter)

const port = process.env.PORT || 3000; 

app.listen(port , ()=>{
    console.log(`Server is running at port: ${port}...`);
})