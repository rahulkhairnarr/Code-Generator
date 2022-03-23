import logo from './logo.svg';
import './App.css';
import Container from '@mui/material/Container';
import Main from './components/main';


function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Main />
      </Container>
    </div>
  );
}

export default App;
