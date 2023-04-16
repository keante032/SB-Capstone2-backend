import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { RecipesContext } from "../App";
import RecipeApi from "../helpers/api";

export default async function PublicRecipes() {
    const { recipes, setRecipes } = useContext(RecipesContext);

    const results = await RecipeApi.getPublicRecipes();
    setRecipes(results.recipes);

    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>Public Recipes</h1>
                    <CardGroup>
                        {recipes.map(recipe => (
                            <Card key={recipe.id}>
                                <Card.Body>
                                    <Card.Title>{recipe.title}</Card.Title>
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