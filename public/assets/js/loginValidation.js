const form = document.querySelector('#login__form');
const commonError = document.querySelector('.commonError');

const { email, password } = form;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    removeErrors();
    checkInputs();
});

// remove previous errors
const removeErrors = () => {
    const errorMsgs = document.querySelectorAll('.error_msg');
    const errors = document.querySelectorAll('.error');

    commonError.innerText = '';
    commonError.classList.remove('show');

    errorMsgs.forEach((em) => {
        em.innerText = '';
    });
    errors.forEach((e) => {
        e.classList.remove('error');
    });
};

const checkInputs = () => {
    // get all the values and trim them
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    const errors = [];

    if (emailValue.length === 0) {
        showError(email, `Email can't be empty!`);
        errors.push(email);
    } else if (!isEmail(emailValue)) {
        showError(email, `Invalid email address!`);
        errors.push(email);
    } else {
        success(email)
    }

    if (passwordValue.length < 6) {
        showError(password, `Password must be atleast 6 caracters long!`);
        errors.push(password);
    } else {
        success(password)
    }

    if (errors.length === 0) {
        // send request
        sendRequest({
            email: emailValue,
            password: passwordValue,
        });
    }
};

const showError = (field, msg) => {
    const parent = field.parentElement;
    parent.classList.add('error');

    const errMsg = parent.querySelector('.error_msg');
    errMsg.innerText = msg;
};

const success = (field) => {
    const parent = field.parentElement;
    parent.classList.remove('error');

    const errMsg = parent.querySelector('.error_msg');
    errMsg.innerText = '';
};

// taken from stackoverflow
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

const sendRequest = async (userobject) => {
    const res = await fetch(`${window.location.origin}/api/login/`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userobject),
    });
    const response = await res.json();

    if (response.errors) {
        const errorKeys = Object.keys(response.errors);
        if (errorKeys.length !== 0) {
            errorKeys.forEach((ek) => {
                if (form[ek]) {
                    showError(form[ek], response.errors[ek].msg);
                }
                if (ek = 'common') {
                    commonError.innerText = response.errors[ek].msg;
                    commonError.classList.add('show');
                }
            });
        }
    }

    if (res.status === 200 && !response.errors) {
        window.location.href = `${window.location.origin}/`;
    }
};