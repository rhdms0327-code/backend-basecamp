---
layout: post
title: "🧩 [준비 과정] C# 코테 프로젝트 만들기"
date: 2026-10-14
categories: [코딩테스트]
tags: []
nav_exclude: true
---

> `coding-test` 폴더를 만들어 VS Code로 열고, 풀이 코드의 문법 오류와 `using` 누락을 사이트에 붙이기 전에 잡는 C# 프로젝트를 만듭니다. 풀이는 문제당 파일 하나, 예제 검증은 xUnit 테스트로 합니다.

---

## 준비물

| 항목 | 확인 방법 | 비고 |
| :--- | :--- | :--- |
| .NET SDK | `dotnet --version` | 이 글은 10.0.203 기준입니다 |
| VS Code | `code --version` | 확장 **C# Dev Kit** 필요 |
| Git | `git --version` | 선택. 풀이를 저장소로 관리할 때 |

---

## 1. 폴더 만들기

원하는 위치에서 터미널(PowerShell)을 열고 폴더를 만듭니다. 위치는 어디든 상관없습니다.

```powershell
mkdir coding-test
cd coding-test
```

---

## 2. VS Code로 폴더 열기

`coding-test` 폴더 안에서 터미널에 아래를 입력하면 현재 폴더가 VS Code로 열립니다.

```powershell
code .
```

`code` 명령이 없다면 VS Code를 열고 **파일 › 폴더 열기**로 `coding-test`를 선택합니다.

열린 뒤 확장 탭(`Ctrl+Shift+X`)에서 **C# Dev Kit**을 설치합니다. 설치하면 C# 확장도 함께 들어옵니다. 이 확장이 코드를 쓰는 즉시 문법 오류에 빨간 줄을 표시합니다.

이후 명령은 VS Code 안에서 `` Ctrl+` ``로 통합 터미널을 열어 입력합니다.

---

## 3. 프로젝트 만들기

솔루션 하나에 풀이용 프로젝트와 테스트용 프로젝트를 둡니다.

```powershell
dotnet new sln -n Programmers
dotnet new classlib -n Solutions -o src/Solutions
dotnet new xunit -n Solutions.Tests -o tests/Solutions.Tests
dotnet sln add src/Solutions tests/Solutions.Tests
dotnet add tests/Solutions.Tests reference src/Solutions
```

.NET 10에서는 솔루션 파일이 `Programmers.slnx`로 만들어집니다. 정상입니다.

템플릿이 만든 예제 파일은 필요 없으니 지웁니다.

```powershell
del src/Solutions/Class1.cs
del tests/Solutions.Tests/UnitTest1.cs
```

선택 사항으로, 저장소로 관리한다면 `.gitignore`도 만듭니다.

```powershell
dotnet new gitignore
```

---

## 4. 프로젝트 설정 바꾸기

`src/Solutions/Solutions.csproj`를 열고 아래 내용으로 바꿉니다.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>disable</ImplicitUsings>
    <Nullable>disable</Nullable>
  </PropertyGroup>

</Project>
```

| 설정 | 값 | 이유 |
| :--- | :--- | :--- |
| `ImplicitUsings` | `disable` | 켜져 있으면 `using System;`을 빼먹어도 로컬에서는 통과하고, 사이트에서만 컴파일 오류가 납니다. 꺼 두면 로컬에서 같은 오류가 먼저 납니다 |
| `Nullable` | `disable` | 프로그래머스 템플릿은 null 허용 주석 없이 쓰이므로 같은 조건으로 맞춥니다 |
| `TargetFramework` | `net10.0` | 설치한 SDK 버전에 맞춥니다 |

사이트에서 컴파일이 안 되는 문법이 나오면 그 사이트의 C# 버전에 맞춰 `<LangVersion>`을 추가해 고정합니다.

---

## 5. 폴더 구조

단계별 폴더를 만들어 풀이와 테스트를 같은 이름으로 짝지어 둡니다.

```
coding-test/
├─ Programmers.slnx
├─ src/Solutions/
│  ├─ Solutions.csproj
│  └─ Stage2/P42577.cs          ← 단계 폴더 / P + 문제 번호
└─ tests/Solutions.Tests/
   ├─ Solutions.Tests.csproj
   └─ Stage2/P42577Tests.cs
```

---

## 6. 풀이 파일 작성

