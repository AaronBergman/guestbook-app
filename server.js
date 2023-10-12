const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('YOUR_MONGODB_ATLAS_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true });

const MessageSchema = new mongoose.Schema({
  content: String
});

const Message = mongoose.model('Message', MessageSchema);

app.use(express.json());  // Middleware to parse JSON

app.get('/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

app.post('/messages', async (req, res) => {
  const message = new Message({ content: req.body.content });
  await message.save();
  res.json(message);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
