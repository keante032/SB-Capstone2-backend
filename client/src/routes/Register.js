import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Register({ register }) {
    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>Register</h1>
                    <Form onSubmit={register}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                            <Form.Text className="text-muted">
                                We don't want to know your email. Just pick a username.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            <Form.Text className="text-muted">
                                Make sure you keep your password safe. We don't know your email, so we can't help you reset it.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
        </Container>
    )
}