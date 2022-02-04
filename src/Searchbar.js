import _ from 'lodash';
import React, {useState, useEffect, useMemo, useCallback} from 'react'
import { Input } from 'semantic-ui-react';

const myApiKey = 'e81588e3e11f4014ac748249225696ee';

const Searchbar = (props) => {
    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);

    const updateValue = useCallback ((event) => setValue(event.target.value), [setValue]);

    useEffect(() => { // debounce function delaying send request for api fetch data by 1 second
        const sendRequest = _.debounce(() => {
            if(value.length > 0)
            {
                fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${value}&number=1&apiKey=${myApiKey}`).then(
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
        }, 1000);

        sendRequest();

        return () => {
            sendRequest.cancel(); //cancel any previous send request when typing in search bar
        }
    }, [value]); //will invoke useEffect when value is changed

    return(
        <div>
            <Input
            className="ingrediantSearchBar"
            onChange={updateValue}
            value={value}
            icon='food'
            iconPosition='left'
            label={{ tag: true, content: 'Add' }}
            labelPosition='right'
            placeholder='Search Ingredient'
            />
            <div className="ingrediantSearchBack">
                {result.map((result, index) => (
                    <a href="#" key={index}>
                        <div className="ingrediantSearchEntry">
                            {result}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Searchbar;