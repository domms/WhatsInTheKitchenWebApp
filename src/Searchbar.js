import _ from 'lodash';
import React, {useState, useEffect, useCallback} from 'react';
import { Input, Button, Divider, Grid, Segment, Container, Icon } from 'semantic-ui-react';
import { Popup, Rail, Sticky, Image } from 'semantic-ui-react';
import RecipeCard from './RecipeCard';
import './Searchbar.css';

const myApiKey = 'e81588e3e11f4014ac748249225696ee';

const Searchbar = (props) => {
    let offset = 3;
    const { onRecipesChange } = props;
    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const [selected, setSelected] = useState([]);
    
    const updateValue = useCallback((event) => setValue(event.target.value), [setValue]);


    //fetch API
    const findRecipes = useCallback(async () => {

        if (!_.isEmpty(selected)) {
            const ingredients = _.join(selected, ',+');
            
            try {
                
                const recipes = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${offset}&apiKey=${myApiKey}`)
                .then(res => res.json());

                const ids = _.join(_.map(recipes, 'id'), ',');

                const information = await fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${myApiKey}`)
                .then(res => res.json());

                const result = _.map(recipes, (recipe, index) => {
                    return {
                        recipe,
                        information: _.get(information, index)
                    };
                    
                });
                offset += 3;
                onRecipesChange(result);
            } catch (error) {
                console.log(error);
            }
        }
    }, [selected, onRecipesChange]);

    //Live search function
    const fetchIngredients = useCallback(_.debounce(value => {
        if(value.length > 0) {
            fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${value}&number=6&apiKey=${myApiKey}`).then(
                res => res.json()
            ).then(resData => {
                setResult([]);
                let searchQuery = value.toLowerCase();
                for(const key in resData)
                {
                    let ingredient = resData[key].name.toLowerCase(); 
                    if(ingredient.slice(0, searchQuery.length).indexOf(searchQuery) !== -1)
                    {
                        setResult(prevResult => {
                            return[...prevResult, resData[key].name]
                        });
                    }
                }
            }).catch(error => {
                console.log(error);
            })
        } else {
            setResult([]);
        }
    }, 1000), [setResult]);

    useEffect(() => {
        fetchIngredients(value);
    }, [value]); 

    //Add an ingredient to the array
    const selectIngredient = useCallback((ingredient) => {
        setSelected(selected => _.uniq([...selected, ingredient])); 
    }, [setSelected]);

    //Remove an ingredient from the array
    const removeIngredient = (event) => {
        const arr = selected.filter((item) => item !== event);
        setSelected(arr);
    };

    //Show array items in console
    useEffect(() => {
        console.log('Selected', selected);
    }, [selected]);

    //Program UI
    return(
        <Container textAlign="justified">
        <Segment placeholder>
            <Grid columns={3} relaxed='very' stackable>
                {/* Title of web app/LOGO */}
                <Grid.Column verticalAlign="center">Whats in the kitchen?</Grid.Column> 
                {/* Searchbar interface */}
                <Grid.Column verticalAlign='center'>  
                            <Input
                            className="ingrediantSearchBar"
                            onChange={updateValue}
                            value={value}
                            icon='food'
                            iconPosition='left'
                            placeholder='Search Ingredient'
                            />
                            {/* Result list of ingredients */}
                            <div className="dataResult">
                            {result.map((result, index) => (
                                    <a key={result} className="dataItem" onClick={() => selectIngredient(result)} href="#">
                                        <div key={index} className="ingrediantSearchEntry">
                                            {result}
                                        </div>
                                    </a>
                                ))}
                            </div> 
                            {/* Submit search results */}
                            <Button
                                color="green"
                                onClick={findRecipes}
                            >
                                Find Recipes
                            </Button>
                            <Divider horizontal></Divider>
                    <Button color="green" onClick={findRecipes}>Load more</Button>

                    </Grid.Column> 
                    <Grid.Column verticalAlign="center">
                        {/* Instructions on how to use web app */}
                    <Popup
                    trigger={<Icon enabled="true" color="green" name='question circle' size="big"/>}
                    content='Search for an ingredient in the search bar and click on an item to add it to your list of ingredients.
                             Then click the "Find Recipes" button to find recipes that include your selected ingredients below!'
                    inverted
                    />
                </Grid.Column>
            </Grid> 
            <Divider horizontal>
                <div>Ingredients</div>
            </Divider> 
            <Grid>
            {/* Item tags to show selected items and to also deselect items with a button click */}
            <Grid.Column>
            <div name="items">
                {selected.map(item => (
                    <Button key={item} onClick={() => removeIngredient(item)}  
                    className="itemTag"  
                    // verticalAlign='left' 
                    color="green"
                    >
                        <div className="tagIcon">{item}<Icon name='window close outline'/></div>
                    </Button>
                ))}
            </div>
            </Grid.Column>
            </Grid>
        </Segment>
        </Container>
    );
};

export default Searchbar;