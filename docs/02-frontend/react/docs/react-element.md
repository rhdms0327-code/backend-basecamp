---
layout: post
title: "🧱 리액트 엘리먼트: Virtual DOM의 실체"
date: 2026-03-26
categories: [React]
tags: [리액트엘리먼트, Virtual DOM, 불변성, Reconciliation]
nav_exclude: true
---

> 리액트 엘리먼트는 UI를 구성하는 가장 작은 단위의 자바스크립트 객체(불변).
> 상태 변경 시 기존 객체를 수정하지 않고 새 객체를 생성해 교체하는 방식으로 Diffing 효율을 극대화한다.

---

## 1. 리액트 엘리먼트의 진짜 생김새

```jsx
// 우리가 쓰는 JSX
const element = <h1 className="title">안녕!</h1>;

// 리액트 내부 실제 객체
{
  type: 'h1',
  props: {
    className: 'title',
    children: '안녕!'
  }
}
```

---

## 2. 브라우저 DOM vs 리액트 Virtual DOM

| 구분 | 브라우저 DOM | 리액트 엘리먼트 (가상) |
| :--- | :--- | :--- |
| 물리적 실체 | 브라우저 엔진이 관리 | JS 힙(Heap)의 객체 |
| 수정 비용 | 높음 (Reflow/Repaint 발생) | 매우 낮음 (JS 연산만) |
| 불변성 | 없음 | 있음 (읽기 전용) |

---

## 🛠️ 핵심 렌더링 로직

1. **초기화**: JSX → 리액트 엘리먼트 트리(가상 DOM) 형성
2. **업데이트**: 데이터 변경 시 새 엘리먼트 트리 생성
3. **비교(Diffing)**: 이전 트리 vs 신규 트리 비교 → 차이 노드만 식별
4. **반영(Batch Update)**: 차이점만 실제 DOM에 일괄 적용 → Reflow 최소화

---

## 불변성 (Immutability)

### ❌ 잘못된 방식 (직접 수정)
```javascript
element.props.children = 'Goeun';
// 리액트: "객체(주소)는 그대로네? 바뀐 거 없음" → 화면 안 바뀜
```

### ✅ 올바른 방식 (새 객체 생성)
```javascript
const element2 = { ...element1, props: { children: 'Goeun' } };
// 리액트: "새로운 객체! 내부 비교 후 화면 갱신"
```

---

## 렌더링 코드 분석

```javascript
const element = <h1>안녕</h1>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(element);
```

- `<div id="root">`: 리액트가 관리하는 단 하나의 진입점
- `root.render()`: 가상 DOM 객체를 실제 DOM 노드로 변환하여 브라우저에 주입

---

[🔙 뒤로 가기](../index.md)
