import { Container, Row, Col } from "react-bootstrap";

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