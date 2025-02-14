// document.body.innerHTML = "<h1>Hello World</h1><h1>Hello World</h1>";

// const h1 = document.createElement("h1");
// h1.innerText = "Hello World1";
// h1.style.color = "red";
// h1.classList.add("title");
// h1.classList.remove("title");
// document.body.appendChild(h1);
// // document.body.prepend(h1); // 제일 앞에 붙이는거

// const p = document.createElement("p");
// p.innerText = "I am soyoon";
// document.body.insertBefore(p, h1); // h1 앞에 붙이는거

// document.querySelector("#app").innerHTML = `
//   <p>Hello1</p>
//   <p>Hello2</p>
//   <p>Hello3</p>
// `;

// console.log(document.querySelectorAll("p"));
// const ps = document.querySelectorAll("p");
// ps[0];
// ps[1];
// ps.length;
// const convertedNodeList = Array.from(document.querySelectorAll("p")); // NodeList를 Array로 변환하는 방법
// // NodeList는 Array가 아니지만 닮아있음
// // NodeList는 Array가 아니기 때문에 Array의 메소드를 사용할 수 없음. sort, at, ...

// const array = [1, 2, 3, 4, 5];
// console.log(array.at(2)); // 3

// document.querySelector("#app").innerHTML = `
//   <button type="button" class="hello1">Check the input</button>
//   <button type="button" class="hello2">Hello2</button>
//   <button type="button" class="hello3">Hello3</button>

//   <div>
//     <input class="name" placeholder="Type your name:" />
//   </div>

//   <div class="parent-of-button">
//     <button type="button" class="helloworld-button">
//       <span>Hello</span>
//       <span>World</span>
//     </button>
//   </div>
// `;
// document.querySelector("button").addEventListener("click", (event) => {
// 	console.log(event); // 첫번째 버튼에만 이벤트가 등록됨
// 	const input = document.querySelector(".name");
// 	console.log(input.value);
// });

// // 💡 change, input 차이
// // 다 쓰고 벗어났을 때만 이벤트 실행됨
// document.querySelector(".name").addEventListener("change", (event) => {
// 	console.log("onChange", event.target.value);
// });
// // 수정할 때마다 이벤트 실행됨
// document.querySelector(".name").addEventListener("input", (event) => {
// 	console.log("onInput", event.target.value);
// });

// document.querySelector(".helloworld-button").addEventListener("click", (event) => {
// 	event.stopPropagation();
// 	console.log("event from button", event);
// });

// document.querySelector(".parent-of-button").addEventListener("click", (event) => {
// 	console.log("event from div", event);
// });

// document.querySelector(".name").addEventListener("keyup", (event) => {
// 	console.log("input keyup", event);
// });

// document.body.addEventListener("keyup", (event) => {
// 	console.log(event.key);
// });

// let count = 0;
// setInterval(() => {
// 	count += 1;
// 	document.querySelector("#app").innerHTML = `
//     <input/>
//     <button>Click</button>
//     <p>count: ${count}</p>
//   `;
// }, 5000);

document.querySelector("#app").innerHTML = `
  <button class="btn-add-card" type="button">Add card</button>

  <div class="cards"></div>
`;

let cardCount = 0;
document.querySelector(".btn-add-card").addEventListener("click", () => {
	cardCount += 1;
	const card = document.createElement("div");
	card.className = "card";
	card.innerHTML = `
    <p>Card #${cardCount}</p>  
    <button class="btn-hello" type="button" data-number="${cardCount}">hello</button>
  `;

	const myCardCount = cardCount;
	card.querySelector(".btn-hello").addEventListener("click", () => {
		console.log(`💡 hello! ${myCardCount}`);
	});
	document.querySelector(".cards").appendChild(card);
});

document.querySelector(".cards").addEventListener("click", (event) => {
	const maybeButton = event.target;
	if (event.target.matches(".btn-hello")) {
		// const cardName = maybeButton.parentElement.children[0].innerText;
		// console.log("button is clicked", cardName);
		console.log(maybeButton.getAttribute("data-number"));
	}
});

// 💡 브라우저에서 요소 선택 후 $0 입력 시 해당 요소가 선택됨
