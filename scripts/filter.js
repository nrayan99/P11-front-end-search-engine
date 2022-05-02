const searchBar = document.querySelector('.search-bar') // Get the main search bar
const emptyRecipesMessage = document.getElementById('empty-recipes-message') // Get the fallback message section if no recipes match
searchBar.addEventListener('input', (event) => {
    filters.textInputed = event.target.value
    filterRecipes(filters)
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
function filterRecipes(research){
    recipesFiltered = new Set(recipes)
    filterByText(research.textInputed)
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
    const filteredRecipesList = []
    if (text.length < 3) return
    for (let i= 0 ; i < recipesFiltered.size ; i++){
        const recipe = Array.from(recipesFiltered)[i]
        if (recipe.name.includes(text)) 
        { 
            filteredRecipesList.push(recipe)
        }
        else if (recipe.description.includes(text)) {
            filteredRecipesList.push(recipe)
        }
        else
        for (let i= 0 ; i < recipe.ingredients.length ; i++){
            const ingredient = recipe.ingredients[i] 
            if (ingredient.ingredient.includes(text))
            {
                filteredRecipesList.push(recipe)
            }
        }
    }
    recipesFiltered = new Set(filteredRecipesList)
}

function filterByIngredients(ingredientsList){
    if (!ingredientsList.length) return
    const filteredRecipesList = []
    for (let i= 0 ; i < recipesFiltered.size ; i++){
        const recipe = Array.from(recipesFiltered)[i]
        let isRecipeValid = true
        const recipeIngredientsList = []
        for (let i= 0 ; i < recipe.ingredients.length ; i++){
            const ingredient = recipe.ingredients[i]
            recipeIngredientsList.push(normalizeData(ingredient.ingredient))
        }
        for (let i = 0 ; i < ingredientsList.length ; i++){
            const ingredient = ingredientsList[i];
            if (!recipeIngredientsList.includes(ingredient)) isRecipeValid = false
        }
        if (isRecipeValid){
            filteredRecipesList.push(recipe)
        }
    }
    recipesFiltered = new Set(filteredRecipesList)
}

function filterByAppliances(appliancesList) {
    if (!appliancesList.length) return
    const filteredRecipesList = []
    for (let i= 0 ; i < recipesFiltered.size ; i++){
        const recipe = Array.from(recipesFiltered)[i]
        let isRecipeValid = true
        const recipesIngredientsList = []
        if (appliancesList.includes(normalizeData(recipe.appliance))){
            filteredRecipesList.push(recipe)
        }
    }
    recipesFiltered = new Set(filteredRecipesList)
}

function filterByUstensils(ustensilsList) {
    if (!ustensilsList.length) return
    const filteredRecipesList = []
    for (let i= 0 ; i < recipesFiltered.size ; i++){
        const recipe = Array.from(recipesFiltered)[i]
        let isRecipeValid = true
        const recipeUstensilsList = []
        for (let i= 0 ; i < recipe.ustensils.length ; i++){
            const ustensil = recipe.ustensils[i]
            recipeUstensilsList.push(normalizeData(ustensil))
        }
        for (let i = 0 ; i < ustensilsList.length ; i++){
            const ustensil = ustensilsList[i];
            if (!recipeUstensilsList.includes(ustensil)) isRecipeValid = false
        }
        if (isRecipeValid){
            filteredRecipesList.push(recipe)
        }
    }
    recipesFiltered = new Set(filteredRecipesList)
}