### 📌 JavaScript Proxy와 성능 향상

JavaScript Proxy는 객체의 동작을 가로채어 수정할 수 있는 강력한 기능을 제공한다. 이를 활용하면 성능을 최적화하거나, 객체 접근을 더욱 세밀하게 제어할 수 있다.



Proxy를 사용하면 객체 프로퍼티 접근 및 변경을 가로채어 원하는 동작을 실행할 수 있다.

```javascript 
const handler = {
  get(target, prop) {
    console.log(`${prop} 프로퍼티에 접근!`);
    return target[prop];
  }
};


const obj = new Proxy({ name: '현지' }, handler);
console.log(obj.name); // 'name 프로퍼티에 접근!' 출력
```
---
### 📌 가상 DOM과 Preact

가상 DOM(Virtual DOM)은 렌더링 최적화를 위해 이전 렌더링 결과와 현재 렌더링하려는 결과를 비교하여 필요한 부분만 업데이트하는 방식이다.

> Preact는 React의 경량화된 버전으로, 빠른 성능을 제공하면서도 React와 유사한 API를 지원한다.

> HTM은 JSX 없이 템플릿 리터럴을 활용하여 React 스타일의 UI를 작성할 수 있도록 돕는 라이브러리이다.

```javascript
import htm from 'htm';
import { h } from 'preact';

const html = htm.bind(h);

console.log(html`<h1 id=hello>Hello world!</h1>`);
// {
//   type: 'h1',
//   props: { id: 'hello' },
//   children: ['Hello world!']
// }
```

JSX를 사용하지 않고도 템플릿 리터럴로 컴포넌트를 구성할 수 있어 유연성이 높다.

가상 DOM을 사용하는 경우, 이전 렌더링 결과를 파싱해둔 객체와 현재 렌더링하려는 객체를 비교하여 변경된 부분만 업데이트한다. 이를 통해 불필요한 DOM 조작을 줄이고 성능을 향상시킬 수 있다.

---

### 📌 CommonJS와 ES Modules의 차이

JavaScript에서는 CommonJS와 ES Modules(ESM) 두 가지 방식으로 모듈을 관리할 수 있다.

> CommonJS (CJS): require()을 사용하여 모듈을 가져오며, module.exports로 내보낸다. Node.js에서 기본적으로 사용되었다.

> ES Modules (ESM): import와 export 키워드를 사용하며, 브라우저와 최신 Node.js 환경에서 지원된다.

#### CommonJS에서 ES Modules 모듈 사용하기

기본적으로 CommonJS에서는 require()을 사용해야 하지만, .cjs 확장자를 사용하면 ES Modules 환경에서도 require()을 지원할 수 있다.

```javascript
// server.cjs
const module = require('./module.mjs');
console.log(module);
```

### 📌 Node.js용 웹 프레임워크: Express

Express는 Node.js 환경에서 서버를 쉽게 구축할 수 있도록 도와주는 웹 프레임워크이다.

핸들러(=미들웨어)를 여러 개 사용할 수 있다. 이를 통해 에러 처리, 요청 변환 등의 기능을 수행할 수 있다.

- 어플리케이션 레벨 미들웨어

모든 요청을 특정 미들웨어가 거치도록 설정할 수 있다.

```javascript
app.use((req, res, next) => {
  console.log('모든 요청에서 실행됩니다.');
  next();
});
```

- 라우팅 레벨 미들웨어
특정 경로에 대해서만 미들웨어를 적용할 수 있다.

```javascript
app.get('/user', (req, res, next) => {
  console.log('유저 페이지에 대한 요청');
  next();
}, (req, res) => {
  res.send('유저 페이지');
});
```


- 정적 파일 서빙 미들웨어
정적 파일(HTML, CSS, 이미지 등)을 읽을 수 있다.
```javascript
app.use(express.static('public'));
```


---
### 📌 CORS (Cross-Origin Resource Sharing)

CORS는 다른 도메인(origin)에서 요청을 보낼 때, 브라우저가 차단하는 보안 정책이다. API 요청을 허용하려면 서버에서 CORS 설정을 추가해야 한다.

CORS 설정 예제 (Express Middleware)

```javascript
import cors from 'cors';
app.use(cors());
```
이 설정을 추가하면 브라우저에서 다른 도메인에서도 API 요청을 보낼 수 있다.

### 📌 Express 배포하기

정적인 웹사이트라면 HTML/CSS/JS 파일을 서버에 업로드하여 배포할 수 있다. 정적페이지와 다르게, express로 작업한 API를 배포하려면 node.js 웹서버가 배포가 되어야함
파일읽기 미들웨어로 빌드된 파일이 있는 dist폴더를 읽어온다! ! 

```javascript
import express from 'express';
const app = express();
app.use(express.static('dist'));
app.listen(3000, () => console.log('서버 실행 중...'));
```

이런 일을 대신해주는 **Serverless Function** 활용

Vercel, Netlify 같은 플랫폼을 사용하면 Express 서버 없이도 API를 배포할 수 있다. 
Serverless Function을 사용하면 서버를 직접 관리하지 않고 배포할 수 있다.

