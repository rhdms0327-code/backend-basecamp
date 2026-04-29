---
title: "[16장] 애트리뷰트 (Attribute)"
parent: C#
grand_parent: .NET
nav_order: 9
---

# [16장] 애트리뷰트 (Attribute)

## 1. 개요
- 코드 요소(클래스, 메서드, 필드 등)에 **메타데이터(Metadata)**를 추가하는 기능입니다.
- 컴파일러나 런타임에게 특정 정보를 전달하여 코드의 동작을 제어하거나 부가 정보를 제공합니다.

## 2. 주요 용도
- **지시어 역할**: CLR에게 해당 요소를 어떻게 처리할지 지시 (예: `[Serializable]`).
- **코드 분석**: 특정 조건에서만 컴파일되도록 설정 (예: `[Conditional]`).
- **프레임워크 통합**: ASP.NET Core의 라우팅 정보나 DB 매핑 정보 제공.

## 3. 내장 애트리뷰트 예시
- **[Obsolete]**: 더 이상 사용되지 않는 메서드임을 경고 또는 에러로 표시.
- **[Conditional]**: 특정 기호(예: DEBUG)가 정의되어 있을 때만 실행.
- **[Serializable]**: 객체를 직렬화 가능 상태로 표시.

## 4. 사용자 정의 애트리뷰트
`System.Attribute`를 상속받아 직접 애트리뷰트를 정의할 수 있습니다.

```csharp
[AttributeUsage(AttributeTargets.Method)]
public class MyLogAttribute : Attribute 
{
    public string Message { get; set; }
}

[MyLog(Message = "로그 테스트")]
void MyMethod() { }
```

---
> **참고 자료**
> - [애트리뷰트 개요 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/concepts/attributes/)
