# 경제지표 차트 생성기

한국은행 ECOS API와 KOSIS API에서 경제지표 데이터를 불러와, 웹에서 직접 차트를 만들고 편집할 수 있는 도구입니다.

## ✨ 주요 기능

- **ECOS + KOSIS 데이터 조회** — 금리, 환율, 물가, 고용 등 주요 경제지표
- **지표 검색** — 이름, 카테고리, 키워드로 지표 검색
- **트리 형태 탐색** — 출처 → 카테고리 → 지표 구조로 찾기
- **다중 지표 차트** — 최대 4개 지표를 하나의 차트에 표시
- **차트 편집** — 종류(선/막대/산점), 제목, 축, 범례, 색상, 선 굵기, 폰트 등
- **다운로드** — 차트 PNG 이미지 / 데이터 CSV

## 🛠 기술 스택

- [Next.js 16.2.4](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- [Plotly.js](https://plotly.com/javascript/) / react-plotly.js

---

## 📦 설치 방법

### 1. 저장소 클론

```bash
git clone https://github.com/YOUR_USERNAME/econ-chart.git
cd econ-chart
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열고 실제 API 키를 입력합니다:

```env
BOK_API_KEY=실제_ECOS_인증키
KOSIS_API_KEY=실제_KOSIS_인증키
```

**API 키 발급 방법:**

| API | 발급 사이트 | 방법 |
|-----|-----------|------|
| ECOS | [ecos.bok.or.kr/api](https://ecos.bok.or.kr/api/) | 회원가입 → MyPage → 인증키 신청 |
| KOSIS | [kosis.kr/openapi](https://kosis.kr/openapi/index.do) | 회원가입 → API 활용 신청 |

### 4. 로컬 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속합니다.

---

## 🚀 Vercel 배포 방법

### 1. GitHub에 Push

```bash
git add .
git commit -m "초기 설정"
git remote add origin https://github.com/YOUR_USERNAME/econ-chart.git
git push -u origin main
```

### 2. Vercel 연결

1. [vercel.com](https://vercel.com)에 GitHub 계정으로 로그인
2. "Import Project" 클릭
3. `econ-chart` 저장소 선택
4. **Environment Variables** 설정:
   - `BOK_API_KEY` = 실제 ECOS 인증키
   - `KOSIS_API_KEY` = 실제 KOSIS 인증키
5. "Deploy" 클릭

배포 후 `https://econ-chart.vercel.app` 같은 주소로 접속할 수 있습니다.

---

## 📊 지표 코드 등록 방법

### ECOS 지표

1. [ECOS Open API](https://ecos.bok.or.kr/api/) → **개발가이드** → **통계코드검색**
2. 원하는 지표 검색 (예: "기준금리")
3. **통계표코드**(statCode)와 **항목코드**(itemCode) 확인
4. `lib/indicators.ts`에서 해당 지표의 `statCode`, `itemCode1` 등을 수정

### KOSIS 지표

1. [KOSIS 공유서비스](https://kosis.kr/openapi/index.do) → **개발가이드** → **통계자료** → **URL 생성**
2. 원하는 통계표 검색 (예: "소비자물가지수")
3. **orgId**, **tblId**, **objL1**, **itmId** 확인
4. `lib/indicators.ts`에서 해당 지표의 코드를 수정

---

## ➕ 새 지표 추가 방법

`lib/indicators.ts` 파일의 `indicators` 배열에 새 객체를 추가하면 됩니다:

```typescript
{
  id: "my_new_indicator",        // 고유 ID
  name: "새 지표 이름",           // 화면에 표시될 이름
  source: "ECOS",                // "ECOS" 또는 "KOSIS"
  category: "카테고리명",         // 트리에서의 분류
  unit: "단위",                  // 예: "%", "원", "2020=100"
  frequency: "M",                // D(일), M(월), Q(분기), A(연)
  description: "설명",            // 검색에 사용됨
  treePath: ["ECOS", "카테고리명", "새 지표 이름"],
  keywords: ["검색키워드1", "검색키워드2"],

  // ECOS 지표인 경우
  statCode: "통계표코드",
  itemCode1: "항목코드1",

  // KOSIS 지표인 경우
  // orgId: "기관코드",
  // tblId: "통계표ID",
  // objL1: "분류1",
  // itmId: "항목ID",
  // prdSe: "M",
}
```

저장하면 즉시 검색/트리에 반영됩니다.

---

## 🗂 프로젝트 구조

```
econ-chart/
├── app/
│   ├── page.tsx             # 메인 페이지
│   ├── layout.tsx           # 루트 레이아웃
│   ├── globals.css          # 글로벌 스타일
│   └── api/
│       ├── ecos/route.ts    # ECOS API 프록시
│       └── kosis/route.ts   # KOSIS API 프록시
├── components/              # UI 컴포넌트
├── lib/                     # 비즈니스 로직
│   ├── indicators.ts        # 지표 메타데이터 목록
│   ├── indicatorTree.ts     # 트리 구조 생성
│   ├── searchIndicators.ts  # 검색 로직
│   ├── normalize.ts         # API 응답 정규화
│   ├── chartConfig.ts       # 차트 설정 유틸
│   ├── ecos.ts              # ECOS API 클라이언트
│   ├── kosis.ts             # KOSIS API 클라이언트
│   └── csv.ts               # CSV 생성 유틸
└── types/                   # TypeScript 타입 정의
```

---

## ⚠️ 참고사항

- API 키는 서버 환경변수로만 사용되며 클라이언트에 노출되지 않습니다
- `lib/indicators.ts`의 일부 지표 코드는 placeholder입니다. 실제 코드를 확인 후 교체하세요
- MVP에서는 최대 4개 지표까지 동시 선택 가능합니다
