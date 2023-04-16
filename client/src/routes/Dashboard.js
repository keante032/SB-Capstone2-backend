import { Container, Row, Col, Button, CardGroup, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { redirect } from "react-router-dom";
import { useContext } from "react";
import { RecipesContext, UserContext } from "../App";
import RecipeApi from "../helpers/api";

export default async function Dashboard() {
    const { currentUser } = useContext(UserContext);
    const { recipes, setRecipes } = useContext(RecipesContext);

    const results = await RecipeApi.getMyRecipes();
    setRecipes(results.recipes);

    // If no user logged in, redirect to login
    if (!currentUser) {
        return redirect("/user/login");
    }

    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>Dashboard</h1>
                    <CardGroup>
                        {recipes.map(recipe => (
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
    );
}