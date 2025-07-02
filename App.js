import React, { useState } from "react";

const candidatesData = [
  { id: 1, name: "Candidate 1" },
  { id: 2, name: "Candidate 2" },
  { id: 3, name: "Candidate 3" },
  { id: 4, name: "Candidate 4" },
  { id: 5, name: "Candidate 5" },
  { id: 6, name: "Candidate 6" },
  { id: 7, name: "Candidate 7" },
  { id: 8, name: "Candidate 8" },
  { id: 9, name: "Candidate 9" },
  { id: 10, name: "Candidate 10" },
  { id: 11, name: "Candidate 11" },
  { id: 12, name: "Candidate 12" },
  { id: 13, name: "Candidate 13" },
];

const styles = {
  container: { padding: "2rem", fontFamily: "sans-serif", textAlign: "center" },
  authBox: { maxWidth: 400, margin: "2rem auto", textAlign: "center" },
  input: { width: "100%", margin: "0.5rem 0", padding: "0.5rem", fontSize: "1rem" },
  button: { padding: "0.5rem 1rem", marginTop: "0.5rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  logoutBtn: { backgroundColor: "crimson", color: "white", border: "none", borderRadius: "5px", padding: "0.5rem 1rem", cursor: "pointer", float: "right" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "2rem" },
  card: { background: "#f5f5f5", padding: "1rem", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  link: { textDecoration: "underline", color: "blue", cursor: "pointer" },
};

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
      <div style={styles.authBox}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={handleAuth} style={styles.button}>
          {isLogin ? "Login" : "Register"}
        </button>
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            style={styles.link}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={() => setUser(null)} style={styles.logoutBtn}>
        Logout
      </button>
      <h2>Pageant Voting System</h2>
      <div style={styles.grid}>
        {candidatesData.map((candidate, index) => (
          <div key={candidate.id} style={styles.card}>
            <h3>{candidate.name}</h3>
            <p>Votes: {votes[index]}</p>
            <button onClick={() => handleVote(index)} style={styles.button}>
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
