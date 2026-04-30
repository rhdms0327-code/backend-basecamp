---
layout: post
title: "🚀 [Skill] 작성 방법 & 성능 극대화"
date: 2026-02-05
categories: [Antigravity]
tags: [Skill, 최적화]
nav_exclude: true
---

> Skill과 Resource를 분리하여 토큰 낭비를 막고, 시맨틱 트리거를 통해 에이전트가 도구를 정확히 선택하게 하는 최적화 방법을 설명합니다.

## 1. 스킬 토큰 효율 비교

| 비교 항목 | Rule에 모두 넣기 | Skill 본문에 넣기 | Skill + Resource 분리 (추천) |
| :--- | :--- | :--- | :--- |
| **로드 시점** | 항상 (모든 대화마다) | 해당 스킬 사용 시 | 해당 스킬 사용 시 + 필요할 때만 읽음 |
| **토큰 비용** | 매우 높음 (낭비 심함) | 중간 (스킬 로드 시 소모) | **매우 낮음 (최적화)** |
| **컨텍스트 오염** | 높음 (다른 작업 시 방해됨) | 낮음 | **최소 (관련 정보만 주입)** |
| **유지보수** | 어려움 (Rule 비대화) | 보통 | **쉬움 (템플릿만 독립적 수정 가능)** |

## 2. Skill + Resource 분리 (Lazy Loading) 전략

Skill 파일(`SKILL.md`)은 에이전트가 작업을 할 때만 로드됩니다. 핵심은 템플릿 본문을 `SKILL.md`에 넣지 않고 **외부 파일(`resources/`)**로 빼는 것입니다.

### 스킬 작성 (SKILL.md)

```yaml
---
name: create-prd
description: Jira Epic이나 회의록을 바탕으로 Confluence용 PRD(기획서)를 작성할 때 사용합니다.
---
```

```markdown
# PRD Creation Skill

사용자가 기획서 작성을 요청하면 다음 절차를 따르세요:
1. **Load Template**: `resources/prd-template.md` 파일을 읽어서 구조를 파악하십시오.
2. **Analyze**: 사용자의 입력(회의록 등)을 분석하여 템플릿의 각 섹션을 채우십시오.
3. **Critique**: 작성 전, 누락된 Edge Case나 예외 처리가 없는지 스스로 비평(Thinking)하십시오.
4. **Draft**: Wiki Markup 형식을 사용하여 초안을 작성하십시오.
```

### 템플릿 분리 (resources/prd-template.md)

이 파일은 실제 무거운 템플릿 내용만을 포함합니다. 스킬 실행 시 필요할 때 로드되므로 초기 토큰 점유가 발생하지 않습니다.

```markdown
h1. 개요 (Overview)
* **작성자:** {Agent Name}
* **상태:** Draft

h1. 사용자 스토리 (User Stories)
||ID||As a||I want to||So that||
|US-01|사용자|로그인|서비스를 이용한다|

h1. 상세 요구사항 (Requirements)
{expand:기술 상세}
* API 스펙 및 데이터 모델링...
{expand}
```

## 3. 스킬을 '잘' 작성하는 방법 (Best Practices)

- ❌ **나쁜 예 (모호한 트리거):** "데이터베이스 툴"
- ✅ **좋은 예 (시맨틱 트리거):** "로컬 PostgreSQL 데이터베이스에서 사용자 데이터를 조회하거나 테이블 스키마를 확인할 때 사용해라." (구체적인 동작과 상황 명시)

---

## 🔗 참고 자료
- [원문: [Skill] 작성 방법 & 성능 극대화](https://blog-34.tistory.com/79)

---

[🔙 뒤로 가기](../index.md)
