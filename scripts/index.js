recipes.forEach(recipe => {
    showReceipt(recipe)
})

function showReceipt(receipt) {
    const elt = document.getElementById('receipt-model');
    const dupNode = document.importNode(elt.content,true);
    dupNode.querySelector('.receipt-name').textContent= receipt.name;
    dupNode.querySelector('.receipt-duration').textContent= receipt.time;
    const ingredientsList = dupNode.querySelector(".receipt-ingredients")
    const ingredientModel = document.getElementById('ingredient-model');
    receipt.ingredients.forEach(ingredient => {
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
    dupNode.querySelector('.receipt-instructions').textContent = receipt.description
    document.getElementById("recipes").appendChild(dupNode);
}