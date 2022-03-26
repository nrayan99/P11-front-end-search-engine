tagsButtons = document.querySelectorAll('.tags-btn')

tagsButtons.forEach(tagsButton => {
    tagsButton.addEventListener('click' , function() {
        openTag(tagsButton.className.split('-')[0])
    })
})


const ingredientsTagsItems = document.querySelector('.ingredients-opened .tags-items')

function openTag(tag) {
    console.log(tag)
    const tagToOpen = document.querySelector('.'+ tag + '-opened' )
    const buttonToHide = document.querySelector('.'+ tag + '-btn' )
    tagToOpen.style.display = 'block'
    buttonToHide.style.setProperty('display','none', 'important')
}

function test() {
    const ustensilsList = new Set();
    recipes.forEach(recipe =>{
        recipe.ingredients.forEach(ingredient=> {
            ustensilsList.add(ingredient.ingredient)
        })
        
        
    } )
    ustensilsList.forEach(ustensil => {
        fillTags(ustensil)
        console.log(ustensil)
    })
}

function fillTags(ustensil) {
    const elt = document.getElementById('tags-item-model');
    const dupNode = document.importNode(elt.content,true);
    dupNode.querySelector('.tags-item-name').textContent = ustensil;
    ingredientsTagsItems.appendChild(dupNode)
}
test();