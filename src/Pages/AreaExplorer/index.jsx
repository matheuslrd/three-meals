import React, { useContext, useEffect, useState } from 'react';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

import { MyContext } from '../../Context/MyContext';
import requestApi from '../../Services/requestApi';
import CardRecipe from '../../Components/CardRecipe';

function AreaExplorer() {
  const { data, filtersByArea, setFilterByArea } = useContext(MyContext);
  const [locations, setlocations] = useState(null);
  const [locationFoods, setLocationFoods] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');

  const AREA_LIST_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const FILTER_AREA_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
  const maxFoods = 12;

  useEffect(() => {
    function getLocations() {
      requestApi(AREA_LIST_URL)
        .then(({ meals }) => {
          const areasList = meals.map(({ strArea }) => strArea);
          setlocations(areasList);
        });
    }

    getLocations();
  }, []);

  useEffect(() => {
    function getLocationFoods() {
      return requestApi(`${FILTER_AREA_URL}${selectedLocation}`)
        .then(({ meals }) => {
          setFilterByArea({ ...filtersByArea, [selectedLocation]: meals });
          return meals;
        });
    }

    async function changeLocationFoods() {
      if (selectedLocation === '') {
        setLocationFoods(data);
      } else {
        const filterResult = filtersByArea[selectedLocation]
          || await getLocationFoods();
        setLocationFoods(filterResult);
      }
    }

    if (data.length > 0) changeLocationFoods();
  }, [selectedLocation, data]);

  const handleChange = ({ target: { value } }) => setSelectedLocation(value);

  return (
    <main className="recipes-explorer">
      <Header>
        Explorar Origem
      </Header>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleChange }
      >
        <option data-testid="All-option" value="">All</option>
        { locations && locations.map((area) => (
          <option key={ area } data-testid={ `${area}-option` }>{ area }</option>
        )) }
      </select>
      <section className="recipes-section">
        { locationFoods && locationFoods.slice(0, maxFoods)
          .map(({ strMeal, strMealThumb, idMeal }, index) => (
            <CardRecipe
              key={ `${index}${idMeal}` }
              pathName="/comidas"
              id={ idMeal }
              index={ index }
              testId={ `${index}-recipe-card` }
              testIdTitle={ `${index}-card-name` }
              testIdImg={ `${index}-card-img` }
              recipeImg={ strMealThumb }
              recipeName={ strMeal }
            />
          )) }
      </section>
      <Footer />
    </main>
  );
}

export default AreaExplorer;
