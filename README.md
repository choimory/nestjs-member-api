# stacks

- Node 22
- Nest.js
- Nest.js/config
- TypeORM/pg
- Cross-env
- Joi
- Js-joda

# 개요

- 간단한 회원 SNS로 다양한 기능 구현

# 보안

- 회원 가입 및 로그인 패스워드 암호화
- bcrypt
- JWT
- CORS
- OAuth2

# 권한

- 회원 권한별 접근처리
- Nest.js auth, passport

# 타입

- 회원 타입
- 이미지 타입
- enum보단 union(as const) type 권장

# 파일 입출력, 스토리지, CDN

- 파일 업로드/다운로드
- 외부 스토리지 저장
- CDN

# 이메일 인증

- 회원가입 인증메일
- 인증번호 Redis에 TTL(time to live) 저장

# 배치

- 이용정지회원 정지해제 배치처리

# 연관 관계

- 1:1 - 회원 권한
- 1:N, N:1 - 회원 정지내역, 포스팅 이미지
- N:N - 회원 팔로우, 게시물 좋아요

# 계층형 테이블

- ~~회원 방명록~~
- 게시물 댓글

# 복합키 엔티티

-

# Redis 세션

- 캐싱
- 이메일, OTP 인증번호 일정시간 저장
- 로그인 실패횟수 IP 저장
- 활동이력 저장

# MongoDB

- TODO

# 웹소켓

- 채팅

# 폴링

- 알림

# 그 외

- 식별자로 tsid 사용

# 엔티티

- Member - 회원 기본정보
  - TSID PK
  - EMAIL UK 이메일
  - NICKNAME UK 닉네임
  - PASSWORD 비밀번호
  - IMAGE 프로필 사진
  - INTRODUCE 소개글
  - CREATED_AT
  - MODIFIED_AT
  - DELETED AT
- MemberAuthority - 회원 권한 / 1:1
  - TSID PK
  - MEMBER_ID FK
  - LEVEL (enum MEMBER, ADMIN)
  - CREATED_AT
  - MODIFIED_AT
  - DELETED AT
- MemberSuspension - 회원 정지기록 / 1:N
  - TSID PK
  - MEMBER_ID FK
  - REASON
  - SUSPENDED_AT
  - SUSPENDED_TO
  - CREATED_AT
  - MODIFIED_AT
  - DELETED_AT
- Follow - Member, Member의 끼인 테이블 / N:N
  - TSID PK
  - FOLLOWER_ID
  - FOLLOWEE_ID
- ~~Block - Member, Member의 끼인 테이블 / N:N~~
- Article - 게시물
  - TSID PK
  - MEMBER_ID FK
  - TITLE 제목
  - CONTENT 내용
  - CREATED_AT
  - MODIFIED_AT
  - DELETED_AT
- ArticleImage - 게시물 이미지 / 1:N
  - TSID PK
  - ARTICLE_ID FK
  - TYPE (enum THUMBNAIL, CONTENT..) 이미지 타입
  - ORIGINAL_NAME 원본 파일명
  - NAME 파일명
  - PATH 경로
  - SIZE 크기
  - RESIZE_NAME 리사이즈 파일명
  - RESIZE_PATH 리사이즈 파일 경로
  - RESIZE_SIZE 리사이즈 파일 사이즈
  - CREATED_AT
  - MODIFIED_AT
  - DELETED_AT
- ArticleComment - 게시물 댓글 / 계층형 / 1:N
  - TSID
  - MEMBER_ID
  - PARENT_ID
  - TITLE
  - CONTENT
- Like - 게시물 좋아요 / Member,Article의 끼인 테이블 / N:N
  - TSID PK
  - MEMBER ID FK
  - ARTICLE ID FK
  - CREATED_AT
  - MODIFIED_AT
  - DELETED_AT
- Todo - 개인 TODO / MongoDB