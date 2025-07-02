document.addEventListener("DOMContentLoaded", function () {
  const votes = new Array(13).fill(0);
  let users = [];
  let currentUser = null;
  let isLogin = true;

  const candidatesGrid = document.getElementById("candidatesGrid");
  const authBox = document.getElementById("authBox");
  const mainApp = document.getElementById("mainApp");
  const userDisplay = document.getElementById("userDisplay");
  const authTitle = document.getElementById("authTitle");
  const toggleText = document.getElementById("toggleText");

  function renderCandidates() {
    candidatesGrid.innerHTML = "";
    for (let i = 1; i <= 13; i++) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>Candidate ${i}</h3>
        <p>Votes: <span id="vote-${i}">${votes[i - 1]}</span></p>
        <button onclick="vote(${i - 1})">Vote</button>
      `;
      candidatesGrid.appendChild(card);
    }
  }

  window.vote = function (index) {
    votes[index]++;
    document.getElementById(`vote-${index + 1}`).textContent = votes[index];
  };

  window.handleAuth = function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!username || !password) return alert("Fill out both fields");

    if (isLogin) {
      const user = users.find((u) => u.username === username && u.password === password);
      if (user) {
        loginUser(user);
      } else {
        alert("Invalid credentials");
      }
    } else {
      const exists = users.some((u) => u.username === username);
      if (exists) {
        alert("Username already taken");
      } else {
        const newUser = { username, password };
        users.push(newUser);
        loginUser(newUser);
      }
    }
  };

  function loginUser(user) {
    currentUser = user;
    authBox.style.display = "none";
    mainApp.style.display = "block";
    userDisplay.textContent = currentUser.username;
    renderCandidates();
  }

  window.toggleForm = function () {
    isLogin = !isLogin;
    authTitle.textContent = isLogin ? "Login" : "Register";
    toggleText.textContent = isLogin ? "Don't have an account?" : "Already have an account?";
    document.querySelector("#authBox button").textContent = isLogin ? "Login" : "Register";
  };

  window.logout = function () {
    currentUser = null;
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    authBox.style.display = "block";
    mainApp.style.display = "none";
  };
});
