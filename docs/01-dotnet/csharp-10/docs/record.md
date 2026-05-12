---
layout: post
title: "🎯 레코드 (record)"
date: 2026-05-12
categories: [C#]
tags: [record, record struct]
nav_exclude: true
---

> - 데이터를 저장하고 관리하는 데 최적화된 **참조 형식 또는 값 형식**입니다.
> - 불변성(Immutability)과 값 기반 비교(Value-based Equality)를 기본으로 하여 현대적인 프로그래밍 패턴을 지원합니다.

| 버전 | 주요 변화 | 상세 내용 |
| :--- | :--- | :--- |
| **C# 9.0** | `record` (class) | 참조 타입(Reference Type)의 불변 데이터 객체 도입 |
| **C# 10.0** | `record struct` | 값 타입(Value Type)에도 record의 편리함 적용 |


---

## 1. record의 핵심 특징 (3가지)

- **불변성 (Immutability)**: 한 번 값을 정하면 바뀌지 않는 것이 기본입니다. 이는 멀티스레드 환경 등에서 데이터의 안정성을 보장합니다.
- **값 기반 비교 (Value-based Equality)**: 서로 다른 인스턴스라도 내부의 필드 값이 모두 같으면 `Equals()`와 `==` 연산이 `true`를 반환합니다.
- **간결한 문법**: 단 한 줄로 속성(Property), 생성자(Constructor), `ToString()`, `Equals()` 등을 자동으로 정의할 수 있습니다.

---

## 2. 문법 비교: class vs record

똑같은 데이터를 담는 객체를 만들 때 코드의 양과 가독성에서 큰 차이가 납니다.

### ❌ 기존의 class (길고 지루함)

```csharp
public class TodoDto
{
    public int Id { get; set; }
    public string Title { get; set; }

    // 생성자, Equals 오버라이딩, ToString 등을 직접 다 구현해야 함...
}
```

### ✅ 현대적인 record (한 줄로 끝)

```csharp
public record TodoDto(int Id, string Title);
```

이 한 줄로 속성(Property), 생성자(Constructor), 값 비교 로직이 모두 자동으로 생성됩니다.

---

## 3. 주요 문법 상세

### ① 위치 기반 레코드 (Positional Record)

레코드 정의 시 괄호 `()` 안에 속성을 선언하는 가장 일반적인 방식입니다.

- **자동화된 구현**: 단 한 줄의 선언으로 생성자(Constructor), 분해자(Deconstructor), 그리고 각 매개변수에 대응하는 **공개 속성(Property)**이 컴파일러에 의해 자동 생성됩니다.
- **기본 불변성 보장**: 생성된 속성은 기본적으로 `init` 전용 속성이 되어, 객체 생성 시점 이후의 수정을 원천적으로 차단합니다.

> 💡 **C# 9.0+ `init` 전략**: 객체 초기화 단계(`new` 키워드 호출 시점)에서만 값을 할당할 수 있게 하여, 데이터의 무결성과 불변성을 동시에 확보합니다.

```csharp
// 선언 시점에 정의된 순서대로 값을 전달 (위치 기반)
var myTodo = new TodoDto(1, "공부하기");

// myTodo.Title = "놀기"; 
// ❌ 컴파일 에러! 'init' 속성이므로 초기화 이후에는 값을 바꿀 수 없습니다.
```

### ② 값 기반 비교 (Equality)


클래스와 결정적으로 다른 점입니다.

```csharp
var a = new TodoDto(1, "Task");
var b = new TodoDto(1, "Task");

Console.WriteLine(a == b); // True! (내용물이 같으면 같다고 판단합니다)
```

---

## 🏗️ 짚고 넘어가기: 왜 괄호 안 멤버는 한정자가 없나요?

`public record Person(string Name);` 처럼 괄호 안에 적는 멤버들에 `public`이나 `private` 같은 한정자가 붙지 않는 이유를 정리합니다.

### 1. 괄호 안은 원래 '생성자'의 공간입니다
우리가 레코드를 선언할 때 쓰는 괄호 `(...)`는 사실 **기본 생성자(Primary Constructor)**의 입구입니다.

- **일반적인 규칙**: C#에서 메서드나 생성자의 매개변수(Parameter)에는 접근 한정자를 붙이지 않습니다. (예: `void SayHello(string name)`에서 `public string name`이라고 쓰면 에러가 발생합니다.)
- **레코드의 특권**: 레코드는 생성자 매개변수를 자동으로 **공개 속성(Public Property)**으로 승격시켜 줍니다.

### 2. 컴파일러가 몰래 붙여주는 "암묵적 public"
우리가 한정자 없이 써도 컴파일러는 내부적으로 아래와 같이 해석합니다.

**우리가 쓰는 코드:**
```csharp
public record Todo(string Title);
```

**컴파일러가 실제로 만드는 코드:**
```csharp
public record Todo
{
    // 한정자가 없었지만, 컴파일러가 public을 붙여서 속성으로 만들어버림!
    public string Title { get; init; } 

    // 생성자에서도 당연히 사용됨
    public Todo(string Title) 
    {
        this.Title = Title;
    }
}
```

### 3. 디자인 철학: 간결함(Minimalism)과 DTO 최적화
- **간결함**: 레코드의 존재 목적은 "데이터를 담는 가장 짧은 코드"입니다. 매번 `public`을 타이핑하는 수고를 덜어주기 위함입니다.
- **DTO 최적화**: 레코드는 주로 데이터를 전달하는 용도로 쓰이므로, 데이터를 당연히 외부에 공개해야 한다는 전제하에 `public`을 기본값으로 정한 것입니다.

> 💡 **만약 멤버를 숨기고 싶다면?**
> 위치 기반 레코드를 쓰면서도 특정 멤버는 숨기고 싶다면, 괄호 밖(Body)에 직접 선언하면 됩니다.
> ```csharp
> public record Todo(string Title) 
> {
>     // 괄호 밖에서는 평소처럼 한정자를 사용해야 합니다.
>     private string InternalCode { get; init; } = "SECRET"; 
> }
> ```

---

## 4. record class vs record struct

C# 10부터는 메모리 효율을 위해 구조체로도 레코드를 정의할 수 있습니다.

| 구분 | record class (기본) | record struct |
| :--- | :--- | :--- |
| **타입** | 참조 타입 (Heap 메모리) | 값 타입 (Stack 메모리) |
| **기본 불변성** | 불변 (ReadOnly) | 가변 (Mutable) - `readonly` 추가 가능 |
| **추천 용도** | 일반적인 데이터 모델, DTO | 아주 작고 빈번하게 생성되는 데이터 |

### 💻 문법 비교

```csharp
// 1. record class (C# 9.0+)
// 참조 타입, 불변성 권장
public record User(int Id, string Name); 

// 2. record struct (C# 10.0+)
// 값 타입, 수정 가능(가변)
public record struct Point(int X, int Y); 

// 3. readonly record struct (강력 추천)
// 값 타입이면서 불변성을 유지하고 싶을 때
public readonly record struct ReadOnlyPoint(int X, int Y);
```

### 📝 어떤 걸 골라 써야 할까요?

- **record (class)**:
  - 대부분의 비즈니스 로직, DTO, 데이터베이스 엔터티.
  - 객체의 크기가 좀 크거나, 상속이 필요한 경우.
- **record struct**:
  - 좌표(X, Y), RGB 색상값, 소수점 좌표 등 아주 작고 단순한 데이터군.
  - 가비지 컬렉션(GC) 부하를 극한으로 줄여야 하는 성능 최적화 상황.

---

> **참고 자료**
> - [레코드 형식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/builtin-types/record)

---

[🔙 뒤로 가기](../index.md)
