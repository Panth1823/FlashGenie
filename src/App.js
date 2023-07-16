import Navbar from './components/Navbar';
import Form from './components/Form';

import './App.css';
import FlippableCard from './components/flippable-card';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <Navbar/>
        <Form/>
        <FlippableCard/>
      </header>
    </div>
  );
}

export default App;
