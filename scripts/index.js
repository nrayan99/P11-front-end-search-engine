const recipesSection = document.getElementById("recipes")

hydrateRecipes(recipes)
hydrateAllTags()
function hydrateRecipes(recipes){
    recipes.forEach(recipe => showRecipe(recipe))
}

function showRecipe(recipe) {
    const elt = document.getElementById('receipt-model');
    const dupNode = document.importNode(elt.content,true);
    dupNode.querySelector('.receipt-name').textContent= recipe.name;
    dupNode.querySelector('.receipt-duration').textContent= recipe.time;
    const ingredientsList = dupNode.querySelector(".receipt-ingredients")
    const ingredientModel = document.getElementById('ingredient-model');
    recipe.ingredients.forEach(ingredient =>{
        const dupIngredientNode = document.importNode(ingredientModel.content,true);
        dupIngredientNode.querySelector('.receipt-ingredient-name').textContent = ingredient.ingredient
        if (ingredient.quantity) {
            dupIngredientNode.querySelector('.receipt-ingredient-quantity').textContent = ': ' + ingredient.quantity
        }
        if (ingredient.unit) {
            dupIngredientNode.querySelector('.receipt-ingredient-unit').textContent = ingredient.unit
        }
        ingredientsList.appendChild(dupIngredientNode)
    })
    dupNode.querySelector('.receipt-instructions').textContent = recipe.description
    recipesSection.appendChild(dupNode);
}