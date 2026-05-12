---
layout: post
title: "🛡️ Over-posting 방지 전략"
date: 2026-05-12
categories: [.NET]
tags: [`초과 게시`, `DTO`, `DTO 명명규칙`]
nav_exclude: true
---

> API를 설계할 때 클라이언트가 보내는 모든 데이터를 무비판적으로 데이터베이스 모델에 매핑하면 보안 취약점이 발생합니다. 이를 방지하기 위한 핵심 개념인 DTO(Data Transfer Object) 활용법을 정리했습니다.

---

### 1. Over-posting이란 무엇인가?

**보안 이슈**: 클라이언트가 요청 본문(JSON 등)에 의도치 않은 필드(예: `IsAdmin`, `SecretCode`)를 포함하여 보낼 때, 서버가 이를 그대로 DB 모델에 바인딩하여 데이터가 오염되는 현상입니다.

**발생 원인**: 데이터베이스 엔터티(Entity)를 API의 입력 모델로 직접 사용할 때 발생합니다.

---

### 2. 해결책: DTO(Data Transfer Object) 패턴

**정의**: 계층 간 데이터 교환을 위해 사용하는 객체입니다. DB 엔터티에서 외부에 노출해도 되는 필드만 골라 별도의 클래스로 정의합니다.

**구조적 분리**:
- **Input DTO**: 클라이언트로부터 받을 데이터만 정의합니다.
- **Output DTO**: 클라이언트에게 보여줄 데이터만 정의합니다.

---

### 3. 실무 적용 시의 이점

- **보안 강화**: 허용되지 않은 필드가 서버 내부로 유입되는 것을 원천 차단합니다.
- **모델 디커플링**: DB 스키마가 변경되어도 API의 스펙(DTO)은 유지할 수 있어 클라이언트 코드의 수정을 최소화합니다.
- **가독성 및 유지보수**: API가 어떤 데이터를 주고받는지 명확하게 정의되어 협업 효율이 상승합니다.

---

### 4. 구현 요약

- **엔터티 보호**: 실제 DB와 연결된 `Todo` 클래스를 직접 노출하지 않습니다.
- **매핑 로직**: `TodoDTO`로 데이터를 받은 후, 필요한 필드만 선택하여 실제 `Todo` 엔터티에 복사하거나 생성합니다.

---

### 5. 구현 예시 (Implementation Example)

#### 엔터티 정의 (비밀 필드 포함)
클라이언트에게 노출되어서는 안 되는 `Secret` 필드를 포함한 엔터티 클래스입니다.

```csharp
public class Todo
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
    public string? Secret { get; set; } // 외부 노출 금지 필드
}
```

#### DTO 정의 (TodoItemDTO)
- **경로**: `Models/DTOs/TodoDTOs.cs`

엔터티에서 노출할 필드만 정의하고, 엔터티를 DTO로 변환하는 생성자를 포함합니다.

```csharp
public record TodoItemDTO(int Id, string? Name, bool IsComplete);
```

#### 엔드포인트 구현 (Program.cs)
DTO를 사용하여 엔터티를 직접 노출하지 않고 데이터를 주고받는 Minimal API 핸들러 예시입니다.

```csharp
static async Task<IResult> GetAllTodos(TodoDb db)
{
    return TypedResults.Ok(await db.Todos.ToArrayAsync());
}

static async Task<IResult> GetCompleteTodos(TodoDb db)
{
    return TypedResults.Ok(await db.Todos.Where(t => t.IsComplete).ToListAsync());
}

static async Task<IResult> GetTodo(int id, TodoDb db)
{
    return await db.Todos.FindAsync(id)
        is Todo todo
            ? TypedResults.Ok(new TodoItemDTO(todo.Id, todo.Name, todo.IsComplete))
            : TypedResults.NotFound();
}

static async Task<IResult> CreateTodo(TodoItemDTO todoItemDTO, TodoDb db)
{
    var todo = new Todo
    {
        IsComplete = todoItemDTO.IsComplete,
        Name = todoItemDTO.Name
    };

    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    todoItemDTO = new TodoItemDTO(todo.Id, todo.Name, todo.IsComplete);

    return TypedResults.Created($"/todoitems/{todoItemDTO.Id}", todoItemDTO);
}

static async Task<IResult> UpdateTodo(int id, TodoItemDTO inputTodo, TodoDb db)
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null)
        return TypedResults.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;

    await db.SaveChangesAsync();

    return TypedResults.NoContent();
}

static async Task<IResult> DeleteTodo(int id, TodoDb db)
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return TypedResults.NoContent();
    }

    return TypedResults.NotFound();
}
```

---

### 6. DTO 명명 규칙 (Naming Conventions)

🏷️ **1. 접미사(Suffix) 활용 규칙**
가장 보수적이면서도 명확한 방식은 클래스 이름 뒤에 `Dto`를 붙이는 것입니다.

- **TodoDto**: 입력과 출력을 동시에 담당할 때 사용합니다.
- **TodoCreateDto / TodoUpdateDto**: 생성(POST)과 수정(PUT) 시 요구되는 필드가 다를 때 명확히 구분합니다.
- **TodoResponse**: 출력 전용 객체임을 강조하고 싶을 때 Dto 대신 사용하기도 합니다.

🛠️ **2. Record 타입의 적극적 활용**
최신 C# 진영에서는 DTO를 정의할 때 일반 `class`보다 `record` 타입을 강력히 권장합니다.

```csharp
// 데이터 전송에 최적화된 불변(Immutable) 객체
public record TodoDto(int Id, string? Name, bool IsComplete);
```

- **설계 의도**: DTO는 데이터를 옮기는 것이 목적이지, 내부 상태를 변경하는 것이 목적이 아닙니다. `record`는 한 줄로 정의가 가능해 보일러플레이트를 획기적으로 줄여주며, 값 기반 비교가 가능해 테스트에도 유리합니다.

🏗️ **3. 모델 분리 패턴 (In vs Out)**
Minimal API에서는 엔드포인트의 매개변수와 반환 타입을 명확히 하기 위해 접두사나 접미사를 더 구체화하기도 합니다.

- **Request / Response**: 프론트엔드와의 통신 규약을 강조할 때 사용합니다 (예: `LoginRequest`, `UserResponse`).
- **CreateTodoRequest**: 특정 행위에 대한 요청임을 명시합니다.

**Summary**: Over-posting 방지의 핵심은 "주지 않아도 될 데이터는 받지 않고, 보여주지 말아야 할 데이터는 보내지 않는 것"입니다. 이를 위해 DTO를 사용하는 것은 선택이 아닌 필수입니다.

---

[🔙 뒤로 가기](../index.md)
