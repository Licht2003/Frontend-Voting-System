const agents = [
    { name: "Jett", image: "https://static.valorant-api.com/agents/jett.png" },
    { name: "Phoenix", image: "https://static.valorant-api.com/agents/phoenix.png" },
    { name: "Sage", image: "https://static.valorant-api.com/agents/sage.png" },
    { name: "Reyna", image: "https://static.valorant-api.com/agents/reyna.png" },
    { name: "Killjoy", image: "https://static.valorant-api.com/agents/killjoy.png" },
    { name: "Raze", image: "https://static.valorant-api.com/agents/raze.png" },
    { name: "Cypher", image: "https://static.valorant-api.com/agents/cypher.png" },
    { name: "Sova", image: "https://static.valorant-api.com/agents/sova.png" },
    { name: "Brimstone", image: "https://static.valorant-api.com/agents/brimstone.png" },
    { name: "Omen", image: "https://static.valorant-api.com/agents/omen.png" },
    { name: "Viper", image: "https://static.valorant-api.com/agents/viper.png" },
    { name: "Skye", image: "https://static.valorant-api.com/agents/skye.png" },
    { name: "Chamber", image: "https://static.valorant-api.com/agents/chamber.png" },
  ];
  
  const agentList = document.getElementById('agent-list');
  const voteStatus = document.getElementById('vote-status');
  
  function renderAgents() {
    agents.forEach(agent => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${agent.image}" alt="${agent.name}">
        <h3>${agent.name}</h3>
      `;
      card.onclick = () => voteForAgent(agent.name);
      agentList.appendChild(card);
    });
  }
  
  function voteForAgent(agentName) {
    if (localStorage.getItem('voted')) {
      voteStatus.textContent = "You've already voted!";
      return;
    }
  
    console.log(`Voted for: ${agentName}`);
    voteStatus.textContent = `You voted for ${agentName}!`;
    localStorage.setItem('voted', 'true');
  }
  
  renderAgents();
  