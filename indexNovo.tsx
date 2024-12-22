// pages/index.tsx
import { useState, useEffect } from 'react';
import { set, ref } from 'firebase/database';
import { db } from '../servidor/firebaseConfig';
import { useRouter } from 'next/router';

const initialGameState = {
  players: Array.from({ length: 4 }, (_, i) => ({ id: i + 1, coins: 5, active: true })),
  mainPlayerId: 1,
  password: '',
  history: [],
};

export default function Home() {
  const [gameState, setGameState] = useState(initialGameState);
  const [gameStarted, setGameStarted] = useState(false);
  const router = useRouter();

  const startGame = (password: string) => {
    if (password.length !== 3 || !/^[0-9]{3}$/.test(password)) {
      alert("A senha deve ter exatamente 3 dígitos numéricos.");
      return;
    }

    set(ref(db, 'gameState'), {
      ...gameState,
      password,
    });

    setGameStarted(true);
  };

  const navigateToPlayerPage = (playerId: number) => {
    router.push(`./players/${playerId}`);
  };

  return (
    <div>
      {!gameStarted ? (
        <div>
          <h1>Definir Senha do Cofre</h1>
          <input
            type="password"
            placeholder="Digite a senha (3 dígitos)"
            onBlur={(e) => startGame(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <h1>Jogo do Cofre</h1>
          <h2>Jogador Principal: {gameState.mainPlayerId}</h2>
          <h3>Escolha um Jogador:</h3>
          {gameState.players.map((player) => (
            <div key={player.id}>
              <button onClick={() => navigateToPlayerPage(player.id)}>
                Jogador {player.id}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}