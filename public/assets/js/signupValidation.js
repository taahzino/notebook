const form = document.querySelector('#signup__form');

const {
    firstname,
    lastname,
    email,
    password,
    password2,
} = form;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    removeErrors();
    checkInputs();
});

// remove previous errors
const removeErrors = () => {
    const errorMsgs = document.querySelectorAll('.error_msg');
    const errors = document.querySelectorAll('.error');
    errorMsgs.forEach((em) => {
        em.innerText = '';
    });
    errors.forEach((e) => {
        e.classList.remove('error');
    });
};

const checkInputs = () => {
    // get all the values and trim them
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    const errors = [];

    if (firstnameValue.length === 0) {
        showError(firstname, `First or last name can't be empty!`);
        errors.push(firstname);
    } else {
        success(firstname)
    }

    if (lastnameValue.length === 0) {
        showError(lastname, `First or last name can't be empty!`);
        errors.push(lastname);
    } else {
        success(lastname)
    }

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

    if (password2Value.length < 6) {
        showError(password2, `Password must be atleast 6 caracters long!`);
        errors.push(password2);
    } else if (passwordValue !== password2Value) {
        showError(password2, `Passwords do not match!`);
        errors.push(password2);
    } else {
        success(password2)
    }

    if (errors.length === 0) {
        // send request
        sendRequest({
            firstname: firstnameValue,
            lastname: lastnameValue,
            email: emailValue,
            password: passwordValue,
            password2: password2Value,
        });
    }
};

const showError = (field, msg) => {
    const parent = field.parentElement;
    parent.classList.add('error');

    if (field === firstname || field === lastname) {
        const errMsg = document.querySelector('.nameField .error_msg');
        errMsg.innerText = msg;
    } else {
        const errMsg = parent.querySelector('.error_msg');
        errMsg.innerText = msg;
    }
};

const success = (field) => {
    const parent = field.parentElement;
    parent.classList.remove('error');

    if (field === firstname || field === lastname) {
        const errMsg = document.querySelector('.nameField .error_msg');
        errMsg.innerText = '';
    } else {
        const errMsg = parent.querySelector('.error_msg');
        errMsg.innerText = '';
    }
};

// taken from stackoverflow
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

const sendRequest = async (userobject) => {
    const res = await fetch(`${window.location.origin}/api/signup/`, {
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
                showError(form[ek], response.errors[ek].msg);
            });
        }
    }

    if (res.status === 200 && !response.errors) {
        document.querySelector('.successMsg').classList.add('show');
        setTimeout(() => {
            window.location.href = `${window.location.origin}/`;
        }, 1500);
    }
};