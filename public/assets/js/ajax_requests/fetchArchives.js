const { origin } = window.location;

const fetchArchives = async () => {
    const request = await fetch(`${origin}/api/notes/archived`);
    const response = await request.json();
    if (request.status === 200) {
        const notes = response.result.notes.archived;
        if (typeof notes === 'object') {
            return notes;
        }
    }
}

export {
    fetchArchives,
};

