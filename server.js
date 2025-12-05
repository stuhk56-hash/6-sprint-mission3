<<<<<<< HEAD
// src/server.js 

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './src/server.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Server is running');
});

=======
import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();

>>>>>>> 0c0d25b ([정현준]sprint4)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
<<<<<<< HEAD
=======

export default app;
>>>>>>> 0c0d25b ([정현준]sprint4)
