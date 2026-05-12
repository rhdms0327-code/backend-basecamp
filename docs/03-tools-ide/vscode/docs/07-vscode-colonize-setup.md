---
layout: post
title: "🩵 VS Code에서 IntelliJ처럼 세미콜론(;) 자동완성 사용하기 (Colonize)"
date: 2026-05-12
categories: [VSCode]
tags: [VSCode, Extension, Colonize, 세미콜론]
nav_exclude: true
---

> 코딩할 때 문장 끝마다 세미콜론(;)을 찍으러 커서를 옮기는 번거로움을 줄이고자 합니다. IntelliJ의 편리한 기능을 VS Code에서도 그대로 사용할 수 있게 해주는 Colonize 확장 프로그램 설정법을 소개합니다.

---

## 1. Colonize 확장 프로그램 설치

- VS Code 왼쪽 사이드바의 Extensions 아이콘(또는 `Ctrl + Shift + X`)을 클릭합니다.
- 검색창에 **Colonize**를 검색하여 설치합니다.

---

## 2. 단축키 내 입맛대로 변경하기

기본 단축키가 익숙하지 않다면, 본인이 편한 조합(예: `Ctrl + Enter`)으로 변경할 수 있습니다.

1. **설정창 열기**: `Ctrl + K`를 누른 직후 바로 `Ctrl + S`를 누릅니다.
2. **명령어 검색**: 상단 검색창에 `"colonize"`를 입력합니다.
3. **단축키 수정**: 아래 주요 기능 중 원하는 항목의 연필 아이콘을 더블 클릭합니다.
4. **키 입력**: 사용하고자 하는 단축키를 직접 누른 뒤 `Enter`로 확정합니다.

---

## 3. 주요 기능 및 활용법

Colonize는 상황에 따라 세 가지 모드를 제공합니다.

| 기능명 | 설명 | 기본 단축키 | 추천 단축키 |
| :--- | :--- | :--- | :--- |
| **Colonize: Shift** | 세미콜론을 찍고 바로 다음 줄로 이동 | `Alt + Enter` | `Ctrl + Enter` |
| **Colonize: Stop** | 현재 위치에 세미콜론만 찍기 | `Alt + Shift + Enter` | `Alt + ;` |
| **Colonize: Stay** | 세미콜론을 찍되 커서는 현재 위치 유지 | `Ctrl + Alt + Enter` | - |

---

[🔙 뒤로 가기](../index.md)
