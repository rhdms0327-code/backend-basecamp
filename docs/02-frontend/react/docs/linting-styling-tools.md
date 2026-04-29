---
layout: post
title: "🛠️ 코드 품질(Linting) 및 스타일링(Styling) 도구"
date: 2026-03-24
categories: [React]
tags: [Prettier, Tailwind CSS, PostCSS, 코드품질]
nav_exclude: true
---

> 협업 시 코드 스타일 통일과 효율적인 CSS 작성을 위한 도구들의 역할과 작동 원리를 정리.
> Prettier(포맷터), Tailwind CSS(유틸리티 CSS), PostCSS(후처리기), Headwind(정렬)의 조합으로 개발 생산성을 극대화한다.

---

## 1. Prettier (프리티어)

- **역할**: Code Formatter (코드 형식 교정 도구)
- **초점**: 코드가 '어떻게 작동하는가'가 아니라 **'어떻게 보이는가'**에 집중
- **기능**: 줄 바꿈, 세미콜론 사용 여부, 따옴표 종류 등을 설정 규칙에 맞춰 자동 정렬
- **협업 이점**: 개발자마다 다른 코딩 스타일을 하나로 통일 → 코드 리뷰 시 불필요한 논쟁 방지

---

## 2. Tailwind CSS (테일윈드)

- **역할**: Utility-first CSS Framework
- **방식**: CSS 파일 없이 HTML 태그의 `class`에 미리 정의된 클래스명을 조합하여 스타일 적용

### 기존 vs Tailwind 비교

```html
<!-- 기존 방식 -->
<button class="my-button">Click</button>
/* CSS: .my-button { background-color: blue; border-radius: 4px; padding: 10px; } */

<!-- Tailwind 방식 -->
<button class="bg-blue-500 rounded p-2.5 text-white">Click</button>
```

### Tailwind의 장점

| 장점 | 설명 |
| :--- | :--- |
| 이름 짓기 해방 | `.container-wrapper-inner` 같은 의미 없는 클래스명 불필요 |
| 파일 크기 최적화 | 빌드 시 사용하지 않는 클래스를 제거(Purge) |
| 빠른 프로토타이핑 | CSS 파일을 왔다 갔다 할 필요 없이 JSX 안에서 즉시 수정 |
| 디자인 시스템 강제 | `bg-blue-100`, `bg-blue-200` 등 정의된 수치만 사용 |

---

## 3. PostCSS (포스트 CSS)

- **역할**: CSS Transformer (CSS 후처리기)
- **특징**: 자바스크립트 플러그인으로 CSS를 변환 → Tailwind CSS도 내부적으로 PostCSS 플러그인으로 동작
- **주요 기능**: 최신 CSS 문법을 구형 브라우저가 이해하도록 변환 (Autoprefixer 등)

### 작동 원리
1. 개발자가 HTML에 `flex`, `mt-4` 같은 클래스를 작성
2. 빌드 도구(Vite 등)가 이 클래스들을 감지
3. Tailwind 엔진이 해당 클래스에 맞는 실제 CSS 코드를 생성하여 최종 번들에 포함

---

## 4. Headwind (헤드윈드)

- **역할**: Tailwind CSS Class Sorter (클래스 정렬 VS Code 확장)
- **기능**: 수십 개씩 길어지는 클래스명을 일정한 순서(레이아웃 → 박스 모델 → 타이포그래피)로 자동 정렬
- **이점**: 코드 가독성 향상, 중복 클래스 탐지

---

[🔙 뒤로 가기](../index.md)
