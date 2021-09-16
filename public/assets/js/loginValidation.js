const form = document.querySelector('#login__form');

const { email, password } = form;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    checkInputs();
});

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

const sendRequest = (userobject) => {
    console.log(userobject);
};