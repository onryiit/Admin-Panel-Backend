import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    pk: { type: String,
         required: true ,
        //  unique:true,
         index:true}, 
    id: { type: Number, 
        required: true ,
        unique:true}, 
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdDate: { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.model('Note', noteSchema);