import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useEffect } from "react";

export default function PublicRecipes() {
    const { recipes, setRecipes } = useContext(RecipesContext);

    async function publicRecipes() {
        try {
            const results = await RecipeApi.getPublicRecipes();
            setRecipes(results.recipes);
            return { success: true };
        } catch (err) {
            console.error("Search failed", err);
            return { success: false, err };
        }
    };

    useEffect(() => {
        publicRecipes();
    }, []);

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
                                <LinkContainer to={`/recipe/${recipe.id}`}>
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