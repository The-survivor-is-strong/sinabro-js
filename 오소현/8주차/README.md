# React에서의 Form 처리 방식

React 애플리케이션에서 사용자 입력을 받기 위한 form은 매우 중요한 역할을 합니다. 전통적인 HTML form과는 다르게, React에서는 form 상태 관리와 유효성 검증을 컴포넌트 내에서 처리할 수 있는 여러 기법이 존재합니다. 이 글에서는 Controlled Components, Uncontrolled Components, 그리고 React Hook Form과 같은 라이브러리를 통한 처리 방식을 심도 있게 다루어 보겠습니다.

## 1. Controlled Components
### 1) 기본 개념
Controlled Components는 form의 각 입력값을 React state로 관리하는 방식입니다. 입력 필드의 값이 state에 의해 관리되므로, 입력값을 즉각적으로 검증하거나 다른 컴포넌트와 연동하여 동적 UI를 구성할 때 유용합니다!

### 2) 코드 예제
아래는 useState를 사용해 form 데이터를 관리하는 기본 예제입니다.

```jsx
import React, { useState } from 'react';

function ControlledForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // 입력값 변경 시 state 업데이트
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // form 제출 시 기본 동작(새로고침) 차단 후 데이터 처리
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('제출된 데이터:', formData);
    // 서버 요청 등의 추가 로직을 구현
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>이름: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>이메일: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit">제출</button>
    </form>
  );
}

export default ControlledForm;
```

### 3) 장단점
#### <장점>

[1] 입력값이 변경될 때마다 state를 업데이트하므로 실시간으로 유효성 검증을 수행할 수 있다.

[2] ]다른 컴포넌트와의 연동이 용이하며, 입력값에 따라 동적으로 UI를 업데이트할 수 있다.

#### <단점>

[1] 매우 많은 입력 필드를 다룰 때, 각 keystroke마다 state 업데이트가 발생하여 리렌더링이 과도하게 일어날 수 있다.

[2] ]간단한 form에도 반복되는 코드가 늘어날 수 있어 관리가 어려울 수 있다.

# 2. Uncontrolled Components
## 1) 기본 개념
Uncontrolled Components는 form의 값을 DOM 자체에서 관리하고, 필요할 때 ref를 통해 값을 추출하는 방식입니다. 이 방법은 form의 상태 관리를 React가 직접 하지 않기 때문에, 간단한 form 처리나 성능 최적화가 필요한 상황에서 유용할 수 있습니다.

## 2) 코드 예제
아래는 useRef를 사용한 간단한 Uncontrolled form 예제입니다.

```jsx
import React, { useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
    };
    console.log('제출된 데이터:', formData);
    // 서버 요청 등의 추가 로직 구현
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>이름: </label>
        <input type="text" name="name" ref={nameRef} />
      </div>
      <div>
        <label>이메일: </label>
        <input type="email" name="email" ref={emailRef} />
      </div>
      <button type="submit">제출</button>
    </form>
  );
}

export default UncontrolledForm;

```

### 3) 장단점
### <장점>

[1] state 업데이트로 인한 리렌더링이 없으므로 성능에 민감한 form에서 유리하다.

[2] 간단한 form이나 레거시 코드와의 통합에 적합하다.

### <단점>

[1] 입력값의 실시간 검증 및 동적 UI 업데이트가 어렵다.

[2]  입력 상태를 컴포넌트 내부에 숨기기 때문에, React의 데이터 흐름 관리와 어긋날 수 있다.

## 3. React Hook Form: 라이브러리를 통한 간편한 form 관리
### 1) 라이브러리 소개
React Hook Form은 성능 최적화와 간결한 API 제공을 목표로 만들어진 form 라이브러리입니다. 내부적으로 Uncontrolled 방식을 사용하여 불필요한 리렌더링을 최소화하면서도, 간단하게 form 상태 및 유효성 검증을 처리할 수 있도록 도와줍니다.

### 2) 기본 사용법
아래 예제는 React Hook Form을 활용한 form 처리 방식을 보여줍니다.

```jsx
import React from 'react';
import { useForm } from 'react-hook-form';

function HookFormExample() {
  // useForm 훅을 통해 register, handleSubmit, errors 등의 객체를 제공받는다.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('제출된 데이터:', data);
    // 서버 요청 등의 추가 로직 구현
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>이름: </label>
        <input
          type="text"
          {...register('name', { required: '이름은 필수 항목입니다.' })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>이메일: </label>
        <input
          type="email"
          {...register('email', {
            required: '이메일은 필수 항목입니다.',
            pattern: {
              value: /^\S+@\S+$/i,
              message: '유효한 이메일을 입력해주세요.',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <button type="submit">제출</button>
    </form>
  );
}

export default HookFormExample;

```
# 3. React Hook Form의 장점
- 내부적으로 uncontrolled 방식을 사용하여 입력값 변경 시 불필요한 리렌더링을 방지합니다.

