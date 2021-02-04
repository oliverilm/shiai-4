import './App.scss';

import React from 'react';

// import { FacebookAuthButton } from './components/FacebookAuthButton';
import { GoogleAuthButton } from './components/GoogleAuthButton';

function App() {
  return (
    <div className="App">
      <GoogleAuthButton />
      {/* <FacebookAuthButton /> */}
    </div>
  );
}

export default App;
