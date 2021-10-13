const { origin } = window.location;

const fetchBookmarked = async () => {
    const request = await fetch(`${origin}/api/notes/bookmarked`);
    const response = await request.json();
    if (request.status === 200) {
        const notes = response.result.notes.bookmarked;
        if (typeof notes === 'object') {
            return notes;
        }
    }
}

export {
    fetchBookmarked,
};

