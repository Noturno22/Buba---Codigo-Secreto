
import React, { useState, useEffect } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import Evento from "./components/PlayerInfo";

export default function Home()  {

   // Estados para armazenar cada dígito
  const [digits, setDigits] = useState<(string | null)[]>([null, null, null]);

 // Estado para controlar se a div "sup" deve piscar
  
 const [isBlinking, setIsBlinking] = useState<boolean>(false);
 
   // Estado interno para alternar visibilidade da div durante o piscar
   const [isVisible, setIsVisible] = useState<boolean>(true);

  // Resultado da verificação
  const [isValid, setIsValid] = useState<null | boolean>(null); 
    

    // Chave correta (ajuste conforme necessário)
  const correctKey: string = "101";

  // Função para lidar com cliques dos botões
  const handleButtonClick = (value: "1" | "0"): void => {
    const firstEmptyIndex = digits.findIndex((digit) => digit === null);
    if (firstEmptyIndex !== -1) {
      
        // Insere o valor na posição vazia
        const newDigits = [...digits];
        newDigits[firstEmptyIndex] = value;
        
          setDigits(newDigits);
          // Ativa o efeito de piscar
      setIsBlinking(true);
        // Se a chave estiver completa, verifica a validade
        if (firstEmptyIndex === 2) {
          
          const enteredKey = newDigits.join("");
          setIsValid(enteredKey === correctKey);
        }
      }
    };

  // Efeito para resetar automaticamente após 2 segundo da verificação
      useEffect(() => {
        if (isValid !== null) {
          const timeout = setTimeout(() => {
            setDigits([null, null, null]);
            setIsValid(null);
          }, 2000);

          return () => clearTimeout(timeout); // Limpa o timeout ao desmontar ou reiniciar o efeito
        }
      }, [isValid]);
      
      // Efeito para gerenciar o piscar
    useEffect(() => {
      if (isBlinking) {
        const element = document.querySelector<HTMLElement>(".sup");

        if (!element) return;

        const blinkInterval = setInterval(() => {
          const currentColor = getComputedStyle(element).backgroundColor;
          element.style.backgroundColor =
            currentColor === "rgb(30, 144, 255)" ? "transparent" : "#1E90FF"; // Azul oceano
        }, 100);

        // Para o piscar após 1 segundo
        const stopBlinkingTimeout = setTimeout(() => {
          setIsBlinking(false);
          if (element) {
            element.style.backgroundColor = "#5d5d5d"; // Azul final
          }
        }, 1000);

        return () => {
          clearInterval(blinkInterval);
          clearTimeout(stopBlinkingTimeout);
        };
      }
    }, [isBlinking]);
    
    return (
      <main>
        <section className="bubaMain">
          <div className="buba">
              <div className="antena">
                  <div className="sup" style={{backgroundColor: "#5d5d5d",}}></div>
              </div>
              <div className="b1"></div>
              <div className="visor">
              <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          {digits.map((digit, index) => (
            <div className="digitando"
              key={index}
              style={{
                padding:"15px",
                width: "100px",
                height: "80px",
                margin: "25px 5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "80px",
                fontWeight: "bold",
                border: "2px solid #ccc",
                borderRadius: "5px",
                backgroundColor:
                  isValid === null
                    ? "white"
                    : isValid
                    ? "lightgreen"
                    : "lightcoral",
                color: digit === null ? "gray" : "#ccc",
              }}
            >
              {digit || "*"}
            </div>
          ))}
        </div>
                  <div> CODIGO SECRETO </div>
              </div>
              <div className="teclado">
                  <button onClick={() => handleButtonClick("0")}><div className="n">0</div></button>
                  <button onClick={() => handleButtonClick("1")}><div className="n">1</div></button>
              </div>
        
            <button className="bo1"></button>
            <div className="logo">BUBA</div>
            <button className="bo1"></button>
          </div>
        </section>
          
        <section className="informacoes">
          <article className="info"></article>
        </section>    
      </main>
    );
};