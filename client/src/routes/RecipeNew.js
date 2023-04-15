import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { UserContext } from "../App";

export default function RecipeNew() {
    const { currentUser } = useContext(UserContext);

    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>New Recipe</h1>
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="My Favorite Recipe" />
                        </Form.Group>
                        <Form.Group controlId="publiclyShared">
                            <Form.Check type="checkbox" label="Share publicly?" />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Yeah, this one is my favorite." />
                        </Form.Group>
                        <Form.Group controlId="ingredients">
                            <Form.Label>Ingredients</Form.Label>
                            <Form.Control type="textarea" placeholder="2 slices bread" />
                        </Form.Group>
                        <Form.Group controlId="directions">
                            <Form.Label>Directions</Form.Label>
                            <Form.Control type="textarea" placeholder="Enter directions" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
        </Container>
    )
}