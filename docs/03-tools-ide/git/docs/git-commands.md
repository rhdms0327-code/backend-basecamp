---
layout: post
title: "🛠️ Git 명령어 정리"
date: 2026-04-30
categories: [Git]
tags: [Git, CLI, 명령어]
nav_exclude: true
---

> 자주 사용하는 Git 명령어(stash, reset, branch 등)를 정리합니다.

## 임시 저장 (Stash)

변경 사항을 임시로 저장할 때 사용합니다.

| 설명 | 명령어 |
| :--- | :--- |
| 저장된 변경 사항 저장 | `git stash push` |
| 저장된 변경 사항 적용 후 삭제 | `git stash pop` |
| 리스트 보기 | `git stash list` |

## Reset

커밋 기준으로 상태를 되돌립니다.

```bash
git reset [옵션] <대상커밋>
```

**옵션**
- `--soft`: 커밋만 취소
- `--mixed`: 스테이징만 취소
- `--hard`: 전부 되돌림

**대상 커밋**
- `HEAD^` (또는 `HEAD~1`): 바로 이전 커밋
- `HEAD^^` (또는 `HEAD~2`): 커밋 2개 전

## 브랜치 생성

```bash
# 1. 새로운 브랜치를 만들고, 현재 브랜치에 머무르기
git branch <새로운_브랜치_이름>

# 2. 새로운 브랜치를 만들고, 즉시 해당 브랜치로 이동하기 (가장 많이 사용)
git checkout -b <새로운_브랜치_이름>

# 3. (최신 Git 버전) 새로운 브랜치를 만들고, 즉시 해당 브랜치로 이동하기
git switch -c <새로운_브랜치_이름>
```

---

## 🔗 참고 자료
- [원문: [Git] Git 명령어 정리](https://blog-34.tistory.com/66)

---

[🔙 뒤로 가기](../index.md)
