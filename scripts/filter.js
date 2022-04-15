const searchBar = document.querySelector('.search-bar')
const emptyRecipesMessage = document.getElementById('empty-recipes-message')
searchBar.addEventListener('input', (event) => {
    filters.textInputed = event.target.value
    filterRecipes(filters)
})
let recipesFiltered = new Set(recipes)

const filters = {
    textInputed  : "",
    ingredients  : [],
    ustensils  : [],
    appliances  : []
}
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
    const filteredrecipesList = []
    if (text.length < 3) return
    for (let i= 0 ; i < recipesFiltered.size ; i++){
        const recipe = recipesFiltered[i]
        if (recipe.name.includes(text)) 
        { 
            filteredrecipesList.push(recipe)
        }
        else if (recipe.description.includes(text)) {
            filteredrecipesList.push(recipe)
        }
        else
        for (let i= 0 ; i < recipe.ingredients.length ; i++){
            const ingredient = recipe.ingredients[i] 
            if (ingredient.ingredient.includes(text))
            {
                filteredrecipesList.push(recipe)
            }
        }
    }
    recipesFiltered = new Set(filteredrecipesList)
}

function filterByIngredients(ingredientsList){
    if (!ingredientsList.length) return
    const filteredrecipesList = []
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
            filteredrecipesList.push(recipe)
        }
    }
    recipesFiltered = new Set(filteredrecipesList)
}

function filterByAppliances(appliancesList) {
    if (!appliancesList.length) return
    const filteredrecipesList = []
    for (let i= 0 ; i < recipesFiltered.size ; i++){
        const recipe = Array.from(recipesFiltered)[i]
        let isRecipeValid = true
        const recipesIngredientsList = []
        if (appliancesList.includes(normalizeData(recipe.appliance))){
            filteredrecipesList.push(recipe)
        }
    }
    recipesFiltered = new Set(filteredrecipesList)
}

function filterByUstensils(ustensilsList) {
    if (!ustensilsList.length) return
    const filteredrecipesList = []
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
            filteredrecipesList.push(recipe)
        }
    }
    recipesFiltered = new Set(filteredrecipesList)
}