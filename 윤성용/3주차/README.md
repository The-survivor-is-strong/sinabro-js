# Proxy를 사용 하여 리팩토링 해보기

## Proxy란?
MDN에서는 "Proxy 객체를 사용하면 한 객체에 대한 기본 작업을 가로채고 재정의하는 프록시를 만들 수 있습니다." 라고 설명을 하고 있습니다.

여기서 가장 중요한 내용은 "객체에 대한 기본 작업을 가로채고 재정의"  인거 같습니다. 그럼 코드를 보면서 확인해보독 하겠습니다.

## 기본 예제

```ecmascript 6
const user = {
    name: "Alice",
    age: 25
};

const handler = {
    get(target, prop) {
        console.log(`"${prop}" 프로퍼티에 접근했습니다.`);
        return target[prop];
    },
    set(target, prop, value) {
        console.log(`"${prop}" 프로퍼티를 "${value}"로 변경했습니다.`);
        target[prop] = value;
        return true;
    }
};

const proxyUser = new Proxy(user, handler);

// 값 읽기 (get 동작)
console.log(proxyUser.name);  // "name 프로퍼티에 접근했습니다." → "Alice"

// 값 변경 (set 동작)
proxyUser.age = 30;           // "age 프로퍼티를 '30'으로 변경했습니다."

// 존재하지 않는 속성 접근
console.log(proxyUser.email);  // "email 프로퍼티에 접근했습니다." → undefined

```

위 예제에서 보면 proxyUser.name 을 접근하면 handler get 함수에 콘솔이 노출 되는걸 확인 할 수 있습니다.

또한 proxyUser.age 값을 변경할때 set 함수에 콘솔이 노출 됩니다.

기본 객체를 사용하는것과 다르게 객체의 값을 가져올때는 get 값을 변경할때는 set 함수가 실행하는걸 확인 할 수 있습니다.

이것이 Proxy의 기본 동작이며 "객체에 대한 기본 작업을 가로채고 재정의" 설명을 이해 할 수 있습니다.


## 활용해서 리팩토링 해보기

기존 로직 확인해 보기

```ecmascript 6
export function bindReactiveState({ name, defaultValue }) {
  if (typeof defaultValue !== "object") {
    throw new Error("bindReactiveState supports only object as default value.");
  }

  let value = defaultValue;

  const getter = () => {
    return value;
  };

  const setter = (newValue) => {
    const oldKeys = Object.keys(value);
    const newKeys = Object.keys(newValue);
    const removedKeys = [];
    const changedKeys = [];
    newKeys.forEach((key) => {
      if (value[key] !== newValue[key]) {
        changedKeys.push(key);
      }
    });
    newKeys.forEach((key) => {
      if (!oldKeys.includes(key)) {
        changedKeys.push(key);
      }
    });

    const uniqueChangedKeys = Array.from(new Set(changedKeys));
    uniqueChangedKeys.forEach((key) => {
      const elements = Array.from(
        document.querySelectorAll(
          `[data-subscribe-to='${name}'][data-subscription-path='${key}']`
        )
      );
      elements.forEach((element) => {
        if (element.tagName === "INPUT") {
          element.value = newValue[key];
        } else {
          element.innerHTML = newValue[key];
        }
      });
    });

    value = newValue;
  };

  return [getter, setter];
}
```

useState와 같이 사용 가능하기 위해 개발된 유틸 함수 입니다.

setter 함수를 확인해 보면 이전과 현재의 값을 비교하여 변경된 값을 찾고 DOM 업데이트를 하고 있습니다.

연속적인 반복문과 명령형으로 프로그래밍이 되었기에 코드가 길어지고 가독성이 안좋아 지고 성능에도 영향이 갈 수 있습니다. 

이러한 로직이 들어가게 된 이유는 사용 하는 값이 이전 값과 현재 값이 따로 저장이 되어 있어서겠죠

그럼 Proxy를 사용하여 하나의 값을 변경, 수정 할때 마다 재정의한 get,set 함수로 컨트롤을 하면 어떨까요?

```ecmascript 6
export function bindReactiveState({ name, defaultValue }) {
  if (typeof defaultValue !== "object" || defaultValue === null) {
    throw new Error("bindReactiveState supports only object as default value.");
  }

  const handler = {
    set(target, key, value) {
      if (typeof value === "object" && value !== null) {
        console.warn("bindReactiveState does not support nested objects.");
        return false;
      }

      if (target[key] !== value) {
        const elements = document.querySelectorAll(
          `[data-subscribe-to='${name}'][data-subscription-path='${key}']`,
        );
        elements.forEach((element) => {
          if (element.tagName === "INPUT") {
            element.value = value;
          } else {
            element.innerHTML = value;
          }
        });

        target[key] = value;
      }

      return true;
    },
  };

  const state = new Proxy(defaultValue, handler);

  return state;
}
```

이전 코드와 비교하였을때 확실히 선언형 프로그래밍으로 코드가 짧아지고 가독성이 좋아진것을 볼 수 있습니다.
또한, Object.keys, forEach 등 반복문이 사라져 성능에도 도움이 될것입니다.

사소한 변경사항 일 수 있지만 만약 10000개의 데이터를 반복문을 돌려야 하는 상황이라면 확연한 차이가 느낄 수 있습니다.

## Proxy를 언제 사용하면 좋을까?

여러 방법과 상황들이 있지만 제가 가장 의미있게 생각한것은 상태 관리 입니다.

사실 리액트, 뷰와 같은 이미 강력한 상태 관리 도구들이 있다면, 사용할 필요가 없는 경우가 많이 없겠지만,

위와 같은 예시같이 바닐라 자바스크립트에서 반응형으로 상태 관리를 해야 한다면 아주 매력적인 기술이라고 생각 됩니다.

그 외에도 사용 가능한 순간을 아래와 같을거 같습니다.

1. 데이터 유효성 검사 : set을 감지하여 유효성 체크
2. 로깅 및 디버깅 : set을 통해 값 변경을 자동 기록
3. 기본값 처리	: 존재하지 않는 속성에 대한 기본값 반환
4. 보안 및 권한 관리 : 특정 속성 변경을 차단
5. 자동 데이터 변환	: 값을 저장할 때 자동 변환