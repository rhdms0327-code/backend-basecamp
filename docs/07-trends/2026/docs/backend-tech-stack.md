---
layout: post
title: "📊 국내 백엔드 기술 스택 (C# vs Java)"
date: 2026-10-14
categories: [2026 국내 IT 동향]
tags: [.NET, Java, Spring, Kafka, Kubernetes, 기술스택]
nav_exclude: true
---

> 2026년 10월 기준 국내 기술력 있는 회사의 백엔드 기술 스택을 C#/.NET과 Java/Kotlin으로 나누어 비교하고, 언어와 무관한 공통 스택의 우선순위를 정리합니다.

## 한 줄 요약

C#과 Java는 언어만 다르고 ORM·DB·아키텍처 개념은 1:1로 대응합니다. 다만 국내 백엔드 시장은 **Java + Spring이 다수**이고, Kotlin은 일부 기업이 Java와 함께 씁니다. C#/.NET은 게임사·빌링 조직 등에서 주로 쓰입니다.

---

## 2026년에 꼭 알아야 할 버전 변화

| 구분 | 내용 |
| :--- | :--- |
| **.NET** | .NET 10(LTS)이 2025-11에 출시되어 2028-11까지 지원됩니다. **.NET 8·9는 2026-11-10에 지원이 종료**됩니다. C# 14, EF Core 10, ASP.NET Core 10, Aspire 13이 함께 나왔습니다 |
| **Spring** | **Spring Boot 4.1이 2026-06에 정식 출시**됐고, 3.5의 무상 지원은 2026-06-30에 끝났습니다. Spring Framework 7, Jakarta EE 11, Jackson 3 기반이라 3.x에서 올라갈 때 변경 폭이 큽니다 |
| **Java** | Java 25가 2025-09에 LTS로 나왔습니다. Spring Boot 4 기준 최소 버전은 17이고, 21 이상을 권장합니다 |

> 신규 학습이나 신규 프로젝트를 시작한다면 기준은 **.NET 10** 또는 **Spring Boot 4 + Java 21/25**입니다.

---

## 언어별 기술 스택 비교

| 영역 | C# / .NET | Java / Kotlin | 시니어 기대 수준 |
| :--- | :--- | :--- | :--- |
| 런타임 | .NET 10 (LTS), C# 14 | Java 21 / 25 (LTS), Kotlin | 버전별 주요 변화 설명 |
| 웹 프레임워크 | ASP.NET Core 10 | Spring Boot 4.x | 요청 처리 흐름, 미들웨어·필터 |
| DI | 내장 DI (Scoped/Transient/Singleton) | Spring IoC (Bean Scope) | 객체 수명 관리와 그로 인한 버그 |
| ORM | EF Core 10 | JPA / Hibernate | 변경 추적, 지연 로딩, N+1 문제 |
| SQL 매퍼 | Dapper | MyBatis, jOOQ, QueryDSL | ORM과 SQL 매퍼를 언제 쓰는지 판단 |
| DB 마이그레이션 | EF Migrations | Flyway, Liquibase | 무중단 스키마 변경 |
| 비동기·동시성 | async/await, Task, Channel | Virtual Thread (Java 21+), Kotlin Coroutine | 스레드풀 고갈, 데드락 원인 |
| 테스트 | xUnit, NSubstitute/Moq, Testcontainers | JUnit 5, Mockito, Testcontainers | 테스트하기 쉬운 설계, 실제 DB로 검증 |
| 빌드·패키지 | dotnet CLI, NuGet | Gradle, Maven | 멀티 모듈 구성 |
| 메시징 | Confluent.Kafka, MassTransit | Spring Kafka | 메시지 전달 보장 수준, 순서, 재처리 |
| 캐시·분산 락 | StackExchange.Redis | Spring Data Redis, Redisson | 캐시 전략, 락 만료 문제 |
| 배치 | Hangfire, Quartz.NET, Worker Service | Spring Batch, Quartz | 재시작 가능한 배치 설계 |
| 장애 대응(회복성) | Polly | Resilience4j | 재시도·타임아웃·서킷 브레이커 |
| 로깅·관측 | Serilog, OpenTelemetry | Logback/SLF4J, Micrometer, OpenTelemetry | 구조화 로그, 분산 추적 |
| API 문서 | Swashbuckle, Scalar | springdoc-openapi | API 계약 우선 설계 |
| 인증 | ASP.NET Core Auth, JWT | Spring Security, JWT | OAuth2 흐름 |
| 서버 간 통신 | gRPC (Grpc.AspNetCore) | gRPC, OpenFeign | REST와 gRPC 중 무엇을 쓸지 판단 |
| 로컬 개발 환경 | .NET Aspire | Docker Compose | 여러 서비스를 로컬에서 함께 띄우기 |

