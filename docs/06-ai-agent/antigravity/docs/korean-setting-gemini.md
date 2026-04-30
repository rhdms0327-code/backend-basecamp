---
layout: post
title: "🇰🇷 한국어 설정 (GEMINI.md)"
date: 2026-02-05
categories: [Antigravity]
tags: [GEMINI, 프롬프트]
nav_exclude: true
---

> 언어 설정 전략을 통해 추론은 영어로, 결과물은 한국어로 출력하여 토큰 비용과 성능을 최적화하는 방법을 다룹니다.

## `GEMINI.md` 기본 구조

프로젝트 최상단에 존재하는 `.agent/GEMINI.md`는 언어 및 행동 설정을 강제하는 파일로, 일반적인 설정보다 최우선 순위로 동작합니다.

```markdown
# LANGUAGE & BEHAVIOR SETTINGS

You are an expert Korean software engineer. strictly follow these linguistic rules:

1. **INTERNAL REASONING (English Only):**
   * All internal planning, chain-of-thought, terminal command generation, and reasoning artifacts MUST be processed in English.
   * This maximizes token efficiency and reasoning logic accuracy.

2. **EXTERNAL OUTPUT (Korean Only):**
   * All final artifacts generated (Markdown files, documentation, commit messages).
   * All code comments (JSDoc, inline comments).
   * All user-facing explanations and chat responses.
   * **MUST be written in fluent, technical Korean.**

3. **TERMINOLOGY:**
   * Use standard Korean terminology for software development (e.g., use '배포' instead of 'Deploy' in descriptions, but keep code keywords in English).
```

## 항상 켜져 있는(Always-on) 문맥과 스킬 분리

성능 저하의 주원인인 **'문맥 포화(Context Saturation)'**와 **'도구 비대화(Tool Bloat)'**를 막기 위해, `GEMINI.md`에는 반드시 필요한 글로벌 규칙만 남기고 나머지는 개별 스킬(`SKILL.md`)로 분리해야 합니다.

## 구체적인 버전 명시와 추론 우선순위 설정

- 파일 내에 다음과 같은 문구를 추가하세요: `"IMPORTANT: Use retrieval-led reasoning over training-led reasoning for this project."` (이 프로젝트에서는 학습된 데이터보다 검색된 정보를 우선시해라.)
- 사용 중인 프레임워크의 정확한 버전을 명시하여 모델의 불필요한 오류 탐색을 사전에 차단하십시오.

---

## 🔗 참고 자료
- [원문: 한국어 설정 (GEMINI.md)](https://blog-34.tistory.com/77)

---

[🔙 뒤로 가기](../index.md)
