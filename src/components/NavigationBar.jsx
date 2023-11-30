import { useState } from 'react'
import { Navbar, Button, Container, Modal, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function NavigationBar() {

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    console.log("loggedin");
    navigate("/dashboard");
  }
 
  return (
    <>
    <Navbar>
        <Container>
            <Navbar.Brand href="/" style={{fontSize: "35px", fontWeight: 'bold', color: 'black'}} >
                PasteMaster
            </Navbar.Brand>
            <Button style={{background: 'none', borderColor: 'black', color: 'black'}} onClick={handleLoginButtonClick}  >
                Login
            </Button>
        </Container>
    </Navbar>
    <Modal show={showModal} onHide={handleCloseModal} >
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <Button variant='primary' type='submit' onClick={handleLogin} className='mt-4' >Login</Button>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default NavigationBar