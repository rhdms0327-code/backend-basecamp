---
layout: post
title: "🎯 [3장] 문자 및 논리 형식 (Char & Bool)"
date: 2026-04-29
categories: [C#]
tags: [데이터형식, 문법, C#]
nav_exclude: true
---

# 🎯 [3장] 문자 및 논리 형식 (Char & Bool)

> C#의 기본 데이터 형식 중 유니코드 문자를 다루는 char와 논리 상태를 나타내는 bool 형식의 특징과 메모리 크기를 정리합니다.

## 1. 문자 형식 (Char)
- 유니코드 문자 하나를 저장하는 형식입니다.
- **크기**: 2바이트 (System.Char)
- **리터럴**: 작은따옴표(`'A'`)를 사용합니다.
- **특징**: `int` 등 정수 계열 형식으로 암시적 변환이 가능합니다 (유니코드 코드 값으로 변환).

## 2. 논리 형식 (Bool)
- 참(`true`) 또는 거짓(`false`)을 나타내는 형식입니다.
- **크기**: 1바이트 (System.Boolean)
- **용도**: 조건문(`if`, `while`)의 제어 흐름을 결정할 때 핵심적으로 사용됩니다.

> [!TIP]
> C#의 `bool` 형식은 C/C++와 달리 정수형(0, 1)으로의 암시적 형변환을 허용하지 않으므로 논리 연산 시 타입 안전성이 높습니다.

---
> **참고 자료**
> - [char 형식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/builtin-types/char)

[🔙 뒤로 가기](./index.md)
