import { parseRuby } from './types';
import type { PracticeItem, SentenceLength } from './types';

// All sentences below are original practice material written for this project.
const groups: Record<SentenceLength, string> = {
  short: `
おはようございます。 :: 안녕하세요. (아침 인사) :: Good morning.
ありがとうございます。 :: 감사합니다. :: Thank you.
また[明日|あした]。 :: 내일 또 만나요. :: See you tomorrow.
おやすみなさい。 :: 안녕히 주무세요. :: Good night.
いただきます。 :: 잘 먹겠습니다. :: Let's eat.
ごちそうさまでした。 :: 잘 먹었습니다. :: Thank you for the meal.
どうぞよろしく。 :: 잘 부탁해요. :: Nice to meet you.
お[元気|げんき]ですか。 :: 잘 지내세요? :: How are you?
[水|みず]をください。 :: 물을 주세요. :: Water, please.
これは[何|なん]ですか。 :: 이것은 무엇인가요? :: What is this?
[駅|えき]はどこですか。 :: 역은 어디인가요? :: Where is the station?
[少|すこ]し[待|ま]ってください。 :: 잠깐 기다려 주세요. :: Please wait a moment.
[今日|きょう]は[晴|は]れです。 :: 오늘은 맑아요. :: It is sunny today.
[雨|あめ]が[降|ふ]っています。 :: 비가 내리고 있어요. :: It is raining.
[風|かぜ]が[強|つよ]いです。 :: 바람이 강해요. :: The wind is strong.
[花|はな]が[咲|さ]きました。 :: 꽃이 피었어요. :: The flowers have bloomed.
[猫|ねこ]が[寝|ね]ています。 :: 고양이가 자고 있어요. :: The cat is sleeping.
[鳥|とり]が[鳴|な]いています。 :: 새가 울고 있어요. :: The birds are singing.
[海|うみ]が[見|み]えます。 :: 바다가 보여요. :: I can see the sea.
[月|つき]がきれいです。 :: 달이 아름다워요. :: The moon is beautiful.
お[茶|ちゃ]を[飲|の]みます。 :: 차를 마셔요. :: I drink tea.
パンを[食|た]べます。 :: 빵을 먹어요. :: I eat bread.
[本|ほん]を[読|よ]みます。 :: 책을 읽어요. :: I read a book.
[音楽|おんがく]を[聞|き]きます。 :: 음악을 들어요. :: I listen to music.
[写真|しゃしん]を[撮|と]ります。 :: 사진을 찍어요. :: I take a photo.
[窓|まど]を[開|あ]けます。 :: 창문을 열어요. :: I open the window.
[電気|でんき]を[消|け]します。 :: 불을 꺼요. :: I turn off the light.
[靴|くつ]を[脱|ぬ]ぎます。 :: 신발을 벗어요. :: I take off my shoes.
[手|て]を[洗|あら]います。 :: 손을 씻어요. :: I wash my hands.
[家|いえ]に[帰|かえ]ります。 :: 집에 돌아가요. :: I go home.
[今|いま]、[起|お]きました。 :: 지금 일어났어요. :: I just woke up.
もう[寝|ね]ます。 :: 이제 잘 거예요. :: I am going to bed now.
お[腹|なか]がすきました。 :: 배가 고파요. :: I am hungry.
[喉|のど]が[渇|かわ]きました。 :: 목이 말라요. :: I am thirsty.
とても[楽|たの]しいです。 :: 아주 즐거워요. :: This is a lot of fun.
[少|すこ]し[寒|さむ]いです。 :: 조금 추워요. :: It is a little cold.
これは[甘|あま]いです。 :: 이것은 달아요. :: This is sweet.
いい[匂|にお]いですね。 :: 좋은 냄새네요. :: That smells nice.
[大丈夫|だいじょうぶ]です。 :: 괜찮아요. :: It is all right.
ゆっくり[話|はな]してください。 :: 천천히 말해 주세요. :: Please speak slowly.
もう[一度|いちど]お[願|ねが]いします。 :: 한 번 더 부탁해요. :: Once more, please.
[名前|なまえ]を[書|か]いてください。 :: 이름을 써 주세요. :: Please write your name.
ここに[座|すわ]ってください。 :: 여기에 앉아 주세요. :: Please sit here.
[右|みぎ]に[曲|ま]がります。 :: 오른쪽으로 돌아요. :: Turn right.
まっすぐ[進|すす]みます。 :: 곧장 가요. :: Go straight ahead.
[切符|きっぷ]を[買|か]いました。 :: 표를 샀어요. :: I bought a ticket.
[予約|よやく]しています。 :: 예약했어요. :: I have a reservation.
いくらですか。 :: 얼마인가요? :: How much is it?
これにします。 :: 이것으로 할게요. :: I will take this one.
[袋|ふくろ]はいりません。 :: 봉투는 필요 없어요. :: I do not need a bag.
[春|はる]が[来|き]ました。 :: 봄이 왔어요. :: Spring has arrived.
[夏|なつ]が[好|す]きです。 :: 여름을 좋아해요. :: I like summer.
[秋|あき]の[空|そら]は[高|たか]い。 :: 가을 하늘은 높아요. :: The autumn sky is vast.
[冬|ふゆ]の[朝|あさ]は[静|しず]かです。 :: 겨울 아침은 고요해요. :: Winter mornings are quiet.
[今日|きょう]も[頑張|がんば]ります。 :: 오늘도 힘낼게요. :: I will do my best today too.
[練習|れんしゅう]を[始|はじ]めます。 :: 연습을 시작해요. :: I am starting practice.
[少|すこ]し[休|やす]みましょう。 :: 조금 쉬어요. :: Let's take a short break.
よくできました。 :: 잘했어요. :: Well done.
[明日|あした]も[来|き]ます。 :: 내일도 올게요. :: I will come tomorrow too.
[一緒|いっしょ]に[歩|ある]きましょう。 :: 함께 걸어요. :: Let's walk together.
`,
  middle: `
[毎朝|まいあさ]、[温|あたた]かいお[茶|ちゃ]を[飲|の]みます。 :: 매일 아침 따뜻한 차를 마셔요. :: I drink warm tea every morning.
[今日|きょう]は[歩|ある]いて[学校|がっこう]に[行|い]きます。 :: 오늘은 걸어서 학교에 가요. :: I am walking to school today.
[駅|えき]の[前|まえ]で[友達|ともだち]を[待|ま]っています。 :: 역 앞에서 친구를 기다리고 있어요. :: I am waiting for a friend in front of the station.
この[店|みせ]のパンはとても[美味|おい]しいです。 :: 이 가게의 빵은 아주 맛있어요. :: The bread at this shop is delicious.
[机|つくえ]の[上|うえ]に[本|ほん]が[三冊|さんさつ]あります。 :: 책상 위에 책이 세 권 있어요. :: There are three books on the desk.
[日曜日|にちようび]は[家|いえ]でゆっくり[休|やす]みます。 :: 일요일에는 집에서 푹 쉬어요. :: I relax at home on Sundays.
[窓|まど]から[小|ちい]さな[公園|こうえん]が[見|み]えます。 :: 창문으로 작은 공원이 보여요. :: I can see a small park from the window.
[新|あたら]しい[靴|くつ]で[散歩|さんぽ]に[出|で]かけました。 :: 새 신발을 신고 산책하러 나갔어요. :: I went for a walk in my new shoes.
[昨日|きのう]、[図書館|としょかん]で[本|ほん]を[借|か]りました。 :: 어제 도서관에서 책을 빌렸어요. :: I borrowed a book from the library yesterday.
[電車|でんしゃ]はあと[五分|ごふん]で[来|き]ます。 :: 전철은 5분 뒤에 와요. :: The train will arrive in five minutes.
[次|つぎ]の[角|かど]を[左|ひだり]に[曲|ま]がってください。 :: 다음 모퉁이에서 왼쪽으로 돌아 주세요. :: Please turn left at the next corner.
この[漢字|かんじ]の[読|よ]み[方|かた]を[教|おし]えてください。 :: 이 한자의 읽는 법을 알려 주세요. :: Please tell me how to read this kanji.
[日本語|にほんご]で[短|みじか]い[日記|にっき]を[書|か]いています。 :: 일본어로 짧은 일기를 쓰고 있어요. :: I am writing a short diary in Japanese.
[仕事|しごと]の[後|あと]で[買|か]い[物|もの]に[行|い]きます。 :: 퇴근 후에 장을 보러 가요. :: I go shopping after work.
[冷蔵庫|れいぞうこ]に[牛乳|ぎゅうにゅう]が[入|はい]っています。 :: 냉장고에 우유가 들어 있어요. :: There is milk in the refrigerator.
[夕食|ゆうしょく]に[野菜|やさい]のスープを[作|つく]りました。 :: 저녁으로 채소 수프를 만들었어요. :: I made vegetable soup for dinner.
お[弁当|べんとう]を[持|も]って[公園|こうえん]へ[行|い]きましょう。 :: 도시락을 가지고 공원에 가요. :: Let's take a lunch box to the park.
[雨|あめ]なので[傘|かさ]を[忘|わす]れないでください。 :: 비가 오니 우산을 잊지 마세요. :: It is raining, so please remember your umbrella.
[空|そら]に[大|おお]きな[虹|にじ]が[出|で]ています。 :: 하늘에 커다란 무지개가 떠 있어요. :: There is a large rainbow in the sky.
[庭|にわ]の[花|はな]に[毎日|まいにち][水|みず]をあげます。 :: 정원의 꽃에 매일 물을 줘요. :: I water the garden flowers every day.
[海|うみ]の[近|ちか]くに[住|す]んでみたいです。 :: 바다 근처에 살아 보고 싶어요. :: I would like to try living near the sea.
[夜|よる]になると[星|ほし]がよく[見|み]えます。 :: 밤이 되면 별이 잘 보여요. :: The stars are clearly visible at night.
[週末|しゅうまつ]に[家族|かぞく]と[映画|えいが]を[見|み]ました。 :: 주말에 가족과 영화를 봤어요. :: I watched a movie with my family over the weekend.
[妹|いもうと]は[絵|え]を[描|か]くことが[好|す]きです。 :: 여동생은 그림 그리기를 좋아해요. :: My younger sister likes drawing.
[祖母|そぼ]に[長|なが]い[手紙|てがみ]を[書|か]きました。 :: 할머니께 긴 편지를 썼어요. :: I wrote a long letter to my grandmother.
[友達|ともだち]の[誕生日|たんじょうび]に[花|はな]を[贈|おく]ります。 :: 친구 생일에 꽃을 선물해요. :: I give flowers to my friend for their birthday.
この[写真|しゃしん]は[去年|きょねん]の[夏|なつ]に[撮|と]りました。 :: 이 사진은 작년 여름에 찍었어요. :: I took this photo last summer.
[新|あたら]しい[言葉|ことば]を[五|いつ]つ[覚|おぼ]えました。 :: 새로운 단어 다섯 개를 외웠어요. :: I learned five new words.
[毎日|まいにち][少|すこ]しずつ[練習|れんしゅう]しています。 :: 매일 조금씩 연습하고 있어요. :: I practice a little every day.
[急|いそ]がずにゆっくり[入力|にゅうりょく]してください。 :: 서두르지 말고 천천히 입력해 주세요. :: Please type slowly without rushing.
[分|わ]からない[言葉|ことば]を[辞書|じしょ]で[調|しら]べます。 :: 모르는 단어를 사전에서 찾아봐요. :: I look up unfamiliar words in a dictionary.
[朝|あさ]ご[飯|はん]の[前|まえ]に[顔|かお]を[洗|あら]います。 :: 아침 식사 전에 세수해요. :: I wash my face before breakfast.
[寝|ね]る[前|まえ]に[少|すこ]し[本|ほん]を[読|よ]みます。 :: 자기 전에 책을 조금 읽어요. :: I read a little before going to bed.
[部屋|へや]を[片付|かたづ]けたら[気分|きぶん]がよくなりました。 :: 방을 정리하니 기분이 좋아졌어요. :: I felt better after tidying my room.
[駅|えき]まで[自転車|じてんしゃ]で[十分|じゅっぷん]かかります。 :: 역까지 자전거로 10분 걸려요. :: It takes ten minutes to cycle to the station.
[切符|きっぷ]は[入口|いりぐち]の[右側|みぎがわ]で[買|か]えます。 :: 표는 입구 오른쪽에서 살 수 있어요. :: You can buy tickets to the right of the entrance.
[荷物|にもつ]をここに[置|お]いてもいいですか。 :: 짐을 여기에 두어도 될까요? :: May I leave my luggage here?
もう[少|すこ]し[小|ちい]さいサイズはありますか。 :: 조금 더 작은 사이즈가 있나요? :: Do you have a slightly smaller size?
[温|あたた]かいお[飲|の]み[物|もの]はいかがですか。 :: 따뜻한 음료는 어떠세요? :: Would you like a warm drink?
お[会計|かいけい]は[一緒|いっしょ]にお[願|ねが]いします。 :: 계산은 함께 해 주세요. :: Please put everything on one bill.
[明日|あした]の[天気|てんき]を[調|しら]べておきます。 :: 내일 날씨를 미리 알아볼게요. :: I will check tomorrow's weather in advance.
[春|はる]になるとこの[道|みち]に[桜|さくら]が[咲|さ]きます。 :: 봄이 되면 이 길에 벚꽃이 피어요. :: Cherry blossoms bloom along this road in spring.
[夏|なつ]の[夕方|ゆうがた]は[川|かわ]の[風|かぜ]が[涼|すず]しいです。 :: 여름 저녁에는 강바람이 시원해요. :: The river breeze is cool on summer evenings.
[秋|あき]の[山|やま]を[歩|ある]くのが[楽|たの]しみです。 :: 가을 산을 걷는 것이 기대돼요. :: I look forward to walking in the autumn mountains.
[冬|ふゆ]は[温|あたた]かいスープが[飲|の]みたくなります。 :: 겨울에는 따뜻한 수프가 마시고 싶어져요. :: In winter, I feel like having warm soup.
[小|ちい]さな[猫|ねこ]が[椅子|いす]の[下|した]にいます。 :: 작은 고양이가 의자 아래에 있어요. :: A small cat is under the chair.
[犬|いぬ]と[一緒|いっしょ]に[近所|きんじょ]を[歩|ある]きました。 :: 개와 함께 동네를 걸었어요. :: I walked around the neighborhood with my dog.
[道|みち]に[迷|まよ]ったので[地図|ちず]を[開|ひら]きました。 :: 길을 잃어서 지도를 펼쳤어요. :: I opened a map because I got lost.
[会議|かいぎ]は[午後|ごご][二時|にじ]から[始|はじ]まります。 :: 회의는 오후 2시부터 시작해요. :: The meeting starts at two in the afternoon.
[明日|あした]はいつもより[早|はや]く[起|お]きます。 :: 내일은 평소보다 일찍 일어날 거예요. :: I will get up earlier than usual tomorrow.
[洗濯物|せんたくもの]を[外|そと]に[干|ほ]しました。 :: 빨래를 밖에 널었어요. :: I hung the laundry outside to dry.
[花屋|はなや]で[白|しろ]い[花|はな]を[選|えら]びました。 :: 꽃집에서 하얀 꽃을 골랐어요. :: I chose white flowers at the flower shop.
この[曲|きょく]を[聞|き]くと[元気|げんき]になります。 :: 이 곡을 들으면 기운이 나요. :: This song cheers me up.
[大切|たいせつ]なことを[紙|かみ]に[書|か]いておきます。 :: 중요한 것을 종이에 적어 둘게요. :: I will write down the important things on paper.
[今日|きょう]の[練習|れんしゅう]はここまでにしましょう。 :: 오늘 연습은 여기까지 해요. :: Let's finish today's practice here.
`,
  long: `
[朝|あさ]、[窓|まど]を[開|あ]けると[涼|すず]しい[風|かぜ]が[入|はい]ってきて、[気持|きも]ちよく[一日|いちにち]を[始|はじ]められました。 :: 아침에 창문을 열자 시원한 바람이 들어와 기분 좋게 하루를 시작할 수 있었어요. :: When I opened the window in the morning, a cool breeze came in and helped me start the day feeling refreshed.
[駅|えき]までの[道|みち]に[新|あたら]しいパン[屋|や]ができたので、[仕事|しごと]の[帰|かえ]りに[寄|よ]ってみようと[思|おも]います。 :: 역까지 가는 길에 새 빵집이 생겨서 퇴근길에 들러 보려고 해요. :: A new bakery opened on the way to the station, so I plan to stop by after work.
[週末|しゅうまつ]は[天気|てんき]がよさそうなので、お[弁当|べんとう]を[作|つく]って[家族|かぞく]と[近|ちか]くの[公園|こうえん]へ[行|い]く[予定|よてい]です。 :: 주말에는 날씨가 좋을 것 같아서 도시락을 만들어 가족과 근처 공원에 갈 예정이에요. :: The weather looks nice for the weekend, so I plan to make lunch and visit a nearby park with my family.
[日本語|にほんご]の[勉強|べんきょう]を[始|はじ]めてから、[毎日|まいにち][少|すこ]しずつでも[続|つづ]けることが[大切|たいせつ]だと[感|かん]じています。 :: 일본어 공부를 시작한 후 매일 조금씩이라도 계속하는 것이 중요하다고 느끼고 있어요. :: Since I started studying Japanese, I have felt that continuing a little every day is important.
[図書館|としょかん]で[借|か]りた[本|ほん]が[面白|おもしろ]くて、[時間|じかん]を[忘|わす]れて[夜|よる][遅|おそ]くまで[読|よ]んでしまいました。 :: 도서관에서 빌린 책이 재미있어서 시간 가는 줄 모르고 밤늦게까지 읽어 버렸어요. :: The book I borrowed was so interesting that I lost track of time and read late into the night.
[雨|あめ]がやんだ[後|あと]の[公園|こうえん]では、[木|き]の[葉|は]に[残|のこ]った[水滴|すいてき]が[光|ひかり]を[受|う]けて[輝|かがや]いていました。 :: 비가 그친 뒤 공원에서는 나뭇잎에 남은 물방울이 빛을 받아 반짝이고 있었어요. :: After the rain stopped, droplets on the park's leaves were sparkling in the light.
[初|はじ]めて[作|つく]った[料理|りょうり]は[少|すこ]し[辛|から]すぎましたが、[友達|ともだち]は[美味|おい]しいと[言|い]って[食|た]べてくれました。 :: 처음 만든 요리는 조금 너무 매웠지만 친구는 맛있다고 하며 먹어 주었어요. :: My first attempt at the dish was a little too spicy, but my friend enjoyed it and said it was good.
[旅行|りょこう]の[前|まえ]に[行|い]きたい[場所|ばしょ]を[地図|ちず]で[調|しら]べておくと、[限|かぎ]られた[時間|じかん]を[上手|じょうず]に[使|つか]えます。 :: 여행 전에 가고 싶은 장소를 지도에서 알아두면 한정된 시간을 잘 쓸 수 있어요. :: Looking up places on a map before a trip helps you make good use of limited time.
[新|あたら]しい[靴|くつ]はまだ[足|あし]に[慣|な]れていないので、[今日|きょう]は[短|みじか]い[距離|きょり]だけ[歩|ある]くことにしました。 :: 새 신발이 아직 발에 익숙하지 않아서 오늘은 짧은 거리만 걷기로 했어요. :: My feet are not used to my new shoes yet, so I decided to walk only a short distance today.
[忙|いそが]しい[日|ひ]でも、[寝|ね]る[前|まえ]に[温|あたた]かいお[茶|ちゃ]を[飲|の]みながら[静|しず]かに[過|す]ごす[時間|じかん]を[作|つく]っています。 :: 바쁜 날에도 자기 전에 따뜻한 차를 마시며 조용히 보내는 시간을 만들고 있어요. :: Even on busy days, I make time to relax quietly with warm tea before bed.
[道|みち]に[迷|まよ]って[困|こま]っていたとき、[近|ちか]くの[店|みせ]の[人|ひと]が[駅|えき]までの[行|い]き[方|かた]を[丁寧|ていねい]に[教|おし]えてくれました。 :: 길을 잃어 난감했을 때 근처 가게 사람이 역까지 가는 길을 친절하게 알려 주었어요. :: When I was lost, someone from a nearby shop kindly explained how to get to the station.
[久|ひさ]しぶりに[会|あ]った[友達|ともだち]と[喫茶店|きっさてん]で[話|はな]していたら、いつの[間|ま]にか[夕方|ゆうがた]になっていました。 :: 오랜만에 만난 친구와 카페에서 이야기하다 보니 어느새 저녁이 되어 있었어요. :: While talking with a friend I had not seen in a while at a café, the afternoon slipped away.
[朝|あさ]の[電車|でんしゃ]は[混|こ]んでいることが[多|おお]いので、いつもより[早|はや]い[時間|じかん]に[家|いえ]を[出|で]るようにしています。 :: 아침 전철은 붐비는 경우가 많아 평소보다 이른 시간에 집을 나서려고 하고 있어요. :: Morning trains are often crowded, so I try to leave home earlier than usual.
[冷蔵庫|れいぞうこ]に[残|のこ]っていた[野菜|やさい]を[小|ちい]さく[切|き]って、[体|からだ]が[温|あたた]まるスープを[作|つく]りました。 :: 냉장고에 남아 있던 채소를 잘게 썰어 몸이 따뜻해지는 수프를 만들었어요. :: I chopped the leftover vegetables in the fridge and made a warming soup.
[毎日|まいにち][同|おな]じ[道|みち]を[歩|ある]いていても、[季節|きせつ]が[変|か]わるたびに[新|あたら]しい[景色|けしき]に[出会|であ]えます。 :: 매일 같은 길을 걸어도 계절이 바뀔 때마다 새로운 풍경을 만날 수 있어요. :: Even along the same daily route, each change of season brings new scenery.
[妹|いもうと]が[誕生日|たんじょうび]にくれた[手作|てづく]りの[小|ちい]さな[鞄|かばん]を、[今|いま]でも[大切|たいせつ]に[使|つか]っています。 :: 여동생이 생일에 준 작은 수제 가방을 지금도 소중히 쓰고 있어요. :: I still treasure and use the small handmade bag my sister gave me for my birthday.
[昨日|きのう]は[遅|おそ]くまで[起|お]きていたので、[今日|きょう]は[早|はや]めに[仕事|しごと]を[終|お]えてゆっくり[休|やす]みたいです。 :: 어제 늦게까지 깨어 있어서 오늘은 일찍 일을 마치고 푹 쉬고 싶어요. :: I stayed up late yesterday, so I would like to finish work early and get some rest today.
[駅|えき]の[近|ちか]くにある[小|ちい]さな[花屋|はなや]には、[季節|きせつ]の[花|はな]がいつもきれいに[並|なら]んでいます。 :: 역 근처 작은 꽃집에는 계절의 꽃이 언제나 예쁘게 진열되어 있어요. :: The little flower shop near the station always has a beautiful display of seasonal flowers.
[忘|わす]れないうちに[今日|きょう]あったことを[日記|にっき]に[書|か]いてから、[明日|あした]の[準備|じゅんび]をするつもりです。 :: 잊기 전에 오늘 있었던 일을 일기에 쓰고 나서 내일 준비를 할 생각이에요. :: I plan to write about today in my diary before I forget, then prepare for tomorrow.
[写真|しゃしん]を[見返|みかえ]していると、[旅先|たびさき]で[食|た]べた[料理|りょうり]や[出会|であ]った[人|ひと]のことを[思|おも]い[出|だ]します。 :: 사진을 다시 보다 보면 여행지에서 먹은 요리나 만난 사람들이 떠올라요. :: Looking back through photos reminds me of the food and people I encountered on my travels.
[暑|あつ]い[日|ひ]が[続|つづ]いているので、[外|そと]を[歩|ある]くときは[水|みず]を[持|も]って[日陰|ひかげ]で[休|やす]むようにしています。 :: 더운 날이 이어져서 밖을 걸을 때는 물을 챙기고 그늘에서 쉬려고 하고 있어요. :: With the continuing heat, I carry water and take breaks in the shade when walking outside.
[読|よ]めなかった[漢字|かんじ]が[少|すこ]しずつ[読|よ]めるようになってきて、[日本語|にほんご]の[勉強|べんきょう]が[前|まえ]より[楽|たの]しくなりました。 :: 읽지 못하던 한자가 조금씩 읽히기 시작해 일본어 공부가 전보다 즐거워졌어요. :: As I gradually learn to read unfamiliar kanji, studying Japanese has become more enjoyable.
[週末|しゅうまつ]の[朝|あさ]は[目覚|めざ]ましをかけずに[起|お]きて、[好|す]きな[音楽|おんがく]を[聞|き]きながら[朝食|ちょうしょく]を[作|つく]ります。 :: 주말 아침에는 알람 없이 일어나 좋아하는 음악을 들으며 아침을 만들어요. :: On weekend mornings, I wake without an alarm and make breakfast while listening to music I like.
[公園|こうえん]の[大|おお]きな[木|き]の[下|した]に[座|すわ]って[本|ほん]を[読|よ]んでいると、[遠|とお]くから[子供|こども]たちの[声|こえ]が[聞|き]こえてきました。 :: 공원의 큰 나무 아래 앉아 책을 읽고 있는데 멀리서 아이들의 목소리가 들려왔어요. :: As I read beneath a large tree in the park, I could hear children's voices in the distance.
[買|か]い[物|もの]に[行|い]く[前|まえ]に[必要|ひつよう]なものを[紙|かみ]に[書|か]いておくと、[買|か]い[忘|わす]れが[少|すく]なくなります。 :: 장 보러 가기 전에 필요한 것을 종이에 적어 두면 빠뜨리는 일이 줄어들어요. :: Writing down what I need before shopping helps me forget fewer things.
[初|はじ]めは[難|むずか]しく[感|かん]じたフリック[入力|にゅうりょく]も、[毎日|まいにち][練習|れんしゅう]しているうちに[少|すこ]しずつ[慣|な]れてきました。 :: 처음에는 어렵게 느껴지던 플릭 입력도 매일 연습하다 보니 조금씩 익숙해졌어요. :: Flick typing felt difficult at first, but daily practice has gradually made it more familiar.
[夕方|ゆうがた]、[川沿|かわぞ]いを[歩|ある]いていると、[水面|すいめん]に[映|うつ]った[空|そら]がゆっくり[赤|あか]く[染|そ]まっていきました。 :: 저녁에 강변을 걷고 있는데 수면에 비친 하늘이 천천히 붉게 물들었어요. :: While I walked along the river in the evening, the sky reflected on the water slowly turned red.
[友達|ともだち]に[勧|すす]められた[映画|えいが]を[見|み]たらとても[面白|おもしろ]かったので、[今度|こんど]は[一緒|いっしょ]に[映画館|えいがかん]へ[行|い]きたいです。 :: 친구가 추천한 영화를 보니 정말 재미있어서 다음에는 함께 영화관에 가고 싶어요. :: I enjoyed the movie my friend recommended, so next time I would like to go to the cinema together.
[部屋|へや]の[模様替|もようが]えをして[机|つくえ]を[窓|まど]の[近|ちか]くに[動|うご]かしたら、[勉強|べんきょう]する[時間|じかん]が[少|すこ]し[楽|たの]しみになりました。 :: 방의 배치를 바꾸고 책상을 창가로 옮기니 공부 시간이 조금 기대되기 시작했어요. :: After rearranging my room and moving the desk near the window, I began to look forward to studying a little more.
[朝|あさ]から[降|ふ]っていた[雨|あめ]が[午後|ごご]にはやんだので、[傘|かさ]を[置|お]いて[近|ちか]くの[本屋|ほんや]まで[散歩|さんぽ]しました。 :: 아침부터 내리던 비가 오후에는 그쳐서 우산을 두고 근처 서점까지 산책했어요. :: The morning rain stopped in the afternoon, so I left my umbrella and walked to a nearby bookstore.
[旅行|りょこう]で[使|つか]う[荷物|にもつ]を[減|へ]らすために、[本当|ほんとう]に[必要|ひつよう]なものだけを[小|ちい]さな[鞄|かばん]に[入|い]れました。 :: 여행 짐을 줄이려고 정말 필요한 것만 작은 가방에 넣었어요. :: To travel lighter, I packed only what I really needed in a small bag.
[祖父|そふ]の[家|いえ]を[訪|たず]ねると、いつも[庭|にわ]で[育|そだ]てた[野菜|やさい]を[使|つか]った[料理|りょうり]をごちそうしてくれます。 :: 할아버지 댁에 가면 언제나 정원에서 기른 채소로 만든 요리를 대접해 주세요. :: Whenever I visit my grandfather, he treats me to dishes made with vegetables from his garden.
[道|みち]の[途中|とちゅう]で[見|み]つけた[小|ちい]さな[喫茶店|きっさてん]は、[静|しず]かに[本|ほん]を[読|よ]むのにちょうどいい[場所|ばしょ]でした。 :: 길에서 발견한 작은 카페는 조용히 책 읽기에 딱 좋은 곳이었어요. :: The small café I found along the way was just right for reading quietly.
[新|あたら]しいことを[始|はじ]めるときは、[大|おお]きな[目標|もくひょう]よりも[今日|きょう]できる[小|ちい]さな[一歩|いっぽ]を[考|かんが]えるようにしています。 :: 새로운 일을 시작할 때는 큰 목표보다 오늘 할 수 있는 작은 한 걸음을 생각하려고 해요. :: When starting something new, I try to think about one small step I can take today rather than a big goal.
[電車|でんしゃ]の[窓|まど]から[見|み]える[景色|けしき]を[眺|なが]めているうちに、[目的地|もくてきち]の[駅|えき]に[着|つ]いていました。 :: 전철 창밖의 풍경을 바라보다 보니 목적지 역에 도착해 있었어요. :: While I was gazing at the scenery through the train window, we arrived at my destination.
[寒|さむ]い[朝|あさ]に[温|あたた]かい[味噌汁|みそしる]を[飲|の]むと、[体|からだ]だけでなく[気持|きも]ちまでほっと[落|お]ち[着|つ]きます。 :: 추운 아침에 따뜻한 된장국을 마시면 몸뿐 아니라 마음까지 편안해져요. :: A warm bowl of miso soup on a cold morning soothes both my body and my mind.
[家|いえ]の[鍵|かぎ]が[見|み]つからなくて[探|さが]していたら、[昨日|きのう][着|き]ていた[上着|うわぎ]のポケットに[入|はい]っていました。 :: 집 열쇠가 보이지 않아 찾고 있었는데 어제 입었던 겉옷 주머니에 들어 있었어요. :: I could not find my house key until I checked the pocket of the jacket I wore yesterday.
[雨|あめ]の[日|ひ]は[外|そと]に[出|で]かける[代|か]わりに、[部屋|へや]で[音楽|おんがく]を[聞|き]いたり[新|あたら]しい[料理|りょうり]を[作|つく]ったりします。 :: 비 오는 날에는 외출하는 대신 방에서 음악을 듣거나 새로운 요리를 만들어요. :: On rainy days, I stay in, listen to music, or try cooking something new.
[忙|いそが]しくて[運動|うんどう]する[時間|じかん]が[取|と]れない[日|ひ]は、[一|ひと]つ[手前|てまえ]の[駅|えき]で[降|お]りて[歩|ある]くようにしています。 :: 바빠서 운동할 시간이 없는 날에는 한 정거장 전에 내려 걸으려고 해요. :: On days when I am too busy to exercise, I try getting off one stop early and walking.
[遠|とお]くに[住|す]んでいる[友達|ともだち]から[手紙|てがみ]が[届|とど]いて、[久|ひさ]しぶりに[声|こえ]が[聞|き]きたくなりました。 :: 멀리 사는 친구에게서 편지가 와서 오랜만에 목소리가 듣고 싶어졌어요. :: A letter from a friend who lives far away made me want to hear their voice again.
[春|はる]の[朝|あさ]は[少|すこ]し[早|はや]く[起|お]きて、[鳥|とり]の[声|こえ]を[聞|き]きながら[近所|きんじょ]をゆっくり[歩|ある]くのが[好|す]きです。 :: 봄 아침에는 조금 일찍 일어나 새소리를 들으며 동네를 천천히 걷는 것을 좋아해요. :: On spring mornings, I like getting up a little early and strolling around the neighborhood to birdsong.
[初|はじ]めて[訪|おとず]れた[町|まち]でしたが、[親切|しんせつ]な[人|ひと]たちのおかげで[安心|あんしん]して[旅行|りょこう]を[楽|たの]しめました。 :: 처음 방문한 동네였지만 친절한 사람들 덕분에 안심하고 여행을 즐길 수 있었어요. :: Although it was my first visit to the town, the kind people helped me feel at ease and enjoy my trip.
[好|す]きな[言葉|ことば]を[手帳|てちょう]に[書|か]き[留|と]めておいて、[疲|つか]れたときに[読|よ]み[返|かえ]すのが[小|ちい]さな[習慣|しゅうかん]です。 :: 좋아하는 말을 수첩에 적어 두었다가 지칠 때 다시 읽는 것이 작은 습관이에요. :: I have a small habit of noting down words I like and reading them again when I feel tired.
[公園|こうえん]で[拾|ひろ]った[赤|あか]い[葉|は]を[本|ほん]に[挟|はさ]んでおいたら、[秋|あき]の[散歩|さんぽ]の[思|おも]い[出|で]が[残|のこ]りました。 :: 공원에서 주운 빨간 잎을 책에 끼워 두었더니 가을 산책의 추억이 남았어요. :: Pressing a red leaf I found in the park inside a book preserved a memory of my autumn walk.
[今日|きょう]は[昨日|きのう]より[少|すこ]しだけ[速|はや]く[入力|にゅうりょく]できたので、[明日|あした]も[無理|むり]のないペースで[練習|れんしゅう]を[続|つづ]けたいです。 :: 오늘은 어제보다 조금 더 빨리 입력할 수 있어서 내일도 무리 없는 속도로 연습을 계속하고 싶어요. :: I typed a little faster today than yesterday, so I want to keep practicing at a comfortable pace tomorrow.
`,
};

export const sentences: PracticeItem[] = Object.entries(groups).flatMap(([length, source]) =>
  source
    .trim()
    .split('\n')
    .map((row, index) => {
      const [text, ko, en] = row.trim().split(' :: ');
      return {
        id: `sentence-${length}-${index}`,
        mode: 'sentence' as const,
        category: '일상 문장',
        length: length as SentenceLength,
        segments: parseRuby(text),
        ko,
        en,
      };
    }),
);
