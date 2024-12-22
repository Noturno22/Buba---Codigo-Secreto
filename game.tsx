import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Game: React.FC = () => {
  const [gameData, setGameData] = useState<any>(null);
  const [attempt, setAttempt] = useState('');
  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    // Carrega os dados do jogo
    fetch('/api/game')
      .then((res) => res.json())
      .then((data) => setGameData(data));
  }, []);

  const handleAttempt = () => {
    fetch('/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'makeAttempt',
        payload: { playerId: 2, attempt }, // Substitua 2 pelo ID do jogador atual
      }),
    })
      .then((res) => res.json())
      .then((data) => setGameData(data));
  };

  if (!gameData) return <p>Carregando...</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Bem-vindo ao jogo, {name}</h1>
      <p>Rodada atual: {gameData.currentRound}</p>
      <p>Jogador atual: {gameData.players[gameData.currentPlayerIndex].name}</p>

      <input
        type="text"
        value={attempt}
        onChange={(e) => setAttempt(e.target.value)}
        placeholder="Digite sua tentativa"
      />
      <button onClick={handleAttempt}>Enviar</button>
    </div>
  );
};

export default Game;
