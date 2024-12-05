# 보안

- 회원 가입 및 로그인 패스워드 암호화
- bcrypt
- CORS
- nest.js jwt
- OAuth2

# 권한

- 회원 권한별 접근처리
- nest.js auth

# 타입

- 회원 권한
- 이미지 타입
- TS - union(as const) type 권장

# 파일 입출력, 스토리지, CDN

- 회원 프로필 사진으로 파일 업로드/다운로드 구현
- 해당 파일 스토리지 저장
- CDN 처리

# 이메일 인증

- 회원가입 인증메일
- 인증번호를 Redis에 TTL(time to live)걸어서 저장시키면 시간내에 안올시 세션 죽음

# 배치

- 이용정지회원 정지해제 배치처리

# 연관 관계

- 1:1 - 회원 추가정보
- 1:N, N:1 - 회원 이미지
- N:N - 회원 팔로우, 게시물 좋아요

# 계층형 테이블

- 회원 방명록, 게시물 댓글

# 복합키 엔티티

-

# Redis 세션

- 캐싱
- 이메일, OTP 인증번호 일정시간 저장
- 로그인 실패횟수 IP 저장
- 활동이력 저장

# MongoDB

- 회원 개인 메모

# 웹소켓

- 채팅

# 폴링

- 알림

# 그 외

- 회원 로그인 세션 관리를 Redis로 할 수도 있을 것 같지만 일단 토큰으로
- 식별자로 tsid 사용

# 엔티티

- Member 회원 기본정보
    - TSID PK
    - EMAIL UK 이메일
    - PASSWORD 비밀번호
    - NICKNAME UK 닉네임
    - PROFILE 소개글
    - CREATED_AT
    - MODIFIED_AT
    - DELETED AT
- MemberImage 회원 프로필, 배경사진
- MemberAuthority 회원 권한
- MemberSuspension 회원 정지기록
- MemberGuestbook 회원 방명록(회원에 대한 댓글, 계층형 구조)
    - TSID PK
    - RECEIVER_ID FK
    - WRITER_ID FK
- MemberMemo 회원 개인 메모장 (간단, 유연한 mongodb 메모. 카테고리와 태그 맘대로 추가 가능)
    - TSID PK
    - MEMBER_ID
    - TITLE
    - CONTENT
    - 동적 카테고리
    - 동적 태그
- Follow 회원 팔로우 (Member간 다대다의 끼인 테이블)
    - TSID PK
    - FOLLOWER_ID FK
    - FOLLOWEE_ID FK