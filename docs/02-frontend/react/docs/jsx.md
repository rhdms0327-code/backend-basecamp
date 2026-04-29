---
layout: post
title: "💛 JSX 문법 완전 정복"
date: 2026-03-26
categories: [React]
tags: [JSX, Babel, createElement, 문법]
nav_exclude: true
---

> JSX는 리액트 팀이 만든 자바스크립트 확장 문법으로, 컴파일 시 `React.createElement()` 호출로 변환된다.
> HTML처럼 보이지만 실제로는 자바스크립트 객체(리액트 엘리먼트)를 생성하는 문법이다.

---

## JSX란?

```jsx
// JSX 코드
const element = <h1 className="title">Hello!</h1>;

// Babel이 변환한 실제 JS
const element = React.createElement('h1', { className: 'title' }, 'Hello!');
```

브라우저는 JSX를 이해하지 못하므로 빌드 과정에서 순수 JS 함수 호출로 변환된다.

---

## `createElement`의 구조

```javascript
React.createElement(
  '태그이름',  // 1. 무엇을 만들까? (h1, div 등)
  { props },   // 2. 어떤 속성? (className, id 등)
  '내용'       // 3. 안에 무엇을? (텍스트나 자식 요소)
);
```

---

## 📍 JSX 핵심 문법: 5가지 실전 케이스

### 1. 부모 태그 규칙 (Fragment)
태그가 여러 개면 반드시 빈 태그(`<>...</>`)로 묶기

```jsx
function Group() {
  return (
    <>
      <h1>제목</h1>
      <p>내용</p>
    </>
  );
}
```

### 2. 변수 삽입 (Curly Braces)
자바스크립트 변수나 표현식은 `{ }` 안에

```jsx
function Hello() {
  const name = "고은";
  return <h1>안녕하세요, {name}님!</h1>;
}
```

### 3. 클래스 이름 (`className`)
HTML의 `class` 대신 **`className`** 사용

```jsx
function Box() {
  return <div className="blue-box">파란 박스</div>;
}
```

### 4. 인라인 스타일 (Style Object)
스타일은 `{{ 객체 }}` 형태, `-` 대신 카멜 케이스

```jsx
function BigText() {
  return <h1 style={{ fontSize: '50px', color: 'red' }}>커다란 글자</h1>;
}
```

### 5. 셀프 클로징 (Self-closing)
내용 없는 태그는 반드시 `/`로 닫기

```jsx
function ImageBox() {
  return (
    <div>
      <img src="logo.png" alt="로고" />
      <input type="text" />
    </div>
  );
}
```

---

[🔙 뒤로 가기](../index.md)