- register, handleSubmit 등 단 몇 줄의 코드로 form 상태와 유효성 검증을 쉽게 구현할 수 있습니다.

-  복잡한 유효성 검증, 동적 필드 추가, 에러 메시지 커스터마이징 등 다양한 요구사항에 유연하게 대응할 수 있습니다.


# 4 Zod와의 통합을 통한 타입 안전성 보장
React Hook Form은 Zod와 같은 스키마 검증 라이브러리와 통합하여 더욱 강력한 타입 안전성을 제공할 수 있습니다.

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod 스키마 정의
const formSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  age: z.number().min(18, '18세 이상이어야 합니다')
});

function ZodFormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      age: undefined
    }
  });
  
  const onSubmit = (data) => {
    console.log('검증된 데이터:', data);
    // 데이터는 이미 스키마에 맞게 검증되었음
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>이름:</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      
      <div>
        <label>이메일:</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      
      <div>
        <label>나이:</label>
        <input type="number" {...register('age', { valueAsNumber: true })} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      
      <button type="submit">제출</button>
    </form>
  );
}
```

# 4.  라이브러리 비교 및 선택 기준
### React Hook Form
#### [1] 장점
- 성능 최적화 (uncontrolled 컴포넌트 기반)
- 간결한 API
- 최소 리렌더링
- 작은 번들 사이즈
#### [2] 단점
복잡한 상황에서는 커스텀 로직 추가 필요
동적 필드 관리가 Formik보다 약간 복잡할 수 있음


### Redux Form
#### [1] 장점
- Redux 생태계와의 통합
- 상태 관리 일관성

#### [2] 단점
- 무거운 번들 사이즈
- 성능 이슈 (과도한 리렌더링)
- 복잡한 보일러플레이트 코드

# 5. 실제 내코드 

### 1) 폼 컴포넌트 분리 패턴

```jsx
// FormField.jsx - 재사용 가능한 입력 필드 컴포넌트
function FormField({ label, name, register, errors, type = 'text', options = {} }) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} {...register(name, options)} />
      {errors[name] && <p className="error-message">{errors[name].message}</p>}
    </div>
  );
}

// UserForm.jsx - 사용자 정보 폼 컴포넌트
function UserForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField 
        label="이름" 
        name="name" 
        register={register} 
        errors={errors}
        options={{ required: '이름은 필수입니다' }}
      />
      
      <FormField 
        label="이메일" 
        name="email" 
        type="email"
        register={register} 
        errors={errors}
        options={{
          required: '이메일은 필수입니다',
          pattern: {
            value: /^\S+@\S+$/i,
            message: '유효한 이메일을 입력해주세요'
          }
        }}
      />
      
      <button type="submit">저장</button>
    </form>
  );
}
```

### 2) 커스텀 훅으로 분리


```jsx
// useUserForm.js - 사용자 폼 로직을 담당하는 커스텀 훅
function useUserForm(initialData = {}) {
  const { register, handleSubmit, formState, reset, setValue } = useForm({
    defaultValues: initialData
  });
  
  // API 호출 상태 관리
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // API 호출
      await submitUserData(data);
      reset(); // 성공 시 폼 초기화
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors: formState.errors,
    isSubmitting,
    submitError,
    setValue
  };
}

// UserFormComponent.jsx - UI만 담당하는 컴포넌트
function UserFormComponent() {
  const { register, handleSubmit, errors, isSubmitting, submitError } = useUserForm();
  
  return (
    <form onSubmit={handleSubmit}>
      {submitError && <div className="error-banner">{submitError}</div>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '처리 중...' : '저장'}
      </button>
    </form>
  );
}
```

# 6. 마무리!

- Controlled Components는 즉각적인 UI 반영과 상태 동기화에 강점을 보이며,
- Uncontrolled Components는 간단한 form 처리와 성능 최적화에 유리합니다.
- React Hook Form과 같은 라이브러리는 이 두 방식의 장점을 적절히 혼합하여, 효율적이고 유지보수하기 쉬운 form 구현을 가능하게 합니다.
- Zod와 같은 검증 라이브러리를 함께 사용하면 타입 안전성과 검증 로직을 더욱 견고하게 구현할 수 있습니다.

# 7. 참고 자료 
React 공식 문서 - Form
React Hook Form 공식 문서
Zod 공식 문서
Formik 공식 문서