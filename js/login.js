document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  const passwordInput = document.getElementById("password-input");
  const emailInput = document.getElementById("email-input");
  const passwordToggler = document.getElementById("password-toggler");
  const createButton = document.getElementById("create-button");
  const initCreateButtonText = createButton.innerText;
  console.log(localStorage.getItem("access-token"));

  const formData = new URLSearchParams();

  passwordInput.addEventListener("input", function () {
    formData.set("password", passwordInput.value);
  });

  emailInput.addEventListener("input", function () {
    formData.set("email", emailInput.value);
  });

  passwordToggler.addEventListener("click", function() {
    if (passwordInput.getAttribute("type") == "password") {
      passwordInput.setAttribute("type", "text");
    } else {
      passwordInput.setAttribute("type", "password");
    }
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
      localStorage.setItem("access-token", body)
      createButton.innerText = initCreateButtonText;
    });
  });
});
