import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function RecipeNew(addRecipe) {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        publiclyShared: false,
        description: "",
        ingredients: "",
        directions: ""
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
        let result = await addRecipe(submitData);
        if (result.success) {
            navigate(`/recipes/${result.recipeId}`);
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
                    <h1>New Recipe</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="My Favorite Recipe" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="publiclyShared">
                            <Form.Check type="checkbox" label="Share publicly?" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Yeah, this one is my favorite." onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="ingredients">
                            <Form.Label>Ingredients</Form.Label>
                            <Form.Control type="textarea" placeholder="2 slices bread" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="directions">
                            <Form.Label>Directions</Form.Label>
                            <Form.Control type="textarea" placeholder="Enter directions" onChange={handleChange} />
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
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
        </Container>
    )
}