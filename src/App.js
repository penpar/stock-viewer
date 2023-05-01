import { useState } from 'react';
import SearchBar from './components/SearchBar';
import StockViewer from './components/StockViewer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import HaedNavbar from './components/HaedNavbar';
import { BrowserRouter as Router} from 'react-router-dom';

import { Container } from 'react-bootstrap';

function App() {

  const [code, setCode] = useState('');


  const handleSearchTermChange = (term) => {
    setCode(term);
  }

  return (
    <div style={{ padding: 20 }}> 
    <Router>
        <HaedNavbar />
        <Container fluid>
        <SearchBar onSearchTermChange={handleSearchTermChange}/>
        <StockViewer code={code} /> 
        </Container> 
    </Router>
  </div>
  );
}

export default App;
