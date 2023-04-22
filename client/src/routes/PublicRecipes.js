import { Container, Row, Col, Button, CardGroup, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import RecipeApi from "../helpers/api";

export default function PublicRecipes() {
    const [recipes, setRecipes] = useState([]);

    async function getPublicRecipes() {
        try {
            const results = await RecipeApi.getPublicRecipes();
            setRecipes(results);
            return { success: true };
        } catch (err) {
            console.error("Search failed", err);
            return { success: false, err };
        }
    }

    useEffect(() => { getPublicRecipes() }, []);

    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>Public Recipes</h1>
                    <CardGroup>
                        {recipes && recipes.map(recipe => (
                            <Card key={recipe.id}>
                                <Card.Body>
                                    <Card.Title>{recipe.name}</Card.Title>
                                    <Card.Text>{recipe.description}</Card.Text>
                                </Card.Body>
                                <LinkContainer to={`/recipes/${recipe.id}`}>
                                    <Button variant="primary">View Recipe</Button>
                                </LinkContainer>
                            </Card>
                        ))}
                    </CardGroup>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
        </Container>
    )
}