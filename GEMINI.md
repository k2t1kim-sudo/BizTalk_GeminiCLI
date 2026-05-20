# 업무 말투 변환기 (BizTone Converter) — GEMINI.md

이 파일은 **업무 말투 변환기** 프로젝트의 구조, 기술 스택, 개발 컨벤션 및 실행 방법을 안내합니다. Gemini CLI와 협업 시 이 문서를 기반으로 컨텍스트를 유지하십시오.

---

## 1. 프로젝트 개요 (Project Overview)

**업무 말투 변환기**는 일상적인 어조의 메시지를 수신인(상사, 동료, 고객 등)에 맞는 격식 있는 업무용 언어로 변환해주는 웹 서비스입니다.

-   **목적**: 비즈니스 커뮤니케이션 효율화 및 정중한 업무 메시지 작성 지원
-   **핵심 기술**:
    -   **AI**: Upstage Solar-Pro2 (LLM)
    -   **Backend**: Python (FastAPI) + LangChain
    -   **Frontend**: Vanilla HTML/CSS/JS
-   **아키텍처**:
    `Frontend (Static) <-> Backend (FastAPI) <-> Upstage API (Solar-Pro2)`

---

## 2. 기술 스택 (Tech Stack)

| 영역 | 기술 |
| :--- | :--- |
| **Backend** | Python 3.11+, FastAPI (0.136.1), Uvicorn (0.47.0), Pydantic (2.13.4) |
| **AI Library** | LangChain (1.3.1), `langchain-upstage` (0.7.7) |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Environment** | `python-dotenv` (1.2.2) |
| **Deployment** | Vercel (Frontend & Backend 연동) |

---

## 3. 디렉토리 구조 (Directory Structure)

```text
biztone-converter/
├── backend/                # 백엔드 소스 코드
│   ├── main.py             # FastAPI 진입점 및 CORS 설정
│   ├── routers/            # API 엔드포인트 정의 (/api/convert)
│   ├── services/           # 비즈니스 로직 (LLM 연동)
│   ├── prompts/            # 수신 대상별 프롬프트 템플릿
│   ├── models/             # Pydantic 스키마 (요청/응답 모델)
│   └── requirements.txt    # 백엔드 의존성 파일
├── frontend/               # 프론트엔드 정적 파일
│   ├── index.html          # 메인 UI
│   ├── css/                # 스타일시트
│   └── js/                 # 클라이언트 사이드 로직
├── .env                    # 환경 변수 (UPSTAGE_API_KEY 포함)
├── .gitignore              # Git 제외 설정 (.env 등)
└── README.md               # 프로젝트 안내
```

---

## 4. 빌드 및 실행 (Building and Running)

### 4.1. 환경 설정
1.  Python 3.11 이상 설치 확인
2.  `.env` 파일 생성 및 API 키 설정:
    ```bash
    UPSTAGE_API_KEY=your_api_key_here
    ```

### 4.2. 백엔드 실행
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 4.3. 프론트엔드 실행
-   `frontend/index.html` 파일을 브라우저로 직접 열거나, VS Code의 Live Server 등을 활용하십시오.
-   **참고**: 로컬 테스트 시 `backend/main.py`의 CORS 설정이 `http://localhost:8000` 또는 브라우저 접속 주소를 허용해야 합니다.

---

## 5. 개발 원칙 (Development Conventions)

본 프로젝트는 **"바이브 코딩(Vibe Coding) 3원칙"**을 준수합니다.

1.  **완료 기준 우선 정의**: 구현 전 체크리스트를 명확히 하고 추가 기능 확장을 지양합니다.
2.  **조사 먼저, 구현 나중**: 외부 API(Upstage) 연동 방식 및 라이브러리 버전을 먼저 확인한 후 코드를 작성합니다.
3.  **버그 분석 우선**: 에러 발생 시 원인 분석을 먼저 요청하고, 근본적인 해결책을 도출합니다.

---

## 6. 주요 API 명세

-   **`POST /api/convert`**: 말투 변환 요청
    -   **Payload**: `{ "text": "원문", "target_audience": "boss|colleague|client|team" }`
    -   **Response**: `{ "converted_text": "변환문", "target_audience": "...", "original_text": "..." }`
-   **`GET /health`**: 서버 상태 체크

---

## 7. 주의 사항 (Important Notes)

-   **보안**: `.env` 파일은 절대 Git 리포지토리에 커밋하지 마십시오.
-   **프롬프트**: `backend/prompts/templates.py`에 정의된 대상별 페르소나를 유지하십시오.
-   **배포**: Vercel 배포 시 `API_BASE` 주소를 실제 배포된 백엔드 URL로 변경해야 합니다.

---

### Source Code가 변경되거나 라이브러리 버전이 변경되면 반드시 @PRD_업무말투변환기.md 문서도 반드시 같이 업데이트 합니다. 
* 구현이 완료된 사항들은 `2. 완료 체크리스트`에 모두 체크표시를 해서 완료되었음을 표시하세요.
* `8. 단계별 구현 순서`의 STEP1 ~ STEP4에 완료가 되면 체크 표시하세요.
* 라이브러리 버전이 변경되면 `@PRD_업무말투변환기.md 문서`, `GEMINI.md`에 업데이트 하세요.
