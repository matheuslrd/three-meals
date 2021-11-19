import UrlIncludes from './UrlIncludes';

export default function GetObjectToFavorite(recipe, url) {
  if (recipe.id) {
    const { id, type, area, category,
      alcoholicOrNot, name, image } = recipe;

    return { id, type, area, category, alcoholicOrNot, name, image };
  }

  const idRecipe = recipe.idMeal || recipe.idDrink;
  const name = recipe.strMeal || recipe.strDrink;
  const image = recipe.strMealThumb || recipe.strDrinkThumb;
  const { strArea, strCategory } = recipe;

  return {
    id: idRecipe,
    type: UrlIncludes(url, 'comida', 'comida', 'bebida'),
    area: strArea || '',
    category: strCategory,
    alcoholicOrNot: UrlIncludes(url, 'comida', '', recipe.strAlcoholic),
    name,
    image,
  };
}
