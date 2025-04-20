let forms = [];
let formControl = $(".form-control");

let nameInput = $("#name");
let emailInput = $("#email");
let messageInput = $("#contactMessage");



$("#contactBtn").click(function (e) {

    e.preventDefault();
    if (validateForm()) {

        submitForm();
        reset();

    } else {
        alert("Please fill in all fields correctly!");
    }

})


function submitForm() {
    var form = {
        name: sanitizeInput(nameInput.val()),
        email: sanitizeInput(emailInput.val()),
        contactMessage: sanitizeInput(messageInput.val()),
    };

    forms.push(form);
    localStorage.setItem("form_list", JSON.stringify(forms));
}


if (JSON.parse(localStorage.getItem("form_list") != null)) {
    forms = JSON.parse(localStorage.getItem("form_list"));
}




nameInput.onkeyup = function () {
    validateField(nameInput, /^[A-Za-z]+([_-][A-Za-z]+)*$/);
};

emailInput.onkeyup = function () {
    validateField(emailInput, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

messageInput.onkeyup = function () {
    validateField(messageInput, /^.{10,500}$/);
}

function validateForm() {
    let isValid = true;

    if (!validateField(nameInput, /^[A-Za-z]+([_-][A-Za-z]+)*$/)) isValid = false;
    if (!validateField(emailInput, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) isValid = false;
    if (!validateField(messageInput, /^.{10,500}$/)) isValid = false;

    if (nameInput.val().trim() === "" || emailInput.val().trim() === "" || messageInput.val().trim() === "") {
        isValid = false;
    }



    return isValid;
}

function validateField(inputElement, regex) {
    if (!regex.test(inputElement.val())) {
        inputElement.addClass("is-invalid");
        inputElement.removeClass("is-valid");
        return false;
    } else {
        inputElement.removeClass("is-invalid");
        inputElement.addClass("is-valid");
        return true;
    }

}



function reset() {
    $("#contactForm")[0].reset();
    $(".form-control").removeClass("is-valid is-invalid");
}

function sanitizeInput(input) {
    input = String(input);
    return input.replace(/['";\-]/g, "");
}