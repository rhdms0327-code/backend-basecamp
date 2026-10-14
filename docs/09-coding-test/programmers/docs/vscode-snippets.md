---
layout: post
title: "🧩 [준비 과정] VS Code C# 단축어와 스니펫 정리"
date: 2026-10-14
categories: [코딩테스트]
tags: []
nav_exclude: true
---

> C# 코테를 쓸 때 자주 쓰는 VS Code 기본 스니펫, `Solution` 클래스를 한 번에 만드는 사용자 스니펫, 입출력 패턴, 에디터 단축키를 모아 둡니다.

---

## 1. 기본 스니펫 (C# Dev Kit)

입력 후 `Tab` 또는 `Enter`로 확정합니다. 목록이 안 뜨면 `Ctrl+Space`로 호출합니다.

| 입력 | 확장 결과 |
| :--- | :--- |
| `cw` | `Console.WriteLine();` |
| `cr` | `Console.ReadLine();` |
| `prop` | `public int MyProperty { get; set; }` |
| `propfull` | 백킹 필드 포함 전체 프로퍼티 |
| `ctor` | 생성자 |
| `class` | 클래스 템플릿 |
| `interface` | 인터페이스 |
| `svm` | `static void Main(string[] args)` |
| `for` / `forr` | for 문 / 역방향 for 문 |
| `foreach` | foreach 문 |
| `while` | while 문 |
| `if` / `else` | 조건문 |
| `switch` | switch 문 |
| `try` / `tryf` | try-catch / try-finally |
| `using` | using 문 |

---

## 2. Solution 클래스 자동 생성 (사용자 스니펫)

`Ctrl+Shift+P` → `Snippets: Configure Snippets` → `csharp.json (C#)` 선택 후 최상위 `{ }` 안에 추가합니다. 이미 내용이 있으면 앞 항목 뒤에 쉼표를 붙여 이어 씁니다.

```json
{
  "Programmers Solution": {
    "prefix": "sol",
    "body": [
      "using System;",
      "using System.Collections.Generic;",
      "using System.Linq;",
      "",
      "namespace P${1:번호};",
      "",
      "public class Solution {",
      "    public ${2:int} solution(${3:int n}) {",
      "        ${2:int} answer = ${4:0};",
      "        $0",
      "        return answer;",
      "    }",
      "}"
    ],
    "description": "프로그래머스 Solution 템플릿 (C#)"
  },
  "xUnit Test Theory": {
    "prefix": "tc",
    "body": [
      "using Xunit;",
      "",
      "public class P${1:번호}Tests {",
      "    [Theory]",
      "    [InlineData($2)]",
      "    public void Examples($3) =>",
      "        Assert.Equal($4, new P${1:번호}.Solution().solution($5));",
      "}"
    ],
    "description": "프로그래머스 xUnit 테스트 틀"
  },
  "Baekjoon Main": {
    "prefix": "bj",
    "body": [
      "using System;",
      "using System.Collections.Generic;",
      "using System.IO;",
      "using System.Linq;",
      "using System.Text;",
      "",
      "class Program {",
      "    static void Main(string[] args) {",
      "        var sr = new StreamReader(Console.OpenStandardInput());",
      "        var sb = new StringBuilder();",
      "        $0",
      "        Console.Write(sb);",
      "    }",
      "}"
    ],
    "description": "백준 템플릿 (빠른 입출력)"
  },
  "Console Read Ints": {
    "prefix": "readints",
    "body": [
      "var ${1:arr} = Console.ReadLine().Split().Select(int.Parse).ToArray();"
    ],
    "description": "한 줄 정수 배열 입력"
  }
}
```

| 입력 | 결과 |
| :--- | :--- |
| `sol` + `Tab` | `Solution` 클래스 (프로젝트 규칙대로 `namespace P번호;` 포함) |
| `tc` + `Tab` | xUnit 테스트 틀 (`[Theory]` + `[InlineData]`) |
| `bj` + `Tab` | 백준 입출력 템플릿 |
| `readints` + `Tab` | 정수 배열 한 줄 입력 |

- `sol`의 `namespace` 줄은 [프로젝트 만들기](./project-setup.md)의 로컬 규칙에 맞춘 것입니다. 사이트에 붙일 때는 이 줄만 빼고 복사합니다.
- `tc`는 `tests/Solutions.Tests/Stage2/P번호Tests.cs`처럼 테스트 파일을 만든 뒤 빈 파일에서 씁니다. 풀이는 `sol`, 테스트는 `tc` 순서로 만들면 빠릅니다.
- 스니펫이 안 뜨면 설정에서 `editor.tabCompletion`이 `on`, `editor.snippetSuggestions`가 `top`인지 확인합니다.
- 코테 폴더에서만 쓰려면 `New Snippets file for 'coding-test'`로 워크스페이스 전용 파일을 만들고 `"scope": "csharp"`를 지정합니다.

---

## 3. 자주 쓰는 입출력 패턴

```csharp
int n = int.Parse(Console.ReadLine());                             // 정수 1개
int[] a = Console.ReadLine().Split().Select(int.Parse).ToArray();  // 정수 배열
string[] s = Console.ReadLine().Split();                           // 문자열 배열
Console.WriteLine(string.Join(" ", a));                            // 배열 출력
```

프로그래머스는 입출력을 매개변수와 반환값으로 주고받으므로 위 패턴은 백준용입니다.

---

## 4. 에디터 단축키 (Windows)

| 동작 | 단축키 |
| :--- | :--- |
| 줄 복사(아래) | `Shift+Alt+↓` |
| 줄 이동 | `Alt+↑` / `Alt+↓` |
| 줄 삭제 | `Ctrl+Shift+K` |
| 줄 주석 토글 | `Ctrl+/` |
| 코드 포맷 | `Shift+Alt+F` |
| using 정리 | `Shift+Alt+O` |
| 빠른 수정 / using 추가 | `Ctrl+.` |
| 다중 커서 | `Alt+클릭` / `Ctrl+Alt+↑↓` |
| 같은 단어 다음 선택 | `Ctrl+D` |
| 같은 단어 전체 선택 | `Ctrl+Shift+L` |
| 이름 일괄 변경 | `F2` |
| 정의로 이동 | `F12` |
| 파일 찾기 | `Ctrl+P` |
| 명령 팔레트 | `Ctrl+Shift+P` |
| 전체 검색 | `Ctrl+Shift+F` |
| 터미널 토글 | `` Ctrl+` `` |
| 사이드바 토글 | `Ctrl+B` |

---

[🔙 뒤로 가기](../index.md)
