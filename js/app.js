import { fetchData } from "./main.js"
const skeletonEl = document.querySelector(".skeleton")
const wrapperEl = document.querySelector(".wrapper")
const collectionEl = document.querySelector(".collection")
const btnSeemoreEl = document.querySelector(".btn-seemore")

function renderProducts(data){
    const fragment = document.createDocumentFragment()
    data.products.forEach((products)=>{
        let card = document.createElement("div")
        card.className = "card"
        card.dataset.id = products.id
        card.innerHTML = `
               <img name="card-image" src=${products.thumbnail} alt="${products.title}">
            <h3>${products.title}</h3>
            <div class="card__category">
            <p>⭐${products.rating} </p>
            <p>(${products.discountPercentage})</p>
            
            </div>
            
            <p class="price">${(products.price / 12).toFixed(2)} som/ oyiga</p>
            <div class="card__discount">
            <del>${(products.price + 10).toFixed(2)}</del>
            <p>${products.price} som</p>
            </div>
        `
        fragment.appendChild(card)
    })
    wrapperEl.appendChild(fragment)
}


function renderSkeleton(count){
    const fragment = document.createDocumentFragment()
    Array(count).fill("").forEach(()=>{
        let skeletonItem = document.createElement("div")
        skeletonItem.className = "skeleton__item"
        skeletonItem.innerHTML = `
            <div class="skeleton__image skeleton__animation"></div>
            <div class="skeleton__text skeleton__animation"></div>
            <div class="skeleton__text skeleton__animation"></div>
        `
        fragment.appendChild(skeletonItem)
    })
    skeletonEl.appendChild(fragment)
}

function hideSkeleton(){
    skeletonEl.style.display = "none"
}
function showSkeleton(){
    skeletonEl.style.display = "grid"
}

function renderCategoryList(data){
    data.forEach((tag)=> {
        const li = document.createElement("li")
        li.innerHTML = tag
        collectionEl.appendChild(li)
    })
}

const perPageCount = 10

window.addEventListener("load", ()=>{
    fetchData(`/products?limit=${perPageCount}&skip=0`, renderProducts,  hideSkeleton)
    fetchData("/products/category-list", renderCategoryList, ()=>{})
    renderSkeleton(perPageCount)
})

wrapperEl.addEventListener("click", (event)=>{
    let name = event.target.name
    if(name === "card-image"){
        const id = event.target.closest(".card").dataset.id
        open(`/pages/detail.html?id=${id}`, "_self")
    }
})

collectionEl.addEventListener("click", (event)=>{
    if(event.target.tagName === "LI"){
        wrapperEl.innerHTML = null
        const tag = event.target.innerHTML
        if(tag === "All"){
            fetchData(`/products?limit=${perPageCount}&skip=0`, renderProducts,  hideSkeleton)
        }else{
            fetchData(`/products/category/${tag}?limit=${perPageCount}&skip=0`, renderProducts,  hideSkeleton)
        }
    }
})

let offset = 0 

btnSeemoreEl.addEventListener("click", ()=>{
    showSkeleton()
    offset++
    fetchData(`/products?limit=${perPageCount}&skip=${offset * perPageCount}`, renderProducts,  hideSkeleton)
})