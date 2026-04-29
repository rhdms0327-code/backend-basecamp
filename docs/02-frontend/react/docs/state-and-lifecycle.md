---
layout: post
title: "🔄 State와 생명주기(Lifecycle)"
date: 2026-03-27
categories: [React]
tags: [State, useState, 생명주기, Lifecycle, 불변성]
nav_exclude: true
---

> State는 컴포넌트 내부에서 스스로 관리하는 동적인 데이터로, 변경 시 Re-render를 트리거한다.
> 직접 수정은 절대 금지(불변성 원칙). 반드시 `setState` 또는 `useState` setter를 통해 업데이트해야 한다.

---

## Props vs State 비교

| 구분 | Props | State |
| :--- | :--- | :--- |
| 출처 | 외부(부모)에서 주입 | 내부에서 스스로 관리 |
| 수정 권한 | 읽기 전용(불가) | setter 함수로만 수정 |
| 재렌더링 조건 | 부모가 새 Props 내려줄 때 | State 변경 시 해당 컴포넌트 + 자식 전체 |

---

## State 정의 방식

### 함수 컴포넌트: `useState` Hook (현대 표준)

```javascript
const [liked, setLiked] = useState(false);
```

> 함수는 실행 후 메모리에서 사라지지만, `useState`를 사용하면 리액트 엔진이 데이터를 별도 메모리에 보관

### 클래스 컴포넌트: `constructor` (레거시)

```javascript
constructor(props) {
  super(props);
  this.state = { liked: false };
}
```

---

## State 수정 원칙: 직접 수정 금지

```javascript
// ❌ 직접 수정 - 리액트가 감지하지 못함 → 화면 안 바뀜
this.state.liked = true;

// ✅ setter 사용 - 리액트가 Re-render 트리거
setLiked(true);
this.setState({ liked: true });
```

> [!IMPORTANT]
> `setState`는 즉시 반영되지 않고 **Batch(일괄) 처리**됨. 리액트는 메모리 주소값만 비교하므로 반드시 새 객체를 넘겨야 렌더링 파이프라인 가동.

---

## State에 넣어야 하는 값

- **State 대상**: 값이 변했을 때 화면이 다시 그려져야 하는 값 (UI와 직결)
- **일반 필드 대상**: 타이머 ID, 외부 라이브러리 인스턴스 등 렌더링과 무관한 값

---

## 생명주기 (Lifecycle)

### ① Mount (마운트)
- `constructor` → `render` → **`componentDidMount`**
- 용도: AJAX 통신(`fetch`/`axios`), 타이머, 외부 라이브러리 초기화

### ② Update (업데이트)
- Props 또는 State 변경 시 발생
- **`componentDidUpdate`**: 갱신 완료 후 호출. 업데이트 전후 데이터 비교에 활용

### ③ Unmount (언마운트)
- **`componentWillUnmount`**: 메모리 해제 직전 호출
- 용도: `clearInterval`, `removeEventListener`, 네트워크 요청 취소 → 메모리 누수 방지

---

## 실무 패턴: AJAX 통신

```javascript
class UserList extends React.Component {
  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => this.setState({ users: data }));
  }

  componentWillUnmount() {
    // 진행 중인 요청 및 리스너 정리
  }
}
```

---

[🔙 뒤로 가기](../index.md)
