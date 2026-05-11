---
layout: post
title: "🩵 C# 포맷터 설정: Prettier 감성 그대로 C# 코딩하기"
date: 2026-04-30
categories: [Tools & IDE]
tags: ['VSCode', 'C#']
nav_exclude: true
---

> 선배님을 위한 C# 포맷터 및 .editorconfig 설정 가이드 (Prettier 감성 그대로)

C#은 Prettier가 아닌 **'C# Dev Kit' 내장 포맷터**와 **`.editorconfig`**를 쓰는 것이 정석입니다.
왜 그런지, 그리고 Prettier처럼 "저장 시 자동 정렬"되게 만드는 법을 완벽히 정리해 드릴게요.

## 1. 왜 C#은 Prettier를 안 쓰나요?
Prettier는 자바스크립트/타입스크립트 같은 웹 기술에 특화되어 있습니다. C#용 Prettier 플러그인이 있긴 하지만, 마이크로소프트가 공식 지원하는 Roslyn(C# 컴파일러 엔진) 기반의 포맷터가 훨씬 강력하고 정확합니다.
- **Prettier:** JS, TS, HTML, CSS용
- **C# 포맷터:** C# (`.cs`), .NET 환경용

## 2. VS Code에서 "저장 시 자동 정렬" 세팅하기
Prettier 없이도 똑같은 경험을 할 수 있습니다. 아래 3단계만 따라 하세요.

### ① 필수 확장 프로그램 설치
먼저 VS Code 마켓플레이스에서 **[C# Dev Kit]**이 설치되어 있는지 확인하세요.

### ② 기본 포맷터 설정
1. VS Code에서 `Ctrl + ,` (설정)를 누릅니다.
2. 검색창에 **"Default Formatter"**를 입력합니다.
3. `Editor: Default Formatter` 항목을 `ms-dotnettools.csharp` (C#)으로 변경합니다.

### ③ 저장 시 포맷팅 활성화
1. 설정 검색창에 **"Format On Save"**를 입력합니다.
2. `Editor: Format On Save` 체크박스를 체크합니다.

## 3. C#의 `.prettierrc` = `.editorconfig`
Prettier에 `.prettierrc`가 있다면, C#에는 **`.editorconfig`**가 있습니다. 이 파일 하나면 팀원 모두가 똑같은 코드 스타일을 유지할 수 있습니다.

**설정 방법:**
1. 프로젝트 루트 폴더(최상단)에 `.editorconfig` 파일을 만듭니다.
2. 아래 내용을 복사해서 넣어보세요. (가장 표준적인 세팅입니다.)

```ini
root = true

[*.cs]
# 🩵 들여쓰기 설정 (탭 대신 공백 4칸)
indent_style = space
indent_size = 4

# 새 줄(Newline) 설정
end_of_line = lf
insert_final_newline = true

# C# 특유의 코드 스타일 (중괄호 위치 등)
csharp_new_line_before_open_brace = all
csharp_space_between_method_call_parameter_list_parentheses = false
```

## 4. 왜 두 개를 다 설정해야 하나요?

- **Default Formatter 설정:** VS Code한테 **"C# 파일 정렬할 때 어떤 프로그램을 쓸 거야?"**라고 묻는 것에 답하는 겁니다. (우리는 Microsoft의 C# 확장 기능을 선택한 거죠.)
- **`.editorconfig` 설정:** 그 프로그램한테 **"야, 정렬할 때 중괄호는 어디다 두고, 띄어쓰기는 몇 칸으로 해!"**라고 세부 명령을 내리는 겁니다.

### 하나만 설정하면 안 되나요?

#### 1) Default Formatter만 설정하면?
VS Code가 코드를 정리해 주긴 합니다. 그런데 **'마이크로소프트가 미리 정해놓은 기본값'**으로만 정리해 줍니다.
만약 선배님이 "난 중괄호를 옆에 붙이고 싶은데?"라고 해도, 이 설정만으로는 바꿀 수 없습니다. 무조건 MS 마음대로 정렬됩니다.

#### 2) `.editorconfig`만 설정하면?
정렬 규칙(지침서)은 있는데, 정작 **그걸 실행할 '일꾼(Formatter)'**이 지정되지 않은 상태입니다.
VS Code 입장에선 "규칙은 알겠는데, 이걸 누가 실행하라는 거야?"라며 멍하니 있게 됩니다. 결국 저장해도 아무 일도 안 일어납니다.

## 5. 실전 예시 (이것만 기억하세요)

선배님이 코드를 이렇게 짰다고 칩시다.
```csharp
public void Hello() {
    Console.WriteLine("안녕");
}
```

**Default Formatter만 설정한 경우 (MS 기본값):**
저장하면 갑자기 중괄호가 밑으로 뚝 떨어집니다. (이게 MS 스타일이니까요.)
```csharp
public void Hello() 
{
    Console.WriteLine("안녕");
}
```

**두 개 다 설정하고 `.editorconfig`에 '옆에 붙여라'라고 적은 경우:**
저장해도 선배님이 짠 대로 옆에 딱 붙어있게 됩니다.
```csharp
public void Hello() {
    Console.WriteLine("안녕");
}
```

---
> 💡 **결론**
> - **Default Formatter:** "저장 시 자동 정렬" 기능을 활성화하는 스위치입니다.
> - **`.editorconfig`:** 그 정렬이 어떤 모양으로 될지 결정하는 옵션값입니다.

---

[🔙 뒤로 가기](../index.md)
