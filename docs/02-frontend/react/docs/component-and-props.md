---
layout: post
title: "🧩 컴포넌트와 Props"
date: 2026-03-27
categories: [React]
tags: [컴포넌트, Props, 함수컴포넌트, 클래스컴포넌트, 합성]
nav_exclude: true
---

> 리액트 컴포넌트는 Props(입력)를 받아 React Element(출력)를 반환하는 순수 함수.
> Props는 읽기 전용(Read-Only)이며, 단방향 데이터 흐름을 통해 예측 가능한 UI를 만든다.

---

## 컴포넌트란?

- **입력(Input)**: Props (자바스크립트 객체)
- **출력(Output)**: React Element (가상 DOM 객체)
- **붕어빵 틀**: 내부 로직은 고정, props에 따라 다른 결과물 생성
- **재사용성**: 동일 로직으로 props만 바꿔 수만 개의 UI 생성 가능
- **조립성(Composition)**: 작은 컴포넌트(레고 블록)들을 조합해 거대한 페이지 구성

---

## Props의 핵심 원칙: Read-Only

> [!IMPORTANT]
> Props는 절대로 수정할 수 없다. 자식 컴포넌트 내부에서 직접 수정 시 리액트의 상태 추적 알고리즘이 깨진다.

- 수정하고 싶다면 부모 컴포넌트에서 **새로운 props 객체**를 내려보내 Re-render 유발

---

## 함수 컴포넌트 vs 클래스 컴포넌트

| 구분 | 함수 컴포넌트 | 클래스 컴포넌트 |
| :--- | :--- | :--- |
| 방식 | 순수 함수 | `React.Component` 상속 |
| Props 접근 | `props.name` | `this.props.name` |
| 상태 관리 | `useState` Hook | `this.state` + `setState` |
| 현재 표준 | ✅ **현대 표준** | 레거시 |

```jsx
// 함수 컴포넌트 (현대 표준)
function Welcome(props) {
  return <h1>안녕, {props.name}</h1>;
}

// 클래스 컴포넌트 (레거시)
class Welcome extends React.Component {
  render() {
    return <h1>안녕, {this.props.name}</h1>;
  }
}
```

---

## 대문자 규칙

```jsx
<div />       // HTML 태그 → 문자열 'div'로 전달
<Welcome />   // 리액트 컴포넌트 → 변수 참조로 전달
```

> [!WARNING]
> `<welcome />` 처럼 소문자로 쓰면 HTML 커스텀 태그로 오해하여 에러 발생

---

## 컴포넌트 합성 (Composition)

```jsx
function Welcome(props) {
  return <h1>안녕, {props.name}님!</h1>;
}

function App() {
  return (
    <main>
      <Welcome name="고은" />
      <Welcome name="인재" />
    </main>
  );
}
```

---

## JSX에서 `( )` 괄호가 필요한 경우

```jsx
// ❌ ASI 문제 - undefined 반환
return
  <div><h1>안녕</h1></div>;

// ✅ 괄호로 하나의 표현식임을 명시
return (
  <div>
    <h1>안녕</h1>
  </div>
);
```

---

[🔙 뒤로 가기](../index.md)
