const searchBar = document.querySelector('.search-bar')

searchBar.addEventListener('input', (event) => filterRecipesBySearchBar(event))
recipesFilteredByTag = recipes

function filterRecipesBySearchBar(e) { 
    const filteredrecipesList = []
    const word = e.target.value

    if (word.length < 3) return
    recipesFilteredByTag.forEach((recipe) => {
        if (recipe.name.includes(word)) 
        { 
            filteredrecipesList.push(recipe)
        }
        else if (recipe.description.includes(word)) {
            filteredrecipesList.push(recipe)
        }
        else
        recipe.ingredients.forEach(ingredient => { 
            if (ingredient.ingredient.includes(word))
            {
                filteredrecipesList.push(recipe)
            }
        })
    })
    
    console.log(new Set(filteredrecipesList))
}