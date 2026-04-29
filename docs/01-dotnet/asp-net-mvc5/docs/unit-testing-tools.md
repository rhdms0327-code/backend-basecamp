---
layout: post
title: "🛠️ 단위 테스트 툴 및 Moq"
date: 2026-04-29
categories: [ASP.NET MVC 5]
tags: [TDD, MSTest, Moq]
nav_exclude: true
---

> ASP.NET MVC 5 개발 환경에서의 단위 테스트 도구(MSTest)와 모킹 프레임워크(Moq)의 사용법 및 TDD 개념을 정리합니다.

## 1. 단위 테스트 프레임워크 비교

| 프레임워크 | 특징 | 비고 |
| :--- | :--- | :--- |
| **xUnit.net** | 최신 .NET 표준, 병렬 테스트 지원 | 현재 가장 권장됨 |
| **NUnit** | 전통적, 풍부한 어트리뷰트 제공 | 레거시 및 복잡한 테스트 |
| **MSTest** | Visual Studio 내장, 설정 간단 | 입문 및 기본 환경 |

## 2. TDD (Test-Driven Development)

TDD는 테스트를 먼저 작성하고, 이를 통과시키기 위한 최소한의 코드를 구현한 뒤 리팩터링하는 반복적 개발 방식입니다.

1. **Red**: 실패하는 테스트 작성
2. **Green**: 테스트 통과를 위한 코드 작성
3. **Refactor**: 코드 구조 개선

## 3. Moq (Mocking Framework)

테스트 대상이 의존하는 객체(예: Repository)를 가짜(Mock)로 만들어 컨트롤러의 로직만 독립적으로 검증할 때 사용합니다.

### 기본 사용 흐름
```csharp
// 1. Mock 생성
var repoMock = new Mock<IProductRepository>();

// 2. 동작 설정 (Setup)
repoMock.Setup(r => r.Products).Returns(new List<Product> {
    new Product { Name = "P1" },
    new Product { Name = "P2" }
});

// 3. 컨트롤러에 주입
var controller = new ProductController(repoMock.Object);

// 4. 실행 및 검증
var result = controller.List();
```

> [!NOTE]
> `Setup()`에서 `It.IsAny<int>()` 등을 사용하여 유연한 인자 매칭 조건을 설정할 수 있습니다.

---

[🔙 뒤로 가기](../index.md)
