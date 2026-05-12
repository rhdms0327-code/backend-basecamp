# 개별 지식 페이지 생성 (Individual Page)

1. **파일 저장 위치 (격리 규칙)**
   - 모든 개별 마크다운(`*.md`) 파일은 해당 카테고리 하위의 **`docs/` 폴더 내부**에 생성한다.

2. **Jekyll Frontmatter (EXCLUDE 필수 반영)**
   - `nav_exclude: true`를 반드시 포함하여 사이드바 중복 노출을 방지한다.
   - **제목 정제**: 제목에서 `[C#]`, `[React]` 등 카테고리 접두사를 제거한다.
   - Frontmatter 예시:
     ---
     layout: post
     title: "{{Dynamic_Emoji}} {{제목}}"
     date: YYYY-MM-DD
     categories: [{{카테고리명}}]
     tags: [{{태그1}}, {{태그2}}]  # 핵심 개념이 없으면 빈칸([]) 유지
     nav_exclude: true
     ---

3. **본문 구조**
   - **Abstract**: 도입부에 `>` 인용구로 본문 핵심을 2~3줄 요약.
   - **구분선 사용**: 내용이 바뀔 때 `---`를 입력해 시각적으로 분리해 주세요.
   - **Navigation**: 최하단에 `---` 구분선 후 **`[🔙 뒤로 가기](../index.md)`** 링크 필수 삽입.
