import React from 'react';
import { AppProvider } from './context/AppContext';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AppProvider>
  );
}

export default App;
