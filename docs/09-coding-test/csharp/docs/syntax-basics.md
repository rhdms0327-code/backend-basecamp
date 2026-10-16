---
layout: post
title: "🎯 자주 나오는 기본 문법"
date: 2026-10-16
categories: [코딩테스트]
tags: []
nav_exclude: true
---

> 코테 풀이와 테스트 코드에 자주 나오는 C# 기본 문법입니다. 처음 보는 기호가 있으면 여기서 찾습니다.

---

## 문법 표

| 문법 | 뜻 | 예 |
| :--- | :--- | :--- |
| `using System.Linq;` | 다른 네임스페이스의 이름을 가져온다. 빠지면 `Array`, `Select` 같은 이름을 찾지 못해 컴파일 오류 | `using System.Text;` |
| `namespace P42577;` | 파일 전체를 한 네임스페이스로 묶는다 (file-scoped, C# 10). 같은 클래스 이름의 충돌을 막는다 | `new P42577.Solution()` |
| `[Fact]` | 속성(attribute). 메서드나 클래스 위 대괄호로 정보를 붙인다 | `[Fact]` |
| `new[] { 1, 2, 3 }` | 배열 만들기. 요소로 타입을 추론 | `new[] { "a", "b" }` |
| `var` | 타입을 자동으로 추론 | `var list = new List<int>();` |
| `=>` | 람다(이름 없는 함수) 또는 한 줄짜리 메서드 본문 | `x => x * 2` |
| `_ => ...` | 쓰지 않는 매개변수를 `_`로 받는 람다 | `.Select(_ => rnd.Next(10))` |
| `1_000_000` | 숫자 자리 구분자. 값은 1000000 | `new string[1_000_000]` |
| `$"{x}ms"` | 문자열 보간. 중괄호 안에 값을 넣는다 | `$"{sw.ElapsedMilliseconds}ms"` |
| `nameof(Cases)` | 이름을 문자열로 만들되 오타는 컴파일 때 잡는다 | `nameof(Cases)` → `"Cases"` |
| `new() { ... }` | 타입을 생략한 객체 생성(C# 9) + 초기화 목록 | `List<int> a = new() { 1, 2 };` |
| `(string[])arr.Clone()` | 배열 복사본을 만들어 원본 보호 | `(int[])arr.Clone()` |
| `static` | 객체 없이 클래스에 붙은 멤버 | `static bool Check(...)` |

---

[🔙 뒤로 가기](../index.md)
