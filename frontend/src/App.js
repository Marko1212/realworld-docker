import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const makeApiRequest = () => {
    console.log('makeApiRequest');
    axios('/api/testwithcurrentuser').then(response => {
      console.log('response', response);
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={makeApiRequest}>Make api request</button>
    </div>
  );
}

export default App;
