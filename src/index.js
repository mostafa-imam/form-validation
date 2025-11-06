import "./style.css";

const form = document.querySelector("form");
const submit = document.querySelector("button");

const email = document.querySelector("#email");
const countrySelect = document.querySelector("#country");
const postal = document.querySelector("#postal-code");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#password-confirm");
const high = document.querySelector("div.high");
const inputs = document.querySelectorAll("input");

email.addEventListener("change", () => {

    if (email.validity.typeMismatch) {
        email.reportValidity();
        addTouch(email);
    } else {
        removeTouch(email);
    }
});

countrySelect.addEventListener('change', checkPostalCode);

postal.addEventListener('input', () => {
    checkPostalCode();
    addTouch(postal);
}
);

password.addEventListener("change", () => {

    if (!password.validity.valid) {
        password.reportValidity();
    };

})

passwordConfirm.addEventListener("change", () => {

    if (password.value === passwordConfirm.value) {
        passwordConfirm.setCustomValidity("");
        return;
    } else {
        passwordConfirm.setCustomValidity("Please make sure that the passwords are matching")
        passwordConfirm.reportValidity();
    };

});


submit.addEventListener("click", () => {
    if (!form.checkValidity()) {

        high.textContent = 'Please make sure to fill all required fields';
        high.classList.add("highAgain");
        inputs.forEach(item => item.classList.add("touched"));

    } else {

        high.classList.remove("highAgain");
        high.textContent = 'good job, buddy! 🙌';

    };
});


function checkPostalCode() {

    const constraints = {
        eg: [
            /^\d{7}$/,
            "Egyptian postal codes must have exactly 7 digits: e.g. 1234567"
        ],
        us: [
            /^\d{5}(-\d{4})?$/,
            "US ZIP codes must be 5 digits or ZIP+4 format (e.g. 12345 or 12345-6789)"
        ],
        ru: [
            /^\d{6}$/,
            "Russian postal codes must have exactly 6 digits: e.g. 123456"
        ],
        ch: [
            /^\d{4}$/,
            "Swiss postal codes must have exactly 4 digits: e.g. 8000"
        ],
        fr: [
            /^\d{5}$/,
            "French postal codes must have exactly 5 digits: e.g. 75001"
        ]
    };

    const country = countrySelect.value;

    const constraint = new RegExp(constraints[country][0], "");

    if (constraint.test(postal.value)) {
        postal.setCustomValidity("");
    } else {
        postal.setCustomValidity(constraints[country][1])
        postal.reportValidity();
    }
};

function addTouch(elem) {
    elem.classList.add("touched");
}

function removeTouch(elem) {
    elem.classList.remove("touched");
}