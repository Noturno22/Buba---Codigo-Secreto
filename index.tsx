import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useGame } from "./context/GameContext";

// Tipos para os dados
interface Player {
  id: number;
  coins: number;
}

interface HistoryEntry {
  playerId: number;
  attempt: string;
  success: boolean;
}

// Função para salvar e carregar dados da "database"
const saveToDatabase = async (key: string, value: any): Promise<void> => {
  await fetch('/api/database', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
  });
};

const loadFromDatabase = async (key: string): Promise<any> => {
  const res = await fetch(`/api/game?key=${key}`);
  if (res.ok) {
      const data = await res.json();
      return data.value;
  }
  return null;
};

// Página para inserir o código inicial
export function InsertCode({ setPassword, startGame }: { setPassword: (password: string) => void; startGame: () => void }) {
    const [inputPassword, setInputPassword] = useState<string>('');

      const { setSecret } = useGame(); // Hook do contexto para definir a senha
      const [digits, setDigits] = useState<(string | null)[]>([null, null, null]); // Armazena os 3 dígitos
      const [isBlinking, setIsBlinking] = useState(false); // Controle de piscar
      const router = useRouter();
  
    const handlePasswordSubmission = async () => {
      await saveToDatabase('password', inputPassword);
      setPassword(inputPassword);
      startGame();
    }

  // Função para lidar com cliques nos botões
    const handleButtonClick = (value: "1" | "0"): void => {
    const firstEmptyIndex = digits.findIndex((digit) => digit === null);
    if (firstEmptyIndex !== -1) {
      // Insere o valor na posição vazia
      const newDigits = [...digits];
      newDigits[firstEmptyIndex] = value;
      setDigits(newDigits);

      // Ativa o efeito de piscar
      setIsBlinking(true);

      // Desativa o piscar após um tempo curto
      setTimeout(() => setIsBlinking(false), 500);
    }
    };

  // Função para resetar os dígitos
  const resetDigits = () => {
    setDigits([null, null, null]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px", position:"relative" }}>
      <div
         className="digit-container"
         style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
          >

      </div>
       <div className="cofre">
            <div style={{ display: "flex", justifyContent: "center", margin: "20px"}}>
          <h1></h1>
          <div className="portaCofre">
            <div className="dobra">
              <div className="sp"></div>
              <div className="sp"></div>
            </div>
            <div className="dobra d1">
              <div className="sp"></div>
              <div className="sp"></div>
            </div>
            <div className="portaIn">
            <div className="teclaCofre">
              <div className="tranca">
              
                <div className="in"></div>
              </div>
              <div className="tecla">
              <div className="visorCofre">
              {digits.map((digit, index) => (
                  <div
                    key={index}
                    className="digit-box"
                    style={{
                      width: "50px",
                      height: "50px",
                      lineHeight: "50px",
                      fontSize: "50px",
                      borderRadius: "5px",
                      textAlign: "center",
                      color: "center",
                      transition: "background-color 0.3s",
                    }}
                  >
                    {digit ?? "-"}
                  </div>
                ))}
              </div>
              <button
                  onClick={() => handleButtonClick("1")}
                  className="btnC"
                >
                  1
              </button>
              <button onClick={() => handleButtonClick("0")} className="btnC">
                  0
              </button>
            
              <button
                onClick={handlePasswordSubmission}
                style={{
                  padding: "8px",
                  fontSize: "18px",
                  color: "black",
                  border: "none",
                  borderRadius: "5px",
                  marginTop: "20px",
                  fontWeight: "bold",
                }}
              >
                 CONFIRMAR
              </button>
              <button
                onClick={resetDigits}
                style={{
                  padding: "5px",
                  fontSize: "18px",
                  backgroundColor: "gray",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  margin: "0 20px",
                }}
              >
                APAGAR
              </button>
              </div>

            </div>
            </div>
            
          </div>
        </div>
         <footer className="pes">
            <div className="perna1"></div>
            <div className="perna2"></div>
         </footer>
      </div>
    </div>
  );
};

export default InsertCode;