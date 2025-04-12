import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    pk: { type: String,
        required: true ,
       //  unique:true,
        index:true}, 
  id: { type: Number, required: true ,unique:true}, 
  name: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: String, required: true },
});

export default mongoose.model("Customer", customerSchema);