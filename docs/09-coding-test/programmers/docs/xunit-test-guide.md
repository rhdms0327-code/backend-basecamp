---
layout: post
title: "🧩 [준비 과정] xUnit 테스트 작성 가이드"
date: 2026-10-15
categories: [코딩테스트]
tags: []
nav_exclude: true
---

> 풀이 코드를 사이트에 붙이기 전에 내 PC에서 검증하는 방법입니다. 테스트 도구는 xUnit이며, 1부에서 준비하고 2부에서 작성하고 3부에서 실행·참고합니다. 코드는 모두 `dotnet test`로 실행해 통과를 확인했습니다.

---

## 한 장 요약

| 항목 | 방법 |
| :--- | :--- |
| 파일 | 문제 하나에 풀이 `P번호.cs` + 테스트 `P번호Tests.cs` |
| 문제 예제 | `[Theory]` + 예제마다 `[InlineData(입력..., 기대값)]` 한 줄 |
| 그 밖의 케이스 | `[Fact]` 하나에 입력을 코드로 만든다 (경계값, 큰 입력, 무작위 비교) |
| 검증 | `Assert.Equal(기대값, 실제값)`. 배열도 그대로 비교된다 |
| 실행 | `dotnet test --filter P번호` |
| 붙여 넣기 | 통과하면 `namespace P번호;` 줄만 빼고 복사 |

---

## 1부 · 시작하기

### 1. 사용한 기술

테스트 도구는 **xUnit**(정식 이름 xUnit.net)입니다. .NET에서 가장 널리 쓰는 **단위 테스트(unit test)** 프레임워크이고, `dotnet new xunit` 템플릿의 기본값입니다.

단위 테스트는 함수 하나에 입력을 주고, 반환값이 기대와 같은지 자동으로 확인하는 테스트입니다. 코테에서는 `solution` 메서드 하나가 테스트 단위입니다. 프로그래머스의 "코드 실행"을 내 PC에서 여러 입력으로 한꺼번에 돌리는 것과 같습니다.

