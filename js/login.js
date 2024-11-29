document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    const passwordInput = document.getElementById("password-input");
    const usernameInput = document.getElementById("username-input");
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

    usernameInput.addEventListener("input", function () {
      formData.set("username", usernameInput.value);
    });
  
    form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent the default form submission action
      createButton.innerText = "...";
      fetch("http://localhost:8000/login", {
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

