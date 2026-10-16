---
layout: post
title: "🎯 콘솔 입출력 (Console)"
date: 2026-10-16
categories: [코딩테스트]
tags: []
nav_exclude: true
---

> 콘솔로 입력을 읽고 결과를 출력할 때 쓰는 `Console` 사용법과 주의점입니다. 입력 읽기, 출력 형식, 특수문자, 많은 출력 처리를 다룹니다. 예시는 모두 xUnit 테스트로 실행해 확인했습니다.

---

## 1. 입력 읽기

| 코드 | 입력 | 결과 |
| :--- | :--- | :--- |
| `Console.ReadLine()` | `HelloWorld!` | `"HelloWorld!"` 한 줄 전체 (문자열) |
| `Console.ReadLine().Split(' ')` | `4 5` | `["4", "5"]` |
| `int.Parse(Console.ReadLine())` | `42` | `42` |
| `long.Parse(Console.ReadLine())` | `3000000000` | `3000000000` (int 범위를 넘는 값) |
| `Console.ReadLine().Split(' ').Select(int.Parse).ToArray()` | `1 2 3` | `[1, 2, 3]` (`using System.Linq;`) |

### 한 줄에 여러 값

```csharp
string[] s = Console.ReadLine().Split(' ');
int a = int.Parse(s[0]);
int b = int.Parse(s[1]);
```

### 여러 줄 읽기

```csharp
int n = int.Parse(Console.ReadLine());          // 첫 줄: 개수
for (int i = 0; i < n; i++) {
    int x = int.Parse(Console.ReadLine());      // 다음 n줄
}
```

### 입력이 끝날 때까지 읽기

```csharp
string line;
while ((line = Console.ReadLine()) != null) {   // 더 읽을 줄이 없으면 null
    // line 처리
}
```

한 번에 전부 읽어야 할 때는 `Console.In.ReadToEnd()`를 씁니다.

### 공백이 여러 칸일 때

`Split(' ')`은 연속된 공백 사이에 **빈 문자열**을 만듭니다. 그 빈 문자열을 `int.Parse`하면 `FormatException`이 납니다.

```csharp
var parts = Console.ReadLine()
    .Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);   // "1   2  3" → ["1", "2", "3"]
```

---

## 2. 출력하기

| 코드 | 출력 | 설명 |
| :--- | :--- | :--- |
| `Console.WriteLine(x)` | `x` + 줄바꿈 | 출력 후 다음 줄로 |
| `Console.Write(x)` | `x` | 줄바꿈 없이 |
| `Console.WriteLine()` | 빈 줄 | 줄바꿈만 |
| `Console.WriteLine(string.Join(" ", arr))` | `1 2 3` | 배열을 한 줄에 공백으로 |

### 형식 맞추기: 세 가지 방법

`a = 4`, `b = 5`일 때 `4 + 5 = 9`를 출력하는 방법입니다. 결과는 모두 같습니다.

```csharp
Console.WriteLine($"{a} + {b} = {a + b}");                     // 문자열 보간 (가장 읽기 쉽다)
Console.WriteLine("{0} + {1} = {2}", a, b, a + b);              // 템플릿과 같은 형식 문자열
Console.WriteLine(a + " + " + b + " = " + (a + b));             // + 연결 (괄호 필수)
```

> `+` 연결에서 괄호를 빼고 `... + " = " + a + b`라고 쓰면 `4 + 5 = 45`가 출력됩니다. 문자열 뒤의 `+`는 덧셈이 아니라 이어 붙이기가 되기 때문입니다. 계산은 괄호로 묶거나 보간(`$"{a + b}"`)을 씁니다.

### 줄 단위로 출력해야 할 때

"a = 4"와 "b = 5"를 **두 줄**로 출력하라는 문제라면 `WriteLine`을 두 번 씁니다.

```csharp
Console.WriteLine($"a = {a}");
Console.WriteLine($"b = {b}");
```

### 문자열을 한 글자씩 출력

```csharp
foreach (char c in Console.ReadLine()) {
    Console.WriteLine(c);        // 글자마다 한 줄
}
```

---

## 3. 특수문자 출력

문자열 안에서 `"`와 `\`는 그대로 쓸 수 없습니다. 이스케이프하거나 다른 문자열 문법을 씁니다.

| 쓰고 싶은 문자 | 일반 문자열 `"..."` | 축자 문자열 `@"..."` |
| :--- | :--- | :--- |
| `"` | `\"` | `""` |
| `\` | `\\` | `\` 그대로 |
| `'` | `'` 그대로 (`\'`도 가능) | `'` 그대로 |
| 줄바꿈 | `\n` | 실제로 줄을 바꿔 쓴다 |
| 탭 | `\t` | 쓸 수 없음 |

### 예: 특수문자가 섞인 문자열 출력

출력해야 하는 문자열은 `!@#$%^&*(\'"<>?:;`입니다. 세 방법 모두 같은 결과입니다.

```csharp
Console.WriteLine("!@#$%^&*(\\'\"<>?:;");        // 일반 문자열: \ → \\, " → \"
Console.WriteLine(@"!@#$%^&*(\'""<>?:;");        // 축자 문자열: \ 그대로, " → ""
Console.WriteLine("""!@#$%^&*(\'"<>?:;""");      // 원시 문자열 (C# 11 이상): 그대로
```

> 원시 문자열(`"""..."""`)은 C# 11 문법입니다. 채점 환경에서 컴파일되지 않으면 위의 두 방법을 씁니다.

---

## 4. 출력이 많을 때

출력할 줄이 많으면 `Console.WriteLine`을 줄마다 부르지 말고 `StringBuilder`에 모아 한 번에 출력합니다.

```csharp
using System.Text;

var sb = new StringBuilder();
for (int i = 1; i <= n; i++) sb.AppendLine(i.ToString());
Console.Write(sb.ToString());
```

---

## 5. 자주 하는 실수

| 실수 | 증상 | 바르게 |
| :--- | :--- | :--- |
| 줄바꿈이 필요한데 `Write` 사용 | 줄이 붙어서 오답 | `WriteLine` |
| 출력 끝에 공백이나 빈 줄 추가 | 형식 불일치로 오답 | 입출력 예와 글자 단위로 비교 |
| `"..." + a + b`로 덧셈 | `45`처럼 이어 붙음 | `(a + b)` 또는 `$"{a + b}"` |
| 문자열 안에 `"`, `\`를 그대로 씀 | 컴파일 오류 | `\"`, `\` 또는 `@"..."` |
| 공백 여러 칸 입력을 `Split(' ')` | 빈 문자열을 `int.Parse`해서 예외 | `RemoveEmptyEntries` |
| 큰 수를 `int.Parse` | 범위를 넘으면 예외 | `long.Parse` |

---

[🔙 뒤로 가기](../index.md)
