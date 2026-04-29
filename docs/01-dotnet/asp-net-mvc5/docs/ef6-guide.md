---
layout: post
title: "🗄️ Entity Framework 6 가이드"
date: 2026-04-29
categories: [ASP.NET MVC 5]
tags: [EF6, ORM, Code-First]
nav_exclude: true
---

> .NET Framework 기반 ASP.NET MVC 5에서 주로 사용하는 ORM인 Entity Framework 6(EF6)의 설정 및 Code-First 개발 방식을 정리합니다.

## 1. EF6 및 Code-First 개요

- **Entity Framework (EF)**: .NET용 ORM(Object-Relational Mapping)으로, C# 객체를 DB 테이블에 매핑하여 SQL 작성 없이 CRUD를 가능하게 합니다.
- **Code-First**: DB를 먼저 설계하는 대신 C# 클래스(Model)를 먼저 작성하고, 이를 기반으로 DB 스키마를 자동 생성 및 관리하는 방식입니다.

## 2. 기본 설정 단계

### 1) 패키지 설치
패키지 관리자 콘솔에서 설치합니다. (MVC 5에서는 EF Core가 아닌 EF 6를 사용합니다.)
```powershell
Install-Package EntityFramework
```

### 2) DbContext 및 Connection String
`DbContext`는 DB와 앱을 연결하는 핵심 클래스입니다. `Web.config`의 연결 문자열 `name`은 클래스명과 일치해야 합니다.

```csharp
public class EFDbContext : DbContext {
    public DbSet<Product> Products { get; set; }
}
```

```xml
<connectionStrings>
  <add name="EFDbContext" 
       connectionString="Data Source=.;Initial Catalog=SportsStore;Integrated Security=True" 
       providerName="System.Data.SqlClient" />
</connectionStrings>
```

## 3. 저장소(Repository) 패턴 적용

인터페이스를 통해 데이터 접근 로직을 캡슐화하여 테스트 용이성과 유지보수성을 높입니다.

```csharp
// 인터페이스
public interface IProductRepository {
    IEnumerable<Product> Products { get; }
}

// 구현체
public class EFProductRepository : IProductRepository {
    private EFDbContext context = new EFDbContext();
    public IEnumerable<Product> Products => context.Products;
}
```

## 4. EF 6 vs EF Core 비교

| 구분 | EF 6 | EF Core |
| :--- | :--- | :--- |
| **플랫폼** | .NET Framework | .NET (Core/5+) |
| **상태** | 안정적, 레거시 유지보수 | 차세대 표준, 고성능 |
| **기능** | 풍부한 엔터프라이즈 기능 | 가볍고 모듈화됨 |

---

[🔙 뒤로 가기](../index.md)
