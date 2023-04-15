import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

export default async function RecipePage() {
    const { currentUser } = useContext(UserContext);
    const { id } = useParams();

    const recipe = await RecipeApi.getRecipe(id);

    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>{recipe.name}</h1>
                    <h2>{recipe.ownerName}</h2>
                    <p>{recipe.description}</p>
                    {currentUser && currentUser.username === recipe.ownerName && (
                        <LinkContainer to={`/recipe-edit/${id}`}>
                            <Button variant="primary">Edit Recipe</Button>
                        </LinkContainer>
                    )}
                    <h3>Ingredients</h3>
                    <ul>
                        {recipe.ingredients.map(ingredient => (
                            <li>{ingredient.count} {ingredient.unit} {ingredient.item}</li>
                        ))}
                    </ul>
                    <h3>Directions</h3>
                    <ol>
                        {recipe.directions.map(direction => (
                            <li>{direction}</li>
                        ))}
                    </ol>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
        </Container>
    )
}