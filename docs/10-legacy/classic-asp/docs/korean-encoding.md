---
layout: post
title: "📜 Classic ASP 한글 인코딩 정리: EUC-KR, UTF-8, UTF-8 BOM"
date: 2026-10-14
categories: [Classic ASP]
tags: [Classic ASP, 인코딩, EUC-KR, CP949, UTF-8, BOM]
nav_exclude: true
---

> 레거시 Classic ASP 결제 페이지를 수정하다 인코딩과 줄바꿈 차이로 비교 결과가 어긋나는 일이 있어서, 정리해 둔 내용을 남깁니다.

## 1. EUC-KR, UTF-8, UTF-8 BOM의 차이

| 구분 | EUC-KR (CP949) | UTF-8 | UTF-8 BOM |
| :--- | :--- | :--- | :--- |
| 정체 | 한국어 전용 인코딩 | 유니코드 가변 길이 인코딩 | UTF-8과 같고, 파일 맨 앞에 `EF BB BF` 3바이트가 붙음 |
| 한글 1자 | 2바이트 | 3바이트 | 3바이트 |
| 표현 범위 | EUC-KR은 완성형 2,350자뿐입니다. CP949(MS949)는 이를 확장해 한글 11,172자를 모두 표현합니다 | 전 세계 문자 | 동일 |
| 코드페이지 | 949 | 65001 | 65001 |

- 윈도우에서 말하는 「ANSI(한국어)」는 실제로는 **CP949**입니다.
- BOM은 「이 파일은 UTF-8」이라는 표식일 뿐이고, 내용은 UTF-8과 똑같습니다. 코드페이지도 65001로 같습니다.
- 바이트만 보고 EUC-KR인지 확정할 수는 없습니다. 보통 앞 3바이트로 BOM을 확인하고, UTF-8로 읽어서 깨지면 CP949로 추정합니다.

---

## 2. Classic ASP의 세 가지 인코딩 설정

한글 한 글자는 서버를 거쳐 브라우저까지 이렇게 흘러갑니다.

<div class="flow"><div class="flow-in">
<div class="flow-node"><b>소스 파일 바이트</b><small>.asp 파일</small></div>
<div class="flow-step"><span class="tag">① 입구</span><i class="arrow"></i><code>@CODEPAGE</code></div>
<div class="flow-node mem"><b>메모리 속 문자열</b><small>유니코드</small></div>
<div class="flow-step"><span class="tag">② 출구</span><i class="arrow"></i><code>Response.CodePage</code></div>
<div class="flow-node"><b>응답 바이트</b><small>HTTP 본문</small></div>
<div class="flow-step label"><span class="tag">③ 라벨</span><i class="arrow"></i><code>Response.CharSet</code></div>
<div class="flow-node"><b>브라우저 화면</b><small>charset대로 해석</small></div>
</div></div>

ASP 엔진은 문자열을 메모리에서 유니코드로 다룹니다. 그래서 **입구**(바이트 → 문자), **출구**(문자 → 바이트), **라벨**(브라우저에 알려주기) 세 단계가 있습니다.

### ① `<%@ CODEPAGE %>`: 소스 파일을 읽을 때 (입구)

- ASP 엔진이 파일을 컴파일할 때, 파일에 저장된 바이트를 어떤 인코딩으로 해석할지 정합니다.
- **파일 저장 인코딩과 반드시 같아야 합니다.** 틀리면 소스에 적은 한글 문자열이 메모리에 들어가는 순간 깨지고, 뒤 단계에서 복구할 수 없습니다.
- 파일 첫 줄에 한 번만 쓸 수 있습니다.

### ② `Response.CodePage`: 내보낼 때 (출구), 그리고 Request 해석

- `Response.Write`나 `<%= %>`로 출력할 때 문자를 어떤 인코딩의 바이트로 바꿀지 정합니다.
- Request 값을 해석할 때도 영향을 줍니다. 외부(예: PG사 콜백)에서 EUC-KR로 보낸 폼 값을 65001로 해석하면 깨집니다.
- 지정하지 않으면 대개 `@CODEPAGE` 값을 따릅니다.

### ③ `Response.CharSet`: 브라우저에 알려주기 (라벨)

- 바이트를 바꾸지 않습니다. `Content-Type: text/html; charset=utf-8` 헤더만 붙입니다.
- 틀리면 응답 바이트는 정상인데 브라우저가 잘못 읽습니다.
- HTML `<meta charset>`도 같은 역할이고, 둘이 다르면 보통 HTTP 헤더가 우선합니다.

