import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import RecipeApi from "../helpers/api";

export default function RecipeSearch() {
    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>Recipe Search</h1>
                    <Form onSubmit={RecipeApi.findRecipes}>
                        <Form.Group controlId="search">
                            <Form.Label>Search</Form.Label>
                            <Form.Control type="search" placeholder="Search for a recipe" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
        </Container>
    )
}