import { fetchData } from "./main.js"
const boxEl = document.querySelector(".box")
const params = new URLSearchParams(location.search)

function renderRecipeDetail (data){
  boxEl.innerHTML = `
     <div class="product-card">
    <div class="product-images">
      <img src="${data.thumbnail}" alt="Thumbnail" class="thumbnail" />
    </div>
    <div class="product-info">
      <h2>SKU: ${data.sku}</h2>
      <p><strong>Weight:</strong> ${data.weight} kg</p>
      <p><strong>Dimensions:</strong> ${data.dimensions.width} x ${data.dimensions.height} x ${data.dimensions.depth} cm</p>
      <p><strong>Warranty:</strong> ${data.warrantyInformation}</p>
      <p><strong>Shipping:</strong> ${data.shippingInformation}</p>
      <p><strong>Availability:</strong> ${data.availabilityStatus}</p>
      <p><strong>Return Policy:</strong> ${data.returnPolicy}</p>
      <p><strong>Minimum Order Quantity:</strong> ${data.minimumOrderQuantity}</p>
      <div class="meta-info">
        <p><strong>Created At:</strong> ${new Date(data.meta.createdAt).toLocaleDateString()}</p>
        <p><strong>Updated At:</strong> ${new Date(data.meta.updatedAt).toLocaleDateString()}</p>
        <p><strong>Barcode:</strong> ${data.meta.barcode}</p>
        <img src="${data.meta.qrCode}" alt="" class="qr-code" />
      </div>
    </div>
  </div>
  `
}

window.onload = ()=>{
  const id = params.get("id")
  fetchData(`/products/${id}`,renderRecipeDetail, ()=>{} )

}
