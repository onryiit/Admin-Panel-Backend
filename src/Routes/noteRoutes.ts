import { Router, Request, Response } from 'express';
import Note from '../Models/Note';
import { authMiddleware } from '../functions/middleware/auth';
import moment from 'moment';

const NoteRouter = Router();

// This API get all notes
NoteRouter.get('/note-list',authMiddleware, async (req: Request, res: Response) => {
    const customerId = req.query.customer_id
    const pk = `Notes_${customerId}`;
    const notes = await Note.find({pk:pk}).sort({ createdAt: -1 });
    res.json(notes);
});


NoteRouter.post('/save-note',authMiddleware ,async (req: Request, res: Response) => {
    const { title, content, customer_id } = req.body;
    const id = new Date().getTime()
    const createdDate = new Date().getTime()
    const pk = `Notes_${customer_id}`
    const note = new Note({
        pk,
        id,
        title,
        content,
        createdDate
    });
    await note.save();
    res.status(200).json(note);
});

NoteRouter.get('/notes', authMiddleware, async (req: any, res: any) => {
    try {
        const customerId = req.query.customer_id
        const id = req.query.id

        if (!customerId) {
            return res.status(400).json({ message: 'customerId query parametresi eksik.' });
        }

        const pk = `Notes_${customerId}`;

        const notes = await Note.findOne({ pk: pk, id: id });

        res.status(200).json(notes);
    } catch (error) {
        console.error("Notlar getirilirken hata:", error);
        res.status(500).json({ message: "Notlar getirilirken sunucu hatası oluştu." });
    }
});

  NoteRouter.put('/note',authMiddleware , async (req: any, res: any) => {
    const { title, content } = req.body;
    const  id = req.query.id;
    const  customer_id  = req.query.customer_id;
    const pk = `Notes_${customer_id}` 
    const createdDate = String(moment().unix() * 1000) 
    let updatePayload: { title?: string, content?: string, createdDate?: string }={
        title:title,
        content:content,
        createdDate:createdDate
    }
    try {
        const updatedNote = await Note.findOneAndUpdate(
            { pk: pk, id: id },   
            { $set: updatePayload },    
            {
                new: true,            // Güncellenmiş dokümanı döndür
                runValidators: true   // Şema validasyonlarını çalıştır
            }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the note' });
    }
});

NoteRouter.delete('/note',authMiddleware , async (req: any, res: any) => {
    // const { id } = req.params;
    const  id = req.query.id;
    const  customer_id  = req.query.customer_id;
    const pk = `Notes_${customer_id}` 

    try {
        const deletedNote = await Note.findOneAndDelete({ pk:pk, id: parseInt(id) });

        if (!deletedNote) {
            return res.status(404).json({ message: 'Not bulunamadı' });
        }

        res.json({ message: 'Not silindi', note: deletedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
});

export default NoteRouter;
