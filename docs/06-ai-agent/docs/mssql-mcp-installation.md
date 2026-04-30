---
layout: post
title: "🗄️ MSSql MCP 설치 (Github)"
date: 2026-01-30
categories: [Antigravity]
tags: [MCP, SQLServer]
nav_exclude: true
---

> bytebase/dbhub를 이용한 MSSQL MCP 서버 설치 가이드와 안전한 권한 설정 방법, 다중 서버 관리법을 정리합니다.

## 1. MSSql MCP 서버 설치

`npx`를 사용하여 Zero-dependency MCP 서버 패키지인 `@bytebase/dbhub`를 구성합니다. 

[참고: GitHub - bytebase/dbhub](https://github.com/bytebase/dbhub)

## 2. MCP 서버용 안전한 DB 계정 생성

- **전용 사용자 계정 사용:** 관리자(sa) 계정을 절대 사용하지 말고, MCP 전용 계정을 만들어야 합니다.
- **연결 암호화:** 연결 문자열에 `Encrypt=true` 옵션을 추가하세요.

### 보안 강화용 SQL 권한 세팅 스크립트

```sql
-- 1. 서버 수준 로그인 생성 (비밀번호는 강력하게 설정하세요)
USE [master];
GO
CREATE LOGIN [MCP_User] WITH PASSWORD = 'YourStrongPassword123!', CHECK_POLICY = ON;
GO

-- 2. DB 사용자 생성 및 권한 부여
USE [사용할_데이터베이스명];
GO
-- 로그인과 사용자 매핑
CREATE USER [MCP_User] FOR LOGIN [MCP_User];
GO

-- [추천 권한 세트]
-- A. 데이터 조회 및 삽입 권한 부여 (AI가 기존 데이터를 파악하는 데 필수)
GRANT SELECT, INSERT ON SCHEMA::dbo TO [MCP_User];
-- B. AI가 테이블 구조를 파악할 수 있도록 메타데이터 권한 추가 (MCP 권장)
GRANT VIEW DEFINITION TO [MCP_User];
-- C. 수정 및 삭제 권한은 명시적으로 차단 (보안 강화)
DENY UPDATE, DELETE ON SCHEMA::dbo TO [MCP_User];
GO
```

## 3. mcp_config.json 설정

```json
{
  "mcp-pj1001-db": {
    "command": "npx",
    "args": [
      "@bytebase/dbhub@latest",
      "--transport",
      "stdio",
      "--dsn",
      "sqlserver://user:password@localhost:1433/dbname?Encrypt=true"
    ]
  }
}
```

## 4. 여러 MCP DB 서버 관리 (Scope Rule)

여러 개의 데이터베이스 서버를 연결할 때는 프로젝트 별로 MCP 서버 명을 분리하고, 에이전트 Rule을 통해 참조 범위를 엄격히 제어합니다.

```markdown
# MCP Scope Rules

This rule defines strict scopes for MCP server usage to ensure safety and isolation.

### Database Access
- **Allowed Servers**: `mcp-pj1001-db`, `mcp-pj1002-db`
- **Restriction**: Do NOT attempt to access or query any other database servers via MCP tools.
```

---

## 🔗 참고 자료
- [원문: [MCP] MSSql MCP 설치 (Github)](https://blog-34.tistory.com/76)

---

[🔙 뒤로 가기](../index.md)
