import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GameProvider } from "./context/GameContext"; // Importe o GameProvider

export default function App({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  return (
    <GameProvider>  {/* Envolva a aplicação com o GameProvider */}
      <Component {...pageProps} />
    </GameProvider>
  );
};
