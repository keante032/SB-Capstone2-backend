import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

export default async function RecipeEdit(editRecipe) {
    const { currentUser } = useContext(UserContext);
    const { id } = useParams();
    let navigate = useNavigate();

    const recipe = await RecipeApi.getRecipe(id);

    // If the current user is not the owner, redirect to recipe search
    if (currentUser.username !== recipe.ownerName) return redirect("/recipes/search");

    const [formData, setFormData] = useState({
        name: recipe.name,
        publiclyShared: recipe.publiclyShared,
        description: recipe.description,
        // change ingredients from array of objects to multiline string
        ingredients: recipe.ingredients.map(i => (`${i.count} ${i.unit} ${i.item}`)).join("\n"),
        // change directions from array of strings to multiline string
        directions: recipe.directions.join("\n")
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        let submitData = { ...formData };
        // change ingredients from multiline string to array of strings
        submitData.ingredients = submitData.ingredients.split("\n");
        // split each ingredient into count, unit, and item
        submitData.ingredients = submitData.ingredients.map(ingredient => {
            let ingredientData = ingredient.split(" ");
            let count = ingredientData[0];
            let unit = ingredientData[1];
            let item = ingredientData.slice(2).join(" ");
            return { count, unit, item };
        });
        // change directions from multiline string to array of strings
        submitData.directions = submitData.directions.split("\n");
        let result = await editRecipe(submitData);
        if (result.success) {
            navigate(`/recipes/${id}`);
        } else {
            setFormErrors(result.err);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>Edit Recipe</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="publiclyShared">
                            <Form.Check type="checkbox" label="Share publicly?" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="ingredients">
                            <Form.Label>Ingredients</Form.Label>
                            <Form.Control type="text" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="directions">
                            <Form.Label>Directions</Form.Label>
                            <Form.Control type="text" onChange={handleChange} />
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
                        <Button variant="primary" type="submit" onSubmit={handleSubmit}>
                            Save Changes
                        </Button>
                    </Form>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
        </Container>
    )
}