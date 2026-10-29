# 학습 자료와 출처

## 직접 작성한 학습 자료

이 프로젝트에 포함된 콘텐츠는 이 앱을 위해 독립적으로 작성·편집한 학습용 자료입니다. 외부 웹사이트의 단어 목록, 번역, 사전 데이터베이스, 문학 작품, 기사, 가사, 유명 글의 문장을 복사하거나 스크래핑하지 않았습니다.

| 파일                    | 내용                               |           수량 | 출처                            |
| ----------------------- | ---------------------------------- | -------------: | ------------------------------- |
| `src/data/kana.ts`      | 현대 일본어 히라가나 연습 글자     |           81자 | 일반 문자 체계에 따라 직접 구성 |
| `src/data/words.ts`     | 10개 주제의 일상 단어·읽기·한영 뜻 |          600개 | 프로젝트 자체 편집              |
| `src/data/sentences.ts` | 독립적인 일상 예문·읽기·한영 번역  |          300개 | 프로젝트 자체 창작              |
| `src/data/passages.ts`  | 일상 이야기·읽기·한영 번역         | 12편, 각 4문장 | 프로젝트 자체 창작              |

문장 분류: short 100개, middle 100개, long 100개. 단어·독립 문장·장문 합계는 912개입니다. 장문 내부 48문장은 독립 문장 수에 중복 합산하지 않습니다.

읽기를 연습할 수 있도록 일부 단어는 일상에서 가나로도 흔히 쓰는 한자 표기를 사용합니다. 예를 들어 「林檎」「苺」「海豚」 등은 한자 암기를 요구하지 않으며 해당 히라가나 읽기로 입력해도 정답입니다. 다의어의 뜻과 읽기는 연습에 사용한 형태를 기준으로 제공합니다.

`src/data/`의 학습 자료에 대해 저작권 및 관련 권리를 보유하는 범위에서 [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/legalcode)로 공개합니다. 이는 해당 자료의 저작권 보호 여부에 관한 주장을 뜻하지 않습니다. 제3자 콘텐츠를 추후 추가할 경우에는 개별 출처, 권리자, 라이선스, 허용 범위를 확인하고 이 문서와 앱의 자료 안내를 갱신해야 합니다.

## UI 의존성

- [React](https://github.com/facebook/react): MIT.
- [Lucide](https://lucide.dev/license): ISC 아이콘 라이브러리.
- [Noto Sans JP](https://fonts.google.com/specimen/Noto+Sans+JP/license): SIL Open Font License 1.1. Google Fonts CSS를 통해 로드하며 로드할 수 없으면 시스템 글꼴로 대체합니다. 학습 자료나 기록을 이 서비스에 전송하지 않으며 글꼴 요청은 브라우저에서 발생합니다.

## 구현과 사용 안내의 참고 문서

아래 자료는 기술 동작과 키보드 설정을 확인하기 위한 참고 문서이며 학습 예문의 출처가 아닙니다.

- [Vercel · Vite 배포](https://vercel.com/docs/frameworks/frontend/vite)
- [MDN · VisualViewport](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport)
- [MDN · compositionend](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event)
- [Apple · iPhone 키보드 추가 및 변경](https://support.apple.com/ja-jp/guide/iphone/iph73b71eb/ios)
- [Google · Gboard 키보드 사용](https://support.google.com/gboard/answer/2842292)
- [Android · 플릭 입력과 12키 설정](https://www.android.com/intl/ja_jp/articles/129/)

앱의 키보드 설정 안내는 문서를 바탕으로 새로 서술했습니다. 운영체제 버전과 키보드 앱에 따라 실제 메뉴 이름은 달라질 수 있습니다.
