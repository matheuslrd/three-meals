import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Header from '../../Components/Header';
import Button from '../../Components/Button';
import CardRecipe from '../../Components/CardRecipe';
import Footer from '../../Components/Footer';

import { MyContext } from '../../Context/MyContext';
import requestApi from '../../Services/requestApi';

function IngredientExplorer({ match: { url } }) {
  const [ingredients, setIngredients] = useState([]);
  const { setFilterUrl } = useContext(MyContext);

  const maxIndex = 12;

  useEffect(() => {
    async function fetchIngredients() {
      const URL_API = url.includes('comidas')
        ? 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
        : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const resolve = await requestApi(URL_API);
      const fetchResult = resolve.meals || resolve.drinks;
      setIngredients(fetchResult);
    }
    fetchIngredients();
  }, [url]);

  function getIngredientImg(name) {
    return url.includes('comidas')
      ? `https://www.themealdb.com/images/ingredients/${name.strIngredient || name.strIngredient1}-Small.png`
      : `https://www.thecocktaildb.com/images/ingredients/${name.strIngredient || name.strIngredient1}-Small.png`;
  }

  function getPathName() {
    return url.includes('comidas')
      ? '/comidas'
      : '/bebidas';
  }

  function ingredientsData(name) {
    const URL_API = url.includes('comidas')
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
      : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`;
    setFilterUrl(URL_API);
  }

  return (
    <main className="main-recipes">
      <Header disabledSearch>
        Explorar Ingredientes
      </Header>
      <div className="ingredients-container">
        { ingredients.length > 0 && ingredients.slice(0, maxIndex).map((item, ind) => (
          <Button
            key={ `ingredient${ind}` }
            onClick={ () => ingredientsData(item.strIngredient || item.strIngredient1) }
          >
            <CardRecipe
              testId={ `${ind}-ingredient-card` }
              testIdImg={ `${ind}-card-img` }
              testIdTitle={ `${ind}-card-name` }
              recipeImg={ getIngredientImg(item) }
              recipeName={ item.strIngredient || item.strIngredient1 }
              pathName={ getPathName() }
            />
          </Button>
        )) }
      </div>
      <Footer />
    </main>
  );
}

IngredientExplorer.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default IngredientExplorer;
