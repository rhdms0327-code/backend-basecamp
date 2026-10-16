---
layout: post
title: "🎯 [C# 7.1·8] async Main과 비동기 스트림"
date: 2026-10-16
categories: [C#]
tags: [C# 7.1, C# 8, async Main, IAsyncEnumerable, await foreach]
nav_exclude: true
---

> 프로그램 시작점(`Main`)에서 `await`를 쓰는 방법과, 데이터를 한꺼번에가 아니라 하나씩 비동기로 받아 처리하는 `IAsyncEnumerable` · `await foreach`를 정리합니다.

| 문법 | 버전 | 빈도 | 한 줄 설명 |
| :--- | :--- | :--- | :--- |
| `async Main` | `C# 7.1+` | ★ | 시작점에서 `await` 사용 |
| `IAsyncEnumerable<T>` + `yield return` | `C# 8+` | ★★ | 비동기로 하나씩 만들어 내보내기 |
| `await foreach` | `C# 8+` | ★★ | 비동기 시퀀스를 하나씩 받기 |
| `await using` | `C# 8+` | ★★ | 비동기 정리(`DisposeAsync`) |

> 동기·비동기 개념은 [동기 / 비동기 / 블로킹 / 논블로킹](./async-sync-blocking-nonblocking.md)에 있습니다.

---

## 1. `async Main` `C# 7.1+`

```csharp
// ❌ 예전: Main에서 await를 못 써서 .Result로 막음 (교착 상태 위험)
static void Main() => RunAsync().GetAwaiter().GetResult();

// ✅ 지금
static async Task Main()
{
    await RunAsync();
}
```

최상위 문(C# 9)을 쓰면 `Main` 없이 바로 `await`를 쓸 수 있어서, 요즘은 직접 쓸 일이 줄었습니다.

---

## 2. `IAsyncEnumerable<T>` 만들기 `C# 8+`

```csharp
public async IAsyncEnumerable<WalletTransaction> ReadTransactionsAsync(
    long walletId,
    [EnumeratorCancellation] CancellationToken ct = default)
{
    int page = 0;
    while (true)
    {
        var rows = await _repository.GetPageAsync(walletId, page++, 100, ct);
        if (rows.Count == 0) yield break;

        foreach (var row in rows)
            yield return row;   // 한 건씩 내보냄
    }
}
```

- `Task<List<T>>`는 **전부 모은 뒤** 한 번에 돌려줍니다. `IAsyncEnumerable<T>`는 **준비되는 대로** 한 건씩 돌려줘서 메모리를 덜 씁니다.
- 취소 토큰은 `[EnumeratorCancellation]`을 붙여야 `WithCancellation(ct)`로 넘긴 값이 전달됩니다.

---

## 3. `await foreach`로 받기 `C# 8+`

```csharp
await foreach (var tx in ReadTransactionsAsync(walletId).WithCancellation(ct))
{
    total += tx.Amount;
}
```

EF Core는 `AsAsyncEnumerable()`로 쿼리 결과를 이렇게 하나씩 받을 수 있습니다.

```csharp
await foreach (var wallet in _db.Wallets.AsNoTracking().AsAsyncEnumerable())
{
    // 대량 데이터를 한 번에 메모리에 올리지 않고 처리
}
```

---

## 4. `await using` `C# 8+`

```csharp
await using var connection = new SqlConnection(_connectionString);
await connection.OpenAsync();
// 블록이 끝나면 await connection.DisposeAsync()
```

`IAsyncDisposable`을 구현한 자원(DB 연결, 스트림 등)에 씁니다.

---

> **참고 자료**
> - [비동기 스트림 생성 및 사용 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/asynchronous-programming/generate-consume-asynchronous-stream)

---

[🔙 뒤로 가기](../index.md)
