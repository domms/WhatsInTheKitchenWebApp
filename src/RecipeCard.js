import _ from 'lodash';
import { Card, Icon, Container, Grid, Button } from 'semantic-ui-react';

import './Searchbar.css';

const RecipeCard = (props) => {
    const { results } = props;

    return (
        
        <Container>
            {_.map(results, result => {
                return (
                    <a key={result.recipe.id} href={result.information.sourceUrl} target="_blank" className="recipeCards">
                        <Button basic> 
                            <Card
                                image={result.recipe.image}
                                header={result.recipe.title}
                                description={result.recipe.summary}
                                extra={`${result.recipe.missedIngredientCount} missing ingredients`}
                            />
                        </Button>
                    </a>
                );
            })}
        </Container>
    );
}

export default RecipeCard