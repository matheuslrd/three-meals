export default function GetIngredients(data) {
  const ingredientKeys = Object.keys(data);
  const ingredientKeysData = ingredientKeys
    .filter((key) => key.includes('strIngredient'));

  const measureKeys = Object.keys(data);
  const measureKeysData = measureKeys.filter((key) => key.includes('strMeasure'));

  return ingredientKeysData
    .map((ingredient, index) => {
      const item = data[ingredient];
      const measure = data[measureKeysData[index]];
      return {
        item, measure,
      };
    });
}
