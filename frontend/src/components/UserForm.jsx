import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { signup } from '../services/authService';


const UserForm = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConf: '',
    });
    const [message, setMessage] = useState(['']);
    const updateMessage = (msg) => {
        setMessage(msg);
    };

    const handleChange = (e) => {
        updateMessage('');
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { username, password, passwordConf } = formData;
    const isFormInvalid = () => {
        return !(username && password && password === passwordConf);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = await signup({"username":username,"password":password});
            if(newUser.error){
                updateMessage(newUser.error)
            }else{
                props.handleClose();
            }
        } catch (err) {
            console.log({err})
        }
    };

    return (
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter Username"
                        onChange={handleChange}
                        value={formData.username}
                        name="username" 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="Password" 
                        onChange={handleChange}
                        value={formData.password}
                        name="password" 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordConf">
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control
                        type="password" 
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        value={formData.passwordConf}
                        name="passwordConf" 
                    />
                </Form.Group>
                <Button variant="primary" disabled={isFormInvalid()} className='w-100' type="submit">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <p>{message}</p>
        </Modal.Footer>
      </Modal>
    );
}
 
export default UserForm;