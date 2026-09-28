---
layout: post
title: "🧡 [이슈 해결] 배포 제외를 위한 병합 커밋 선택적 Revert 전략"
date: 2026-08-27
categories: [Git]
tags: [Git, Revert, 배포전략]
nav_exclude: true
---

> develop 브랜치에는 이미 병합되었지만 실제 배포 시점이 몇 달 뒤로 예정된 기능을,
> 당장의 develop → master 배포에서만 제외하고 나중에 그대로 되살리는 방법을 정리합니다.

## 상황

- 특정 기능(에픽) 개발이 끝나서 `develop`에 이미 여러 PR로 병합되어 있음.
- 하지만 실제 배포는 몇 달 뒤로 예정되어 있고, 지금은 **다른 작업 건** 때문에 `develop → master` 배포를 진행해야 하는 상황.
- 즉, "코드는 남겨두되 이번 배포에서만 빠지게" 만들어야 함.
- 요구사항: 관련 PR 커밋들을 묶어서 **단일 revert 커밋 1개**로 만들고, 배포 시점이 오면 그 커밋 하나만 다시 revert(=revert-of-revert)해서 기능을 재활성화한다.

## 핵심 아이디어

1. 대상 PR들의 **병합 커밋을 `-m 1` 옵션으로 revert**한다 (개별 커밋 단위가 아니라 병합 커밋 단위로).
2. 실제 브랜치에 바로 적용하지 않고 **임시 브랜치에서 드라이런**으로 충돌 여부와 결과를 먼저 검증한다.
3. 여러 개의 revert 커밋을 **하나의 커밋으로 스쿼시**해서, 나중에 한 번의 revert로 깔끔하게 되살릴 수 있게 만든다.

## 드라이런으로 먼저 검증하기

실제 `develop`을 건드리지 않고, 임시 브랜치에서 전체 과정을 먼저 검증합니다.

```bash
git fetch origin
git checkout -b _tmp_revert_dryrun origin/develop

# 대상 PR들을 순서대로 revert (충돌 여부는 매 단계 git status --short 로 확인)
git revert -m 1 --no-commit <PR병합커밋1>
git commit -m "wip: step1" -q

git revert -m 1 --no-commit <PR병합커밋2>
git commit -m "wip: step2" -q

# 최종 결과가 의도한 대로인지 확인
git diff origin/develop --stat
```

## 여러 임시 커밋을 하나의 revert 커밋으로 스쿼시

3개월 뒤 배포 시점에 "이 커밋 하나만 다시 revert하면 끝"이 되도록, 중간에 쌓인 wip 커밋들을 하나로 합칩니다.

```bash
git reset --soft origin/develop
git commit -m "revert: [기능명] 임시 배포 제외

- 사유: 개발은 완료되었으나 실 배포는 이번 배포 주기 이후로 예정되어 있음
- 방식: 관련 PR 병합 커밋들을 -m 1 로 revert
- 재활성화: 배포 시점에 이 커밋을 다시 revert(revert-of-revert)"
```

검증까지 끝나면 이 임시 브랜치의 결과를 실제 브랜치에 반영(적용 후 push 또는 PR 생성)할지 결정합니다. 드라이런 단계에서는 원래 작업 브랜치로 돌아가고 `develop`/원격은 건드리지 않습니다.

## 배운 점

- **되돌리기 작업은 항상 임시 브랜치에서 드라이런으로 먼저 검증한다.** `origin/develop`을 기준으로 새 브랜치를 파서 실험하면, 실패해도 원본에는 영향이 없다.
- **재활성화까지 고려한다면 revert 커밋을 하나로 묶어두는 것이 유리하다.** revert 커밋이 여러 개로 흩어져 있으면, 나중에 재활성화할 때 어떤 순서로 다시 revert해야 하는지 헷갈리기 쉽다.

---

[🔙 뒤로 가기](../index.md)
