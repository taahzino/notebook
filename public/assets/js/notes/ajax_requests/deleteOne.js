const deleteOneNote = async (noteId) => {
    const request = await fetch(`${origin}/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (request.status === 200) {
        return;
    }
};

export { deleteOneNote };

