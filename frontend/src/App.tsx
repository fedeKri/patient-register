import React from 'react';
import { Toaster } from 'react-hot-toast';
import { PatientsView } from './views/PatientsView';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <PatientsView />
    </div>
  );
}

export default App;