---
layout: post
title: "📝 기획서 컨플루언스 작성하기"
date: 2026-02-05
categories: [Antigravity]
tags: [Rule, Skill, Confluence]
nav_exclude: true
---

> 에이전트가 기획서(PRD) 작성 요청을 받았을 때 특정 스킬(`create-confluence-prd`)을 강제로 로드하도록 하는 Rule 설정 및 템플릿 사용법을 설명합니다.

## 디렉토리 및 파일 구조

```text
.agent/
├── rules/
│   └── confluence.md                # (가벼움) 스킬 호출 강제 규칙
└── skills/
    └── create-confluence-prd/       # 스킬 디렉토리
        ├── SKILL.md                 # (중간) 실행 로직 및 프로세스
        └── resources/
            └── prd-template.md      # (무거움) 구체적 포맷 및 스타일 가이드
```

## Rule 작성

```markdown
# Confluence Documentation Rule

1. **Trigger:** 사용자가 기획서(Plan/PRD) 또는 기능 명세서 컨플루언스 페이지 작성을 요청하면 반드시 `create-confluence-plan` 스킬을 로드하여 사용하십시오.
2. **Constraint:** 직접 Markdown으로 작성하지 말고, 반드시 스킬의 `resources/plan-template.md`에 정의된 **Wiki Markup** 포맷을 준수해야 합니다.
```

## Skill 작성

파일: `.agent/skills/create-confluence-plan/SKILL.md`

```yaml
---
name: create-confluence-plan
description: Generates a structured Confluence plan using specific macros and formatting rules.
---
```

```markdown
# PRD/plan Generation Process

사용자의 요청(기능 요구사항, 회의록 등)을 입력받아 `resources/plan-template.md`의 형식을 따르는 기획서를 작성하십시오.

## Step-by-Step Instructions

1. **Load Resource:** `resources/plan-template.md` 파일을 읽어 구조와 포맷팅 규칙(Wiki Markup, 매크로 사용법)을 숙지하십시오.
2. **Analyze & Fill:** 사용자의 입력을 분석하여 템플릿의 각 섹션(개요, 요구사항, 상세 기획)을 채우십시오.
   * *Thinking:* 누락된 Edge Case나 예외 처리가 있다면 '질문 및 논의' 섹션에 스스로 보강하십시오.
3. **Format Enforcement:**
   * 모든 섹션 간에는 `----` (구분선)을 사용하십시오.
   * 중요한 문구는 `*Bold*` 처리하십시오.
   * 코드가 포함될 경우 반드시 `{code}` 매크로를 사용하십시오.
   * 체크 리스트는 `{work item}` 매크로를 사용하십시오.
4. **Output:** 완성된 내용을 **Confluence Wiki Markup** 형식으로 출력하거나, `confluence_create_page` 도구를 사용하여 업로드하십시오.
```

## 템플릿(Resource) 작성

파일: `.agent/skills/create-confluence-plan/resources/plan-template.md`

```markdown
# Confluence PRD Template & Style Guide

**INSTRUCTION:** 생성하는 문서는 아래의 Wiki Markup 문법과 구조를 엄격히 따라야 합니다.

---

## 1. Page Layout Settings
* **Width:** 페이지 너비를 좁게(Narrow) 유지하는 느낌을 주기 위해 필요 시 `{section}` 매크로의 너비 제한을 고려하거나, 텍스트가 한 줄에 약 60자 내외가 되도록 가독성을 유지하십시오.
* **Visual Separation:** 섹션이 바뀔 때마다 반드시 `----` (Horizontal Rule/Divider)를 삽입하십시오.

## 2. Document Content (Wiki Markup Format)

h1. 🚀 Epic
* **Epic Link:** [Jira Epic 링크를 여기에 삽입|{EPIC_URL}]
----
h1. 📝 개요 (Context)
* **목표:** {GOAL_DESCRIPTION}
*(지침: 핵심 목표는 *굵게(Bold)* 표시하거나 {color:red}하이라이트 색상{color}을 입히십시오.)*
* **타겟 유저:** {TARGET_USER}
* **범위 (Scope):**
** ✅ **In-Scope:** {IN_SCOPE_ITEMS}
** 🚫 **Out-Scope:** {OUT_SCOPE_ITEMS}
----
h1. 📋 요구사항 명세 (Requirements)
*(지침: /table 매크로에 해당하는 Wiki Markup 표 형식을 사용하십시오. 헤더는 고정합니다.)*

|| ID || 요구사항 (User Story) || 우선순위 || 상태 ||
| REQ-1 | 사용자는 로그인할 수 있다 | High | {status:colour=Blue|title=할일} |
| REQ-2 | {USER_STORY_2} | Medium | {status:colour=Yellow|title=진행중} |
*(필요한 만큼 행 추가)*
----
h1. 🔍 상세 기획 (Detailed Specs)
*(지침: 기술적 상세 내용이나 복잡한 정책은 반드시 {expand} 매크로 안에 숨기십시오.)*

{expand:title=👉 기술 상세 및 정책 펼쳐보기 (Click to view)}
* **정책 1:** 구체적인 로직 설명...
* **데이터 모델:**
{code:language=json|title=Example Payload}
{
  "user_id": "12345",
  "action": "login"
}
{code}
{expand}
----
h1. 💬 질문 및 논의 (Open Questions)
|| 질문 || 답변 || 담당자 ||
| Q1. 이 기능의 레이턴시 허용 범위는? | TBD | @Developer |

---

## 3. Formatting Rules (Checklist)
1. **Emoji:** 모든 h1 제목과 주요 항목에는 적절한 이모지(🚀, 📝, 📋, 🔍)를 포함하십시오.
2. **Code Snippet:** 개발 코드가 들어갈 때는 `{code}` 블록을 사용하여 Syntax Highlighting을 적용하십시오.
3. **Table:** 요구사항 목록은 반드시 표(`||header||`, `|cell|`)로 작성하십시오.
```

---

## 🔗 참고 자료
- [원문: [Rule/Skill] 기획서 컨플루언스 작성하기](https://blog-34.tistory.com/81)

---

[🔙 뒤로 가기](../index.md)
