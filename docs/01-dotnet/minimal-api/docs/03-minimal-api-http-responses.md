---
layout: post
title: "🎯 HTTP 응답값 정리 (HTTP Response Values in Minimal API)"
date: 2026-04-30
categories: [.NET]
tags: ['Minimal API', '튜토리얼']
nav_exclude: true
---

> 

Minimal API에서 각 HTTP 메서드(GET, POST, PUT, PATCH, DELETE)에 따른 기본 상태 코드와 응답 반환 방식을 정리합니다.

## 1. 기본 응답 동작 및 예외 처리

*   기본적으로 데이터를 반환하는 성공적인 요청(주로 `GET`)의 기본 응답 코드는 **`200 OK`** 입니다.
*   코드 실행 중 처리되지 않은 예외(Unhandled Exception)가 발생할 경우, 프레임워크에 의해 자동으로 **`5xx` (Server Error)** 오류 코드로 변환되어 반환됩니다.

## 2. HTTP 메서드별 상태 코드 반환 규칙

내부 로직의 결과에 따라 다양한 HTTP 상태 코드를 유연하게 반환할 수 있습니다. `Results` 또는 `TypedResults` 정적 클래스에서 제공하는 헬퍼 메서드를 사용합니다.

### 2.1. GET (데이터 조회)
*   **`200 OK`**: 일치하는 항목을 성공적으로 찾은 경우. JSON 형태의 응답 본문(Body)을 포함하여 반환합니다.
    *   메서드: `Results.Ok(item)` 또는 `TypedResults.Ok(item)`
*   **`404 Not Found`**: 요청된 ID와 일치하는 데이터를 찾을 수 없는 경우.
    *   메서드: `Results.NotFound()` 또는 `TypedResults.NotFound()`

### 2.2. POST (데이터 생성)
*   **`201 Created`**: 데이터베이스에 새로운 항목이 성공적으로 생성 및 저장된 경우 반환합니다. 생성된 리소스의 위치(URI)와 함께 생성된 데이터를 본문에 포함합니다.
    *   메서드: `Results.Created($"/todoitems/{todo.Id}", todo)` 또는 `TypedResults.Created(...)`

### 2.3. PUT 및 PATCH (데이터 수정)
*   **`204 No Content`**: 데이터 업데이트가 성공적으로 완료되었지만, 클라이언트에게 추가로 반환할 데이터 본문이 없을 때 반환합니다.
    *   메서드: `Results.NoContent()` 또는 `TypedResults.NoContent()`
*   **`404 Not Found`**: 수정할 대상 데이터가 존재하지 않을 경우 반환합니다.

*(참고: PUT은 엔터티 전체 업데이트, PATCH는 부분 업데이트에 사용됩니다. PATCH의 경우 누락된 필드와 명시적으로 `null`로 설정된 값을 구분하기 위해 DTO에 Nullable 속성을 사용하는 패턴이 권장됩니다.)*

### 2.4. DELETE (데이터 삭제)
*   **`204 No Content`**: 데이터가 성공적으로 삭제되어, 더 이상 반환할 내용이 없을 때 반환합니다.
    *   메서드: `Results.NoContent()` 또는 `TypedResults.NoContent()`
*   **`404 Not Found`**: 삭제할 대상 데이터가 애초에 존재하지 않을 경우 반환합니다.

---

[🔙 뒤로 가기](../index.md)
