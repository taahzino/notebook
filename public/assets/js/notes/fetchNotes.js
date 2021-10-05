import {
    bindNote
} from "../popup.js";

const unpinnedNotes = document.querySelector('.unpinned__notes');

const { origin } = window.location;

const sendRequest = async () => {
    const request = await fetch(`${origin}/api/notes/`);
    const response = await request.json();
    if (request.status === 200) {
        const { notes } = response.result;
        if (typeof notes === 'object' && notes instanceof Array && notes.length > 0) {
            unpinnedNotes.innerHTML = '';
            notes.forEach((note) => {
                const newNote = document.createElement('div');
                newNote.classList.add('note');
                newNote.setAttribute('data-id', note._id);
                newNote.innerHTML = `
                    <h3 class="note__title">${note.title}</h3>
                    <div name="note__summery" class="note__summery">
                    ${note.content}
                    </div>
        
                    <div class="note__options">
                        <button class="note__option_pin">
                            <i class="bx bx-pin"></i>
                        </button>
                        <button class="note__option_heart">
                            <i class="bx bx-heart-circle"></i>
                        </button>
                        <button class="note__option_delete">
                            <i class="bx bx-trash"></i>
                        </button>
                    </div>
                `;
                unpinnedNotes.append(newNote);
                bindNote(newNote);
            });
        }
    }
}

export {
    sendRequest,
};

