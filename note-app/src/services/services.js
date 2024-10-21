export const getAllNotes = async () => {
    const response = await fetch('http://localhost:3000/notes');
    console.log(response);
    return response.json();
}

export const createNote = async (note) => {
    try {
        const response = await fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        
    }
}

export const removeNote = async (id) => {
    const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const editNote = async (id, newNote) => {
    try {
        const response = await fetch(`http://localhost:3000/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const getNote = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/notes/${id}`);
        console.log(response);
        return response.json();
    } catch (err) {
        console.log(err);
    }
}