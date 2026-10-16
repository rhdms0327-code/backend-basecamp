---
layout: post
title: "🎯 문자열 (string) 다루기"
date: 2026-10-15
categories: [코딩테스트]
tags: []
nav_exclude: true
---

> 코딩테스트에서 자주 쓰는 C# 문자열 함수와 문법을 용도별로 정리했습니다. 예시의 결과값은 모두 xUnit 테스트로 실행해 확인했습니다. 마지막에 자주 하는 실수와 자주 나오는 풀이 패턴을 모았습니다.

---

## 먼저 알아 둘 것

- **문자열은 바꿀 수 없다(immutable).** `Replace`, `ToUpper` 같은 함수는 원본을 바꾸지 않고 새 문자열을 반환합니다. 결과를 변수에 다시 담아야 합니다.
- **`string`과 `char`는 다르다.** `"a"`는 문자열, `'a'`는 문자 하나입니다. `s[i]`의 결과는 `char`입니다.
- **반복해서 이어 붙일 때는 `StringBuilder`.** 반복문 안에서 `+=`를 쓰면 매번 새 문자열이 생겨 느려집니다.
- **필요한 `using`**: 기본 함수는 `using System;`, `Reverse`·`Select` 같은 LINQ는 `using System.Linq;`, `StringBuilder`는 `using System.Text;`.

---

## 1. 길이와 문자 꺼내기

