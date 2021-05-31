const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
let validInput, validEmail, validLenght, validString;
let passwordMatch = false;
//show input error message

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//show success

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//isValid email

function chechEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    validEmail = true;
  } else {
    showError(input, "Email Is not Valid");
    validEmail = false;
  }
}

//checkRequired

function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFiled(input)} is required`);
      validInput = false;
      validString = false;
    } else {
      showSuccess(input);
      validInput = true;
    }
  });
}

//uppercase Input Field

function getFiled(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check Lenght of input

function checkLenght(input, min, max) {
  if (input.value.length < min) {
    validLenght = false;
    showError(input, `${getFiled(input)} must be at least ${min}`);
  } else if (input.value.length > max) {
    validLenght = false;
    showError(input, `${getFiled(input)} must be less  than ${max}`);
  } else {
    validLenght = true;
    showSuccess(input);
  }
}

//verfied the password

function verfiedPassword(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input1, "Password does not match");
    showError(input2, "Password does not match");
    passwordMatch = false;
  }
  if (
    (input1.value !== "") & (input2.value !== "") &&
    input1.value === input2.value
  ) {
    passwordMatch = true;
  }
}
//validate the username to be string Only

function ValidateNumber(strNumber) {
  var regExp = new RegExp("^\\d+$");
  var isValid = regExp.test(strNumber);
  return isValid;
}

function validUserNameString(input) {
  if (ValidateNumber(input.value) == true) {
    showError(input, "The UserName Must be Words");
    validString = false;
  }

  if (input.value !== "" && ValidateNumber(input.value) == false) {
    validString = true;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  chechEmail(email);
  checkLenght(username, 5, 10);
  verfiedPassword(password, password2);
  validUserNameString(username);
  console.log(validLenght, validInput, validEmail, passwordMatch, validString);
  if (validLenght && validLenght && validEmail && passwordMatch === true) {
    document.querySelector(".success-alert").classList.add("show");
    setTimeout(function () {
      form.submit();
    }, 1000);
  }
});
