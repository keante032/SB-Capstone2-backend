import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home() {
    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>Welcome to the Recipe App!</h1>
                    <h2>Let's get cooking.</h2>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
        </Container>
    )
}