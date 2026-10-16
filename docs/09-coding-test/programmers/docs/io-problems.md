---
layout: post
title: "🧩 [준비 과정] 입출력형 문제 풀이"
date: 2026-10-16
categories: [코딩테스트]
tags: []
nav_exclude: true
---

> 프로그래머스에서 입력을 직접 읽고 결과를 직접 출력하는 **입출력형** 문제를 푸는 방법입니다. 문제 형식 구분, C# 템플릿 해설, 제출할 때 주의점, 로컬 확인 방법을 다룹니다. `Console` 사용법 자체는 [콘솔 입출력 (Console)](../../csharp/docs/console.md)에 있습니다.

---

## 두 가지 문제 형식

프로그래머스 문제는 두 형식으로 나뉩니다. 템플릿을 보면 바로 구분됩니다.

| 구분 | solution 함수형 | 입출력형 |
| :--- | :--- | :--- |
| 템플릿 | `public class Solution` + `solution(...)` | `public class Example` + `static void Main()` |
| 입력 | 매개변수로 받는다 | `Console.ReadLine()`으로 직접 읽는다 |
| 출력 | `return` | `Console.WriteLine(...)`으로 직접 출력 |
| 예 | 대부분의 문제 | 코딩 기초 트레이닝 앞부분의 출력 문제 (문자열 출력하기, a와 b 출력하기, 특수문자 출력하기 등) |

---

## 템플릿 해설

"a와 b 출력하기"(181951)의 C# 템플릿입니다.

```csharp
using System;

public class Example
{
    public static void Main()                  // 프로그램 시작점
    {
        String[] s;                            // String은 string과 같다

        Console.Clear();                       // 화면 지우기. 출력 내용과는 관계없다
        s = Console.ReadLine().Split(' ');     // 한 줄 읽어서 공백으로 쪼갠다

        int a = Int32.Parse(s[0]);             // Int32.Parse는 int.Parse와 같다
        int b = Int32.Parse(s[1]);

        Console.WriteLine("{0}", a + b);       // {0} 자리에 a + b를 넣어 출력
    }
}
```

| 템플릿 표현 | 같은 뜻 | 설명 |
| :--- | :--- | :--- |
| `String` | `string` | 대문자는 .NET 타입 이름, 소문자는 C# 별칭 |
| `Int32.Parse` | `int.Parse` | 마찬가지로 별칭 관계 |
| `"{0}", x` | `$"{x}"` | 형식 문자열. 번호 자리에 값을 넣는다 |

템플릿은 입력을 읽는 데까지만 작성되어 있습니다. 읽은 값을 가공해서 **출력하는 부분을 직접 채우는 것**이 문제입니다.

---

## 제출할 때 주의

- 출력한 글자가 정답과 **한 글자라도** 다르면 틀립니다. 공백, 줄바꿈, 대소문자까지 입출력 예와 똑같이 맞춥니다.
- 템플릿의 `Console.Clear();`는 제출할 때 그대로 둡니다.
- 로컬 저장소에서는 `namespace P번호;`를 붙여 두고, 붙여 넣을 때 그 줄만 뺍니다. 클래스 이름은 템플릿대로 `Example`입니다.

---

## 로컬에서 확인하기

| 방법 | 언제 |
| :--- | :--- |
| 프로그래머스 **코드 실행** | 읽어서 그대로 출력하는 간단한 문제. 입출력 예를 넣고 결과를 바로 비교해 준다 |
| xUnit + `ConsoleRunner` | 입력 파싱과 출력 형식이 섞인 문제. 입력 문자열을 넣고 출력된 줄을 자동으로 비교 |

`ConsoleRunner` 도우미 파일과 테스트 작성법은 [C# 코테 프로젝트 만들기](./project-setup.md) 하단의 "입출력형 문제 테스트"에 있습니다.

> **`Console.Clear()` 주의**: 출력을 문자열로 받는 상태에서 실행하면 `IOException: 핸들이 잘못되었습니다.`가 납니다. 로컬 테스트에서는 이 줄을 주석 처리하고, 사이트에 제출할 때는 템플릿대로 둡니다.

---

[🔙 뒤로 가기](../index.md)
