import { Container, Row, Col, Button, Form, Alert, Card, CardGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { redirect } from "react-router-dom";
import { useContext, useState } from "react";
import { RecipesContext, UserContext } from "../App";
import RecipeApi from "../helpers/api";

export default function RecipeSearch() {
    const { currentUser } = useContext(UserContext);
    const { recipes, setRecipes } = useContext(RecipesContext);

    async function findRecipes(data) {
        try {
            const results = await RecipeApi.findRecipes(data);
            setRecipes(results.recipes);
            return { success: true };
        } catch (err) {
            console.error("Search failed", err);
            return { success: false, err };
        }
    };

    const [formData, setFormData] = useState({
        search: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await findRecipes(formData);
        if (!result.success) setFormErrors(result.err);
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    // If no user logged in, redirect to login
    if (!currentUser) {
        return redirect("/user/login");
    }

    function renderRecipes() {
        return (
            <Row>
                <Col>
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
            </Row>
        )
    };

    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>Recipe Search</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="search">
                            <Form.Label>Search</Form.Label>
                            <Form.Control type="search" placeholder="Search for a recipe" onChange={handleChange} />
                        </Form.Group>
                        {formErrors.length
                            ? <Alert key="danger" variant="danger" >
                                {formErrors.map(error => (
                                    <p key={error}>
                                        {error}
                                    </p>
                                ))}
                            </Alert>
                            : null
                        }
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
            {recipes.length > 0 && renderRecipes()}
        </Container>
    )
}