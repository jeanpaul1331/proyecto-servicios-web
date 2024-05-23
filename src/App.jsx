
import React, { useState, useEffect, useContext, createContext } from 'react';

<div style={{ backgroundImage: " url public\imagenesurl(/image.png)" }}>
  cronometro
</div>

// Creación del Contexto
const StopwatchContext = createContext();

function StopwatchProvider({ children }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <StopwatchContext.Provider value={{ time, start, stop, reset }}>
      {children}
    </StopwatchContext.Provider>
  );
}

function Stopwatch() {
  const { time } = useContext(StopwatchContext);

  return (
    <div>
      <h1>Cronómetro</h1>
      <h2>{new Date(time * 1000).toISOString().substr(11, 8)}</h2>
    </div>
  );
}

function Controls() {
  const { start, stop, reset } = useContext(StopwatchContext);

  return (
    <div>
      <button onClick={start}>Iniciar</button>
      <button onClick={stop}>Detener</button>
      <button onClick={reset}>Reiniciar</button>
    </div>
  );
}

function App() {
  return (
    <StopwatchProvider>
      <div>
        <Stopwatch />
        <Controls />
      </div>
    </StopwatchProvider>
  );
}

export default App;
