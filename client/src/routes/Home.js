import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <div class="position-absolute top-50 start-50 translate-middle">
                        <h1 class="text-center">Welcome to the Recipe App!</h1>
                        <br />
                        <h3 class="text-center">Let's get cooking.</h3>
                    </div>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
        </Container>
    )
}