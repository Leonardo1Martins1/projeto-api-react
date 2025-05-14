import React, { useState, useEffect } from 'react';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = () => {
    fetch('http://localhost:3000/alunos')
      .then(res => res.json())
      .then(data => setAlunos(data));
  };

  const adicionarOuAtualizarAluno = () => {
    const metodo = editandoId ? 'PUT' : 'POST';
    const url = editandoId
      ? `http://localhost:3000/alunos/${editandoId}`
      : 'http://localhost:3000/alunos';

    fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome }),
    })
      .then(res => res.json())
      .then(() => {
        fetchAlunos();
        setNome('');
        setEditandoId(null);
      });
  };

  const editarAluno = (aluno) => {
    setNome(aluno.nome);
    setEditandoId(aluno.id);
  };

  const excluirAluno = (id) => {
    fetch(`http://localhost:3000/alunos/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => fetchAlunos());
  };

  return (
    <div>
      <h1>Lista de Alunos</h1>
      <input
        value={nome}
        onChange={e => setNome(e.target.value)}
        placeholder="Digite o nome"
      />
      <button onClick={adicionarOuAtualizarAluno}>
        {editandoId ? 'Atualizar' : 'Adicionar'}
      </button>
      <ul>
        {alunos.map(aluno => (
          <li key={aluno.id}>
            {aluno.nome}
            <button onClick={() => editarAluno(aluno)}>✏️</button>
            <button onClick={() => excluirAluno(aluno.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
