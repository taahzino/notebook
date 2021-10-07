const pinOneNote = async (noteId, bool) => {
    const request = await fetch(`${origin}/api/notes/pin/${bool}/${noteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const response = await request.json();
    if (request.status === 200) {
        const { note } = response.result;
        if (typeof note === 'object') {
            return note;
        }
    }
};

export { pinOneNote };

