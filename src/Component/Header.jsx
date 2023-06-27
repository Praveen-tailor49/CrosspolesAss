import Container from 'react-bootstrap/Container';
import { Navbar, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Show_Modal } from '../Redux/actionType';

function Header() {
    const dispatch = useDispatch()

    const openModal = () => {
        dispatch({ type: Show_Modal, payload: true })
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Crosspoles</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Button variant="dark" onClick={openModal}>Add</Button>
            </Container>
        </Navbar>
    );
}

export default Header;