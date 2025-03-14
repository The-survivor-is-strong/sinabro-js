# 블로그 링크

## 1. Array 메서드 정리

### 1.1 filter

특정 조건을 만족하는 요소들만 걸러내는 메서드입니다.

원본 배열을 변경하지 않고 새로운 배열을 반환합니다.

```javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]
```
### 1.2 map

1:1 매핑이 필요할 때 사용하는 메서드입니다.

입력 배열의 길이가 유지되며 각 요소를 변환하여 새로운 배열을 생성합니다.

```javascript
const numbers = [1, 2, 3];
const squaredNumbers = numbers.map(num => num * num);
console.log(squaredNumbers); // [1, 4, 9]
```
### 1.3 reduce

배열을 축약하여 단일 값으로 변환하는 메서드입니다.

누적값(accumulator)을 활용하여 원본과 다른 형태의 데이터를 생성할 수 있습니다.

```javascript
const sum = [0, 1, 2, 3, 4].reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(sum); // 10
```
accumulator: 지금까지의 누적 값

currentValue: 현재 처리중인 요소의 값

- reduce를 사용하는 이유
  - 배열을 특정 형식으로 변환하거나 집계할 때 직관적으로 표현할 수 있습니다.
  - forEach보다 코드의 의도를 명확히 전달할 수 있습니다.

```javascript
const shows = [
  { title: "Show1", rating: 8.5 },
  { title: "Show2", rating: 7.8 },
  { title: "Show3", rating: 9.1 }
];
// shows라는 배열을 특정 형식으로 변환하는 등의 작업을 직관적으로 수행할 수 있음.
const ratingSum = shows.reduce((acc, show) => acc + show.rating, 0);

console.log(ratingSum); // 25.4
```
## 2. Set

유니크한 값들만 저장할 수 있는 자료구조입니다.

중복 요소 제거를 간편하게 처리할 수 있습니다.
```javascript

const numbers = [1, 2, 2, 3, 3, 4];

const uniqueNumbers = new Set(numbers);

console.log([...uniqueNumbers]); // [1, 2, 3, 4]
```
### 2.1 Set의 시간 복잡도

Set.has(value), Set.add(value), Set.delete(value)는 O(1)의 시간 복잡도를 가짐.

(`includes`등을 사용할 때는 모두 체크 해야하니 O(n)의 시간 복잡도를 가짐. Set이 더 빠르다. )

## 3. Boolean 함수

JavaScript에서 Boolean()을 사용하면 값이 true인지 false인지 판별할 수 있습니다.
```javascript

console.log(Boolean(""));    // false (빈 문자열)

console.log(Boolean(0));     // false

console.log(Boolean(null));  // false

console.log(Boolean([]));    // true (빈 배열)

console.log(Boolean({}));    // true (빈 객체)
```
## 4. 기타 유용한 기능

### 4.1 원본 데이터 변경 없이 map 사용하기

깊은 복사(deep copy)를 통해 원본을 건드리지 않고 새로운 배열을 만들 수 있습니다.
```javascript

const original = [{ id: 1 }, { id: 2 }];

const copy = original.map(obj => ({ ...obj }));

console.log(copy); // [{ id: 1 }, { id: 2 }]
```
### 4.2 날짜 포맷

Intl.DateTimeFormat을 사용하여 날짜를 특정 지역의 형식으로 변환할 수 있습니다.
```javascript
const date = new Date();
const formattedDate = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(date);
console.log(formattedDate); // 예시: 2025년 3월 7일
```
---
## JavaScript 비동기 처리: 콜백에서 Promise, async/await까지
### 1. 콜백에서 Promise로

- 콜백 방식 : JavaScript에서는 비동기 처리를 위해 콜백(callback)을 사용했으나, 콜백이 깊어지면 콜백 지옥(callback hell)이 발생합니다.

- Promise 방식 : Promise는 콜백 지옥을 해결하고, 비동기 작업의 성공 또는 실패 여부를 명확히 처리할 수 있게 도와줍니다.

