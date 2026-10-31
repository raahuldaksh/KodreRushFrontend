import React from 'react';
import { Toaster } from 'sonner';
import BoardPage from './pages/BoardPage';

function App() {
  return (
    <>
      <BoardPage />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}

export default App;
