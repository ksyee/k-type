# K-TYPE - 한글 타이핑 연습 웹 애플리케이션

![K-TYPE 메인 화면](https://ktype.vercel.app/og-image.png)

## 프로젝트 소개

K-TYPE은 타이핑에만 집중할 수 있는 미니멀한 환경을 제공하는 한글 타이핑 연습 웹 애플리케이션입니다. 커스텀 키보드 제작 후 타건 연습과 한글 타이핑 실력 향상을 위해 개발되었습니다.

### 배포 URL

🔗 [K-TYPE 바로가기](https://k-type.vercel.app)

## 주요 기능

- **실시간 타이핑 분석**: 입력 속도(CPM), 정확도 등 실시간 분석
- **다양한 한글 문장 연습**: Supabase를 통해 관리되는 다양한 한글 문장 제공
- **시각적 피드백**: 타이핑 오류 시 즉각적인 시각적 피드백
- **미니멀한 UI/UX**: 타이핑에만 집중할 수 있는 직관적인 인터페이스

## 기술 스택

### 프론트엔드

- **언어 및 프레임워크**: TypeScript, Next.js 14 (App Router)
- **상태 관리**: Zustand
- **스타일링**: TailwindCSS

### 백엔드

- **데이터베이스**: Supabase

### 기타 도구

- **패키지 관리**: npm
- **코드 품질 관리**: ESLint, Prettier
- **배포**: Vercel

## 프로젝트 구조

프로젝트는 Next.js의 App Router 방식을 사용하여 구현되었으며, 아토믹 디자인 패턴을 적용하여 컴포넌트를 구성했습니다.

```
k-type/
├── app/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── atoms/       # 기본 UI 요소
│   └── molecules/   # 복합 컴포넌트
├── hooks/           # 커스텀 훅
├── lib/             # 유틸리티 라이브러리
├── services/        # API 서비스
├── stores/          # Zustand 상태 관리
└── types/           # TypeScript 타입 정의
```

## 핵심 기술적 도전 및 해결

1. **실시간 타이핑 분석**: 사용자 입력을 실시간으로 분석하고 피드백을 제공하기 위해 커스텀 훅(`useTyping`)을 개발하여 타이핑 속도 및 정확도를 계산
2. **반응형 디자인**: 다양한 디바이스에서 일관된 사용자 경험을 제공하기 위한 TailwindCSS 기반 반응형 디자인 구현
3. **상태 관리**: Zustand를 활용한 효율적인 글로벌 상태 관리로 컴포넌트 간 데이터 흐름 최적화
