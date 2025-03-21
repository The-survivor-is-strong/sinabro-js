# 자바스크립트 비동기

자바스크립트의 비동기에 대해서 조금씩 알아보자.


## 비동기가 등장한 배경
자바스크립트는 싱글 스레드 언어이다. 즉, 한 번에 하나의 작업만 처리할 수 있다.

예를 들어, 두 개의 함수가 있을 때 하나의 함수가 완전히 실행을 마치기 전까지 다음 함수는 실행되지 않는다. 이처럼 코드를 순차적으로 실행하는 방식을 "동기적" 실행이라고 한다.

하지만 동기적 실행은 다음과 같은 문제를 가지고 있다.
  - 네트워크 요청, 파일 입출력, 타이머 등의 작업은 실행 시간이 오래 걸린다면 해당 작업이 완료될 때까지 전체 프로그램이 멈추게 된다.
  - 한 번에 하나의 작업만 처리할 수 있기 때문에, 동시에 여러 작업을 처리해야 하는 경우(UI 업데이트와 백그라운드 데이터 요청) 효율적인 처리가 어렵다.


이러한 문제를 해결하기 위해 비동기 프로그래밍이 등장했다.

비동기 방식에서는 시간이 오래 걸리는 작업을 백그라운드에서 처리하는 동안, 다른 작업은 중단 없이 계속 실행할 수 있다.

예를 들어, 네트워크 요청을 비동기적으로 처리하면, 요청 결과를 기다리는 동안에도 UI는 정상적으로 반응하고, 다른 코드들도 실행 된다.

싱글 스레드인 자바스크립트에서 이러한 동작을 하게 만들어준것이 **이벤트 루프**이다.

콜백 큐(또는 태스크 큐)에 대기 중인 작업들을 순차적으로 실행함으로써, 비동기 작업이 완료된 후 그 결과를 처리할 수 있도록 하게 된것이다.


이러한 처리로 자바스크립트에서는 콜백 함수, Promise, async/await을 통해 쉽게 비동기 처리가 가능해 진것이다.

참고로 이런 비동기 처리들은 마이크로 테스크 큐 에서 처리 한다.

## 기본 원리를 알아보자.

간략하게 콜백 함수 > Promise > async/await이 각각 어떤 문제를 해결하기 위해 나왔을까?

### 콜백 함수
기본 적인 콜백 함수는 아래처럼 사용을 할것이다.

```ecmascript 6
function fetchDataCallback(callback) {
  // 1초 후에 데이터를 반환하는 비동기 작업 시뮬레이션
  setTimeout(() => {
    const data = "Data received via callback";
    callback(data);
  }, 1000);
}

// 콜백 함수를 통해 결과 처리
fetchDataCallback(function(result) {
  console.log(result); // 1초 후 "Data received via callback" 출력
});
```

코드도 이해하기 쉽고 간략해 보이지만 에러 핸들링, API 채이닝이 있을때는 그 유명한 콜백 지옥을 볼 수 있다.

```ecmascript 6
// 콜백이 중첩되어 콜백 지옥에 빠진 예시
fetchUser(function(err, user) {
    if (err) {
        console.error("Error fetching user:", err);
    } else {
        fetchUserPosts(user.id, function(err, posts) {
            if (err) {
                console.error("Error fetching posts:", err);
            } else {
                fetchComments(posts[0], function(err, comments) {
                    if (err) {
                        console.error("Error fetching comments:", err);
                    } else {
                        console.log("Comments for the first post:", comments);
                    }
                });
            }
        });
    }
});

```

### Promise
Promise는 이러한 콜백 지옥 문제를 해결하기 위해 도입되었습니다.

사용법은 간단하게 아래와 같이 사용한다.

```ecmascript 6
function fetchUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("User fetched");
      resolve({ id: 1, name: "Alice" });
    }, 1000);
  });
}

fetchUser().then(user => console.log(user)).catch(e => console.error(e))
```

그럼 위 콜백 함수의 문제를 어떻게 해결 하게 된것일까?

```ecmascript 6

fetchUser()
    .then(user => fetchUserPosts(user.id))
    .then(posts => fetchComments(posts[0]))
    .then(comments => {
        console.log("Comments for the first post:", comments);
    })
    .catch(err => {
        console.error("Error:", err);
    });
```

