// document.body.innerHTML="<h1>hello world</h1>"
//---
const h1= document.createElement("h1");
h1.innerHTML="hello world"
document.body.appendChild(h1)

const div= document.createElement("div");
document.body.prepend(div)
const p= document.createElement("p");
p.innerHTML="hi it's me"
// div.insertBefore(h1,p)

// document.querySelectorAll("p");

//---
document.querySelector("#app").innerHTML = `
  <button type="button" class="hello1">hello1</button>
  <button type="button" class="hello2">hello2</button>
  <button type="button" class="hello3">hello3</button>

  <div>
    <input
  </div>
`;
document.querySelector("button").addEventListener("click",(event)=>{
  console.log(event)
})