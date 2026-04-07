# [2025] 타자 연습 서비스 TYLE ▣

TYLE은 단순한 타자 연습을 넘어, 엄선된 글귀와 다채로운 콘텐츠를 통해 사용자가 꾸준하고 즐겁게 타이핑 습관을 기록할 수 있도록 돕는 서비스입니다.
지루한 반복 연습 대신, 매일 새로운 문장을 만나고 자신의 취향이 담긴 글을 업로드하며 성장의 즐거움을 느껴보세요. 📝


<img width="1920" height="1080" alt="TYLE_intro2" src="https://github.com/user-attachments/assets/71c63657-d766-4340-ae67-0bb96875a8b4" />
<img width="1920" height="1080" alt="TYLE_intro" src="https://github.com/user-attachments/assets/6562e63a-54ec-48e1-bc29-d3ff594ae322" />

---

## 개요

  * **프로젝트 이름:** TYLE ▣
  * **프로젝트 지속기간:** 2025.08 - 2025.10
  * **개발 엔진 및 언어:** `Next.js`, `Java`
  * **디자인 및 협업:** `Figma`, `Notion 워크스페이스`
  * **멤버:** [`@eeheueklf`](https://github.com/eeheueklf), [`@yuunha`](https://github.com/yuunha)


---

## 핵심기능


| 오늘의 글 | 긴 글 연습 | 타자게임 | 기록 저장 및 공유 |
| :---: | :---: | :---: | :---: |
|<img height="500" alt="image" src="https://github.com/user-attachments/assets/5cc3c2ef-47ef-4e77-898a-8634abf92927" /> | <img height="500" alt="image" src="https://github.com/user-attachments/assets/35bb26bc-ad5e-4f92-84f7-702d00c14195" /> | <img height="500" alt="image" src="https://github.com/user-attachments/assets/88b92f14-b0b9-4b73-bb5d-062fb8442d3c" /> | <img height="500" alt="image" src="https://github.com/user-attachments/assets/754e7e13-c33d-42ac-94f6-ded0be18df63" /> |
| 매일 바뀌는 문장으로 새롭게 연습 | 긴 글을 끝까지 연습 | 30초 동안 화면에 나타나는 단어들을 빠르게 입력하는 게임 | 점수를 기록 카드 이미지로 생성 |


### 👥 친구 관리 시스템  
혼자 하는 연습을 넘어, 친구들과 연결되어 꾸준히 타이핑 습관을 유지할 수 있는 기초적인 소셜 환경을 제공합니다.


---

## detail
- **타자 소리와 함께**: `Web Audio API`와 오디오 스프라이트 기법으로 연속 입력 시에도 밀림 없는 타자기 소리 구현⌨️ 
- **연산 최적화**: 자소 분리 로직 효율화 및 `useMemo` 활용으로 연산 시간을 0.1ms 이하로 단축
- **웹 성능 향상**: `Suspens`e와 `Skeleton UI`를 적용하여 웹 성능 지표 CLS 0.137 → 0 달성
- **대용량 텍스트 비동기 로딩**: `FileReader` 비동기 `API`를 통해 큰 파일 로드 시 `UI Blocking` 현상 방지
- **로직 무결성 검증**: `Jest` 유닛 테스트로 한글 조합 및 타수 계산의 다양한 엣지 케이스 완벽 대응



---

## skills

**Frontend**
- Framework: `Next.js`, `React 19`
- Language: `TypeScript`
- Styling: `Styled-components`, `Tailwind CSS`
- Libraries: `Hangul.js`, `React-Icons`, `html2Canvas`
- Linting: `ESLint`

**Backend**
- Framework: `Spring Boot`, `Fast API`
- Security: `Spring Security`
- Database: `MySQL`, `JPA`
- Language: `Java`

**협업**: 
- `Notion`, `Figma`
- Version Control: `GitHub`, `GitHub Issues`

**배포**: `Vercel` (FrontEnd), `AWS`(BackEnd)


