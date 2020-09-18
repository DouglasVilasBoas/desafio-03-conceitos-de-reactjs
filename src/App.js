import React, { useState, useEffect } from "react";
import api from './services/api';


import "./styles.css";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setList(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `New repository ${Date.now()}`,
      url: "Novo url",
      techs: ["React", "Node.js"],
    })
    setList([...list,response.data])
  }

  async function handleRemoveRepository(id) {
      await api.delete(`/repositories/${id}`)
      const newList = list.filter((repository) => repository.id != id)
      setList(newList)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {list.map(repository => (
         <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
         </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
