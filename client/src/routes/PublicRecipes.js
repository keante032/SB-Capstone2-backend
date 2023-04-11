import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function PublicRecipes() {
    const { recipes, setRecipes } = useContext(RecipesContext);

    return (
        <Container>
            <Row>
                <Col xs={1} md={2}></Col>
                <Col xs={10} md={6}>
                    <h1>Public Recipes</h1>
                </Col>
                <Col xs={1} md={2}></Col>
            </Row>
        </Container>
    )
}