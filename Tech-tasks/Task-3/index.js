const form = document.getElementById("myForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const countrySelect = document.getElementById("country");
const genderInputs = document.getElementsByName("gender");

form.addEventListener("submit", function(event) {
    let isValid = true;

    if (nameInput.value.trim() === "") {
        showError(nameInput, "Please enter your name");
        isValid = false;
    } else {
        hideError(nameInput);
    }

    if (emailInput.value.trim() === "") {
        showError(emailInput, "Please enter your email");
        isValid = false;
    } else {
        hideError(emailInput);
    }

    if (!isValidPhone(phoneInput.value.trim())) {
        showError(phoneInput, "Please enter a valid 10-digit phone number");
        isValid = false;
    } else {
        hideError(phoneInput);
    }

    if (passwordInput.value.trim() === "") {
        showError(passwordInput, "Please enter a password");
        isValid = false;
    } else {
        hideError(passwordInput);
    }

    if (confirmPasswordInput.value.trim() === "" || confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, "Passwords do not match");
        isValid = false;
    } else {
        hideError(confirmPasswordInput);
    }

    if (countrySelect.value === "") {
        showError(countrySelect, "Please select a country");
        isValid = false;
    } else {
        hideError(countrySelect);
    }

    let isGenderSelected = false;
    for (const genderInput of genderInputs) {
        if (genderInput.checked) {
            isGenderSelected = true;
            break;
        }
    }

    if (!isGenderSelected) {
        showError(genderInputs[0], "Please select a gender");
        isValid = false;
    } else {
        hideError(genderInputs[0]);
    }

    if (!isValid) {
        event.preventDefault();
    }
});

function showError(inputElement, errorMessage) {
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error");
    errorSpan.textContent = errorMessage;
    inputElement.classList.add("input-error");
    inputElement.parentNode.appendChild(errorSpan);
}

function hideError(inputElement) {
    const errorSpan = inputElement.parentNode.querySelector(".error");
    if (errorSpan) {
        inputElement.parentNode.removeChild(errorSpan);
    }
    inputElement.classList.remove("input-error");
}

function isValidPhone(phone) {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
}