```javascript
const myPromise = new Promise((resolve, reject) => {
  if (success) resolve("성공!");
  else reject("실패!");
});
```
- Node의 util.promisify
  - Node.js에서 제공하는 util.promisify를 사용하면 기존 콜백 기반 함수를 손쉽게 Promise로 변환할 수 있습니다.
```javascript
const util = require('util');
const fs = require('fs');

const readFilePromise = util.promisify(fs.readFile);
readFilePromise('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```
### 2. async/await로 Promise 간단히 사용하기

async와 await를 사용하면 Promise를 더욱 쉽게 사용할 수 있습니다. Vite와 같은 최신 번들러는 기본적으로 최신 브라우저를 타겟팅합니다.

```javascript
async function fetchData() {
  try {
    const data = await fetch('https://api.example.com');
    const json = await data.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}
```
주의: 특정 환경에서 최상위 레벨에서의 await 사용은 제한적일 수 있습니다. `(top level await Error)` -> 이때는 async 함수 내에서 사용해야 합니다.

### 3. 여러 개의 Promise 다루기 (Promise.all vs Promise.allSettled)

`Promise.all`
여러 개의 Promise를 동시에 처리할 때 사용하며, 하나라도 실패하면 즉시 중단됩니다.

```javascript
Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // 모든 프로미스가 성공하면 실행
  })
  .catch(error => {
    console.error(error); // 하나라도 실패하면 실행
  });
```
`Promise.allSettled`모든 Promise가 성공/실패 여부와 상관없이 완료될 때까지 기다립니다.

```javascript
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    results.forEach(result => console.log(result));
  });
```

나의 의문 : Promise.allSettled은 중간에 에러가 발생해도 남은 프로미스를 계속 처리하면, catch()의 역할이 없지않나 ? 
에 대한 서칭: [https://stackoverflow.com/questions/72074735/catch-is-not-handling-rejection-of-promise-in-case-multiple-javascript-promise](https://stackoverflow.com/questions/72074735/catch-is-not-handling-rejection-of-promise-in-case-multiple-javascript-promise)

### 4. ESLint 규칙 - 논의해볼만하지않을까 ?

no-return-await: await을 사용해 리턴하는 것을 금지 (Promise를 직접 리턴하는 게 더 효율적).
[ESLint 문서](https://eslint.org/docs/latest/rules/no-return-await)

require-await: async 함수 내에서 await을 필수로 요구.
[TypeScript ESLint 문서](https://typescript-eslint.io/rules/require-await/)



# 회고
문제해결을 위한 선택폭이 넓어진거같다. 
foreach로 쓰면 되는데 굳이 왜 map, filter같은게 생겨났을까? 했는데 이름 자체로 의도를 즉각적으로 파악가능해서 개발자에게 힌트같은 존재라는 걸 알 수 있었다. 
코드의 설탕같은 존재! (Syntactic sugar(문법적 설탕))

예전에 회사 코드에서 res-rej-then-catch로 되어있는 코드를 리팩토링 했던 기억이 난다.! 

```javascript
// as-is
const getUserInfo = (): Promise<UserMainInfo> => {
		return new Promise((res, reject) => {
			SET_USER_MAIN_INFO()
				.then(() => {
					res(userMainInfo.value as UserMainInfo);
				})
				.catch(error => {
					reject(error);
				});
		});
	};
// to-be
const getUserInfo = async (): Promise<UserMainInfo> => {
		await SET_USER_MAIN_INFO();
		return userMainInfo.value as UserMainInfo;
	};
```

[[Javascript] 비동기, Promise, async, await 확실하게 이해하기](>https://springfall.cc/article/2022-11/easy-promise-async-await
)
 
>요약하자면 모든 비동기 동작을 async 함수로 만들 수 있지 않지만, (resolve 호출에 대해 관여할 수 없는경우..등)
>then,catch로 fulfilled 상태의 코드와 rejected 상태의 코드를 분리하던 promise를 
>await/async 를 사용하게되면 하나의 흐름 속에서 동기코드처럼 작성할 수 있어 가독성이 좋아지는거같아요. 
 >되도록 async-await 을 사용하고, 불가피한 곳에서 어쩔 수 없이 resolve-reject-then-catch 을 사용하는것도 일관된 스타일로서의 클린코드가 될 수 있겠네요! 
 