---
layout: post
title: "🚀 현업 핵심 파라미터 바인딩 4대장"
date: 2026-05-18
categories: [Minimal API]
tags: [FromBody, FromRoute, FromQuery, FromForm, FromServices]
nav_exclude: true
---

> 현업에서 Minimal API 엔드포인트를 설계할 때 가장 많이, 그리고 필수적으로 사용하는 파라미터 바인딩 특성 4가지와 실무 매니징 규칙을 다룹니다.

---

## 1. `[FromBody]` - JSON 데이터 받기 (가장 많이 씀)
**언제 쓰나요?** 회원가입, 게시글 작성, 상품 등록 등 복잡하고 큰 데이터를 보낼 때 (`POST`, `PUT`, `PATCH` 메서드와 세트)

- **특징**: 클라이언트가 보낸 JSON 데이터 스펙과 서버의 C# DTO(클래스) 구조가 딱 맞아떨어지면 .NET이 알아서 객체로 변환해 줍니다.
- **실무 팁**: Minimal API에서는 객체 타입을 매개변수에 적으면 `[FromBody]`를 생략해도 자동으로 본문에서 읽어오지만, 명확성을 위해 적어주는 팀도 많습니다.

```csharp
// 클라이언트가 { "title": "공부하기", "isDone": false } 보냄
app.MapPost("/api/todos", ([FromBody] TodoCreateDto dto) => 
{
    return Results.Created($"/todos/{dto.Title}", dto);
});
```

## 2. `[FromRoute]` - 특정 리소스의 ID 지정하기
**언제 쓰나요?** "특정 회원 조회", "특정 글 수정/삭제" 처럼 대상의 고유 식별자(ID)를 지정할 때

- **특징**: URL 주소 경로에 `{id}` 형태로 구멍을 뚫어놓고 값을 쏙 빼옵니다. 뒤에 `:int` 같은 제약 조건을 붙여 보안과 유효성 검사를 1차로 처리하는 것이 현업 국룰입니다.

```csharp
// GET /api/todos/15 요청 처리
app.MapGet("/api/todos/{id:int}", ([FromRoute] int id) => 
{
    return Results.Ok($"ID가 {id}인 할 일을 조회합니다.");
});
```

## 3. `[FromQuery]` - 검색, 필터링, 페이징 (정렬)
**언제 쓰나요?** 목록을 조회할 때 검색어 입력, 특정 카테고리 필터링, 페이지 번호 넘기기

- **특징**: URL 뒤에 `?search=공부&page=2` 형태로 붙는 키-값 쌍을 읽어옵니다. 값이 안 들어올 수도 있기 때문에 보통 Nullable(`?`) 처리하거나 기본값을 부여합니다.

```csharp
// GET /api/todos?search=공부&page=2 요청 처리
app.MapGet("/api/todos", ([FromQuery(Name = "search")] string? keyword, [FromQuery] int page = 1) => 
{
    return Results.Ok($"검색어: {keyword}, 페이지: {page}");
});
```

## 4. `[FromForm]` + `IFormFile` - 파일/이미지 업로드
**언제 쓰나요?** 프로필 사진 변경, 첨부파일 업로드 등 바이너리 파일을 서버로 전송할 때

- **특징**: JSON 본문(`[FromBody]`)으로는 파일을 보낼 수 없기 때문에, 반드시 HTML Form 형식 데이터인 `[FromForm]`을 지정하고 파일 데이터를 담는 `IFormFile` 타입을 함께 사용해야 합니다.

```csharp
// 파일 업로드 처리
app.MapPost("/api/upload", async ([FromForm] IFormFile file) => 
{
    if (file == null || file.Length == 0) return Results.BadRequest("파일 없음");
    
    // 파일 저장 로직...
    return Results.Ok($"{file.FileName} 업로드 완료");
});
```

---

[🔙 뒤로 가기](../index.md)
