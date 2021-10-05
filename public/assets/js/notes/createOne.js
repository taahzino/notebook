const createOneNote = async (body) => {
    const request = await fetch(`${origin}/api/notes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (request.status === 200) {
        return;
    }
};

export { createOneNote };