이전 콜백 지옥과는 다르게 .then()을 통해 결과를 순차적으로 전달받으며 평평한 구조를 유지할 수 있게 되어 코드가 좀 더 가독성이 좋아지고 흐름을 이해하기 쉬워진게 느껴진다.

그러나 잘 사용 하지 못하거나 어쩔 수 없는 요구사항으로 인해 콜백 지옥과 유사한 문제가 발생 할 수 있다.

예를 들어 .then()을 평탄화 하지 못하고 개별 적인 처리가 추가 된 경우 이다.
```ecmascript 6
fetchUser().then(user => {
  fetchUserPosts(user.id).then(posts => {
    fetchComments(posts[0]).then(comments => {
      console.log("Comments for the first post:", comments);
    }).catch(err => {
      console.error("Error fetching comments:", err);
    });
  }).catch(err => {
    console.error("Error fetching posts:", err);
  });
}).catch(err => {
  console.error("Error fetching user:", err);
});
```
각 단계마다 중첩된 .then()과 .catch()를 사용하고 있어, 코드가 복잡해지고 유지보수가 어려워 지는걸 확인 할 수 있다.

물론 Promise는 이러한 상황들을 유연하게 해결해 줄 수 있는 메서드들이 많다.

위 문제를 예로 들어 promise를 한번에 호출 하고 에러 발생시 개별 처리를 할 수 있게 Promise.Promise.allSettled를 사용할 수 있을것이다.

```ecmascript 6
Promise.allSettled([promise1, promise2, promise3])
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                console.log(`Promise ${index} succeeded:`, result.value);
            } else {
                console.error(`Promise ${index} failed:`, result.reason);
            }
        });
    });
```

다만, 아직 콜백 지옥이 발생 할 수 있다는것과 복잡한 비동기를 구현 해야 할때는 흐름 파악에 어려운게 있다.


### async/await
async/await 의 등장으로 콜백 지옥의 문제는 쉽게 해결을 하였고, 비동기 코드를 마치 동기 코드처럼 작성할 수 있도록 도와준다.

기본적인 예시는 아래처럼 사용한다.

```ecmascript 6
async function fetchUserPosts() {
    const result = await fetchUser() 
    return result
}
```
위 처럼 콜백에 대한 문제가 없고 동기 코드 처럼 동작이 되고 읽을 수 있는걸 알 수 있다.

이러한 async/await 도 하나의 문제를 가지고 있었는데, 그것은 성능에 대한 문제였다.

위 예시 함수로 이어서 예시를 들자면 초기 비동기 함수는 하나의 비동기 함수를 생성 하는데 3개의 Promise를 생성 하였다.

```ecmascript 6
// 1. async 함수 자체의 반환값을 Promise로 감싸기 위해 생성 
async function fetchUserPosts() {
    // await 구문에 의해 fetchUser()의 결과를 기다리기 위해 생성
    const result = await fetchUser()
    // 상태 전환 과정에서 내부적으로 추가 Promise가 생성
    return result
}
```

이러한 문제는 마이크로 테스크 큐의 사용량을 늘리고 결국 오버헤드로 이어질 수 있었다.

eslint에서는 이러한 문제를 막고자 no-return-await 룰도 존재 하였다. (지금은 deprecated된 상태 )

no-return-await이 등장한 배경은 아래와 같은 코드일때 성능 문제가 될것을 우려했기 때문이다.

```ecmascript 6
async function foo() {
    return await bar();
}
```

async 함수는 기본적으로 Promise를 반환 하여 만약 bar() 함수 안에서 값을 가져오는것이 아니라면 불필요한 await을 통해 Promise를 하나 더 생성 하고 이것은 마이크로 테스크 큐의 사용량을 늘리게 되었을 것이다.

현재는 이러한 성능 문제가 V8 엔진팀에서 효과적으로 해결 하였기에 deprecated가 되었다고 한다.

그러나 await을 사용시에는 여전히 함수를 멈추고 resolve를 기다리기 때문에 무분별한 return await은 피하는게 맞다고 생각한다.