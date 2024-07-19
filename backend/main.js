// app.js
const express = require('express');
require('dotenv').config(); // Load environment variables first
const connectDB = require('./db');
const cors = require('cors');
const Task = require('./models/Task'); // Mongoose model
const authMiddleware = require('./middleware/auth');
const moment = require('moment');
const bodyParser = require('body-parser');
const { get } = require('mongoose');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/CreateTask', async(req, res)=>{
  try{
    const {title, dueDate, description, priority} = req.body;
  const task = new Task({title, dueDate, description, priority})
  if (!title || !dueDate || !description || !priority) {
    return res.status(400).json({ error: "All fields are required." });
  }
  console.log(task)
 
  await task.save();
  res.status(201).json(task)
  
  }catch(error){
    res.status(500).json({error:'Internal Server Error'})
  }
})
app.get('/api/getData', async(req,res)=>{
  try{
    const allTask = await Task.find({});
   
    const FinalTask = allTask.sort(function(a,b){return b.dueDate - a.dueDate})
    // console.log(FinalTask)
    return res.status(200).json(FinalTask)
  }catch(error){
    return res.status(500).json({error:'Internal Server Error'})
  }
})
app.get('/api/GetByDate/:dueDate', async(req, res)=>{
  try{
    const { dueDate} = req.params;
    if(!dueDate){
      res.status(400).json({error:'Date Is Required'})
    }
    const ParesedDueDate = moment.utc(dueDate, 'YYYY-MM-DD').startOf('day').toDate();
    const task = await Task.find({ dueDate: new Date(ParesedDueDate)});
    if(!task){
      res.status(404).json({error:'No Data Found'})
    }
    res.status(201).json(task)
  }catch(error){
    res.status(500).json({error:'Internal Server Error'})
  }
})
app.delete('/api/Delete/:id', async (req, res) => {
  console.log('DELETE request received for ID:', req.params.id); // Debug log

  try {
    const { id } = req.params;
    const getid = await Task.findById(id);
    console.log(getid)
    if (!getid) {
      return res.status(404).json({ error: 'No data found for this ID' });
    }
    await Task.findByIdAndDelete(id);

    res.status(201).json({ message: 'Task successfully deleted', getid });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Task Route

app.put('/api/UpdateTask/:id', async(req, res)=>{
try{
  const {id} = req.params;

  const UpdateId =  await Task.findById(id);
  if(!id){
    res.status(404).json({error:'No Data Found'})
  }
  await Task.findByIdAndUpdate(id)
  res.status(200).json({message:'Data Updated Successfully', UpdateId})
}catch(error){
  res.status(500).json({error:'Intrenal Server Error'})
}

})

// app.put('/api/UpdateTask/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, dueDate, priority } = req.body;

//     // Validate the input
//     if (!id || !title || !description || !dueDate || !priority) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     // Parse dueDate
//     const parsedDueDate = moment.utc(dueDate, 'YYYY-MM-DD').startOf('day').toDate();

//     // Find and update the task
//     const updatedTask = await Task.findByIdAndUpdate(
//       id,
//       { title, description, dueDate: parsedDueDate, priority },
//       { new: true, runValidators: true }
//     );

//     // Check if the task was found and updated
//     if (!updatedTask) {
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     // Send the updated task as a response
//     res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
