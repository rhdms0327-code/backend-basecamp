---
layout: post
title: "🔒 HTTPS 및 인증서 설정 가이드"
date: 2026-05-12
categories: [Minimal API]
tags: [https, 인증서 설정]
nav_exclude: true
---

> - 현대적인 웹 애플리케이션 개발에서 보안 통신(HTTPS)은 필수적인 요소입니다.
> - ASP.NET Core에서 개발 인증서를 관리하고, 커스텀 인증서를 적용하는 방법을 정리합니다.

---

## 1. 📍 개발 인증서(Development Certificate) 생성 및 신뢰
ASP.NET Core 프로젝트는 기본적으로 HTTPS를 사용하도록 구성됩니다. 로컬 환경에서 브라우저 보안 경고 없이 접속하려면 .NET CLI를 통해 개발 인증서를 설치하고 신뢰 상태로 만들어야 합니다.

- **인증서 설치 및 신뢰**: 다음 명령어를 통해 로컬 머신에 개발용 인증서를 생성하고 신뢰 목록에 추가합니다.
  ```bash
  dotnet dev-certs https --trust
  ```

- **플랫폼별 특이사항**:
    - **Windows 및 macOS**: 위의 명령어로 자동 신뢰 설정이 가능합니다.
    - **Linux**: 배포판마다 신뢰 저장소 관리 방식이 달라 수동 설정이 필요할 수 있습니다.

---

## 2. 📍 Kestrel을 통한 HTTPS 상세 설정
특정 포트에서 HTTPS를 강제하거나 상세한 옵션을 제어하고 싶을 때는 `WebApplicationBuilder`에서 Kestrel 서버를 직접 구성합니다.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    // 5001번 포트에서 HTTPS를 사용하도록 명시적 설정입니다.
    options.ListenLocalhost(5001, listenOptions =>
    {
        listenOptions.UseHttps();
    });
});

var app = builder.Build();
app.MapGet("/", () => "Secure Hello World!");
app.Run();
```

---

## 3. 📍 사용자 지정(Custom) 인증서 적용
기관에서 발급받은 `.pfx` 파일이나 특정 인증서를 사용해야 하는 경우에도 Kestrel 설정을 통해 경로와 비밀번호를 지정할 수 있습니다.

- **인증서 파일 로드**: 코드 내에서 직접 인증서 경로를 지정하여 보안 수준을 높입니다.
- **실무 팁**: 인증서 비밀번호와 같은 민감 정보는 코드에 직접 작성하지 않고, **User Secrets**나 **Environment Variables**를 통해 관리하는 것이 정석입니다.

```csharp
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5001, listenOptions =>
    {
        // 경로와 비밀번호를 사용하여 사용자 지정 인증서를 적용했습니다.
        listenOptions.UseHttps("path/to/mycert.pfx", "cert_password");
    });
});
```

---

[🔙 뒤로 가기](../index.md)
