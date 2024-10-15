const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT =5000;


const corsOptions = {
  origin: 'https://test-deploy-frontend.vercel.app/',
  methods: ['GET', 'POST'], 
  credentials: true,
};


app.use(cors(corsOptions)); 
app.use(express.json()); 


const MONGO_URI = 'mongodb+srv://Tej:939712@tejdreamer.ofzdd0j.mongodb.net/form-details';


mongoose.connect(MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB:', err));


const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});


const FormSubmission = mongoose.model('FormSubmission', formSchema);


app.get('/',(req,res)=>{
  res.json("API working")
})

app.post('/api/submit', async (req, res) => {
  // const { name, email } = req.body;

  // if (!name || !email) {
  //   return res.status(400).json({ message: 'Please provide both name and email.' });
  // }

  // try {
    
  //   const newSubmission = new FormSubmission({ name, email });
  //   await newSubmission.save();

    
  //   res.status(200).json({ message: 'Form submitted and saved successfully!' });
  // } catch (error) {
  //   console.error('Error saving to MongoDB:', error);
  //   res.status(500).json({ message: 'An error occurred while saving the data.' });
  // }

  res.status(200).json("Detaiils Submitted");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
