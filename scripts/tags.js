tagsButtons = document.querySelectorAll('.tags-btn')
const tagsNameArray = ['ustensils', 'appliances', 'ingredients']
closeTagButtons = document.querySelectorAll('.tags-opened i')
closeTagButtons.forEach(closeTagButton => {
    closeTagButton.addEventListener('click', function(){
        closeTag(closeTagButton.className.split(' ')[0].split('-')[1])
    })
})

tagsButtons.forEach(tagsButton => {
    tagsButton.addEventListener('click' , function() {
        openTag(tagsButton.className.split('-')[0])
    })
})

const tagsItems = {
    ingredientsTagsItems: document.querySelector('.ingredients-opened .tags-items'),
    ustensilsTagsItems: document.querySelector('.ustensils-opened .tags-items'),
    appliancesTagsItems: document.querySelector('.appliances-opened .tags-items')
}
function openTag(tag){
    tagsNameArray.forEach(tagName => {
        if (tagName !== tag) closeTag(tagName)
    })
    const tagToOpen = document.querySelector('.'+ tag + '-opened' )
    const buttonToHide = document.querySelector('.'+ tag + '-btn' )
    tagToOpen.style.display = 'block'
    tagToOpen.querySelector('input').focus()
    buttonToHide.style.setProperty('display','none', 'important')
}

function closeTag(tag){
    console.log(tag)
    const tagToHide = document.querySelector('.'+ tag + '-opened' )
    const buttonToShow = document.querySelector('.'+ tag + '-btn' )
    tagToHide.style.display = 'none'
    buttonToShow.style.setProperty('display','block', 'important')
}

function test(tag) {
    const tagsItemsList = new Set();
    if (tag === 'ingredients'){
        recipes.forEach(recipe =>{
            recipe.ingredients.forEach(ingredient=> {
                tagsItemsList.add(ingredient.ingredient)
            })
        })
    }
    else if (tag === 'appliances') {
        recipes.forEach(recipe =>{
            tagsItemsList.add(recipe.appliance)
        })
    }
    else if (tag === 'ustensils') {
        recipes.forEach(recipe =>{
            recipe.ustensils.forEach(ustensil=> {
                tagsItemsList.add(ustensil)
            })
        })
    }
    tagsItemsList.forEach(tagsItem => {
        fillTags(tagsItem, tag)
    })
}

function fillTags(tagsItem, tag) {
    const elt = document.getElementById('tags-item-model');
    const dupNode = document.importNode(elt.content,true);
    dupNode.querySelector('.tags-item-name').textContent = tagsItem;
    dupNode.querySelector('.tags-item-name').addEventListener('click', function() {
        selectTag(tagsItem, tag)
    })
    tagsItems[tag+'TagsItems'].appendChild(dupNode)
}

function selectTag(tagsItem, tag){
    const selectedTagsItemList = document.querySelector('.selected-tags-item-list')
    const elt = document.getElementById('selected-'+tag+'-item-model');
    console.log(elt)
    const dupNode = document.importNode(elt.content,true);
    dupNode.querySelector('.selected-tags-item-name').textContent = tagsItem;
    dupNode.querySelector('.delete-tags-item-btn').addEventListener('click', event => closeTagsItem(event))
    closeTag(tag)
    selectedTagsItemList.appendChild(dupNode)
}
function closeTagsItem(e) {
    e.target.parentElement.parentElement.remove()
}
test('ingredients');
test('appliances');
test('ustensils');