| 기술 | 하는 일 | 이 프로젝트에서 |
| :--- | :--- | :--- |
| .NET SDK · `dotnet` CLI | 빌드와 테스트 실행 | `dotnet build`, `dotnet test` |
| xUnit (`xunit` 2.9.3) | 테스트를 쓰는 문법 | `[Fact]`, `[Theory]`, `Assert` |
| `Microsoft.NET.Test.Sdk` | `dotnet test`가 테스트 프로젝트를 실행하게 하는 기반 | 템플릿 기본 포함, 손댈 일 없음 |
| `xunit.runner.visualstudio` | 테스트를 찾아 실행하고 결과를 CLI·편집기에 전달 | 템플릿 기본 포함, 손댈 일 없음 |
| Roslyn (C# Dev Kit) | 문법 오류를 빨간 줄로 표시 | VS Code에서 코드를 쓰는 동안 |

같은 역할의 NUnit, MSTest도 있지만 문법만 다릅니다. 이 가이드는 xUnit만 다룹니다.

### 2. 전체 흐름

1. 문제의 입출력 예를 테스트에 옮긴다
2. 풀이를 쓰며 빨간 줄을 고친다
3. `dotnet test --filter P번호`로 실행한다
4. 경계값·큰 입력을 추가한다
5. `namespace` 줄을 빼고 사이트에 붙인다

| 파일 | 위치 | 규칙 |
| :--- | :--- | :--- |
| 풀이 | `src/Solutions/Stage2/P42577.cs` | `namespace P42577;` + `public class Solution` |
| 테스트 | `tests/Solutions.Tests/Stage2/P42577Tests.cs` | 클래스 이름 `P번호Tests`, namespace 없음 |

### 3. 기본 틀

모든 테스트는 **준비 → 실행 → 검증** 세 단계입니다. 문제가 바뀌면 번호, 입력 타입, 예제만 바꿉니다.

```csharp
using Xunit;

public class P42577Tests {
    [Theory]
    [InlineData(new[] { "119", "97674223", "1195524421" }, false)]
    [InlineData(new[] { "123", "456", "789" }, true)]
    [InlineData(new[] { "12", "123", "1235", "567", "88" }, false)]
    public void Examples(string[] book, bool expected) {
        // 1. 준비: 테스트 대상을 만든다
        var sut = new P42577.Solution();

        // 2. 실행: 풀이를 호출한다
        var actual = sut.solution(book);

        // 3. 검증: 기대값과 비교한다 (기대값이 먼저)
        Assert.Equal(expected, actual);
    }
}
```

#### 메서드 이름

| 이름 | 쓰는 곳 |
| :--- | :--- |
| `Examples` | 문제 설명의 입출력 예 |
| `Single` · `Empty` · `AllSame` | 경계값 |
| `Large_FinishesQuickly` | 큰 입력과 시간 |
| `MatchesBruteForce` | 무작위 비교 |

---

## 2부 · 작성하기

### 4. Fact와 Theory

`[Fact]`는 입력이 하나로 정해진 테스트, `[Theory]`는 같은 테스트를 입력만 바꿔 여러 번 돌리는 테스트입니다.

```csharp
// [Fact] · 매개변수 없음, 1번 실행
[Fact]
public void Single() {
    var actual = new P42577.Solution().solution(new[] { "1" });
    Assert.True(actual);
}

// [Theory] · 매개변수 있음, 케이스마다 실행
[Theory]
[InlineData(new[] { "123", "456" }, true)]
[InlineData(new[] { "12", "123" }, false)]
public void Examples(string[] book, bool expected) {
    var actual = new P42577.Solution().solution(book);
    Assert.Equal(expected, actual);
}
```

| 구분 | `[Fact]` | `[Theory]` |
| :--- | :--- | :--- |
| 매개변수 | 없음 | 있음 |
| 입력 | 코드 안에 고정 | `[InlineData]` · `[MemberData]`로 전달 |
| 실행 횟수 | 1번 | 케이스 수만큼, 결과도 케이스별로 표시 |
| 코테에서 | 경계값, 큰 입력, 무작위 비교 | 문제 설명의 입출력 예 |

#### 고르는 기준

- 문제 예제가 여러 개면 `[Theory]`. 케이스를 늘릴 때 `[InlineData]` 한 줄만 더하면 됩니다.
- 입력을 반복문으로 만들어야 하면 `[Fact]`. 100만 개짜리 배열은 `[InlineData]`에 쓸 수 없습니다.
- 잠시 끄고 싶을 때는 `[Fact(Skip = "사유")]`.

> **서로 바꿔 쓸 수 없음**: `[Fact]`에 매개변수를 달면 오류가 나고, `[Theory]`에 데이터 속성을 빼먹으면 실행되지 않습니다.

### 5. 입력 데이터 주기

| 방법 | 넣을 수 있는 값 | 예 |
| :--- | :--- | :--- |
| `[InlineData]` | 숫자, 문자열, `bool`, 1차원 배열 | `[InlineData(new[] { 1, 2 }, 3)]` |
| `[MemberData]` | 2차원 배열, 객체 등 코드로 만든 값 | 아래 예시 |

- 빈 배열은 `new int[0]`, 큰 정수는 `3000000000L`처럼 `L`을 붙입니다.
- 값의 순서와 개수는 메서드 매개변수와 같아야 합니다. 기대값을 마지막에 두면 읽기 편합니다.

```csharp
public static TheoryData<int[][], int> GridCases => new() {
    { new[] { new[] { 1, 0 }, new[] { 0, 1 } }, 2 },
    { new[] { new[] { 1, 1, 1 } }, 3 },
};

[Theory, MemberData(nameof(GridCases))]
public void Grid(int[][] grid, int expected) {
    Assert.Equal(expected, new P12345.Solution().solution(grid));
}
```

`TheoryData<...>`의 타입 인자 순서가 메서드 매개변수 순서와 같아야 합니다.

### 6. 검증하기 (Assert)

#### 반환 타입별 검증

| 반환 타입 | 검증 | 기대값 쓰는 법 |
| :--- | :--- | :--- |
| `int` · `long` · `string` | `Assert.Equal(expected, actual)` | 값 그대로 |
| `bool` | `Assert.Equal` 또는 `Assert.True` / `False` | `true` / `false` |
| `int[]` · `string[]` | `Assert.Equal(expected, actual)`, 요소를 순서대로 비교 | `new[] { 2, 1 }` |
| `int[][]` | `Assert.Equal(expected, actual)` | `MemberData`로 전달 |
| `double` | `Assert.Equal(expected, actual, 5)` | 소수 5자리까지 비교 |

#### 그 밖에 쓰는 Assert

| 함수 | 하는 일 | 예 |
| :--- | :--- | :--- |
| `Assert.True(조건, 메시지)` | 조건이 참인지. 실패 메시지를 붙일 수 있음 | `Assert.True(ms < 1000, "느림")` |
| `Assert.NotEqual(a, b)` | 값이 다른지 | `Assert.NotEqual(0, answer)` |
| `Assert.Empty` / `NotEmpty` | 컬렉션·문자열이 비었는지 | `Assert.Empty(result)` |
| `Assert.Contains(값, 컬렉션)` | 들어 있는지 | `Assert.Contains("b", names)` |
| `Assert.InRange(값, 최소, 최대)` | 범위 안인지 | `Assert.InRange(answer, 0, 100)` |
| `Assert.All(컬렉션, 검사)` | 모든 요소에 같은 검사 | `Assert.All(result, x => Assert.True(x >= 0))` |
| `Assert.Throws<예외>(...)` | 그 예외가 나는지 | `Assert.Throws<FormatException>(() => int.Parse("a"))` |

> **순서 주의**: 실패하면 "Expected: … Actual: …"로 표시됩니다. 인자 순서를 바꾸면 메시지가 뒤집혀 읽기 어려워지니 항상 `(기대값, 실제값)`으로 씁니다.

### 7. 상황별 패턴

#### 7-1. 결과의 순서가 상관없을 때

"어떤 순서로 반환해도 된다"는 문제는 양쪽을 정렬한 뒤 비교합니다.

```csharp
using System.Linq;

Assert.Equal(expected.OrderBy(x => x), actual.OrderBy(x => x));
```

#### 7-2. 큰 입력과 시간 측정

제한 사항의 최대 크기로 입력을 만들어 돌립니다. 시간 초과는 예제만으로는 드러나지 않습니다.

```csharp
using System.Diagnostics;

[Fact]
public void Large_FinishesQuickly() {
    var book = new string[1_000_000];
    for (int i = 0; i < book.Length; i++) book[i] = i.ToString("D8");

    var sw = Stopwatch.StartNew();
    new P42577.Solution().solution(book);
    sw.Stop();

    Assert.True(sw.ElapsedMilliseconds < 1000, $"{sw.ElapsedMilliseconds}ms 걸림");
}
```

1초는 임의 기준입니다. 내 PC와 채점 서버의 속도가 다르므로 시간 복잡도를 가늠하는 지표로만 씁니다.

#### 7-3. 단순한 정답과 무작위 비교

느리지만 확실한 풀이(브루트포스)를 테스트 안에 두고, 무작위 입력에서 내 풀이와 비교합니다. 예제로 못 잡는 오답을 찾는 데 가장 효과적입니다.

```csharp
using System;
using System.Linq;

[Fact]
public void MatchesBruteForce() {
    var rnd = new Random(1234);                       // 시드 고정: 실패하면 같은 입력이 재현됨
    for (int t = 0; t < 500; t++) {
        int n = rnd.Next(1, 8);
        var book = Enumerable.Range(0, n)
            .Select(_ => rnd.Next(1, 1000).ToString())
            .Distinct()                               // 문제 제한: 중복 없음
            .ToArray();

        var expected = BruteForce(book);
        var actual = new P42577.Solution().solution((string[])book.Clone());

        Assert.True(expected == actual, "입력: " + string.Join(",", book));
    }
}

static bool BruteForce(string[] book) {
    for (int i = 0; i < book.Length; i++)
        for (int j = 0; j < book.Length; j++)
            if (i != j && book[j].StartsWith(book[i])) return false;
    return true;
}
```

> **입력 배열 복사**: 풀이가 `Array.Sort`처럼 입력을 직접 바꾸면, 그 뒤의 비교와 출력에 정렬된 값이 보입니다. 풀이에 넘길 때는 `(string[])book.Clone()`으로 복사본을 줍니다.

### 8. 작성 예시: 기능개발 (42586)

입력이 배열 두 개, 결과도 배열인 문제입니다. 풀이와 테스트를 같은 번호로 짝지어 만듭니다.

```csharp
// src/Solutions/Stage3/P42586.cs
using System.Collections.Generic;

namespace P42586;

public class Solution {
    public int[] solution(int[] progresses, int[] speeds) {
        var result = new List<int>();
        int prevDay = 0;
        for (int i = 0; i < progresses.Length; i++) {
            int day = (100 - progresses[i] + speeds[i] - 1) / speeds[i];   // 올림 나눗셈
            if (result.Count > 0 && day <= prevDay) result[result.Count - 1]++;
            else { result.Add(1); prevDay = day; }
        }
        return result.ToArray();
    }
}
```

```csharp
// tests/Solutions.Tests/Stage3/P42586Tests.cs
using Xunit;

public class P42586Tests {
    [Theory]
    [InlineData(new[] { 93, 30, 55 }, new[] { 1, 30, 5 }, new[] { 2, 1 })]
    [InlineData(new[] { 95, 90, 99, 99, 80, 99 }, new[] { 1, 1, 1, 1, 1, 1 }, new[] { 1, 3, 2 })]
    public void Examples(int[] progresses, int[] speeds, int[] expected) {
        var actual = new P42586.Solution().solution(progresses, speeds);
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void AllDoneTogether() {
        var actual = new P42586.Solution().solution(new[] { 99, 99 }, new[] { 1, 1 });
        Assert.Equal(new[] { 2 }, actual);
    }
}
```

- 예제 2개는 `[Theory]`, 직접 만든 경계 케이스는 `[Fact]`로 나눴습니다.
- 결과가 `int[]`라 `Assert.Equal`이 요소를 순서대로 비교합니다.
- `dotnet test --filter P42586`로 3개 케이스 통과를 확인했습니다.

---

## 3부 · 실행과 참고

### 9. 실행과 디버깅

| 하고 싶은 일 | 명령 |
| :--- | :--- |
| 문제 하나만 | `dotnet test --filter P42577` |
| 테스트 메서드 하나만 | `dotnet test --filter "FullyQualifiedName~P42577Tests.Examples"` |
| 전체 | `dotnet test` |
| 출력까지 보기 | `dotnet test --logger "console;verbosity=detailed"` |
| 저장할 때마다 자동 실행 | `dotnet watch test --project tests/Solutions.Tests` |
| 컴파일 오류만 확인 | `dotnet build` |

#### 값 찍어 보기

테스트 안에서는 `Console.WriteLine`이 보이지 않습니다. `ITestOutputHelper`를 생성자로 받아 쓰고, 위 표의 `--logger` 옵션으로 실행하면 출력이 보입니다. 편집기에서 테스트 옆의 **디버그**를 눌러 중단점을 써도 됩니다.

```csharp
using Xunit;
using Xunit.Abstractions;   // xUnit 2.x. 3.x에서는 using Xunit;만 필요

public class P42577Tests {
    private readonly ITestOutputHelper _output;
    public P42577Tests(ITestOutputHelper output) { _output = output; }

    [Fact]
    public void Print() {
        _output.WriteLine("book = " + string.Join(",", new[] { "119", "97" }));
    }
}
```

### 10. 문법 풀이

이 가이드의 코드에 나온 문법입니다. 처음 보는 기호가 있으면 여기서 찾습니다.

| 문법 | 뜻 | 예 |
| :--- | :--- | :--- |
| `using Xunit;` | 다른 네임스페이스의 이름을 가져온다. 테스트 프로젝트는 템플릿이 전역으로 넣어 두어 생략해도 되지만, 적어 두면 읽기 쉽다 | `using System.Linq;` |
| `namespace P42577;` | 클래스가 속할 이름 묶음. 문제마다 달리해 `Solution` 이름 충돌을 막는다 (file-scoped, C# 10) | `new P42577.Solution()` |
| `[Theory]` · `[Fact]` | 속성(attribute). 메서드 위 대괄호로 "이건 테스트"라고 표시 | `[Fact]` |
| `[InlineData(a, b)]` | 테스트 매개변수에 넣을 값 한 벌. 줄마다 케이스 하나 | `[InlineData(new[]{1,2}, 3)]` |
| `new[] { 1, 2, 3 }` | 배열 만들기. 요소로 타입을 추론 | `new[] { "a", "b" }` |
| `var sut` | `var`는 타입 추론. `sut`는 system under test(테스트 대상)라는 관례 이름 | `var sut = new P42577.Solution();` |
| `=>` | 람다(이름 없는 함수) 또는 한 줄짜리 메서드 본문 | `x => x * 2` |
| `_ => ...` | 쓰지 않는 매개변수를 `_`로 받는 람다 | `.Select(_ => rnd.Next(10))` |
| `1_000_000` | 숫자 자리 구분자. 값은 1000000 | `new string[1_000_000]` |
| `$"{x}ms"` | 문자열 보간. 중괄호 안에 값을 넣는다 | `$"{sw.ElapsedMilliseconds}ms"` |
| `nameof(GridCases)` | 이름을 문자열로 만들되 오타는 컴파일 때 잡는다 | `[MemberData(nameof(GridCases))]` |
| `new() { ... }` | 타입을 생략한 객체 생성(C# 9) + 초기화 목록 | `TheoryData<int, int> d = new() { {1, 2} };` |
| `(string[])arr.Clone()` | 배열 복사본을 만들어 원본 보호 | `solution((int[])arr.Clone())` |
| `static` | 객체 없이 클래스에 붙은 멤버. `MemberData`와 보조 함수에 사용 | `static bool BruteForce(...)` |

### 11. 풀이에 자주 쓰는 함수

프로그래머스 C# 버전에 따라 일부 최신 함수는 없을 수 있습니다. 사이트에서 컴파일 오류가 나면 오래된 방식으로 바꿉니다.

| 분류 | 함수 | 설명 |
| :--- | :--- | :--- |
| 정렬 | `Array.Sort(arr)` · `list.Sort()` | 제자리 정렬. 원본이 바뀜 |
| 정렬 | `Array.Sort(arr, (a, b) => b - a)` | 비교 함수로 내림차순 등 지정 |
| 정렬 | `arr.OrderBy(x => x).ToArray()` | 원본은 두고 새로 정렬 (`using System.Linq;`) |
| 문자열 | `string.Join(",", arr)` | 배열을 문자열로 이어 붙이기 |
| 문자열 | `s.ToCharArray()` · `new string(chars)` | 문자 배열로 바꿔 수정 후 다시 문자열로 |
| 문자열 | `s.Split(' ')` · `s.Substring(i, len)` | 쪼개기, 자르기 |
| 문자열 | `StringBuilder.Append` | 반복해서 이어 붙일 때 (`using System.Text;`) |
| 변환 | `int.Parse(s)` · `n.ToString()` · `c - '0'` | 문자열·숫자·숫자 문자 변환 |
| 수학 | `Math.Max` · `Min` · `Abs` · `Sqrt` · `Pow` | `Sqrt` · `Pow`는 실수 반환, `(int)` 변환 필요 |
| Dictionary | `ContainsKey` · `TryGetValue` · `dict[key]++` | 개수 세기. 없는 키를 읽기 전에 확인 |
| 집합 | `HashSet<T>.Add` · `Contains` | 중복 제거, O(1) 포함 검사 |
| 큐·스택 | `Queue.Enqueue/Dequeue` · `Stack.Push/Pop` | BFS, 괄호 검사 |
| 우선순위 큐 | `PriorityQueue<T, P>` | .NET 6 이상. 사이트에서 컴파일되는지 먼저 확인 |
| 배열 | `new int[n, m]` · `Array.Fill` | 2차원 배열, 초기화 |
| LINQ | `Sum` · `Max` · `Where` · `Select` · `Distinct` | 짧게 쓰기 좋지만 반복문 안에서는 느려질 수 있음 |

### 12. 붙이기 전 점검

- [ ] 문제의 입출력 예를 모두 `[Theory]`에 넣었다
- [ ] 최솟값·최댓값·원소 1개 같은 경계 케이스를 확인했다
- [ ] 최대 크기 입력에서 오래 걸리지 않는다
- [ ] `dotnet build`에 오류가 없고 `using`이 빠지지 않았다
- [ ] 클래스 `Solution`, 메서드 이름과 시그니처가 사이트 템플릿과 같다
- [ ] `namespace P번호;` 줄을 빼고 복사했다

---

xUnit 2.9.3, .NET 10.0.203, Windows에서 확인했습니다. 프로그래머스 서버의 C# 버전은 확인하지 못했습니다.

---

[🔙 뒤로 가기](../index.md)
