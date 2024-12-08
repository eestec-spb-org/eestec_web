window.onload = () => {
  var token = localStorage.getItem("token");
  if (token == null) { return; }
  fetch("http://localhost:5049/api/me", {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token,
    }
  }).then((resp) => { return resp.json(); })
    .then((resp) => {
      if (resp.username === undefined) {
        localStorage.clear();
        return;
      }
      let element = document.getElementById("profile-header");
      element.style.flex = 2;
      element.style.visibility = "visible";
      document.getElementById("user-name").innerText = "" + resp.username;
      document.getElementById("to-login-block").style.visibility = "hidden";
    });
}

function logout() {
    localStorage.clear();
    window.location.reload();
}
