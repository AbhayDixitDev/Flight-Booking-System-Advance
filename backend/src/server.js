import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import app from './app.js';

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
