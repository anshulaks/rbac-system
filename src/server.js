const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');



dotenv.config(); // To load environment variables
const app = express();

app.use(express.json())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection failed:', err));

//Routes
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the RBAC system!');
  });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
