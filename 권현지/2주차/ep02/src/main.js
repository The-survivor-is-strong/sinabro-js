

async function main() {
  const response = await fetch('https://learnwitheunjae.dev/api/sinabro-js/ecommerce');
  const data = await response.json();

  document.querySelector("#products").innerHTML= data.map(
    data=> `
      <div class="product">
        <img src="${data.images[0]}">
        <p>${data.name}</p>

        <div class="price"><span>${data.regularPrice}</span>$</div>
        <button id="${data.productNo}">+</button>
        <button>-</button>
      </div>
    `
  ).join('');

  

}

main();