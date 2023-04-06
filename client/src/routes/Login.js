import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Login({ login }) {
    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>Login</h1>
                    <Form onSubmit={login}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
        </Container>
    )
}