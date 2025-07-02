import React, { useState } from "react";
import "./App.css";

const candidatesData = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  name: `Candidate ${i + 1}`,
}));

const App = () => {
  const [votes, setVotes] = useState(Array(candidatesData.length).fill(0));
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [usersDB, setUsersDB] = useState([]);

  const handleVote = (index) => {
    const newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuth = () => {
    if (isLogin) {
      const foundUser = usersDB.find(
        (u) => u.username === form.username && u.password === form.password
      );
      if (foundUser) {
        setUser(foundUser);
      } else {
        alert("Invalid credentials");
      }
    } else {
      const exists = usersDB.some((u) => u.username === form.username);
      if (exists) {
        alert("Username already exists");
      } else {
        const newUser = { ...form };
        setUsersDB([...usersDB, newUser]);
        setUser(newUser);
      }
    }
  };

  if (!user) {
    return (
      <div className="auth-container">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button onClick={handleAuth}>{isLogin ? "Login" : "Register"}</button>
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1 className="title">Welcome, {user.username}!</h1>
      <button className="logout-btn" onClick={() => setUser(null)}>
        Logout
      </button>
      <h2>Pageant Voting System</h2>
      <div className="candidates-grid">
        {candidatesData.map((candidate, index) => (
          <div className="candidate-card" key={candidate.id}>
            <h3>{candidate.name}</h3>
            <p>Votes: {votes[index]}</p>
            <button onClick={() => handleVote(index)}>Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
