---
layout: post
title: "🚀 현대적 Minimal API 표준 폴더 구조"
date: 2026-04-30
categories: [.NET]
tags: ['Minimal API', '튜토리얼', `DTO 폴더구조`, `record DTO`]
nav_exclude: true
---

> 현대적이고 확장 가능한 Minimal API 표준 폴더 구조 가이드.

비주얼 스튜디오에서 아래와 같이 폴더를 구성해 보세요. 이 구조는 나중에 서비스를 쪼개거나 MSA로 완전히 전환할 때도 그대로 가져갈 수 있습니다.

## 📂 폴더 구조 및 역할

- **Program.cs**: 프로젝트의 시작점. 여기서는 설정(Configuration)과 조립(Assembly)만 담당합니다.
- **Endpoints/**: 핵심. Program.cs에 몰려있던 API 경로들을 기능별로 나누어 관리하는 곳입니다. (예: `UserEndpoints.cs`, `AdminEndpoints.cs`)
- **Models/**:
    - **Entities/**: DB 테이블과 1:1 매칭되는 클래스.
    - **DTOs/**: 프론트엔드와 주고받는 데이터 가공용 클래스.
- **Services/**: 비즈니스 로직(계산, 유효성 검사 등)이 담기는 곳입니다.
- **Data/**: Dapper 연결이나 EF Core의 DbContext가 위치합니다.
- **Extensions/**: 의존성 주입(DI) 설정 등을 깔끔하게 모아두는 곳입니다.

---

### 📂 Record DTO 폴더 구조 추천
Record는 코드가 매우 짧기 때문에, 파일 하나당 클래스 하나라는 규칙을 고집하기보다는 기능(Domain) 단위로 묶는 것이 훨씬 효율적입니다.

```plaintext
DTOs/
├── TodoDtos.cs       <-- Todo 관련 모든 Record를 한 파일에 관리
├── UserDtos.cs       <-- User 관련 모든 Record를 한 파일에 관리
└── AuthDtos.cs
```
이렇게 하면 파일 개수가 급격히 늘어나는 것을 방지하면서도, 특정 도메인의 데이터 규격을 한눈에 파악할 수 있습니다.

#### 💻 TodoDtos.cs 파일 구성 예시
실제로 한 파일 안에 아래와 같이 관련된 Record들을 모아두는 방식을 실무에서 많이 사용합니다.

```csharp
namespace MyApi.DTOs;

// 조회용 (Output)
public record TodoResponse(int Id, string Name, bool IsComplete);

// 생성용 (Input)
public record CreateTodoRequest(string Name, bool IsComplete);

// 수정용 (Input)
public record UpdateTodoRequest(string Name, bool IsComplete);
```

---

[🔙 뒤로 가기](../index.md)
