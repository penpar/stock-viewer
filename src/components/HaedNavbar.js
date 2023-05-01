import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function HaedNavbar() {
  return (
    <Container>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">주식종목 검색</Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
}

export default HaedNavbar;