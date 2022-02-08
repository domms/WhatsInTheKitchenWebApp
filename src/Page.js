import logo from './logo.svg';
import './App.css';
import { Input } from 'semantic-ui-react'

import RecipeCard from './RecipeCard';
import Searchbar from './Searchbar';

function App() {
    return (
        <div>
        <Searchbar />
        <RecipeCard />
        </div>
    );
}

export default App;
