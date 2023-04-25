import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ login }) {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            navigate("/user/dashboard");
        } else {
            setFormErrors(result.err);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>Login</h1>
                    <br />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter password" onChange={handleChange} />
                        </Form.Group>
                        {formErrors.length
                            ? <Alert key="danger" variant="danger" >
                                {formErrors.map(error => (
                                    <p key={error}>
                                        {error}
                                    </p>
                                ))}
                            </Alert>
                            : null
                        }
                        <br />
                        <Button variant="primary" type="submit" onSubmit={handleSubmit}>
                            Login
                        </Button>
                    </Form>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
        </Container>
    )
}