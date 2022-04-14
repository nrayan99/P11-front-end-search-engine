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
    recipesFiltered.forEach((recipe) => {
        if (recipe.name.includes(text)) 
        { 
            filteredrecipesList.push(recipe)
        }
        else if (recipe.description.includes(text)) {
            filteredrecipesList.push(recipe)
        }
        else
        recipe.ingredients.forEach(ingredient => { 
            if (ingredient.ingredient.includes(text))
            {
                filteredrecipesList.push(recipe)
            }
        })
    })
    recipesFiltered = new Set(filteredrecipesList)
}

function filterByIngredients(ingredientsList){
    if (!ingredientsList.length) return
    const filteredrecipesList = []
    recipesFiltered.forEach((recipe) => {
        recipe.ingredients.forEach(ingredient=> {
            if (ingredientsList.includes(normalizeData(ingredient.ingredient))){
                filteredrecipesList.push(recipe)
            }
        })
    })
    recipesFiltered = new Set(filteredrecipesList)
}

function filterByAppliances(appliancesList) {
    if (!appliancesList.length) return
    const filteredrecipesList = []
    recipesFiltered.forEach((recipe) => {
        if (!appliancesList.includes(normalizeData(recipe.appliance))){
            filteredrecipesList.push(recipe)
        }
    })
    recipesFiltered = new Set(filteredrecipesList)
}

function filterByUstensils(ustensilsList) {
    if (!ustensilsList.length) return
    const filteredrecipesList = []
    recipesFiltered.forEach((recipe) => {
        recipe.ustensils.forEach(ustensil => {
            if (ustensilsList.includes(normalizeData(ustensil))){
                filteredrecipesList.push(recipe)
            }
        })
    })
    recipesFiltered = new Set(filteredrecipesList)
}