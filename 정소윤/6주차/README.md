# 블로그 링크

https://soyoondaily.tistory.com/entry/%EC%8B%9C%EB%82%98%EB%B8%8C%EB%A1%9C-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-History-API%EC%99%80-SPA-%EB%9D%BC%EC%9A%B0%ED%8C%85

## History API

History API를 사용하면 브라우저 세션 기록에 접근이 가능하고, 이를 조작할 수 있다.

```
history.back(); // 뒤로가기 버튼이랑 동일하게 동작한다.
history.forward(); // 앞으로가기 버튼이랑 동일하게 동작한다.

history.go() // 현재 페이지를 새로고침
history.go(-1) // 현재 페이지 기준 1페이지 이전
history.go(2) // 현재 페이지 기준 2페이지 이후

history.pushState(); // 지정된 경로와 데이터를 브라우저 세션 기록 stack에 추가한다.
history.replaceState(); // 지정된 경로와 데이터를 브라우저 세션 기록 stack의 가장 최근 항목에 업데이트 한다.
```

#### history.pushState(state, unused, url)

- state : state 객체는 history.state를 통해 확인이 가능하다. 하지만 몇몇 브라우저는 state 객체를 사용자의 disk에 저장하는데, 이는 특정 상황에서 예외를 던질 수 있기 때문에 sessionStorage나 localStorage를 사용하는 것이 좋다.
- unused : 사용하지 않는 파라미터이지만 생략될 수는 없기 때문에 빈 문자열을 전달하는 것이 안전하다.
- url : 새로운 history URL이다. 참고로, pushState를 호출했을 때 URL은 변경이 되지만 해당 URL의 화면을 로드하지는 않는다.

## History API와 SPA 라우팅의 관계

위에서 언급한 history의 주요 메서드 중 go, back, forward는 popstate 이벤트를 일으키지만 **pushState, replaceState는 popstate를 일으키지 않는다.** 때문에 pushState를 호출했을 때 url이 바뀌는 것은 보여도 화면에는 아무런 변화가 발생하지 않는다. 개발자 콘솔에서도 간단하게 테스트가 가능한데, 네이버 홈 화면을 띄운 상태에서 개발자 콘솔에 history.pushState를 호출한 경우, URL이 /search로 변경된 것을 확인할 수 있다. 반면에 화면은 네이버 홈 화면에서 아무 변화가 일어나지 않는다.

[##_Image|kage@uKYB2/btsMSXBsjn8/Hgw43V8HIHK1j01kglAuk0/img.png|CDM|1.3|{"originWidth":574,"originHeight":88,"style":"alignCenter"}_##][##_Image|kage@b6TltP/btsMTdcVeio/L3Izi015AnNX4moKP7eDr1/img.png|CDM|1.3|{"originWidth":472,"originHeight":72,"style":"alignCenter"}_##][##_Image|kage@cml5PB/btsMR8RfKoY/o2hda8AJ22m4gO8MtLXeik/img.png|CDM|1.3|{"originWidth":1654,"originHeight":642,"style":"alignCenter"}_##]

이러한 특징으로, **History API는 SPA에서 라우팅을 구현할 때 활용하기 좋다.** URL만 변경하고 세부 내용은 URL에 맞게 부분 업데이트가 가능하기 때문이다.

## 참고 문서

[https://developer.mozilla.org/en-US/docs/Web/API/History_API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

[https://developer.mozilla.org/en-US/docs/Web/API/History/pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)

[https://developer.mozilla.org/en-US/docs/Web/API/History/state](https://developer.mozilla.org/en-US/docs/Web/API/History/state)

[https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event#the_history_stack](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event#the_history_stack)
