import "./App.css";
import { useEffect } from "react";
import Calculator from "./Calculator";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100%;
  height: var(--app-height);
  background-color: #c2c2d6;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function App() {
  const setAppHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  useEffect(() => {
    window.addEventListener("resize", setAppHeight);
    setAppHeight();
    return () => window.removeEventListener("resize", setAppHeight);
  }, []);
  return (
    <main>
      <AppContainer>
        <Calculator />
      </AppContainer>
    </main>
  );
}

export default App;
