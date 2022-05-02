const searchBar = document.querySelector('.search-bar') // Get the main search bar

const emptyRecipesMessage = document.getElementById('empty-recipes-message') // Get the fallback message section if no recipes match
searchBar.addEventListener('input', (event) => { 
    filters.textInputed = event.target.value
    filterRecipes(filters, true)
})
// Create a set from the main list of recipes
let recipesFiltered = new Set(recipes)
// an object that contains all of filters selected by the user
const filters = {
    textInputed  : "",
    ingredients  : [],
    ustensils  : [],
    appliances  : []
}

// the main function that applies all filters selected by the user from the object 'filters' 
function filterRecipes(research, resetRecipes){
    if (resetRecipes) recipesFiltered = new Set(recipes)
    filterByText(research.textInputed.toLowerCase())
    filterByIngredients(research.ingredients)
    filterByUstensils(research.ustensils)
    filterByAppliances(research.appliances)
    recipesSection.innerHTML = ''
    if (!recipesFiltered.size){
        const elt = document.getElementById('empty-recipes-model');
        const dupNode = document.importNode(elt.content,true);
        emptyRecipesMessage.innerHTML = ''
        emptyRecipesMessage.appendChild(dupNode)
    }
    else {
        emptyRecipesMessage.innerHTML = ''
        hydrateRecipes(recipesFiltered)
    }
    hydrateAllTags()
    
}
function filterByText(text) { 
    if (text.length < 3) return
    let filteredRecipesList = Array.from(recipesFiltered)
    filteredRecipesList = filteredRecipesList.filter(x => (
        x.name.toLowerCase().includes(text)
        || x.description.toLowerCase().includes(text)
        || x.ingredients.forEach(ingredient => {return ingredient.ingredient.toLowerCase().includes(text)})
        ))
    recipesFiltered = new Set(filteredRecipesList)
}

function filterByIngredients(ingredientsList){
    if (!ingredientsList.length) return
    let filteredRecipesList = Array.from(recipesFiltered)
    filteredRecipesList = filteredRecipesList.filter(recipe => {
        const recipeIngredientsList = recipe.ingredients.map(i => i.ingredient.toLowerCase())
        return ingredientsList.every(x => recipeIngredientsList.includes(x.toLowerCase()))
    })
    recipesFiltered = new Set(filteredRecipesList)
}

function filterByAppliances(appliancesList) {
    if (!appliancesList.length) return
    let filteredRecipesList = Array.from(recipesFiltered)
    filteredRecipesList = filteredRecipesList.filter(recipe => recipe.appliance.toLowerCase() === appliancesList[0].toLowerCase())
    recipesFiltered = new Set(filteredRecipesList)
}

function filterByUstensils(ustensilsList) {
    if (!ustensilsList.length) return
    let filteredRecipesList = Array.from(recipesFiltered)
    filteredRecipesList = filteredRecipesList.filter(recipe => {
        const recipeUstensilList = recipe.ustensils.map(ustensil => ustensil.toLowerCase())
        return ustensilsList.every(x => recipeUstensilList.includes(x.toLowerCase()))
    })
    recipesFiltered = new Set(filteredRecipesList)
}