`src/Solutions/Stage2/P42577.cs`를 만듭니다. `namespace`는 **file-scoped** 형식으로 쓰고, 문제 번호로 이름을 지어 문제 간 `Solution` 클래스 이름이 충돌하지 않게 합니다.

```csharp
using System;

namespace P42577;

public class Solution {
    public bool solution(string[] phone_book) {
        Array.Sort(phone_book, StringComparer.Ordinal);
        for (int i = 0; i + 1 < phone_book.Length; i++)
            if (phone_book[i + 1].StartsWith(phone_book[i], StringComparison.Ordinal))
                return false;
        return true;
    }
}
```

- 클래스 이름 `Solution`, 메서드 이름 `solution`, 매개변수와 반환 타입은 사이트 템플릿 그대로 둡니다.
- `namespace P42577;` 한 줄은 로컬 전용입니다. 사이트에 붙일 때 이 줄만 빼고 복사합니다.

---

## 7. 예제 테스트 작성

`tests/Solutions.Tests/Stage2/P42577Tests.cs`를 만들고 문제 설명의 입출력 예를 그대로 옮깁니다.

```csharp
using Xunit;

public class P42577Tests {
    [Theory]
    [InlineData(new[] { "119", "97674223", "1195524421" }, false)]
    [InlineData(new[] { "123", "456", "789" }, true)]
    [InlineData(new[] { "12", "123", "1235", "567", "88" }, false)]
    public void Examples(string[] book, bool expected) =>
        Assert.Equal(expected, new P42577.Solution().solution(book));
}
```

---

## 8. 오류 확인과 테스트 실행

문법 오류와 `using` 누락은 두 곳에서 잡힙니다.

| 시점 | 방법 | 확인되는 것 |
| :--- | :--- | :--- |
| 코드를 쓰는 중 | 편집기의 빨간 줄, 하단 **문제(Problems)** 패널 | 문법 오류, 없는 이름, 타입 불일치 |
| 붙여 넣기 직전 | `dotnet build` | 전체 컴파일 오류 목록 |
| 붙여 넣기 직전 | `dotnet test --filter P42577` | 예제 입출력 통과 여부 |

```powershell
dotnet test --filter P42577
```

`using System;`을 지우고 빌드하면 아래처럼 로컬에서 먼저 오류가 납니다.

```
error CS0103: 'Array' 이름이 현재 컨텍스트에 없습니다.
```

테스트가 `통과! - 실패: 0`으로 끝나면 사이트에 붙일 준비가 된 것입니다.

---

## 9. 사이트에 붙여 넣기

1. `P42577.cs`에서 `namespace P42577;` 줄을 뺀 나머지를 복사합니다. `using` 줄은 포함합니다.
2. 프로그래머스 문제 페이지에서 언어를 **C#**으로 선택하고 편집기의 기본 코드를 지운 뒤 붙여 넣습니다.
3. **코드 실행**으로 예제를 확인한 뒤 **제출 후 채점하기**를 누릅니다.

로컬 테스트를 통과해도 시간 초과나 큰 입력 문제는 사이트에서만 드러납니다. 제출 결과가 실패하면 그 입력을 테스트에 추가해 로컬에서 재현합니다.

---

## 하루 흐름

| 순서 | 할 일 |
| :--- | :--- |
| 1 | 오늘 문제를 고르고 `P번호.cs`, `P번호Tests.cs`를 같은 단계 폴더에 만든다 |
| 2 | 풀이를 쓰며 빨간 줄을 바로 고친다 |
| 3 | `dotnet test --filter P번호`로 예제를 통과시킨다 |
| 4 | `namespace` 줄을 빼고 사이트에 붙여 제출한다 |
| 5 | `[진행 이력]` 레벨 글에 날짜와 코드 링크를 한 줄 추가한다 |

---

## 입출력형 문제 테스트 (ConsoleRunner)

대부분의 문제는 `solution` 함수형이라 위의 방법으로 충분합니다. "문자열 출력하기"처럼 `Main`에서 `Console`로 직접 읽고 쓰는 **입출력형** 문제는 함수에 값을 넘길 수 없어서, 입력과 출력을 문자열로 바꿔 끼우는 도우미를 씁니다.

| 문제 형식 | 템플릿 | 테스트 방법 |
| :--- | :--- | :--- |
| solution 함수형 | `public class Solution` + `solution(...)` | 7번처럼 `solution`을 직접 호출 |
| 입출력형 | `public class Example` + `static void Main()` | `ConsoleRunner`로 `Main` 실행 |

