import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    id: { type: Number, required: true ,unique:true}, //unique index için
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdDate: { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.model('Note', noteSchema);