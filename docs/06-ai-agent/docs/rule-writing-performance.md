---
layout: post
title: "⚡ [Rule] 작성 방법과 성능"
date: 2026-02-05
categories: [Antigravity]
tags: [Rule, 최적화]
nav_exclude: true
---

> 에이전트 성능 최적화를 위한 3대 원칙(Operational Protocols, Constraints, Workflow Trigger)과 Rule 작성 모범 사례를 정리합니다.

## Agent Constitution (Performance Optimized) 예시

```markdown
# Agent Constitution (Performance Optimized)

## 1. Operational Protocols
* **Efficiency:** 답변을 생성하기 전에 가장 적은 토큰을 사용하는 방법을 먼저 생각하라(Thinking).
* **Reference:** 기획서 작성 요청이 들어오면 **즉시** `create-prd` 스킬을 로드하라. 네가 가진 일반 지식으로 작성하지 마라.

## 2. Constraints (Negative Rules)
* **No Assumption:** 요구사항이 모호하면 사용자에게 질문하라. 스스로 가정하여 빈칸을 채우지 마라.
* **Format:** Confluence 페이지는 오직 **Wiki Markup** 포맷으로만 생성되어야 한다. (Markdown 금지)

## 3. Workflow Trigger
* 사용자가 "/plan"이라고 입력하면 자동으로 `feature-kickoff` 워크플로우를 실행하라.
```

## 각 섹션별 의미

1. **Operational Protocols (운영 프로토콜)**
   - 에이전트의 **'기본 사고방식(Mindset)'**과 **'행동 지침'**을 설정합니다.
   - 단순히 "짧게 대답해"라고 하는 것보다, **"토큰을 절약하는 방법을 먼저 생각하라"**고 지시하는 것이 모델의 추론 능력(Thinking Level)을 자극하여 더 효과적입니다.
   - **'점진적 공개(Progressive Disclosure)'**: 일반 지식(Hallucination 가능성 존재)으로 대충 작성하는 것을 막고, 고품질 템플릿(Skill)을 강제로 사용하게 만듭니다.

2. **Constraints (Negative Rules - 부정 제약 사항)**
   - 에이전트가 **'절대 하지 말아야 할 것'**을 정의합니다. 에이전트의 창의성을 제한하여 안전성과 정확성을 확보하는 가드레일 역할을 합니다.

3. **Workflow Trigger (워크플로우 트리거)**
   - 특정 명령어 입력 시 연계된 작업 흐름이 자동 실행되게 설정합니다.

---

## 🔗 참고 자료
- [원문: [Rule] 작성 방법과 성능](https://blog-34.tistory.com/80)

---

[🔙 뒤로 가기](../index.md)
