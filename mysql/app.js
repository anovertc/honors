import express from 'express';
import cors from 'cors';
import submitRoute from './submit.js'; // Make sure the file has `.js` extension

const app = express();

// Enable CORS (good for ngrok + React dev)
app.use(cors());
app.use(express.json());

// Route for handling survey submission
app.use('/api', submitRoute);

// Start the server
app.listen(3001, () => {
  console.log('✅ Server running on port 3001');
});



