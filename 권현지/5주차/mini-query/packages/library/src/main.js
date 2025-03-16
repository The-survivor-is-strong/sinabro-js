export class Miniquery {
  elements;

  constructor(selector,container){
    this.elements = Array.from((container?? document).querySelectorAll(selector))
  }

  length(){
    console.log(this.elements)
    return this.elements.length;
  }

  click(handler){
    console.log('click클릭click클릭click클릭click클릭')

    this.elements.forEach(el=>{
      el.addEventListener("click",handler)
    })
  }
}

export const $ = (selector, container) => {
  return new Miniquery(selector,container);
}