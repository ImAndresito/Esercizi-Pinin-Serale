"use strict";

const SUBMIT_BTN = document.querySelector("button");

const PASSWORD = document.getElementById("password");
const CONFIRM_PASSWORD = document.getElementById("password_check");
const CHECK_PASSWORD_CIRCLE = document.querySelectorAll(".check");
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
// Controllo ogni possibilità singolarmente
const PSW_CHECKS = [
  /(?=.*[a-z])/, // Almeno una lettera minuscola.
  /(?=.*[A-Z])/, // Almeno una lettera maiuscola.
  /(?=.*\d)/, // Almeno un numero.
  /(?=.*[\W_])/, // Almeno un carattere speciale.
  /.{8,}/, // Almeno 8 caratteri.
];
const PASSWORD_ERROR_MESSAGE = document.getElementById("psw_error_message");
let password_error_ul = document.getElementById("psw_errors");

const EMAIL = document.getElementById("email");
const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const EMAIL_ERROR_MESSAGE = document.getElementById("email_error_message");

// Controllo se i dati del form sono corretti.
SUBMIT_BTN.addEventListener("click", () => {
  emailCheck();
  passwordCheck();
  changeCircleColor();

  if (emailCheck() && passwordCheck()) {
    alert("Registrazione avvenuta con successo");
  }
});

function getInputValue(input) {
  return input.value;
}

function emailCheck() {
  EMAIL_ERROR_MESSAGE.innerHTML = "";

  if (!EMAIL_REGEX.test(getInputValue(EMAIL))) {
    EMAIL_ERROR_MESSAGE.innerHTML = "Inserisci una email valida.";
    return false;
  } else {
    return true;
  }
}

function passwordCheck() {
  const PSW_VALUE = getInputValue(PASSWORD);

  PASSWORD_ERROR_MESSAGE.innerHTML = "";

  password_error_ul.innerHTML = "";

  if (PASSWORD_REGEX.test(PSW_VALUE)) {
    return true;
  } else {
    PASSWORD_ERROR_MESSAGE.textContent = "La password deve contenere almeno:";

    if (!PSW_CHECKS[0].test(PSW_VALUE)) {
      const ERROR = document.createElement("li");
      ERROR.textContent = "Una lettera minuscola.";
      password_error_ul.appendChild(ERROR);
    }
    if (!PSW_CHECKS[1].test(PSW_VALUE)) {
      const ERROR = document.createElement("li");
      ERROR.textContent = "Una lettera maiuscola.";
      password_error_ul.appendChild(ERROR);
    }
    if (!PSW_CHECKS[2].test(PSW_VALUE)) {
      const ERROR = document.createElement("li");
      ERROR.textContent = "Un numero.";
      password_error_ul.appendChild(ERROR);
    }
    if (!PSW_CHECKS[3].test(PSW_VALUE)) {
      const ERROR = document.createElement("li");
      ERROR.textContent = "Un carattere speciale.";
      password_error_ul.appendChild(ERROR);
    }
    if (!PSW_CHECKS[4].test(PSW_VALUE)) {
      const ERROR = document.createElement("li");
      ERROR.textContent = "8 caratteri.";
      password_error_ul.appendChild(ERROR);
    }
    return false;
  }
}

function changeCircleColor() {
  const NO_MATCH_ERROR = document.getElementById("psw_not_match");
  CHECK_PASSWORD_CIRCLE.forEach((circle) => {
    circle.classList.remove("success", "danger");

    getInputValue(PASSWORD) === getInputValue(CONFIRM_PASSWORD) &&
    passwordCheck()
      ? (circle.classList.add("success"), (NO_MATCH_ERROR.innerHTML = ""))
      : (circle.classList.add("danger"),
        (NO_MATCH_ERROR.innerHTML = "Le password non combaciano"));
  });
}

function showPasswords() {
  const PASSWORDS = document.querySelectorAll(".password");
  console.log(PASSWORDS);

  PASSWORDS.forEach((password) => {
    password.type == "password"
      ? (password.type = "text")
      : (password.type = "password");
  });
}
