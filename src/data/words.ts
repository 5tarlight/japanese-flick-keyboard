import { readRows } from './types';
import type { PracticeItem } from './types';

// Independently compiled everyday vocabulary. No external text or dictionary database is copied.
const groups: Record<string, string> = {
  음식: `
水|みず|물|water
お茶|おちゃ|차|tea
ご飯|ごはん|밥|rice; meal
パン|ぱん|빵|bread
卵|たまご|달걀|egg
肉|にく|고기|meat
魚|さかな|생선|fish
野菜|やさい|채소|vegetables
果物|くだもの|과일|fruit
牛乳|ぎゅうにゅう|우유|milk
塩|しお|소금|salt
砂糖|さとう|설탕|sugar
醤油|しょうゆ|간장|soy sauce
味噌|みそ|된장|miso
油|あぶら|기름|oil
米|こめ|쌀|uncooked rice
豆|まめ|콩|beans
豆腐|とうふ|두부|tofu
海苔|のり|김|seaweed
梅|うめ|매실|Japanese plum
苺|いちご|딸기|strawberry
林檎|りんご|사과|apple
桃|もも|복숭아|peach
梨|なし|배|pear
葡萄|ぶどう|포도|grapes
蜜柑|みかん|귤|mandarin orange
西瓜|すいか|수박|watermelon
柿|かき|감|persimmon
栗|くり|밤|chestnut
芋|いも|감자·고구마 등의 덩이줄기|tuber
玉葱|たまねぎ|양파|onion
人参|にんじん|당근|carrot
大根|だいこん|무|daikon radish
胡瓜|きゅうり|오이|cucumber
茸|きのこ|버섯|mushroom
寿司|すし|초밥|sushi
蕎麦|そば|메밀국수|buckwheat noodles
うどん|うどん|우동|udon noodles
お粥|おかゆ|죽|rice porridge
おにぎり|おにぎり|주먹밥|rice ball
弁当|べんとう|도시락|boxed lunch
定食|ていしょく|정식|set meal
味|あじ|맛|taste
朝食|ちょうしょく|아침 식사|breakfast
昼食|ちゅうしょく|점심 식사|lunch
夕食|ゆうしょく|저녁 식사|dinner
お菓子|おかし|과자|sweets; snacks
飴|あめ|사탕|candy
氷|こおり|얼음|ice
蜂蜜|はちみつ|꿀|honey
トマト|とまと|토마토|tomato
キャベツ|きゃべつ|양배추|cabbage
レタス|れたす|상추·양상추|lettuce
南瓜|かぼちゃ|호박|pumpkin
茄子|なす|가지|eggplant
葱|ねぎ|파|green onion
生姜|しょうが|생강|ginger
大蒜|にんにく|마늘|garlic
鶏肉|とりにく|닭고기|chicken meat
豚肉|ぶたにく|돼지고기|pork
牛肉|ぎゅうにく|소고기|beef
ヨーグルト|よーぐると|요구르트|yogurt
バター|ばたー|버터|butter
チーズ|ちーず|치즈|cheese
コーヒー|こーひー|커피|coffee
緑茶|りょくちゃ|녹차|green tea
紅茶|こうちゃ|홍차|black tea
汁|しる|국물|broth
小麦|こむぎ|밀|wheat
麺|めん|면|noodles
`,
  자연: `
空|そら|하늘|sky
雲|くも|구름|cloud
雨|あめ|비|rain
雪|ゆき|눈|snow
風|かぜ|바람|wind
雷|かみなり|천둥|thunder
虹|にじ|무지개|rainbow
星|ほし|별|star
月|つき|달|moon
太陽|たいよう|태양|sun
海|うみ|바다|sea
山|やま|산|mountain
川|かわ|강|river
湖|みずうみ|호수|lake
池|いけ|연못|pond
森|もり|숲|forest
林|はやし|수풀|grove
木|き|나무|tree
花|はな|꽃|flower
草|くさ|풀|grass
葉|は|잎|leaf
枝|えだ|나뭇가지|branch
根|ね|뿌리|root
種|たね|씨앗|seed
土|つち|흙|soil
砂|すな|모래|sand
石|いし|돌|stone
岩|いわ|바위|rock
波|なみ|파도|wave
島|しま|섬|island
浜|はま|해변|beach
谷|たに|골짜기|valley
坂|さか|비탈길|slope
桜|さくら|벚꽃|cherry blossom
竹|たけ|대나무|bamboo
松|まつ|소나무|pine
紅葉|もみじ|단풍|autumn leaves
景色|けしき|경치|scenery
日陰|ひかげ|그늘|shade
夕日|ゆうひ|석양|setting sun
朝日|あさひ|아침 해|morning sun
夕焼け|ゆうやけ|저녁노을|sunset glow
霧|きり|안개|fog
露|つゆ|이슬|dew
霜|しも|서리|frost
氷河|ひょうが|빙하|glacier
大地|だいち|대지|land; earth
火山|かざん|화산|volcano
砂漠|さばく|사막|desert
草原|そうげん|초원|grassland
滝|たき|폭포|waterfall
泉|いずみ|샘|spring; fountain
小川|おがわ|시냇물|stream
岸|きし|기슭|shore; bank
水平線|すいへいせん|수평선|sea horizon
地平線|ちへいせん|지평선|land horizon
満月|まんげつ|보름달|full moon
新月|しんげつ|삭(신월)|new moon
蕾|つぼみ|꽃봉오리|flower bud
向日葵|ひまわり|해바라기|sunflower
`,
  '집과 물건': `
家|いえ|집|house
部屋|へや|방|room
窓|まど|창문|window
扉|とびら|문|door
壁|かべ|벽|wall
床|ゆか|바닥|floor
天井|てんじょう|천장|ceiling
屋根|やね|지붕|roof
庭|にわ|정원|garden
台所|だいどころ|부엌|kitchen
玄関|げんかん|현관|entrance
廊下|ろうか|복도|hallway
階段|かいだん|계단|stairs
机|つくえ|책상|desk
椅子|いす|의자|chair
棚|たな|선반|shelf
鏡|かがみ|거울|mirror
時計|とけい|시계|clock
鍵|かぎ|열쇠|key
傘|かさ|우산|umbrella
鞄|かばん|가방|bag
財布|さいふ|지갑|wallet
靴|くつ|신발|shoes
靴下|くつした|양말|socks
帽子|ぼうし|모자|hat
服|ふく|옷|clothes
眼鏡|めがね|안경|glasses
指輪|ゆびわ|반지|ring
布団|ふとん|이불|futon
枕|まくら|베개|pillow
毛布|もうふ|담요|blanket
石鹸|せっけん|비누|soap
歯ブラシ|はぶらし|칫솔|toothbrush
皿|さら|접시|plate
箸|はし|젓가락|chopsticks
茶碗|ちゃわん|밥공기|rice bowl
鍋|なべ|냄비|pot
包丁|ほうちょう|식칼|kitchen knife
冷蔵庫|れいぞうこ|냉장고|refrigerator
洗濯機|せんたくき|세탁기|washing machine
電話|でんわ|전화|telephone
携帯電話|けいたいでんわ|휴대전화|mobile phone
充電器|じゅうでんき|충전기|charger
電池|でんち|건전지|battery
掃除機|そうじき|청소기|vacuum cleaner
扇風機|せんぷうき|선풍기|electric fan
暖房|だんぼう|난방|heating
冷房|れいぼう|냉방|air conditioning
風呂|ふろ|목욕·욕조|bath
浴室|よくしつ|욕실|bathroom
洗面所|せんめんじょ|세면실|washroom
食器|しょっき|식기|tableware
湯呑み|ゆのみ|찻잔|teacup
まな板|まないた|도마|cutting board
缶|かん|깡통|can
瓶|びん|병|bottle
箱|はこ|상자|box
袋|ふくろ|봉투·주머니|bag; sack
紐|ひも|끈|string
鋏|はさみ|가위|scissors
`,
  '사람과 몸': `
私|わたし|나|I; me
友達|ともだち|친구|friend
家族|かぞく|가족|family
母|はは|어머니|my mother
父|ちち|아버지|my father
姉|あね|누나·언니|my older sister
兄|あに|형·오빠|my older brother
妹|いもうと|여동생|younger sister
弟|おとうと|남동생|younger brother
祖母|そぼ|할머니|my grandmother
祖父|そふ|할아버지|my grandfather
子供|こども|아이|child
大人|おとな|어른|adult
先生|せんせい|선생님|teacher
学生|がくせい|학생|student
医者|いしゃ|의사|doctor
店員|てんいん|점원|shop assistant
隣人|りんじん|이웃|neighbor
名前|なまえ|이름|name
体|からだ|몸|body
頭|あたま|머리|head
顔|かお|얼굴|face
目|め|눈|eye
耳|みみ|귀|ear
鼻|はな|코|nose
口|くち|입|mouth
歯|は|이|tooth
手|て|손|hand
足|あし|발·다리|foot; leg
指|ゆび|손가락|finger
心|こころ|마음|heart; mind
声|こえ|목소리|voice
髪|かみ|머리카락|hair
肩|かた|어깨|shoulder
背中|せなか|등|back
夫|おっと|남편|my husband
妻|つま|아내|my wife
夫婦|ふうふ|부부|married couple
親戚|しんせき|친척|relative
従兄弟|いとこ|사촌|cousin
赤ちゃん|あかちゃん|아기|baby
双子|ふたご|쌍둥이|twins
息子|むすこ|아들|son
娘|むすめ|딸|daughter
先輩|せんぱい|선배|senior colleague or student
後輩|こうはい|후배|junior colleague or student
同僚|どうりょう|동료|coworker
仲間|なかま|동료·친구|companion; teammate
相手|あいて|상대|partner; other person
お客さん|おきゃくさん|손님|guest; customer
首|くび|목|neck
腕|うで|팔|arm
肘|ひじ|팔꿈치|elbow
膝|ひざ|무릎|knee
胸|むね|가슴|chest
`,
  '장소와 여행': `
駅|えき|역|station
空港|くうこう|공항|airport
港|みなと|항구|port
町|まち|동네·도시|town
村|むら|마을|village
道|みち|길|road
橋|はし|다리|bridge
交差点|こうさてん|교차로|intersection
信号|しんごう|신호등|traffic light
公園|こうえん|공원|park
学校|がっこう|학교|school
図書館|としょかん|도서관|library
病院|びょういん|병원|hospital
銀行|ぎんこう|은행|bank
郵便局|ゆうびんきょく|우체국|post office
本屋|ほんや|서점|bookstore
花屋|はなや|꽃집|flower shop
喫茶店|きっさてん|찻집·카페|coffee shop
食堂|しょくどう|식당|dining hall
映画館|えいがかん|영화관|cinema
美術館|びじゅつかん|미술관|art museum
博物館|はくぶつかん|박물관|museum
動物園|どうぶつえん|동물원|zoo
水族館|すいぞくかん|수족관|aquarium
神社|じんじゃ|신사|Shinto shrine
寺|てら|절|Buddhist temple
旅館|りょかん|일본식 여관|Japanese inn
温泉|おんせん|온천|hot spring
市場|いちば|시장|market
入口|いりぐち|입구|entrance
出口|でぐち|출구|exit
切符|きっぷ|표|ticket
地図|ちず|지도|map
荷物|にもつ|짐|luggage
電車|でんしゃ|전철|train
自転車|じてんしゃ|자전거|bicycle
飛行機|ひこうき|비행기|airplane
船|ふね|배|boat; ship
旅行|りょこう|여행|travel
予約|よやく|예약|reservation
バス|ばす|버스|bus
地下鉄|ちかてつ|지하철|subway
新幹線|しんかんせん|신칸센|bullet train
車|くるま|자동차|car
タクシー|たくしー|택시|taxi
乗り場|のりば|승강장·타는 곳|boarding point
改札|かいさつ|개찰구|ticket gate
ホーム|ほーむ|승강장|train platform
運賃|うんちん|운임|fare
片道|かたみち|편도|one way
往復|おうふく|왕복|round trip
乗り換え|のりかえ|환승|transfer
駐車場|ちゅうしゃじょう|주차장|parking lot
歩道|ほどう|보도|sidewalk
商店街|しょうてんがい|상점가|shopping street
スーパー|すーぱー|슈퍼마켓|supermarket
コンビニ|こんびに|편의점|convenience store
薬局|やっきょく|약국|pharmacy
交番|こうばん|파출소|police box
市役所|しやくしょ|시청|city hall
`,
  '시간과 일상': `
今日|きょう|오늘|today
明日|あした|내일|tomorrow
昨日|きのう|어제|yesterday
朝|あさ|아침|morning
昼|ひる|낮|daytime; noon
夜|よる|밤|night
夕方|ゆうがた|저녁 무렵|evening
今|いま|지금|now
後|あと|나중·뒤|later; after
前|まえ|앞·이전|before; front
毎日|まいにち|매일|every day
毎週|まいしゅう|매주|every week
週末|しゅうまつ|주말|weekend
今週|こんしゅう|이번 주|this week
来週|らいしゅう|다음 주|next week
先週|せんしゅう|지난주|last week
今年|ことし|올해|this year
来年|らいねん|내년|next year
去年|きょねん|작년|last year
春|はる|봄|spring
夏|なつ|여름|summer
秋|あき|가을|autumn
冬|ふゆ|겨울|winter
時間|じかん|시간|time
約束|やくそく|약속|promise; appointment
予定|よてい|예정|plan; schedule
休み|やすみ|휴식·휴일|break; day off
仕事|しごと|일|work
散歩|さんぽ|산책|walk
買い物|かいもの|쇼핑|shopping
掃除|そうじ|청소|cleaning
洗濯|せんたく|빨래|laundry
料理|りょうり|요리|cooking; dish
運動|うんどう|운동|exercise
睡眠|すいみん|수면|sleep
月曜日|げつようび|월요일|Monday
火曜日|かようび|화요일|Tuesday
水曜日|すいようび|수요일|Wednesday
木曜日|もくようび|목요일|Thursday
金曜日|きんようび|금요일|Friday
土曜日|どようび|토요일|Saturday
日曜日|にちようび|일요일|Sunday
午前|ごぜん|오전|morning; a.m.
午後|ごご|오후|afternoon; p.m.
正午|しょうご|정오|noon
深夜|しんや|심야|late at night
平日|へいじつ|평일|weekday
祝日|しゅくじつ|공휴일|public holiday
連休|れんきゅう|연휴|consecutive holidays
今月|こんげつ|이번 달|this month
来月|らいげつ|다음 달|next month
先月|せんげつ|지난달|last month
一昨日|おととい|그저께|the day before yesterday
明後日|あさって|모레|the day after tomorrow
季節|きせつ|계절|season
`,
  동작: `
行く|いく|가다|go
来る|くる|오다|come
帰る|かえる|돌아가다|return home
歩く|あるく|걷다|walk
走る|はしる|달리다|run
止まる|とまる|멈추다|stop
待つ|まつ|기다리다|wait
座る|すわる|앉다|sit
立つ|たつ|서다|stand
寝る|ねる|자다|sleep
起きる|おきる|일어나다|wake up
食べる|たべる|먹다|eat
飲む|のむ|마시다|drink
見る|みる|보다|see; watch
聞く|きく|듣다|listen
話す|はなす|이야기하다|speak
読む|よむ|읽다|read
書く|かく|쓰다|write
習う|ならう|배우다|learn
教える|おしえる|가르치다|teach
覚える|おぼえる|외우다|memorize
忘れる|わすれる|잊다|forget
考える|かんがえる|생각하다|think
知る|しる|알다|know; learn of
分かる|わかる|이해하다|understand
買う|かう|사다|buy
売る|うる|팔다|sell
払う|はらう|지불하다|pay
作る|つくる|만들다|make
使う|つかう|사용하다|use
開ける|あける|열다|open
閉める|しめる|닫다|close
入る|はいる|들어가다|enter
出る|でる|나가다|leave
持つ|もつ|들다·가지다|hold; have
置く|おく|놓다|put
取る|とる|집다·취하다|take
渡す|わたす|건네다|hand over
送る|おくる|보내다|send
受け取る|うけとる|받다|receive
遊ぶ|あそぶ|놀다|play
泳ぐ|およぐ|헤엄치다|swim
歌う|うたう|노래하다|sing
踊る|おどる|춤추다|dance
笑う|わらう|웃다|laugh; smile
泣く|なく|울다|cry
探す|さがす|찾다|look for
選ぶ|えらぶ|고르다|choose
始める|はじめる|시작하다|begin
終わる|おわる|끝나다|end
会う|あう|만나다|meet
乗る|のる|타다|ride; board
降りる|おりる|내리다|get off
着く|つく|도착하다|arrive
出発する|しゅっぱつする|출발하다|depart
泊まる|とまる|숙박하다|stay overnight
借りる|かりる|빌리다|borrow
貸す|かす|빌려주다|lend
返す|かえす|돌려주다|return something
集める|あつめる|모으다|collect
並ぶ|ならぶ|줄 서다|line up
並べる|ならべる|나란히 놓다|arrange in a row
直す|なおす|고치다|repair; correct
治る|なおる|낫다|recover; heal
手伝う|てつだう|돕다|help
働く|はたらく|일하다|work
休む|やすむ|쉬다|rest
続ける|つづける|계속하다|continue
比べる|くらべる|비교하다|compare
決める|きめる|정하다|decide
`,
  '상태와 느낌': `
大きい|おおきい|크다|big
小さい|ちいさい|작다|small
長い|ながい|길다|long
短い|みじかい|짧다|short
高い|たかい|높다·비싸다|high; expensive
低い|ひくい|낮다|low
安い|やすい|싸다|inexpensive
新しい|あたらしい|새롭다|new
古い|ふるい|오래되다|old
暑い|あつい|덥다|hot (weather)
寒い|さむい|춥다|cold (weather)
暖かい|あたたかい|따뜻하다|warm
涼しい|すずしい|시원하다|cool
明るい|あかるい|밝다|bright
暗い|くらい|어둡다|dark
重い|おもい|무겁다|heavy
軽い|かるい|가볍다|lightweight
強い|つよい|강하다|strong
弱い|よわい|약하다|weak
早い|はやい|이르다|early
遅い|おそい|늦다·느리다|late; slow
近い|ちかい|가깝다|near
遠い|とおい|멀다|far
広い|ひろい|넓다|spacious
狭い|せまい|좁다|narrow
甘い|あまい|달다|sweet
辛い|からい|맵다|spicy
苦い|にがい|쓰다|bitter
酸っぱい|すっぱい|시다|sour
美味しい|おいしい|맛있다|delicious
楽しい|たのしい|즐겁다|fun
嬉しい|うれしい|기쁘다|happy; glad
悲しい|かなしい|슬프다|sad
寂しい|さびしい|외롭다|lonely
忙しい|いそがしい|바쁘다|busy
難しい|むずかしい|어렵다|difficult
優しい|やさしい|상냥하다|kind
眠い|ねむい|졸리다|sleepy
丸い|まるい|둥글다|round
柔らかい|やわらかい|부드럽다|soft
美しい|うつくしい|아름답다|beautiful
可愛い|かわいい|귀엽다|cute
面白い|おもしろい|재미있다|interesting
つまらない|つまらない|지루하다|boring
恥ずかしい|はずかしい|부끄럽다|embarrassed; shy
懐かしい|なつかしい|그립다|nostalgic
羨ましい|うらやましい|부럽다|envious
厳しい|きびしい|엄격하다|strict
細い|ほそい|가늘다|thin; slender
太い|ふとい|굵다|thick
浅い|あさい|얕다|shallow
深い|ふかい|깊다|deep
硬い|かたい|딱딱하다|hard
臭い|くさい|냄새가 고약하다|smelly
うるさい|うるさい|시끄럽다|noisy
静か|しずか|조용함|quiet
賑やか|にぎやか|번화함·활기참|lively
便利|べんり|편리함|convenient
不便|ふべん|불편함|inconvenient
簡単|かんたん|간단함|simple; easy
`,
  '취미와 배움': `
本|ほん|책|book
雑誌|ざっし|잡지|magazine
新聞|しんぶん|신문|newspaper
手紙|てがみ|편지|letter
写真|しゃしん|사진|photograph
絵|え|그림|picture; painting
音楽|おんがく|음악|music
映画|えいが|영화|movie
歌|うた|노래|song
楽器|がっき|악기|musical instrument
趣味|しゅみ|취미|hobby
読書|どくしょ|독서|reading
勉強|べんきょう|공부|study
練習|れんしゅう|연습|practice
質問|しつもん|질문|question
答え|こたえ|답|answer
言葉|ことば|말·단어|word; language
文字|もじ|글자|character; letter
漢字|かんじ|한자|kanji
日本語|にほんご|일본어|Japanese language
英語|えいご|영어|English language
韓国語|かんこくご|한국어|Korean language
意味|いみ|뜻|meaning
発音|はつおん|발음|pronunciation
辞書|じしょ|사전|dictionary
鉛筆|えんぴつ|연필|pencil
消しゴム|けしごむ|지우개|eraser
紙|かみ|종이|paper
色|いろ|색|color
赤|あか|빨강|red
青|あお|파랑|blue
白|しろ|하양|white
黒|くろ|검정|black
緑|みどり|초록|green
紫|むらさき|보라|purple
小説|しょうせつ|소설|novel
物語|ものがたり|이야기|story
詩|し|시|poem
漫画|まんが|만화|comic; manga
舞台|ぶたい|무대|stage
演劇|えんげき|연극|theater; play
美術|びじゅつ|미술|fine arts
歴史|れきし|역사|history
地理|ちり|지리|geography
数学|すうがく|수학|mathematics
科学|かがく|과학|science
授業|じゅぎょう|수업|class; lesson
宿題|しゅくだい|숙제|homework
試験|しけん|시험|exam
教室|きょうしつ|교실|classroom
黒板|こくばん|칠판|blackboard
教科書|きょうかしょ|교과서|textbook
筆箱|ふでばこ|필통|pencil case
定規|じょうぎ|자|ruler
地球儀|ちきゅうぎ|지구본|globe
`,
  동물: `
猫|ねこ|고양이|cat
犬|いぬ|개|dog
鳥|とり|새|bird
馬|うま|말|horse
牛|うし|소|cow
豚|ぶた|돼지|pig
羊|ひつじ|양|sheep
山羊|やぎ|염소|goat
兎|うさぎ|토끼|rabbit
鼠|ねずみ|쥐|mouse
狐|きつね|여우|fox
狸|たぬき|너구리|raccoon dog
熊|くま|곰|bear
猿|さる|원숭이|monkey
鹿|しか|사슴|deer
象|ぞう|코끼리|elephant
虎|とら|호랑이|tiger
亀|かめ|거북이|turtle
蛙|かえる|개구리|frog
蛇|へび|뱀|snake
蝶|ちょう|나비|butterfly
蜂|はち|벌|bee
蟻|あり|개미|ant
蝉|せみ|매미|cicada
蜻蛉|とんぼ|잠자리|dragonfly
蛍|ほたる|반딧불이|firefly
鯨|くじら|고래|whale
海豚|いるか|돌고래|dolphin
鮭|さけ|연어|salmon
鮪|まぐろ|참치|tuna
烏賊|いか|오징어|squid
蛸|たこ|문어|octopus
海老|えび|새우|shrimp
蟹|かに|게|crab
貝|かい|조개|shellfish
鶏|にわとり|닭|chicken
鴨|かも|오리|duck
鳩|はと|비둘기|pigeon
雀|すずめ|참새|sparrow
燕|つばめ|제비|swallow
烏|からす|까마귀|crow
鷹|たか|매|hawk
鶴|つる|학|crane
梟|ふくろう|부엉이|owl
白鳥|はくちょう|백조|swan
金魚|きんぎょ|금붕어|goldfish
鯉|こい|잉어|carp
鰯|いわし|정어리|sardine
鯖|さば|고등어|mackerel
秋刀魚|さんま|꽁치|Pacific saury
鰻|うなぎ|장어|eel
昆虫|こんちゅう|곤충|insect
鈴虫|すずむし|방울벌레|bell cricket
毛虫|けむし|털벌레|hairy caterpillar
かたつむり|かたつむり|달팽이|snail
`,
};

export const wordCategories = Object.keys(groups);
export const words: PracticeItem[] = Object.entries(groups).flatMap(([category, source]) =>
  readRows(source).map(([text, reading, ko, en], index) => ({
    id: `word-${category}-${index}`,
    mode: 'word' as const,
    category,
    segments: [{ text, ...(text !== reading ? { reading } : {}) }],
    ko,
    en,
  })),
);
