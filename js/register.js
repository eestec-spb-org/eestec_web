document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  const passwordInput = document.getElementById("password-input");
  const passwordErrorElement = document.getElementById("password-error");
  const usernameInput = document.getElementById("username-input");
  const passwordRepeatInput = document.getElementById("password-repeat-input");
  const emailInput = document.getElementById("email-input");
  const passwordToggler = document.getElementById("password-toggler");
  const createButton = document.getElementById("create-button");
  const initCreateButtonText = createButton.innerText;

  const formData = new URLSearchParams();

  passwordInput.addEventListener("input", function () {
    formData.set("password", passwordInput.value);
    createButton.innerText = initCreateButtonText;
  });

  passwordRepeatInput.addEventListener("input", function () {
    createButton.innerText = initCreateButtonText;
  });

  emailInput.addEventListener("input", function () {
    formData.set("email", emailInput.value);
  });

  usernameInput.addEventListener("input", function () {
    formData.set("username", usernameInput.value);
  });

  passwordToggler.addEventListener("click", function() {
    if (passwordInput.getAttribute("type") == "password") {
      passwordInput.setAttribute("type", "text");
      passwordRepeatInput.setAttribute("type", "text");
    } else {
      passwordInput.setAttribute("type", "password");
      passwordRepeatInput.setAttribute("type", "password");
    }
  });

  function showError(errorText) {
    passwordErrorElement.innerText = errorText;
    passwordErrorElement.style.visibility = "visible";
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission action
    passwordErrorElement.style.visibility = "hidden";
    
    if (passwordInput.value !== passwordRepeatInput.value) {
      createButton.innerText = "Password don't match";
      return false;
    }
    var password = passwordInput.value;
    if (password.length < 8 || password.length > 128) {
      showError("Password length must be at least 8");
      return;
    } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      showError("Password mush contain at least one digit, lower- and upper-case letter");
      return;
    } else if (password.split(' ').length > 1) {
      showError("Password mustn't have space");
      return;
    }
    createButton.innerText = "...";

    fetch("http://localhost:8000/register", {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).catch((error) => {
      console.log(error);
      createButton.innerText = "Error occured";
    }).then((response) => {
      return response.json();
    }).then((body) => {
      console.log(body);
      localStorage.setItem("user", body)
      createButton.innerText = initCreateButtonText;
    });
  });
});
