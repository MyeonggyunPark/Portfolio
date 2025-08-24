# 🇩🇪 KIMSDEUTSCH_WEB – "KimsDeutsch"의 독일어 강의 플랫폼

**KIMSDEUTSCH_WEB**은 Django 프레임워크를 기반으로 개발된 독일어 온라인 강의 웹 애플리케이션입니다.  
학습자들이 단어, 문법, 미디어 자료 등을 효율적으로 학습하고 관리할 수 있도록 설계되었습니다.

---

## 📌 주요 기능

- 사용자 회원가입 및 로그인
- 독일어 단어/문장/문법 데이터 관리
- 이미지, 오디오 등 미디어 파일 업로드
- 정적 파일(Tailwind, JS 등) 및 미디어 파일 분리 관리
- Django Admin을 통한 데이터 백오피스 관리

---

## 🛠 사용 기술

| 항목       | 기술 스택 |
|------------|-----------|
| 백엔드     | Python 3.13, Django 5.2.5 |
| 프론트엔드 | Tailwind CSS, HTML, JavaScript |
| DB         | SQLite3 |
| 환경       | VS Code, Conda 가상환경 |
| 기타       | Static/Media 파일 분리, Django Templates |

---

## 📂 폴더 구조

```plaintext
KIMSDEUTSCH_WEB/
├── accounts/           # 사용자 인증 관련 앱
├── config/             # 프로젝트 설정 (settings.py 등)
├── media/              # 업로드된 미디어 파일 저장소
├── static/             # 정적 파일(css, js, 이미지 등)
├── templates/          # Django 템플릿 HTML 파일들
├── web/                # 실제 웹 애플리케이션의 주요 기능 앱
├── manage.py
├── requirements.txt    # 설치된 패키지 목록
├── tailwind.config.js
└── .gitignore
