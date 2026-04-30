---
layout: post
title: "🧠 스킬, Workflow, Rule 차이"
date: 2026-02-05
categories: [Antigravity]
tags: [Workflow, Skill, Rule]
nav_exclude: true
---

> Workflow(사용자 트리거), Skill(에이전트 판단 도구), Rule(에이전트 제약)의 명확한 차이점과 역할을 비교합니다.

## 한눈에 보는 차이점 (Comparison)

Google Antigravity에서 **Workflow(워크플로우)**와 **Skill(스킬)**의 가장 결정적인 차이는 **"누가 방아쇠를 당기느냐(Trigger)"**에 있습니다.

| 구분 | Workflow (워크플로우) | Skill (스킬) | Rule (규칙) |
| :--- | :--- | :--- | :--- |
| **작동 주체** | 👤 사용자 (User-Triggered) | 🤖 에이전트 (Agent-Triggered) | ⚖️ 시스템 베이스 라인 |
| **실행 방법** | 채팅창에 `/` 명령어 직접 입력 | 대화 맥락을 보고 AI가 스스로 판단 | 항상 백그라운드에 적용 |
| **성격** | 매크로 / 절차서 (작업 지시서) | 도구 / 기능 (전문 도구 상자) | 운영 프로토콜 / 가드레일 |

## 왜 Skill이 있는데 Rule이 필요한가요?

Skill은 도구 모음에 불과하며, 에이전트가 어떤 상황에서 반드시 그 도구를 써야 하는지 강제하지 않으면 자신이 사전 학습한 일반 지식을 이용해 대답해버릴 확률이 높습니다(Hallucination). **Rule**은 이를 방지하고 스킬 호출을 강력하게 규제합니다.

---

## 🔗 참고 자료
- [원문: 스킬, Workflow, Rule 차이](https://blog-34.tistory.com/78)

---

[🔙 뒤로 가기](../index.md)