간단한 입출력형 문제(읽어서 그대로 출력)는 빌드만 통과시키고, 프로그래머스의 **코드 실행**으로 확인해도 됩니다.

### 도우미 파일 추가 (한 번만)

`tests/Solutions.Tests/ConsoleRunner.cs`를 만듭니다.

```csharp
using System;
using System.IO;

/// <summary>
/// 입출력형 문제(Main에서 Console로 읽고 쓰는 문제)를 테스트에서 실행하는 도우미.
/// 입력 문자열을 표준 입력으로 넣고 Main을 실행한 뒤, 출력된 내용을 문자열로 돌려준다.
/// 주의: 풀이에 Console.Clear()가 있으면 IOException이 나므로 로컬에서는 주석 처리한다.
/// </summary>
public static class ConsoleRunner
{
    // Console 입출력은 프로그램 전체가 공유하므로, 테스트가 동시에 실행돼도 섞이지 않게 한 번에 하나씩 실행한다.
    private static readonly object Gate = new();

    /// <summary>출력 전체를 그대로 돌려준다. 줄바꿈은 Environment.NewLine.</summary>
    public static string Run(Action main, string input = "")
    {
        lock (Gate)
        {
            var oldIn = Console.In;
            var oldOut = Console.Out;
            try
            {
                Console.SetIn(new StringReader(input));
                var output = new StringWriter();
                Console.SetOut(output);
                main();
                return output.ToString();
            }
            finally
            {
                Console.SetIn(oldIn);
                Console.SetOut(oldOut);
            }
        }
    }

    /// <summary>출력을 줄 단위 배열로 돌려준다. 마지막 줄바꿈 뒤의 빈 줄은 뺀다.</summary>
    public static string[] RunLines(Action main, string input = "")
    {
        var output = Run(main, input).Replace("\r\n", "\n");
        if (output.EndsWith("\n")) output = output[..^1];
        return output.Split('\n');
    }
}
```

| 함수 | 돌려주는 것 | 쓰는 곳 |
| :--- | :--- | :--- |
| `ConsoleRunner.Run(Main, 입력)` | 출력 전체 문자열 (줄바꿈 포함) | 공백·줄바꿈까지 정확히 비교할 때 |
| `ConsoleRunner.RunLines(Main, 입력)` | 줄 단위 배열 (마지막 빈 줄 제외) | 보통은 이쪽. Windows 줄바꿈(`\r\n`)을 신경 쓰지 않아도 됨 |

`Console`은 프로그램 전체가 같이 쓰기 때문에, 테스트가 동시에 실행돼도 출력이 섞이지 않도록 `lock`으로 한 번에 하나씩 실행합니다.

### 풀이 파일

```csharp
// src/Solutions/Stage0/P181952.cs
using System;

namespace P181952;

// https://school.programmers.co.kr/learn/courses/30/lessons/181952
public class Example
{
    public static void Main()
    {
        String s;

        // Console.Clear();   // 로컬 테스트에서는 주석 처리
        s = Console.ReadLine();
        Console.WriteLine(s);
    }
}
```

### 테스트 파일

```csharp
// tests/Solutions.Tests/Stage0/P181952Tests.cs
using System;
using Xunit;

public class P181952Tests
{
    [Theory]
    [InlineData("HelloWorld!")]
    public void Examples(string input) =>
        Assert.Equal(new[] { input }, ConsoleRunner.RunLines(P181952.Example.Main, input));

    [Fact]
    public void RawOutput() =>
        Assert.Equal("HelloWorld!" + Environment.NewLine,
            ConsoleRunner.Run(P181952.Example.Main, "HelloWorld!"));
}
```

- 여러 줄 입력은 `"3\n1\n2\n3"`처럼 `\n`으로 이어서 넣습니다.
- 출력이 여러 줄이면 `RunLines`의 기대값을 `new[] { "a = 4", "b = 5" }`처럼 줄마다 적습니다.
- 실행은 다른 문제와 같이 `dotnet test --filter P181952`입니다.

> **`Console.Clear()` 주의**: 프로그래머스 입출력형 템플릿에는 `Console.Clear();`가 들어 있습니다. 출력을 문자열로 받는 상태에서 실행하면 `IOException: 핸들이 잘못되었습니다.`가 나므로, 로컬 테스트에서는 이 줄을 주석 처리합니다. 사이트에 제출할 때는 템플릿대로 두면 됩니다.

---

[🔙 뒤로 가기](../index.md)
