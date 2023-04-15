import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

export default function RecipeEdit() {
    const { currentUser } = useContext(UserContext);
    const { id } = useParams();

    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>Edit Recipe</h1>
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="ingredients">
                            <Form.Label>Ingredients</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="directions">
                            <Form.Label>Directions</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
        </Container>
    )
}