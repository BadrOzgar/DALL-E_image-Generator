import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';

import dalleRoutes from './Routes/dalleRoutes.js'; //generate the data from the api
import postRoutes from './Routes/postRoutes.js'; //to creation of the posts

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.send('hello From Dall-E');
});

const StartServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen('1010', () =>
      console.log('server started at http://localhost:1010')
    );
  } catch (error) {
    console.log(err);
  }
};

StartServer();
