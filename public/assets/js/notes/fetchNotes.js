const { origin } = window.location;

const fetchAllNotes = async () => {
    const request = await fetch(`${origin}/api/notes/`);
    const response = await request.json();
    if (request.status === 200) {
        const { notes } = response.result;
        if (typeof notes === 'object') {
            return notes;
        }
    }
}

export {
    fetchAllNotes,
};