| 코드 | 결과 (`s = "hello"`) | 설명 |
| :--- | :--- | :--- |
| `s.Length` | `5` | 길이. 메서드가 아니라 속성이라 괄호가 없다 |
| `s[1]` | `'e'` | i번째 문자 (`char`), 0부터 시작 |
| `s[s.Length - 1]` | `'o'` | 마지막 문자 |
| `s[^1]` | `'o'` | 마지막 문자 (C# 8 이상) |
| `s[1..4]` | `"ell"` | 1번부터 4번 앞까지 (C# 8 이상) |

```csharp
foreach (char c in s) { /* 문자 하나씩 */ }
for (int i = 0; i < s.Length; i++) { /* 위치가 필요할 때 */ }
```

> `^1`, `1..4`는 C# 8 문법입니다. 채점 환경의 C# 버전에서 컴파일되지 않으면 `s[s.Length - 1]`, `s.Substring(1, 3)`으로 바꿉니다.

---

## 2. 자르기와 찾기

| 코드 | 결과 (`s = "banana"`) | 설명 |
| :--- | :--- | :--- |
| `s.Substring(2)` | `"nana"` | 2번부터 끝까지 |
| `s.Substring(2, 2)` | `"na"` | 2번부터 **2글자**. 두 번째 인자는 끝 위치가 아니라 길이 |
| `s.IndexOf('a')` | `1` | 처음 나오는 위치 |
| `s.IndexOf('a', 2)` | `3` | 2번부터 찾기 |
| `s.IndexOf("na")` | `2` | 문자열도 찾을 수 있다 |
| `s.LastIndexOf('a')` | `5` | 마지막으로 나오는 위치 |
| `s.IndexOf('z')` | `-1` | 없으면 -1 |
| `s.Contains("nan")` | `true` | 포함 여부 |
| `s.StartsWith("ba")` | `true` | 접두어 |
| `s.EndsWith("na")` | `true` | 접미어 |

---

## 3. 쪼개기와 합치기

| 코드 | 결과 | 설명 |
| :--- | :--- | :--- |
| `"a b c".Split(' ')` | `["a", "b", "c"]` | 구분자로 쪼개기 |
| `"a  b".Split(' ')` | `["a", "", "b"]` | 공백이 연속이면 **빈 문자열**이 생긴다 |
| `"a  b".Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)` | `["a", "b"]` | 빈 문자열 제거 |
| `"1,2 3".Split(new[] { ',', ' ' })` | `["1", "2", "3"]` | 구분자 여러 개 |
| `string.Join(",", new[] { 1, 2, 3 })` | `"1,2,3"` | 배열을 구분자로 잇기. 숫자 배열도 된다 |
| `string.Concat(new[] { "a", "b", "c" })` | `"abc"` | 구분자 없이 잇기 |
| `new string(new[] { 'a', 'b', 'c' })` | `"abc"` | `char` 배열을 문자열로 |
| `new string('*', 5)` | `"*****"` | 같은 문자 반복 |

---

## 4. 바꾸기

| 코드 | 결과 | 설명 |
| :--- | :--- | :--- |
| `"hello".Replace('e', '_')` | `"h_llo"` | 문자 바꾸기 (전부) |
| `"hello".Replace("ll", "LL")` | `"heLLo"` | 문자열 바꾸기 (전부) |
| `"hello".ToUpper()` / `ToLower()` | `"HELLO"` | 대소문자 |
| `"  abc ".Trim()` | `"abc"` | 앞뒤 공백 제거. `TrimStart`, `TrimEnd`도 있다 |
| `"42".PadLeft(5, '0')` | `"00042"` | 왼쪽을 채워 길이 맞추기 |
| `"42".PadRight(5)` | `"42   "` | 오른쪽을 공백으로 채우기 |
| `"hello".Insert(2, "X")` | `"heXllo"` | 위치에 끼워 넣기 |
| `"hello".Remove(1, 3)` | `"ho"` | 1번부터 3글자 지우기 |
| `"hello".Remove(2)` | `"he"` | 2번부터 끝까지 지우기 |

---

## 5. 문자(char) 다루기

| 코드 | 결과 | 설명 |
| :--- | :--- | :--- |
| `char.IsDigit('7')` | `true` | 숫자인지 |
| `char.IsLetter('a')` | `true` | 글자인지 |
| `char.IsUpper('A')` / `IsLower('a')` | `true` | 대문자 / 소문자인지 |
| `char.IsWhiteSpace(' ')` | `true` | 공백인지 |
| `char.ToUpper('a')` | `'A'` | 문자 하나의 대소문자 |
| `'7' - '0'` | `7` | 숫자 문자를 정수로 |
| `(char)('0' + 7)` | `'7'` | 정수를 숫자 문자로 |
| `'c' - 'a'` | `2` | 알파벳 순번 (0부터) |
| `(char)('a' + 1)` | `'b'` | 다음 알파벳 |
| `(int)'A'` | `65` | 문자 코드 (ASCII) |

`char`끼리 빼면 `int`가 나옵니다. `int`를 다시 `char`로 만들려면 `(char)`로 변환해야 합니다.

---

## 6. 숫자와 변환

| 코드 | 결과 | 설명 |
| :--- | :--- | :--- |
| `int.Parse("123")` | `123` | 문자열을 정수로. 숫자가 아니면 예외 |
| `long.Parse("10000000000")` | `10000000000` | int 범위(약 21억)를 넘으면 `long` |
| `int.TryParse("12", out int n)` | `true`, `n = 12` | 실패해도 예외 없이 `false` |
| `7.ToString()` | `"7"` | 숫자를 문자열로 |
| `42.ToString("D5")` | `"00042"` | 자릿수 맞추기 |
| `Convert.ToString(11, 2)` | `"1011"` | 2진수 문자열 (8, 16진수도 가능) |
| `Convert.ToInt32("1011", 2)` | `11` | 2진수 문자열을 정수로 |
| `Convert.ToString(255, 16)` | `"ff"` | 16진수 |
| `"123".Sum(c => c - '0')` | `6` | 각 자리 숫자의 합 (LINQ) |

---

## 7. 뒤집기와 정렬

```csharp
// 뒤집기
char[] a = "hello".ToCharArray();
Array.Reverse(a);
string r1 = new string(a);                   // "olleh"
string r2 = string.Concat("hello".Reverse()); // "olleh" (LINQ)

// 문자 정렬
char[] b = "dcba".ToCharArray();
Array.Sort(b);
string sorted = new string(b);               // "abcd"
string desc = new string("abcd".OrderByDescending(c => c).ToArray()); // "dcba"
```

`string`에는 `Reverse`나 `Sort` 메서드가 없습니다. `char[]`로 바꿔서 처리한 뒤 `new string(...)`으로 되돌립니다.

---

## 8. StringBuilder

반복문 안에서 문자열을 이어 붙이거나, 특정 위치의 문자를 고쳐야 할 때 씁니다. `using System.Text;`가 필요합니다.

```csharp
var sb = new StringBuilder();
sb.Append("ab").Append('c').Append(1);   // "abc1", 숫자도 바로 붙일 수 있다
sb[0] = 'A';                             // 특정 위치 수정: "Abc1"
sb.Insert(0, "_");                       // "_Abc1"
sb.Remove(sb.Length - 1, 1);             // 마지막 글자 지우기: "_Abc"
string result = sb.ToString();           // 다 만든 뒤 한 번만 문자열로
```

| 함수 | 하는 일 |
| :--- | :--- |
| `Append(x)` | 뒤에 붙이기 (문자, 문자열, 숫자) |
| `Insert(i, x)` | i번 위치에 끼워 넣기 |
| `Remove(i, len)` | i번부터 len글자 지우기 |
| `sb[i] = c` | i번 문자 바꾸기 (`string`은 안 되지만 `StringBuilder`는 된다) |
| `Length` | 현재 길이 |
| `ToString()` | 문자열로 꺼내기 |

---

## 9. 비교

| 코드 | 결과 | 설명 |
| :--- | :--- | :--- |
| `"abc" == "abc"` | `true` | 내용 비교 |
| `a.Equals(b, StringComparison.OrdinalIgnoreCase)` | | 대소문자 무시 비교 |
| `string.CompareOrdinal("B", "a")` | 음수 | 문자 코드 순 비교. `B`(66)가 `a`(97)보다 앞 |
| `Array.Sort(arr, StringComparer.Ordinal)` | `["B", "a", "c"]` | 문자 코드 순 정렬 |
| `Array.Sort(arr)` | `["a", "B", "c"]` | 기본 정렬은 문화권 규칙을 따른다 |

> 문제에서 "사전순"이라고 하면 보통 문자 코드 순을 뜻합니다. 대문자와 소문자가 섞이거나 특수문자가 있으면 기본 정렬과 결과가 달라질 수 있으니 `StringComparer.Ordinal`을 지정합니다.

---

## 10. 특수문자 (이스케이프)

문자열 안에서 `"`, `\` 같은 문자는 그대로 쓰면 문법 오류가 납니다. **앞에 `\`를 붙여** 다른 의미의 문자로 쓰는 것을 이스케이프라고 합니다.

### 자주 쓰는 이스케이프

| 쓰고 싶은 것 | 쓰는 법 | 길이 | 설명 |
| :--- | :--- | :--- | :--- |
| 큰따옴표 `"` | `"\""` | 1 | 문자열 안의 `"` |
| 역슬래시 `\` | `"\\"` | 1 | 경로(`C:\\temp`)에 자주 나옴 |
| 작은따옴표 `'` | `"'"` 또는 `'\''` | 1 | 문자열 안에서는 그대로 쓰고, `char`로 쓸 때만 이스케이프 |
| 줄바꿈 | `"\n"` | 1 | 코드 값 10 |
| 줄바꿈(Windows) | `"\r\n"` | 2 | 코드 값 13, 10 |
| 탭 | `"\t"` | 1 | 코드 값 9 |
| 널 문자 | `'\0'` | 1 | 코드 값 0 |
| 유니코드 | `'\u0041'` | 1 | 16진수 4자리. 결과는 `'A'` |

```csharp
string a = "say \"hi\"";          // say "hi"
string b = "C:\\temp\\a.txt";     // C:\temp\a.txt
string c = "line1\nline2";        // 두 줄
char q = '\'';                    // 작은따옴표 문자 하나
```

`"a\nb".Split('\n')`처럼 이스케이프한 문자는 `Split`, `Replace`, `IndexOf`의 인자로도 그대로 쓸 수 있습니다.

### 이스케이프가 번거로울 때: 축자 문자열 `@"..."`

앞에 `@`를 붙이면 `\`를 **그대로 글자로** 취급합니다. 경로나 정규식처럼 `\`가 많을 때 편합니다. 대신 `"`는 두 번(`""`) 씁니다.

| 쓴 코드 | 결과 | 설명 |
| :--- | :--- | :--- |
| `@"C:\temp\a.txt"` | `C:\temp\a.txt` | `\`를 겹쳐 쓰지 않아도 된다 |
| `@"say ""hi"""` | `say "hi"` | `"`는 `""`로 쓴다 |
| `@"\n"` | `\n` (2글자) | 줄바꿈이 아니라 `\`와 `n` 두 글자 |
| `"\n"` | 줄바꿈 (1글자) | 일반 문자열에서는 줄바꿈 |

`@"..."` 안에서는 `\n` 같은 이스케이프가 **동작하지 않습니다.** 줄바꿈이 필요하면 실제로 줄을 바꿔 쓰거나 일반 문자열을 씁니다.

### 원시 문자열 `"""..."""` (C# 11 이상)

따옴표 세 개로 감싸면 `"`와 `\`를 **이스케이프 없이** 쓸 수 있습니다.

```csharp
string r = """a"b\c""";      // a"b\c
```

여러 줄도 가능하고, 닫는 `"""` 위치보다 왼쪽에 있는 공백은 결과에서 빠집니다.

```csharp
string m = """
    line1
      line2
    """;                      // "line1\n  line2"
```

> 채점 환경의 C# 버전이 낮으면 컴파일되지 않을 수 있습니다. 그때는 일반 문자열이나 `@"..."`로 바꿉니다.

### 보간 문자열 `$"..."` 안의 중괄호

`$"..."`에서는 `{`와 `}`가 값을 넣는 자리라서, 글자로 쓰려면 **두 번** 씁니다.

| 쓴 코드 | 결과 (`x = 5`) |
| :--- | :--- |
| `$"{x}"` | `5` |
| `$"{{x}}"` | `{x}` (값을 넣지 않고 글자 그대로) |
| `$"{{{x}}}"` | `{5}` (중괄호 안에 값을 넣음) |
| `string.Format("{{{0}}}", x)` | `{5}` |
| `$"{x}\""` | `5"` |
| `$@"C:\{x}"` | `C:\5` |

### 문자 비교와 치환

특수문자도 일반 문자와 똑같이 찾고 바꿉니다.

```csharp
string s = "a\"b";
s.Contains('"');              // true
s.IndexOf('"');               // 1
s.Replace("\"", "");          // "ab"
"a/b".Replace('/', '\\');     // "a\b" (\는 \\로 쓴다)
```

> Windows에서 `Environment.NewLine`은 `"\r\n"`입니다. 코드로 줄을 나눌 때는 `Replace("\r\n", "\n")`으로 줄바꿈을 먼저 통일한 뒤 `Split('\n')`을 쓰면 환경에 상관없이 같은 결과가 나옵니다.

---

## 11. 자주 하는 실수

| 실수 | 증상 | 바르게 |
| :--- | :--- | :--- |
| `s.Replace("a", "b");`만 쓰고 결과를 안 담음 | 원본 그대로 | `s = s.Replace("a", "b");` |
| 반복문 안에서 `result += c;` | 입력이 크면 시간 초과 | `StringBuilder.Append` |
| `Substring(start, end)`로 생각 | 글자 수가 틀림 | 두 번째 인자는 길이: `Substring(start, end - start)` |
| `Split(' ')` 결과에 빈 문자열 | 연속 공백에서 `""`가 생김 | `RemoveEmptyEntries`, 또는 빈 문자열을 그대로 처리 |
| `IndexOf` 결과를 바로 인덱스로 사용 | 없을 때 -1로 접근해 예외 | `-1`인지 먼저 확인 |
| `s[i] == "a"` | 컴파일 오류 (`char`와 `string` 비교) | `s[i] == 'a'` |
| `'7' + 1`을 문자로 기대 | `56`(정수)이 나옴 | `(char)('7' + 1)` |
| 대소문자가 섞인 문자열을 `Array.Sort` | 예상과 다른 순서 | `StringComparer.Ordinal` |

---

## 12. 자주 나오는 패턴

### 회문(앞뒤가 같은 문자열) 판별

```csharp
bool IsPalindrome(string s) {
    for (int i = 0, j = s.Length - 1; i < j; i++, j--)
        if (s[i] != s[j]) return false;
    return true;
}
```

### 알파벳 개수 세기

```csharp
var count = new int[26];
foreach (char c in "banana") count[c - 'a']++;   // count[0] == 3 ('a')
```

소문자만 나온다는 조건이 있을 때 `Dictionary`보다 빠르고 간단합니다.

### 단어마다 첫 글자만 대문자 (JadenCase 문자열 만들기)

```csharp
string Jaden(string s) =>
    string.Join(" ", s.Split(' ')
        .Select(w => w.Length == 0 ? w : char.ToUpper(w[0]) + w.Substring(1).ToLower()));

// Jaden("3people unFollowed me") == "3people Unfollowed Me"
```

`Split(' ')`의 빈 문자열을 그대로 두고 다시 `Join`하므로 연속 공백이 보존됩니다.

### 각 자리 숫자 다루기

```csharp
int n = 1234;
int digitSum = n.ToString().Sum(c => c - '0');   // 10
int[] digits = n.ToString().Select(c => c - '0').ToArray();   // [1, 2, 3, 4]
```

---

[🔙 뒤로 가기](../index.md)
