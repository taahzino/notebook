const updateOneNote = async (noteId, body) => {
    const request = await fetch(`${origin}/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const response = await request.json();
    if (request.status === 200) {
        const { note } = response.result;
        if (typeof note === 'object') {
            return note;
        }
    }
};

export { updateOneNote };

