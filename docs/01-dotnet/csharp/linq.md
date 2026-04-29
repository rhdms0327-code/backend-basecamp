---
title: "[15장] LINQ (Language Integrated Query)"
parent: C#
grand_parent: .NET
nav_exclude: true
nav_order: 11
---

# [15장] LINQ (Language Integrated Query)

## 1. 개요
- C# 언어 내부에 통합된 쿼리 기능을 의미합니다.
- 컬렉션, 데이터베이스, XML 등 다양한 데이터 소스를 **일관된 문법**으로 질의하고 조작할 수 있게 해줍니다.

## 2. 장점
- **일관성**: 데이터 소스 종류와 관계없이 동일한 쿼리 문법 사용.
- **타입 안정성**: 컴파일 시점에 쿼리 오류를 발견 가능.
- **가독성**: 복잡한 반복문과 조건문 없이 데이터를 필터링하고 변환.

## 3. 문법 구분
### 쿼리 구문 (Query Syntax)
SQL과 유사한 선언형 방식입니다.
```csharp
var results = from n in numbers
              where n % 2 == 0
              orderby n
              select n;
```

### 메서드 구문 (Method Syntax)
확장 메서드와 람다식을 사용하는 방식입니다. (가장 많이 쓰임)
```csharp
var results = numbers.Where(n => n % 2 == 0)
                     .OrderBy(n => n);
```

## 4. 주요 키워드
- **from**: 데이터 소스 지정.
- **where**: 조건 필터링.
- **orderby**: 정렬.
- **select**: 추출할 결과 형식 지정.
- **group**: 그룹화.

---
> **참고 자료**
> - [LINQ 개요 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/concepts/linq/)
