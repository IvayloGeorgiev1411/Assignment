import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const notes = [];

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get('/notes', (req, res) => {
    res.send(notes);
    console.log('All notes sent'); 
});

app.post('/notes', (req, res) => {
    const note = {
        id: notes.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    notes.push(note);
    res.status(201).send(note);
    console.log('New note added');
});

app.get('/notes/:id', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).send('Note not found');
    res.send(note);
    console.log(`Note with ${req.params.id} sent`);
});

app.put('/notes/:id', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).send('Note not found');

    note.title = req.body.title;
    note.content = req.body.content;
    res.send(note);
    console.log(`Note with ${req.params.id} updated`);
});


app.delete('/notes/:id', (req, res) => {
    const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id));
    if (noteIndex === -1) return res.status(404).send('Note not found');

    const deletedNote = notes.splice(noteIndex, 1);
    res.send(deletedNote[0]);
    console.log(`Note with ${req.params.id} deleted`);
});