import _ from 'lodash';
import React, {useState, useEffect} from 'react'
import { Card, Icon, Container, Grid, Button } from 'semantic-ui-react'
import Searchbar from './Searchbar';

import './Searchbar.css';

const RecipeCard = (props) => {
    const { recipes } = props;
    console.log('Recipes', recipes);

    let url = '';

    return (
        
        <Container>
            {_.map(recipes, recipe => {

            // fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false&apiKey=76cd7a9b478041ebb57b248eafa54db3`)
            // .then(resp => resp.json())
            // .then(respData => {
            //     url = respData.sourceUrl;
            //     console.log(url);
            // }).catch(error => {
            //     console.log(error);
            // })

                return (
                    <a key={recipe.id} href={url} target="_blank" className="recipeCards">
                        <Button basic> 
                            <Card
                                image={recipe.image}
                                header={recipe.title}
                                description={recipe.summary}
                                extra={`${recipe.missedIngredientCount} missing ingredients`}
                            />
                        </Button>
                    </a>
                );
            })}
        </Container>
    );
}

export default RecipeCard