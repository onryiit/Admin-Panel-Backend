import { Router, Request, Response } from 'express';
import Note from '../Models/Note';
import { authMiddleware } from '../functions/middleware/auth';
import moment from 'moment';

const NoteRouter = Router();

NoteRouter.get('/note-list',authMiddleware, async (req: Request, res: Response) => {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
});


NoteRouter.post('/save-note',authMiddleware ,async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const id = new Date().getTime()
    const createdDate = new Date().getTime()
    const note = new Note({ id,title, content,createdDate });
    await note.save();
    res.status(200).json(note);
});

NoteRouter.get('/note/:id',authMiddleware , async (req: any, res: any) => {
    try {
      const note = await Note.findOne({ id: req.params.id });  
      if (!note) {
        return res.status(404).json({ message: 'Not bulunamadı' });
      }
      res.json(note);
    } catch (err) {
      res.status(500).json({ message: 'Sunucu hatası', error: err });
    }
  });

  NoteRouter.put('/note/:id',authMiddleware , async (req: any, res: any) => {
    const { title, content } = req.body;
    const createdDate = moment().unix() * 1000
    const { id } = req.params;  

    try {
        const updatedNote = await Note.findOneAndUpdate(
            { id: parseInt(id) }, 
            { title, content ,createdDate},
            { new: true } 
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

NoteRouter.delete('/note/:id',authMiddleware , async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const deletedNote = await Note.findOneAndDelete({ id: parseInt(id) });

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
