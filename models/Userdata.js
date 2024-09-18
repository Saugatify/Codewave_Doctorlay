import mongoose from "mongoose";
const userdata = mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  smoking: {
    type: Boolean,
    required: true
  },
  alcohol: {
    type: Boolean,
    required: true
  },
  exerciseFrequency: {
    type: String,
    enum: ['None', 'Rarely', 'Occasionally', 'Regularly'],
    required: true
  },
  chronicConditions: {
    type: [String],
    enum: ['None', 'Diabetes', 'HIV/AIDS', 'Hypertension', 'Asthma', 'Heart Disease', 'Other'],
    default: 'None',
    required: true
  },
  currentMedications: {
    type: [String],
  },
  symptoms: {
    type: [String],
    enum: ['None', 'Fatigue', 'Frequent Urination', 'Weight Loss', 'Fever', 'Cough', 'Blurred Vision', 'Weakness'],
    default: 'None',
    required: true
  },

  sleephours: {
    type: [String],
    enum: ['Irregular', 'Regular'],
    default: 'None',
    required: true
  },

  allergies: {
    type: [String],
    default: []
  },
  familyHistory: {
    type: [String],
    enum: ['None', 'Diabetes', 'Heart Disease', 'Cancer', 'Thyroid'],
    default: 'None'
  },
  lastCheckupDate: {
    type: Date,
    required: true
  },

  note: {
    type: [String],
    default: []
  },
});

export default mongoose.model("Userdata", userdata);
