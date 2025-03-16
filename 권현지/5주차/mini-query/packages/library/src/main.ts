export class Miniquery {
  private elements: Element[];

  constructor(selector:string,container?:Element){
    this.elements = Array.from((container?? document).querySelectorAll(selector))
  }

  length(){
    console.log(this.elements)
    return this.elements.length;
  }

  click(handler:EventListener){
    this.elements.forEach(el=>{
      el.addEventListener("click",handler)
    })
  }
}

export const $ = (selector:string, container?:Element) => {
  return new Miniquery(selector,container);
}