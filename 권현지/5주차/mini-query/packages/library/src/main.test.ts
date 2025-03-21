import {describe, expect, it,vi} from 'vitest'
import {$} from './main'

describe('Miniquery', ()=>{
  it('does noting', ()=> {
    expect(true).toBe(true)
  })
})

it("length 잘 가져오나 확인", ()=> {
  const div = document.createElement("div");
  div.innerHTML = `
  <button class="btn" type="button">button1</button>
  <button class="btn" type="button">button2</button>
  <button class="btn" type="button">button3</button>
  `;
  expect($(".btn",div).length()).toBe(3);
})

it("click event ontime click",()=>{
  const div = document.createElement("div");
  div.innerHTML = `
  <button class="btn" type="button">button1</button>
  <button class="btn" type="button">button2</button>
  <button class="btn" type="button">button3</button>
  `;
  const handler = vi.fn();
  $(".btn",div).click(handler);
  (div.querySelectorAll(".btn")[0] as HTMLElement).click();
  expect(handler).toBeCalledTimes(1)
})