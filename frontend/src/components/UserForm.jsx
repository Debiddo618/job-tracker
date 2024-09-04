import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { signup, getUser, signin} from '../services/authService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserForm = (props) => {
    const initialState = {
        username: '',
        password: '',
        passwordConf: '',
    };
    const [formData, setFormData] = useState(initialState);
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
        if (props.mode === 'signup') {
            return !(username && password && password === passwordConf);
        }
        return !(username && password);
    };
    const welcomeToast = (username) => toast(`Welcome ${username}`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let userResponse;
            if (props.mode === 'signup') {
                userResponse = await signup({ username, password });
            } else {
                userResponse = await signin({ username, password });
            }

            if (userResponse.error) {
                updateMessage(userResponse.error);
            } else {
                setFormData(initialState);
                props.setUser(getUser());
                if(props.mode === 'signup'){
                    welcomeToast(userResponse.user.username);
                }else{
                    welcomeToast(userResponse.username);
                }
                props.handleClose();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => {
                    setFormData(initialState);
                    setMessage('');
                    props.handleClose();
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.mode === 'signup' ? 'Sign Up' : 'Sign In'}</Modal.Title>
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
                        {props.mode === 'signup' && (
                            <Form.Group className="mb-3" controlId="passwordConf">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    value={formData.passwordConf}
                                    name="passwordConf"
                                    required
                                />
                            </Form.Group>
                        )}
                        <Button variant="primary" disabled={isFormInvalid()} className="w-100" type="submit">
                            {props.mode === 'signup' ? 'Sign Up' : 'Sign In'}
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <p>{message}</p>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default UserForm;