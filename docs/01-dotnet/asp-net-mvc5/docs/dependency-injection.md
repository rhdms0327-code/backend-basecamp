---
layout: post
title: "🎯 의존성 주입 (DI) 및 Ninject"
date: 2026-04-29
categories: [ASP.NET MVC 5]
tags: [DI, Ninject, IoC, DIP]
nav_exclude: true
---

> IoC, DI, DIP의 개념을 명확히 구분하고, ASP.NET MVC 5에서 Ninject를 사용하여 의존성 주입을 설정하는 구체적인 방법을 정리합니다.

## 1. 핵심 용어 정리

- **IoC (Inversion of Control)**: 객체 생성과 수명 주 관리 권한을 개발자가 아닌 프레임워크가 갖는 설계 방식입니다.
- **DI (Dependency Injection)**: IoC를 구현하는 방법으로, 객체가 필요로 하는 의존성을 외부에서 주입해주는 기법입니다.
- **DIP (Dependency Inversion Principle)**: 상위 모듈과 하위 모듈 모두 추상화(인터페이스)에 의존해야 한다는 SOLID 원칙 중 하나입니다.

## 2. Ninject 설정 순서

### 1) 패키지 설치
NuGet을 통해 다음 패키지들을 설치합니다.
```powershell
Install-Package Ninject -version 3.2.2
Install-Package Ninject.Web.Common -version 3.2.2
Install-Package Ninject.MVC3 -version 3.2.1
```

### 2) Dependency Resolver 구현
`IDependencyResolver`를 구현하여 MVC 프레임워크와 Ninject 커널을 연결합니다.

```csharp
public class NinjectDependencyResolver : IDependencyResolver {
    private readonly IKernel _kernel;

    public NinjectDependencyResolver(IKernel kernel) {
        _kernel = kernel;
        AddBindings();
    }

    private void AddBindings() {
        // 인터페이스와 구현체 바인딩
        _kernel.Bind<IProductRepository>().To<EFProductRepository>();
    }

    public object GetService(Type serviceType) => _kernel.TryGet(serviceType);
    public IEnumerable<object> GetServices(Type serviceType) => _kernel.GetAll(serviceType);
}
```

## 3. 객체 범위 (Object Scope)

| 스코프 | 메서드 | 설명 |
| :--- | :--- | :--- |
| **Transient** | `.InTransientScope()` | 요청 시마다 새 객체 생성 (기본값) |
| **Singleton** | `.InSingletonScope()` | 앱 전체에서 단 하나의 인스턴스 공유 |
| **Request** | `.InRequestScope()` | 하나의 HTTP 요청 내에서 인스턴스 공유 |

> [!IMPORTANT]
> ASP.NET MVC의 컨트롤러는 기본적으로 **요청마다 새로 생성**됩니다. 이는 동시성 문제를 방지하기 위한 설계 선택입니다.

---

[🔙 뒤로 가기](../index.md)
