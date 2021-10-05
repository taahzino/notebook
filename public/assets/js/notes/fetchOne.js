const fetchOneNote = async (noteId) => {
    const request = await fetch(`${origin}/api/notes/${noteId}`);
    const response = await request.json();
    if (request.status === 200) {
        const { note } = response.result;
        if (typeof note === 'object') {
            return note;
        }
    }
};

export { fetchOneNote };
