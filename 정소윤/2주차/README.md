# 블로그 링크

https://soyoondaily.tistory.com/entry/%EC%8B%9C%EB%82%98%EB%B8%8C%EB%A1%9C-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%85%EB%A0%B9%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-vs-%EC%84%A0%EC%96%B8%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D

# 블로그 내용

['시나브로 자바스크립트'](https://www.inflearn.com/course/%EC%8B%9C%EB%82%98%EB%B8%8C%EB%A1%9C-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8) 강의 중 쇼핑몰 만들기 섹션을 수강하며 반복적으로 나왔던 내용이 명령형 프로그래밍과 선언형 프로그래밍이었다. 프론트엔드 개발을 하다 보면 "선언형 프로그래밍을 해야 된대"라는 말을 자주 들었는데, 도대체 왜 이런 말이 자주 나오는지를 이해하려면 두 가지의 차이점에 대해 한번 정리할 필요가 있겠다는 생각이 들었다.

흔히 명령형 프로그래밍과 선언형 프로그래밍에 대해 검색을 하고 여러 블로그 글을 찾아보면 아래와 같이 간단하게 정리할 수 있다.

> 명령형 프로그래밍은 '어떻게(How)' 하는지,  
> 선언형 프로그래밍은 '무엇을(What)' 하는지에 초점이 맞춰져 있다.

이 말이 잘 와닿지 않을 수 있는데, 실생활에서의 상황을 바탕으로 예를 들자면 아래와 같이 나눌 수 있다.

---

#### **\[스타벅스까지 어떻게 가나요?\]**

- 명령형 : ㅇㅇ역 1번 출구로 나와서 ㅇㅇ을 끼고 우회전하세요. ㅇㅇ편의점이 보일 때까지 걸어가다 보면 ㅇㅇ이 보이는데, (블라블라) 그런 다음 좌회전 하시면 스타벅스에 도착할 수 있습니다.
- 선언형 : 12345, 서울 ㅇㅇ구 ㅇㅇ동 12-34입니다.

#### **\[청소\]**

- 명령형 : 테이블을 닦고 ➡️ 바닥 쓸고 ➡️ 청소기를 돌리고,...
- 선언형 : 집을 깨끗하게 만들고 싶어. (청소업체, 로봇청소기가 알아서 진행)

#### **\[라면 끓이기\]**

- 명령형 : 냄비에 물을 담는다 ➡️ 건더기를 넣는다 ➡️ 스프를 넣는다 ➡️ 면을 넣는다,...
- 선언형 : 라면 먹고 싶어. (배달 어플에서 주문)

---

예시에서 볼 수 있듯이, 명령형은 특정 일을 하기 위한 자세한 과정들을 명확하게 단계별로 나타내고 있고, 선언형은 어떤 것을 원하는지 결과만 요청한다. 이를 자바스크립트 코드로 비교하면 아래와 같다. 명령형 코드는 결과값을 얻기 위한 과정을 직접 나타내고 있고, 선언형 코드는 map 메서드를 활용하여 무엇을 하고 싶은지만 콜백에 넣어주면 원하는 결과물이 반환된다.

```
// 명령형 코드
const numbers = [1, 2, 3, 4, 5];
const squared = [];
for (let i = 0; i < numbers.length; i++) {
  squared.push(numbers[i] * numbers[i]);
}
console.log(squared); // [1, 4, 9, 16, 25]

// 선언형 코드
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(n => n * n);
console.log(squared); // [1, 4, 9, 16, 25]
```

## 명령형 프로그래밍 vs 선언형 프로그래밍

명령형 프로그래밍은 개발자가 직접 동작을 관리하기 때문에 복잡한 알고리즘을 구현할 때 유리할 수는 있지만 코드가 방대해질 가능성이 있고, 가독성이 떨어질 가능성이 있다. 반면, 선언형 프로그래밍은 map, filter처럼 무엇을 해야 하는지에 대해 초점을 두고 있기 때문에 가독성이 높아지고 재사용성이 향상되지만 최적화는 어려울 수 있다.

간단한 예로, 알고리즘을 풀다 보면 for문을 사용하여 처리할 수 있는 로직을 map, filter, reduce 등의 메서드를 사용해서도 풀 수 있는 경우가 있다. 메서드를 사용하면 각 메서드의 역할이 명확하기 때문에 가독성은 높아질 수 있지만 경우에 따라 처리 속도에 큰 차이가 발생할 수 있다. for문으로 한 번만 순회할 수 있는 로직을 여러 번 순회해야 하기 때문이다.

React에서 선언형 방식을 사용한다고 하는데, 그 이유는 바닐라 JavaScript를 사용해서 직접 DOM을 조작하는 경우와 비교하면 좀 더 직관적으로 비교할 수 있다.

#### **명령형 : 바닐라 JavaScript로 직접 DOM을 조작**

```
// 단계별로 DOM을 조작하고 이벤트 리스너를 직접 설정
// p 태그 생성 및 추가, 버튼 추가까지 모든 단계를 직접 설정하고 있음

const button = document.createElement("button");
button.textContent = "클릭버튼";
button.addEventListener("click", () => {
  const message = document.createElement("p");
  message.textContent = "Hello, World!";
  document.body.appendChild(message);
});
document.body.appendChild(button);
```

#### **선언형 : React를 사용하여 상태 선언**

```
// message 상태가 존재할 경우 화면에 렌더링할 수 있도록 선언
// 렌더링도 직접 다루지 않고, UI가 자동으로 동기화되기 때문에 선언적임

import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  return (
    <div>
      <button onClick={() => setMessage("Hello, World!")}>Click Me</button>
      {message && <p>{message}</p>}
    </div>
  );
}
```

예시에 있는 것처럼 명령형 방식을 사용할 경우, 상태가 변경될 때마다 UI를 직접 갱신해주어야 한다. 코드가 길어지게 되면 점차 지저분해지는 것은 물론, 가독성이 낮아 관리하기도 어려워진다. 하지만 이걸 React를 사용했을 때 간결하고 직관적으로 나타낼 수 있다. 결국, 프론트엔드는 UI 업데이트와 밀접하게 연관되어 있기 때문에 명령형 프로그래밍 방식보다는 선언형 프로그래밍이 훨씬 효율적이다.

## 참고자료

[https://www.inflearn.com/course/%EC%8B%9C%EB%82%98%EB%B8%8C%EB%A1%9C-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8](https://www.inflearn.com/course/%EC%8B%9C%EB%82%98%EB%B8%8C%EB%A1%9C-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)

[https://ui.dev/imperative-vs-declarative-programming](https://ui.dev/imperative-vs-declarative-programming)

[https://f-lab.kr/insight/imperative-vs-declarative-programming-in-frontend-development](https://f-lab.kr/insight/imperative-vs-declarative-programming-in-frontend-development)
