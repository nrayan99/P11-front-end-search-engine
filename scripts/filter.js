const searchBar = document.querySelector('.search-bar')
const emptyRecipesMessage = document.getElementById('empty-recipes-message')
searchBar.addEventListener('input', (event) => {
    filters.textInputed = event.target.value
    filterRecipes(filters, true)
})
let recipesFiltered = new Set(recipes)

const filters = {
    textInputed  : "",
    ingredients  : [],
    ustensils  : [],
    appliances  : []
}
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
    let filteredrecipesList = Array.from(recipesFiltered)
    filteredrecipesList = filteredrecipesList.filter(x => (
        x.name.toLowerCase().includes(text)
        || x.description.toLowerCase().includes(text)
        || x.ingredients.forEach(ingredient => {return ingredient.ingredient.toLowerCase().includes(text)})
        ))
    recipesFiltered = new Set(filteredrecipesList)
}

function filterByIngredients(ingredientsList){
    if (!ingredientsList.length) return
    let filteredrecipesList = Array.from(recipesFiltered)
    filteredrecipesList = filteredrecipesList.filter(recipe => {
        const recipeIngredientsList = recipe.ingredients.map(i => i.ingredient.toLowerCase()) // TO-DO performance: mettre dans la liste de base pour chaque recette
        return ingredientsList.every(x => recipeIngredientsList.includes(x.toLowerCase()))
    })
    recipesFiltered = new Set(filteredrecipesList)
}

function filterByAppliances(appliancesList) {
    if (!appliancesList.length) return
    let filteredrecipesList = Array.from(recipesFiltered)
    filteredrecipesList = filteredrecipesList.filter(recipe => recipe.appliance.toLowerCase() === appliancesList[0].toLowerCase())
    recipesFiltered = new Set(filteredrecipesList)
}

function filterByUstensils(ustensilsList) {
    if (!ustensilsList.length) return
    let filteredrecipesList = Array.from(recipesFiltered)
    filteredrecipesList = filteredrecipesList.filter(recipe => {
        const recipeUstensilList = recipe.ustensils.map(ustensil => ustensil.toLowerCase())
        return ustensilsList.every(x => recipeUstensilList.includes(x.toLowerCase()))
    })
    recipesFiltered = new Set(filteredrecipesList)
}