### 참고: Kotlin과 비동기 처리

- 카카오페이는 보험 서비스 등 여러 백엔드 서비스에 Kotlin을 쓰고 있다고 밝혔습니다.
- 우아한형제들과 카카오페이 기술 블로그에는 Kotlin Coroutine과 Java Virtual Thread를 비교한 글이 있습니다. 다만 두 글 모두 2026년 이전에 작성됐습니다.

### 참고: 게임사 사례 (넥슨)

- 넥슨 인텔리전스랩스의 C# 백엔드 공고(NCS개발팀)는 C#/.NET과 함께 Node.js·Python·Serverless를 쓰고, 데이터는 RDS·Redis, 인프라는 GitLab·Docker·AWS Lambda를 명시했습니다.
- 2026년 넥슨 백엔드 공고 목록에서는 C#보다 **Java/Kotlin 공고**(인증/세션, 추천팀 등)가 더 많이 보입니다.

---

## 언어와 무관한 공통 스택 — 우선순위

채용 공고의 자격요건·우대사항에서 등장하는 빈도를 기준으로 정리했습니다.

| 우선순위 | 항목 | 비고 |
| :--- | :--- | :--- |
| 🔴 필수 | MySQL / PostgreSQL | MSSQL은 게임·금융 일부 |
| 🔴 필수 | Redis | 캐시·검색 시스템 경험으로 자격요건에 자주 등장 |
| 🔴 필수 | Docker, AWS | 클라우드는 AWS 비중이 가장 큼. 네이버는 NCP |
| 🔴 필수 | **Kafka** | 대용량 스트리밍 경험으로 자주 등장. 관리형(AWS MSK 등)도 포함 |
| 🔴 필수 | **Kubernetes** | 우대사항 중 가장 폭넓게 보임. EKS·NKS 같은 관리형 환경 포함 |
| 🟠 우대 | CI/CD (GitHub Actions, Jenkins, ArgoCD) | 운영 경험으로 어필 |
| 🟠 우대 | Prometheus + Grafana, ELK | 모니터링·로그 수집 |
| 🟡 직무별 | Terraform, OpenTelemetry | 주로 **SRE·DevOps·관측성 직무**의 요건. 순수 백엔드 공고에서는 드묾 |
| 🆕 신규 | AI 코딩 도구 활용 | [AI 코딩 도구 도입 현황](./ai-coding-tools.md) 참고 |

### 아키텍처 키워드

MSA, Outbox 패턴, Saga 패턴, CQRS, 헥사고날 아키텍처, DDD

---

## 시니어가 다른 점

도구를 몇 개 아느냐보다 **"왜 이걸 골랐는지"를 설명하는 능력**에서 차이가 납니다.

- ❌ "JPA를 써봤습니다"
- ✅ "N+1 문제가 생겨서 이 조회만 SQL 매퍼로 분리했습니다"

---

## 🔗 참고 자료

- [.NET 8 and .NET 9 end of support — Microsoft](https://devblogs.microsoft.com/dotnet/dotnet-8-9-end-of-support/)
- [State of .NET 2026](https://devnewsletter.com/p/state-of-dot-net-2026/)
- [Spring Boot 버전 일람과 지원 기한 (2026년 7월)](https://www.issoh.co.jp/tech/details/5172/)
- [Spring Boot 4.1 변경점](https://www.issoh.co.jp/tech/details/10124/)
- [Kotlin 채용공고 — Indeed](https://kr.indeed.com/Kotlin%EC%A7%81-%EC%B7%A8%EC%97%85-%EC%84%9C%EC%9A%B8-%EC%A7%80%EC%97%AD)
- [코틀린, 저는 이렇게 쓰고 있습니다 — 카카오페이](https://tech.kakaopay.com/post/katfun-joy-kotlin/)
- [코루틴과 Virtual Thread 비교와 사용 — 카카오페이](https://tech.kakaopay.com/post/coroutine_virtual_thread_wayne/)
- [Java의 미래, Virtual Thread — 우아한형제들](https://techblog.woowahan.com/15398/)
- [넥슨코리아 채용 정보 — 자소설닷컴](https://jasoseol.com/companies/897/careers)
- [넥슨 NCS개발팀 백엔드 개발자 (C#) — 원티드](https://www.wanted.co.kr/wd/153020)
- [Kubernetes 채용공고 — Indeed](https://kr.indeed.com/Kubernetes%EC%A7%81-%EC%B7%A8%EC%97%85)
- [Kafka 채용공고 (판교) — Indeed](https://kr.indeed.com/q-kafka-l-%EC%84%B1%EB%82%A8-%ED%8C%90%EA%B5%90%EC%97%AD-%EC%B1%84%EC%9A%A9%EA%B3%B5%EA%B3%A0.html)
