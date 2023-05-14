import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.send('Hello from Dalle');
});

//making call to openai return ai image
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body; //prompt that we create in input
    const aiResponse = await openai.createImage({
      prompt,
      n: 1, //number of images
      size: '1024x1024',
      response_format: 'b64_json',
    });

    //getting the image and send it back to front
    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
