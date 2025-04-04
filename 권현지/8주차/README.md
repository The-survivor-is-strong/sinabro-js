
프론트엔드를 처음 배울 때, HTML에서 `form` 태그는 다음과 같이 작성하곤 했다.

```html
<form action="/save" method="post">
  <input name="title" />
  <button type="submit">저장</button>
</form>
```
이제는 이런 방식의 폼은 거의 사용되지 않는다. 왜 그럴까?
그리고 요즘 많이 사용하는 react-hook-form 같은 라이브러리는 어떤 점에서 유리할까?
이번 포스트에서는 과거의 전통적인 방식부터 현대적인 폼 처리 방식까지 직접 구현하며 이해해본다.

---

## 1. 고전 HTML Form 방식은 어떻게 작동하는가?

HTML에서 form 태그에 action과 method를 지정하면, 사용자가 입력한 데이터를 서버로 직접 전송할 수 있다.

<form action="/save" method="post">
  <input name="title" />
  <button type="submit">제출</button>
</form>

```html
<form action="/save" method="post">
  <input name="title" />
  <button type="submit">제출</button>
</form>
```

>type="submit"은 버튼의 기본값이지만, 명시하지 않으면 브라우저나 JS 환경에 따라 동작 오류가 발생할 수 있어 명시해주는 것이 좋다.

제출 시 페이지가 새로고침되며, 입력된 데이터가 POST 방식으로 서버(/save)에 전송된다.

서버 측에서는 formidable 같은 모듈을 사용해 요청을 파싱할 수 있다.
![image](https://github.com/user-attachments/assets/95c54f1e-7121-4675-afa0-b9746fe03548)

---

## 2. 브라우저에서 Form 데이터 가져오는 방법

JS를 사용해 폼 데이터를 수동으로 다루려면 다음과 같은 방식이 있다.

### querySelector().value 방식
```javascript
const title = document.querySelector('input[name="title"]').value;
```
### FormData 객체를 활용한 방식
https://developer.mozilla.org/ko/docs/Web/API/FormData 
```javascript
const form = document.querySelector('form');
const formData = new FormData(form);
console.log(formData.get('title'));

```
![image](https://github.com/user-attachments/assets/e46d8104-3057-461d-9e72-009e9a117e4a)

---

## 3. 기본 동작을 막아야 할 때 - event.preventDefault()

SPA에서는 폼 제출 시 전체 페이지가 새로고침되는 기본 동작을 막아야 한다.
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault(); // 기본 제출 동작 방지
  // 이후 JS로 데이터 처리
});
```
---

## 4. React에서는 왜 react-hook-form을 사용하는가?

React 환경에서는 `<form>`을 직접 다루기보다는, 상태 관리, 유효성 검사, 렌더링 최적화를 고려해 `react-hook-form`을 사용하는 경우가 많다.

>주요 장점
>
>	•	uncontrolled 방식 기반이라 불필요한 리렌더링이 발생하지 않는다.
>
>	•	간결한 코드로 다양한 기능을 구현할 수 있다.
>
>	•	다양한 유효성 검사 방식 및 커스터마이징이 가능하다.

---

## 5. zod와의 조합
https://github.com/colinhacks/zod?tab=readme-ov-file#basic-usage 

폼 유효성 검사에는 zod와 같은 스키마 기반의 라이브러리가 유용하다.
```javascript
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "제목은 필수입니다"),
});
```

오류 메시지도 자동으로 생성할 수 있어 사용자 경험 향상에도 도움이 된다.

---

## 6. 라이브러리를 직접 만든다면? 오피니언 vs 커스터마이징

직접 라이브러리를 설계한다면 사용자에게 많은 선택권을 주어 유연하게 만들지, 정해진 설계형태로만 사용하도록 강제할지에 대해 고민 해보아야한다. 

| 구분 | 설명 | 
| - | - | 
| 오피니언 (Opinionated) | 설계 방향이 정해져 있어 사용자는 빠르게 적용 가능하지만 유연성이 떨어진다. |
| 커스터마이징 (Customizable) | 다양한 상황에 맞춰 조정 가능하지만 구현이 복잡하고 러닝커브가 존재한다. |


예를 들어, HTML 구조나 이벤트 처리 방식까지 라이브러리가 강제하면 초보자에겐 편하겠지만 고급 사용자에게는 오히려 불편할 수 있다.
따라서, 기본 구조를 제공하되 너무 많은 부분에서까지 강제한다면 유연성이 떨어질 수 있으므로 사용자 확장이 불편함없이 가능한 형태로 만드는 것이 이상적이다. ~~뭐든 적당한게 가장 좋다..~~

---

고전적인 `<form>` 방식도 알아야 현재의 SPA 패턴을 더 잘 이해할 수 있다.
React 시대에도 결국 본질은 같다.

_“데이터를 입력받고, 검증하고, 적절한 방식으로 제출하는 것.”_

직접 구현해보며 본질을 이해하고 나면, react-hook-form도 개발의 리소스를 줄이는 도구일 뿐이라는 사실을 체감하게 된다.
