# Users 로직

1. auth, users
   auth

   - JWT 관련 코드

   users

   - 가입 관련 로직
   - @UseGuard(JwtAuthGuard)를 사용하여 JWT를 가진 유저의 토큰을 확인

# Videos 로직

2. videos
   videos
   - ffmpeg Command Line을 사용하여 셔터스톡으로 부터 받은 URL에서 video 다운로드
     셔터스톡에서는 JSON형식으로 URL주소를 넘겨줌.
   - ffmpeg의 Command Line을 사용하여 video클립들을 하나의 영상물로 merge
