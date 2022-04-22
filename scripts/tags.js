const tagsButtons = document.querySelectorAll('.tags-btn')
const tagsNameArray = ['ustensils', 'appliances', 'ingredients']
const closeTagButtons = document.querySelectorAll('.tags-opened i')
const emptyTagsMessage = {
    ingredients : document.getElementById('ingredients-opened-empty'),
    appliances : document.getElementById('appliances-opened-empty'),
    ustensils : document.getElementById('ustensils-opened-empty')
}

const tagsInput = {
    ingredients : document.querySelector('.ingredients-opened input'),
    appliances : document.querySelector('.appliances-opened input'),
    ustensils : document.querySelector('.ustensils-opened input')
}

for (const tag in tagsInput){
    tagsInput[tag].addEventListener('input', (event) =>{
        filterTagItemsByText(event, tag)
    } )
}
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
    const tagToHide = document.querySelector('.'+ tag + '-opened' )
    const buttonToShow = document.querySelector('.'+ tag + '-btn' )
    tagToHide.style.display = 'none'
    buttonToShow.style.setProperty('display','block', 'important')
    tagsInput[tag].value = ''
    hydateTagByText(tag,'')
}

function hydateTagByText(tag, text) {
    const tagsItemsList = new Set();
    tagsItems[tag+'TagsItems'].innerHTML = ''
    if (tag === 'ingredients'){
        recipesFiltered.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                if (
                    (normalizeData(ingredient.ingredient).includes(text) || !text )
                    && !filters[tag].includes(normalizeData(ingredient.ingredient))
                    )
                {
                    tagsItemsList.add(normalizeData(ingredient.ingredient))
                }
            })
        })
    }
    else if (tag === 'appliances') {
        recipesFiltered.forEach(recipe =>{
            if ((normalizeData(recipe.appliance).includes(text) || !text) 
            && (!filters[tag].includes(normalizeData(recipe.appliance))))
            {
               tagsItemsList.add(normalizeData(recipe.appliance))
            }
        })
    }
    else if (tag === 'ustensils') {
        recipesFiltered.forEach(recipe =>{
            recipe.ustensils.forEach(ustensil => {
                if ((normalizeData(ustensil).includes(text) || !text)
                && (!filters[tag].includes(normalizeData(ustensil))
                ))
                {
                    tagsItemsList.add(normalizeData(ustensil))
                }
            })
        })
    }
    if(!tagsItemsList.size){
        emptyTagsMessage[tag].style.display = 'block'
    }
    else {
        emptyTagsMessage[tag].style.display = 'none'
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
    const dupNode = document.importNode(elt.content,true);
    dupNode.querySelector('.selected-tags-item-name').textContent = tagsItem;
    dupNode.querySelector('.delete-tags-item-btn').addEventListener('click', event => closeTagsItem(event, tag, tagsItem))
    closeTag(tag)
    selectedTagsItemList.appendChild(dupNode)
    filters[tag].push(tagsItem)
    tagsInput[tag].value = ''
    hydateTagByText(tag,'')
    filterRecipes(filters)
}

function closeTagsItem(e, tag, tagsItem) {
    filters[tag].splice(filters[tag].indexOf(tagsItem))
    e.target.parentElement.parentElement.remove()
    filterRecipes(filters, true)
}
function normalizeData(data) {
    return `${data.slice(0,1).toUpperCase()}${data.slice(1).toLowerCase()}`
}

function filterTagItemsByText(e, tag){
    const text = e.target.value
    hydateTagByText(tag, text)
}

function hydrateAllTags(){
    hydateTagByText('ingredients')
    hydateTagByText('appliances')
    hydateTagByText('ustensils')
}