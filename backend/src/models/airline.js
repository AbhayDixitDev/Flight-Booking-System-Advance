// src/models/airline.js
import mongoose from 'mongoose';

const airlineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Airline = mongoose.model('Airline', airlineSchema);

export default Airline;
