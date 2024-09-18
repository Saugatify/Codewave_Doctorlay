import mongoose from "mongoose";
const userdata = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
    },
    disease:{
      type: String,
    },
    medicine: {
      type: String,
      required: [true, "Please add email"],
    },
    dosages: {
        type: String,
        required: [true, "Please add the password"]
    },
    doctorname:{
        type: String,
        required: [true, "Please add the location"]
    },
    hospitalname:{
      type:String,
    },
    age:{
      type:String,
      
    },
    bloodlevel:{
      type:String,
    }



  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Userdata",userdata)