# [5] DOM_API_대량의_이벤트_처리

웹 개발에서 대량의 DOM 요소에 이벤트 리스너를 효율적으로 관리하는 방법은 성능 최적화와 연관성이 높은데요, 이번 글에서는 여러 카드 요소에 이벤트 리스너를 추가하고, 이벤트 처리를 위한 다양한 접근법을 탐구해 보겠습니다.

## 동적 요소에 이벤트 리스너 추가하기

예를 들어, 사용자가 '카드 추가' 버튼을 클릭할 때마다 새로운 카드가 화면에 추가되고, 각 카드에 특정 기능을 수행하는 버튼이 포함된다고 가정해 볼게요. 이 경우, 각각의 새로운 버튼에 개별적으로 이벤트 리스너를 추가하는 것은 비효율적일 수 있다고 해요. 그래서 아래와 같은 방법으로 작성해보았습니다.

1. **이벤트 위임 사용**: 하나의 공통된 상위 요소에 이벤트 리스너를 추가하고, 이벤트가 발생했을 때 이벤트 타겟의 종류를 체크하여 적절한 동작을 수행하게 합니다. 이 방식은 메모리 사용을 줄이고, 동적으로 요소가 추가되거나 제거될 때 이벤트 리스너를 재할당할 필요가 없어 성능을 개선할 수 있습니다.

```js
document.querySelector('.card-container').addEventListener('click', function(event) {
    if (event.target.matches('.button-class')) {
        // 버튼 클릭 시 실행할 코드
    }
});
```

## 클로저를 활용한 이벤트 데이터 관리

각 이벤트 리스너 내에서 특정 데이터(예: 카드 인덱스)에 접근해야 할 경우, 클로저를 사용하여 해당 데이터를 이벤트 리스너와 연결할 수 있습니다. 이 방법은 각 버튼에 대한 정보를 보존하면서도, 그 정보가 외부에서 쉽게 변경될 수 없도록 캡슐화합니다.

```js
function createCard(index) {
    const button = document.createElement('button');
    button.textContent = '카드 ' + index;
    button.addEventListener('click', function() {
        alert('카드 ' + index + '가 클릭됐습니다');
    });
    document.body.appendChild(button);
}

```
#### 데이터 속성 활용

HTML5의 데이터 속성(`data-*`)을 활용하여 요소에 추가 정보를 저장할 수 있습니다. 이벤트가 발생했을 때 쉽게 접근할 수 있으며, 동적으로 생성된 요소의 상태나 속성을 유지하는 데 유용하게 사용될 수 있습니다.

```js
button.dataset.index = index;
document.querySelector('.card-container').addEventListener('click', function(event) {
    if (event.target.dataset.index) {
        console.log('카드 ' + event.target.dataset.index + ' 클릭됨');
    }
});

```


대량의 요소에 이벤트 리스너를 효율적으로 관리하는 방법은 웹 애플리케이션의 성능에 큰 영향을 미칩니다. 이벤트 위임, 클로저, 데이터 속성을 적절히 활용하여 리소스를 절약하고, 유지보수가 용이하며, 확장 가능한 코드를 작성하는 게 중요해보여요!