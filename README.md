[인섬니아 테스트 파일.json](https://github.com/4cozm/Personal_Session/files/15334228/default.json)
테스트 파일을 인섬니아 프로젝트 내부에서 import 하면 테스트가 더 쉽습니다 


# API 명세서

## 엔드포인트

| 메서드 | 엔드포인트         | 설명           | 요청 예시                             | 응답 예시                             |
|--------|-------------------|----------------|--------------------------------------|--------------------------------------|
| POST   | /api/characters   | 캐릭터 생성    | `{ "name": "호호이모" }`              | `{ "캐릭터 생성됨!": 3 }`            |
| DELETE | /api/characters/:id | 캐릭터 삭제  |                                      | `{ "message": "캐릭터가 삭제되었습니다" }` |
| GET    | /api/characters/:id | 캐릭터 상세 조회 |                                      | `{ "name": "후후삼촌", "health": 500, "power": 100 }` |
| POST   | /api/items        | 아이템 생성    | `{ "item_name": "무기12", "item_stat": { "health": 10, "power": 0 } }` | `{ "item_code": 3, "item_name": "무기12", "item_stat": { "health": 10, "power": 0 }, "_id": "6646133a0826abb9cc2de89a", "__v": 0 }` |
| GET    | /api/items/:id    | 아이템 상세 조회 |                                      | `{ "item_stat": { "health": 10, "power": 5 }, "item_name": "무기" }` |
| GET    | /api/items        | 아이템 모두 조회 |                                      | `[ { "item_code": 1, "item_name": "쩌는무기" }, { "item_code": 2, "item_name": "무기2" } ]` |
| PATCH  | /api/items/:id    | 아이템 데이터 수정 | `{ "item_name": "쩌는무기", "item_stat": { "health": 50, "power": 1 } }` | `{ "item_stat": { "health": 50, "power": 1 }, "_id": "6645c7de8da0092a1660bc32", "item_code": 1, "item_name": "쩌는무기", "__v": 0 }` |


## 오류 코드

| 코드 | 설명                  |
|------|-----------------------|
| 200  | 성공                  |
| 400  | 잘못된 요청           |
| 401  | 인증 실패             |
| 404  | 찾을 수 없음          |
| 500  | 서버 오류             |

## 예제
요청과 응답 예제.




![image](https://github.com/4cozm/Personal_Session/assets/49065386/4a9d5dea-2d49-4a74-ae71-3f7a3c802076)


캐릭터 생성
![image](https://github.com/4cozm/Personal_Session/assets/49065386/e140efa0-e09f-4e5a-a757-421e3ba7d116)


캐릭터 삭제
![image](https://github.com/4cozm/Personal_Session/assets/49065386/01499cb4-6add-49fa-ad44-a83db5f42d5e)


캐릭터 조회
![image](https://github.com/4cozm/Personal_Session/assets/49065386/431694b4-9c89-4e8d-8773-ec0aad5a815a)


아이템 생성
![image](https://github.com/4cozm/Personal_Session/assets/49065386/c152e9bf-f201-4fa1-a044-c15ff5a1f512)



아이템 상세조회
![image](https://github.com/4cozm/Personal_Session/assets/49065386/ee0c6c48-2be2-4f17-8645-595e6d95a304)


아이템 모두 조회
![image](https://github.com/4cozm/Personal_Session/assets/49065386/5711f13b-667e-4f70-acae-4f007b815d91)

아이템 수정
![image](https://github.com/4cozm/Personal_Session/assets/49065386/168d6f18-5954-452f-a36f-2da84e37a34a)

