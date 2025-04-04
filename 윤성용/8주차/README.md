# Vercel Server Actions에 대해 알아보자

## Vercel Server Actions
Server Actions는 Next.js 13.4에서 도입된 기능으로,
클라이언트와 서버 간의 데이터를 안전하게 처리할 수 있도록 도와주는 새로운 방식이다.

기존의 API Routes 또는 서버 컴포넌트와 달리, 폼(Form) 기반의 상호작용을 매우 직관적으로 처리할 수 있다.

이 기능은 특히 서버 함수 호출을 간소화하면서 보안성과 DX(개발자 경험)를 향상시키기 위해 도입되었다.

## Server Actions는 왜 필요할까?
기존 Next.js에서는 서버와 클라이언트 간의 데이터 처리에 다음과 같은 선택지가 있다.

- API Routes 사용
- getServerSideProps / getStaticProps
- 서버 컴포넌트와 클라이언트 컴포넌트 조합

하지만 이 방식들은 상태 관리와 로직 분리가 어렵고

fetch("/api") 기반이라 DX가 좋지 않으며

자칫 보안 이슈 (클라이언트에 비즈니스 로직 노출) 를 야기할 수 있었다.

그래서 폼 제출처럼 간단한 상호작용을 "보안 + 간결"하게 처리할 수 있는 대안으로 Server Actions가 등장하게 되었다.

## Server Actions의 간략한 사용 방법

1. Server Action 함수 정의
```typescript
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
}
```

2. Form에서 사용
```typescript
<form action={createPost}>
  <input type="text" name="title" placeholder="Title" />
  <button type="submit">작성하기</button>
</form>
```

3. 클라이언트에서 직접 호출하고 싶다면?
```typescript
'use server';
export async function addItem(data: string) {
  await db.todo.create({ data: { content: data } });
}

// Client component
'use client';

import { addItem } from '@/app/actions';

await addItem('새로운 아이템');
```

## 언제 사용하는게 좋을까 ?
- 서버에 데이터를 안전하게 전달하고 싶을 때 (ex. 로그인, DB 저장)

- form 기반의 제출을 간소화하고 싶을 때

- API Route를 만들기엔 너무 과한 단순 요청 처리

- 클라이언트에서 비즈니스 로직 노출을 막고 싶을 때

## 주의 해볼만 한것
- Next.js 14 이상 + app router 필수

- server action은 React의 form 요소에 최적화되어 있음

- 서버 액션은 번들에 포함되지 않으므로 클라이언트에 노출되지 않음

- Node.js runtime에서 동작


## 실무 사용 경험

### 상황
- 프로덕트에서 인증을 처리 하는 토큰을 쿠키에 저장
- 쿠키는 httpOnly로 설정되어 있어 클라이언트에서 접근 불가
- 쿠키 전달이 아닌 헤더에 포함하여 전달을 해야 함
- httpOnly 쿠키는 클라이언트에서 접근 불가

### 해결
위 상황과 같이 토큰이 담긴 쿠키가 httpOnly 설정이 되어 있지만, 클라이언트에서 사용해야 하는 상황이 발생 했다.

XSS 공격을 피하기 위해 httpOnly를 적용하였지만, 클라이언트에서 사용하기 위해 다시 클라이언트 환경에 적용 해야 하는 상황이 생긴것이다.

위 상황대로 적용을 하면 httpOnly 옵션을 사용한 이유가 없어져 Next.js에서 제공하는 Server Actions를 사용하여 해결을 하였다.

### 회고

위 Server Actions를 사용하기 이전 API Routes를 사용하는 것을 고려 해보았지만, 명확한 기준이 없어 판단이 어려웠다.

고민을 많이 했었는데 나름의 기준을 정리 해보자면 Server Actions는 개인, 독단적인 작업을 할 때 사용하고, API Routes는 여러 곳에서 사용해야 할 API를 설계하는 것이 좋다고 생각한다.

기준을 정한 이유는 단순하다. Server Actions는 함수이고, API Routes는 API이기 때문이다.

함수는 컴포넌트 안에서 호출되는 내부적이고 폐쇄적인 로직을 담당하고, API는 외부와의 통신을 위해 열린 인터페이스로 설계되어야 한다.

Server Actions는 클라이언트와 서버 사이의 데이터 흐름을 단순화해주며, form 기반 또는 컴포넌트 내부에서 사용하는 데 특화되어 있어 로컬 스코프의 요구사항을 충족하는 데 적합하다.

반면, API Routes는 Next.js의 pages/api나 app/api 구조를 따르며, 다수의 클라이언트 혹은 외부 서비스와의 통신, RESTful 설계가 필요한 경우 명확하고 재사용 가능한 엔드포인트를 제공한다.

또한 Server Actions는 서버 번들에만 포함되어 클라이언트에 노출되지 않으므로 보안에 유리하며, 사용자가 직접 요청을 구성하지 않아도 되어 DX가 뛰어나다. 

반면 API Routes는 fetch 요청이나 axios를 통한 명시적인 호출이 필요해 더 많은 코드와 상태 관리가 필요하지만, 그만큼 유연성과 확장성이 높다.

결론적으로, Server Actions는 **"개인 맞춤형 기능 또는 페이지 내 비즈니스 로직"**,  
API Routes는 **"여러 곳에서 호출되는 공통 로직 또는 공개 API"** 에 적합하다고 생각하게 되었다.