| 설정 | 단계 | 실제 변환 | 틀렸을 때 증상 |
| :--- | :--- | :--- | :--- |
| `@CODEPAGE` | 소스 → 메모리 | 함 | 소스에 적은 한글이 처음부터 깨짐 |
| `Response.CodePage` | 메모리 → 응답 (+ Request → 메모리) | 함 | 출력이나 Request 값이 깨짐 |
| `Response.CharSet` | 응답 → 브라우저 | 안 함 (라벨만) | 바이트는 정상인데 브라우저가 잘못 읽음 |

---

## 3. 인코딩별 상단 설정 예시

**EUC-KR (CP949)로 저장한 파일**

```html
<%@ Language="VBScript" CODEPAGE="949" %>
<%
Response.CodePage = 949
Response.CharSet  = "euc-kr"
%>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
```

**UTF-8 / UTF-8 BOM으로 저장한 파일**은 같은 설정을 씁니다. BOM 유무와 관계없습니다.

```html
<%@ Language="VBScript" CODEPAGE="65001" %>
<%
Response.CodePage = 65001
Response.CharSet  = "utf-8"
%>
<meta charset="utf-8">
```

BOM이 있어도 CODEPAGE는 명시하는 것이 안전합니다. 생략하면 서버 기본 코드페이지(한국어 윈도우는 보통 949)로 해석될 수 있습니다.

---

## 4. 실무에서 걸리는 함정

- **include 파일은 자기 `@CODEPAGE`를 가질 수 없습니다.** include 파일은 부르는 페이지의 CODEPAGE로 읽히므로, 부르는 쪽과 같은 인코딩이어야 합니다. 같은 기능의 공통 모듈을 EUC-KR판과 UTF-8판으로 따로 두는 경우가 생기는 이유입니다.
- **include 파일에 BOM이 있으면** include된 위치에 BOM 바이트가 출력돼 공백이나 `ï»¿` 같은 깨진 문자가 생길 수 있습니다. 공통 모듈은 BOM 없이 저장하는 편이 안전합니다.
- **외부 시스템이 EUC-KR로 값을 보내는 페이지**(예: 일부 PG 결제 콜백)는 CP949를 유지해야 Request 값이 깨지지 않습니다. 결제 처리 페이지는 CP949, 결과 화면은 UTF-8로 섞여 있는 레거시가 흔합니다.
- **UTF-8 페이지가 CP949 공통 모듈을 include하는 구조**라면, 모듈 안의 한글이 주석에만 있을 때는 괜찮지만 화면에 출력되는 문자열이면 깨질 수 있습니다.
- **파일 하나만 인코딩을 바꾸지 마세요.** include 관계나 짝을 이루는 페이지가 함께 깨질 수 있습니다.
- **배포 전 비교는 인코딩·BOM·줄바꿈(LF/CRLF)까지 합니다.** 내용이 같아도 이 차이 때문에 비교 도구에서는 다른 파일로 보입니다.

---

## 5. 요즘은 무엇을 쓰나

- 웹, Git, 크로스플랫폼 도구에서는 **BOM 없는 UTF-8**이 사실상 표준입니다.
- BOM은 주로 구형 도구 호환 때문에 남아 있습니다. 예를 들어 SQL 스크립트는 BOM이 없으면 SSMS가 ANSI(CP949)로 읽어 한글 주석이 깨질 수 있어서, BOM을 붙여 저장하는 관례가 있습니다.

| 대상 | 권장 |
| :--- | :--- |
| 신규 ASP·HTML | BOM 없는 UTF-8 + `CODEPAGE="65001"` + `Response.CharSet="utf-8"` |
| 기존 레거시 ASP | 현재 인코딩 유지 (include 짝, 외부 콜백 때문) |
| SQL 스크립트 | UTF-8 BOM |
| C#·.NET | 어느 쪽이든 무방, 팀 규칙으로 통일 |

---

## 6. VS2022에서 인코딩 고정하기

새 파일의 기본 인코딩은 템플릿과 버전에 따라 다를 수 있으니, `.editorconfig`로 고정하는 것이 확실합니다.

```ini
# BOM 없음
[*]
charset = utf-8

# BOM 있음
[*.sql]
charset = utf-8-bom
```

> `.editorconfig`는 줄 끝 주석(`charset = utf-8  # ...`)을 지원하지 않는 파서가 있어서, 주석은 별도 줄에 둡니다.

파일을 하나씩 바꿀 때는 **다른 이름으로 저장 → 저장 버튼 옆 ▼ → 「인코딩하여 저장」**에서 고릅니다. 「UTF-8 서명 있음」이 BOM 있음, 「서명 없음」이 BOM 없음입니다.

---

## 요약

세 설정을 같은 인코딩으로 맞추고, 파일 저장 인코딩과 `@CODEPAGE`를 일치시키고, include 파일의 인코딩은 부르는 쪽에 맞춥니다.
