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
すみません。 :: 실례합니다·죄송합니다. :: Excuse me; I am sorry.
どういたしまして。 :: 천만에요. :: You are welcome.
[失礼|しつれい]します。 :: 실례하겠습니다. :: Excuse me.
お[先|さき]にどうぞ。 :: 먼저 하세요. :: After you.
[気|き]をつけて。 :: 조심하세요. :: Take care.
いただいてもいいですか。 :: 받아도 될까요? :: May I have it?
お[待|ま]たせしました。 :: 기다리게 했네요. :: Thank you for waiting.
よろしくお[願|ねが]いします。 :: 잘 부탁드립니다. :: I look forward to working with you.
ただいま。 :: 다녀왔어요. :: I am home.
おかえりなさい。 :: 잘 다녀왔어요? :: Welcome home.
いってきます。 :: 다녀오겠습니다. :: I am heading out.
いってらっしゃい。 :: 잘 다녀오세요. :: Have a good day out.
こちらこそ。 :: 저야말로요. :: Likewise.
おめでとうございます。 :: 축하합니다. :: Congratulations.
それはよかったです。 :: 그것 참 다행이네요. :: I am glad to hear that.
[少|すこ]し[考|かんが]えます。 :: 조금 생각해 볼게요. :: I will think about it a little.
[今|いま]は[忙|いそが]しいです。 :: 지금은 바빠요. :: I am busy right now.
よく[分|わ]かりました。 :: 잘 이해했어요. :: I understand now.
まだ[分|わ]かりません。 :: 아직 모르겠어요. :: I do not understand yet.
お[手伝|てつだ]いします。 :: 도와드릴게요. :: I will help you.
[携帯|けいたい]を[充電|じゅうでん]します。 :: 휴대전화를 충전해요. :: I charge my phone.
バスに[乗|の]ります。 :: 버스를 타요. :: I take the bus.
[次|つぎ]で[降|お]ります。 :: 다음 정거장에서 내려요. :: I get off at the next stop.
[財布|さいふ]を[探|さが]しています。 :: 지갑을 찾고 있어요. :: I am looking for my wallet.
[鍵|かぎ]が[見|み]つかりました。 :: 열쇠를 찾았어요. :: I found my key.
[帽子|ぼうし]をかぶります。 :: 모자를 써요. :: I put on a hat.
[上着|うわぎ]を[着|き]ます。 :: 겉옷을 입어요. :: I put on a jacket.
[鞄|かばん]を[持|も]ってください。 :: 가방을 들어 주세요. :: Please hold the bag.
[宿題|しゅくだい]が[終|お]わりました。 :: 숙제가 끝났어요. :: I finished my homework.
[今日|きょう]は[休|やす]みです。 :: 오늘은 쉬는 날이에요. :: Today is my day off.
[二人|ふたり]で[行|い]きます。 :: 둘이서 갈게요. :: The two of us will go.
ここで[待|ま]ちます。 :: 여기에서 기다릴게요. :: I will wait here.
[少|すこ]し[眠|ねむ]いです。 :: 조금 졸려요. :: I am a little sleepy.
お[湯|ゆ]が[沸|わ]きました。 :: 물이 끓었어요. :: The water has boiled.
[花|はな]を[飾|かざ]ります。 :: 꽃을 장식해요. :: I arrange some flowers.
[音|おと]を[小|ちい]さくします。 :: 소리를 줄일게요. :: I will turn the sound down.
[風邪|かぜ]をひきました。 :: 감기에 걸렸어요. :: I caught a cold.
[予約|よやく]を[変|か]えたいです。 :: 예약을 바꾸고 싶어요. :: I would like to change my reservation.
[写真|しゃしん]を[送|おく]ります。 :: 사진을 보낼게요. :: I will send a photo.
いい[一日|いちにち]でした。 :: 좋은 하루였어요. :: It was a good day.
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
[空港|くうこう]まではこのバスで[行|い]けますか。 :: 공항까지 이 버스로 갈 수 있나요? :: Can I get to the airport on this bus?
[改札|かいさつ]を[出|で]たら[右|みぎ]に[進|すす]んでください。 :: 개찰구를 나오면 오른쪽으로 가 주세요. :: Please go right after leaving the ticket gate.
[新幹線|しんかんせん]の[窓側|まどがわ]の[席|せき]を[予約|よやく]しました。 :: 신칸센의 창가 좌석을 예약했어요. :: I reserved a window seat on the bullet train.
[次|つぎ]の[駅|えき]で[地下鉄|ちかてつ]に[乗|の]り[換|か]えます。 :: 다음 역에서 지하철로 갈아타요. :: I transfer to the subway at the next station.
[片道|かたみち]の[切符|きっぷ]を[一枚|いちまい]お[願|ねが]いします。 :: 편도표 한 장 주세요. :: One single ticket, please.
[荷物|にもつ]を[預|あず]けられる[場所|ばしょ]はありますか。 :: 짐을 맡길 수 있는 곳이 있나요? :: Is there somewhere I can leave my luggage?
[横断歩道|おうだんほどう]を[渡|わた]ってから[左|ひだり]に[曲|ま]がります。 :: 횡단보도를 건넌 뒤 왼쪽으로 돌아요. :: I cross the crosswalk and then turn left.
[近|ちか]くの[薬局|やっきょく]は[何時|なんじ]まで[開|あ]いていますか。 :: 근처 약국은 몇 시까지 여나요? :: Until what time is the nearby pharmacy open?
この[料理|りょうり]には[卵|たまご]が[入|はい]っていますか。 :: 이 요리에는 달걀이 들어 있나요? :: Does this dish contain egg?
お[肉|にく]の[代|か]わりに[豆腐|とうふ]を[使|つか]いました。 :: 고기 대신 두부를 사용했어요. :: I used tofu instead of meat.
[紅茶|こうちゃ]には[砂糖|さとう]を[入|い]れないでください。 :: 홍차에는 설탕을 넣지 말아 주세요. :: Please do not put sugar in the tea.
[温|あたた]かいうちに[食|た]べてください。 :: 따뜻할 때 드세요. :: Please eat it while it is warm.
[夕食|ゆうしょく]の[材料|ざいりょう]をスーパーで[買|か]ってきます。 :: 저녁 재료를 슈퍼에서 사 올게요. :: I will get ingredients for dinner at the supermarket.
[冷|つめ]たい[飲|の]み[物|もの]を[二|ふた]つください。 :: 차가운 음료 두 개 주세요. :: Two cold drinks, please.
このスープは[生姜|しょうが]の[香|かお]りがします。 :: 이 수프에서는 생강 향이 나요. :: This soup smells of ginger.
[好|す]きな[漫画|まんが]の[新|あたら]しい[巻|かん]を[買|か]いました。 :: 좋아하는 만화의 새 권을 샀어요. :: I bought the latest volume of my favorite manga.
[明日|あした]の[授業|じゅぎょう]までに[宿題|しゅくだい]を[出|だ]します。 :: 내일 수업 전까지 숙제를 낼게요. :: I will submit my homework before tomorrow's class.
[黒板|こくばん]の[文字|もじ]が[小|ちい]さくて[読|よ]めません。 :: 칠판의 글자가 작아서 읽을 수 없어요. :: The writing on the board is too small for me to read.
[試験|しけん]の[前|まえ]に[教科書|きょうかしょ]を[読|よ]み[直|なお]します。 :: 시험 전에 교과서를 다시 읽어요. :: I reread my textbook before the exam.
[質問|しつもん]があれば[手|て]を[挙|あ]げてください。 :: 질문이 있으면 손을 들어 주세요. :: Please raise your hand if you have a question.
[同僚|どうりょう]と[昼休|ひるやす]みに[散歩|さんぽ]をしました。 :: 동료와 점심시간에 산책했어요. :: I took a walk with a coworker during lunch break.
[会議|かいぎ]の[場所|ばしょ]が[変|か]わったと[聞|き]きました。 :: 회의 장소가 바뀌었다고 들었어요. :: I heard that the meeting location has changed.
[午後|ごご]は[家|いえ]で[仕事|しごと]をする[予定|よてい]です。 :: 오후에는 집에서 일할 예정이에요. :: I plan to work from home this afternoon.
[書類|しょるい]を[確認|かくにん]してから[返事|へんじ]をします。 :: 서류를 확인한 뒤 답변할게요. :: I will reply after checking the documents.
[分|わ]からないところを[先輩|せんぱい]に[聞|き]きました。 :: 모르는 부분을 선배에게 물었어요. :: I asked a senior colleague about the part I did not understand.
[充電器|じゅうでんき]を[持|も]ってくるのを[忘|わす]れました。 :: 충전기를 가져오는 것을 잊었어요. :: I forgot to bring my charger.
[電話|でんわ]の[音|おと]が[聞|き]こえにくいです。 :: 전화 소리가 잘 들리지 않아요. :: I am having trouble hearing the call.
[新|あたら]しい[住所|じゅうしょ]を[教|おし]えてもらえますか。 :: 새 주소를 알려 주실 수 있나요? :: Could you tell me your new address?
[出|で]かける[前|まえ]に[電池|でんち]を[交換|こうかん]しました。 :: 외출하기 전에 건전지를 교체했어요. :: I changed the batteries before going out.
[暑|あつ]くなったので[扇風機|せんぷうき]を[出|だ]しました。 :: 더워져서 선풍기를 꺼냈어요. :: I took out the fan because the weather got hot.
[洗面所|せんめんじょ]に[新|あたら]しいタオルを[置|お]きました。 :: 세면실에 새 수건을 놓았어요. :: I put fresh towels in the washroom.
[食器|しょっき]を[洗|あら]って[棚|たな]に[戻|もど]します。 :: 식기를 씻어 선반에 돌려놓아요. :: I wash the dishes and put them back on the shelf.
[玄関|げんかん]に[届|とど]いた[箱|はこ]を[運|はこ]びます。 :: 현관에 도착한 상자를 옮길게요. :: I will carry in the box that arrived at the entrance.
[冷房|れいぼう]が[強|つよ]いので[上着|うわぎ]を[着|き]ます。 :: 냉방이 세서 겉옷을 입어요. :: I put on a jacket because the air conditioning is strong.
[月曜日|げつようび]から[新|あたら]しい[仕事|しごと]が[始|はじ]まります。 :: 월요일부터 새 일이 시작돼요. :: My new job starts on Monday.
[来月|らいげつ]の[連休|れんきゅう]に[実家|じっか]へ[帰|かえ]ります。 :: 다음 달 연휴에 본가로 돌아가요. :: I am going back to my family home during next month's holidays.
[午後|ごご]から[雨|あめ]になるそうです。 :: 오후부터 비가 온다고 해요. :: I heard it will rain from the afternoon.
[夕焼|ゆうや]けを[見|み]るために[海辺|うみべ]へ[行|い]きました。 :: 저녁노을을 보려고 바닷가에 갔어요. :: I went to the seaside to watch the sunset glow.
[満月|まんげつ]の[夜|よる]は[道|みち]が[明|あか]るく[見|み]えます。 :: 보름달이 뜬 밤에는 길이 밝아 보여요. :: The path looks brighter on a full-moon night.
[庭|にわ]の[向日葵|ひまわり]が[高|たか]く[育|そだ]ちました。 :: 정원의 해바라기가 높이 자랐어요. :: The sunflowers in the garden grew tall.
[池|いけ]の[鯉|こい]がゆっくり[泳|およ]いでいます。 :: 연못의 잉어가 천천히 헤엄치고 있어요. :: The carp in the pond are swimming slowly.
[春|はる]になると[燕|つばめ]が[戻|もど]ってきます。 :: 봄이 되면 제비가 돌아와요. :: The swallows return in spring.
[公園|こうえん]で[双子|ふたご]の[子供|こども]たちに[会|あ]いました。 :: 공원에서 쌍둥이 아이들을 만났어요. :: I met twin children in the park.
[週末|しゅうまつ]に[親戚|しんせき]が[遊|あそ]びに[来|き]ます。 :: 주말에 친척이 놀러 와요. :: My relatives are coming to visit this weekend.
[明後日|あさって]までに[予定|よてい]を[決|き]めましょう。 :: 모레까지 일정을 정해요. :: Let's decide on our plans by the day after tomorrow.
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
[朝|あさ]から[雨|あめ]が[降|ふ]っていたので、[出|で]かける[予定|よてい]を[変|か]えて[家|いえ]でゆっくりコーヒーを[飲|の]みました。 :: 아침부터 비가 와서 외출 계획을 바꾸고 집에서 천천히 커피를 마셨어요. :: It had been raining since morning, so I changed my plans and enjoyed a slow coffee at home.
[買|か]い[物|もの]のときに[袋|ふくろ]をもらわなくてすむように、[鞄|かばん]にはいつも[小|ちい]さな[布|ぬの]の[袋|ふくろ]を[入|い]れています。 :: 장을 볼 때 봉투를 받지 않아도 되도록 가방에 늘 작은 천 가방을 넣어 다녀요. :: I always carry a small cloth bag so I do not need to ask for a shopping bag.
[久|ひさ]しぶりにプールで[泳|およ]いだら[思|おも]ったより[疲|つか]れたので、[帰|かえ]りはバスに[乗|の]ることにしました。 :: 오랜만에 수영장에서 수영하니 생각보다 피곤해서 돌아올 때는 버스를 타기로 했어요. :: Swimming for the first time in a while was more tiring than expected, so I took the bus home.
[新|あたら]しい[職場|しょくば]ではまだ[名前|なまえ]を[覚|おぼ]えていない[人|ひと]が[多|おお]いので、[会|あ]うたびに[挨拶|あいさつ]をするようにしています。 :: 새 직장에서는 아직 이름을 못 외운 사람이 많아서 만날 때마다 인사하려고 해요. :: I have not learned many names at my new workplace yet, so I make a point of greeting people.
[空港|くうこう]で[切符|きっぷ]が[見|み]つからず[慌|あわ]てましたが、[鞄|かばん]の[小|ちい]さなポケットに[入|い]れてあったことを[思|おも]い[出|だ]しました。 :: 공항에서 표가 보이지 않아 당황했지만 가방의 작은 주머니에 넣어 둔 것이 생각났어요. :: I panicked when I could not find my ticket at the airport, then remembered putting it in a small pocket.
[旅館|りょかん]の[人|ひと]に[静|しず]かな[部屋|へや]をお[願|ねが]いしたら、[庭|にわ]が[見|み]える[奥|おく]の[部屋|へや]に[案内|あんない]してくれました。 :: 여관 직원에게 조용한 방을 부탁하니 정원이 보이는 안쪽 방으로 안내해 주었어요. :: When I asked for a quiet room at the inn, the staff showed me a room at the back overlooking the garden.
[野菜|やさい]が[苦手|にがて]な[弟|おとうと]も、[細|こま]かく[切|き]ってスープに[入|い]れると[最後|さいご]まで[食|た]べてくれることがあります。 :: 채소를 싫어하는 남동생도 잘게 썰어 수프에 넣으면 끝까지 먹어 주는 때가 있어요. :: Even my brother, who dislikes vegetables, sometimes finishes them when I chop them into soup.
[友達|ともだち]に[渡|わた]すクッキーを[焼|や]いたのですが、[形|かたち]が[少|すこ]し[不揃|ふぞろ]いになったので[一緒|いっしょ]に[笑|わら]ってしまいました。 :: 친구에게 줄 쿠키를 구웠는데 모양이 조금 들쑥날쑥해져서 함께 웃어 버렸어요. :: I baked cookies for a friend, but their uneven shapes made us both laugh.
[美術館|びじゅつかん]では[全部|ぜんぶ]の[作品|さくひん]を[急|いそ]いで[見|み]るよりも、[気|き]になった[絵|え]の[前|まえ]でゆっくり[過|す]ごすのが[好|す]きです。 :: 미술관에서는 모든 작품을 급히 보기보다 마음이 가는 그림 앞에서 천천히 시간을 보내는 것을 좋아해요. :: At art museums, I prefer spending time with paintings that catch my attention to rushing through every work.
[図書館|としょかん]の[本|ほん]を[返|かえ]す[日|ひ]を[忘|わす]れないように、[借|か]りたらすぐに[手帳|てちょう]に[日付|ひづけ]を[書|か]くことにしています。 :: 도서관 책 반납일을 잊지 않으려고 빌리자마자 수첩에 날짜를 적기로 하고 있어요. :: To remember library due dates, I write them in my planner as soon as I borrow a book.
[妹|いもうと]が[一人|ひとり]で[自転車|じてんしゃ]に[乗|の]れるようになったので、[休日|きゅうじつ]に[家族|かぞく]で[川沿|かわぞ]いの[道|みち]を[走|はし]りました。 :: 여동생이 혼자 자전거를 탈 수 있게 되어 휴일에 가족과 강변 길을 달렸어요. :: Now that my sister can ride a bicycle on her own, we cycled along the river as a family on a day off.
[春|はる]にまいた[種|たね]から[小|ちい]さな[芽|め]が[出|で]たので、[毎朝|まいあさ][水|みず]をあげるのが[前|まえ]より[楽|たの]しみになりました。 :: 봄에 뿌린 씨앗에서 작은 싹이 나서 매일 아침 물 주는 일이 전보다 기대돼요. :: Tiny shoots appeared from the seeds I sowed in spring, making me look forward to watering them each morning.
[夏|なつ]の[散歩|さんぽ]には[冷|つめ]たい[水|みず]を[入|い]れた[水筒|すいとう]を[持|も]って、[途中|とちゅう]で[木陰|こかげ]のベンチに[座|すわ]って[休|やす]みます。 :: 여름 산책에는 찬물을 담은 물병을 가지고 가서 도중에 나무 그늘 벤치에 앉아 쉬어요. :: On summer walks, I carry a bottle of cold water and stop to rest on a bench in the shade.
[秋|あき]の[市場|いちば]で[栗|くり]を[見|み]つけたので、[祖母|そぼ]に[電話|でんわ]をして[美味|おい]しい[茹|ゆ]で[方|かた]を[教|おし]えてもらいました。 :: 가을 시장에서 밤을 발견해 할머니께 전화해서 맛있게 삶는 법을 배웠어요. :: I found chestnuts at the autumn market and called my grandmother to learn how to boil them well.
[冬|ふゆ]の[朝|あさ]に[手袋|てぶくろ]を[忘|わす]れて[家|いえ]を[出|で]たので、[駅|えき]に[着|つ]くまで[手|て]をポケットに[入|い]れていました。 :: 겨울 아침에 장갑을 잊고 나와서 역에 도착할 때까지 손을 주머니에 넣고 있었어요. :: I left home without my gloves on a winter morning and kept my hands in my pockets until I reached the station.
[雪|ゆき]が[積|つ]もった[道|みち]を[犬|いぬ]と[歩|ある]くと、[真|ま]っ[白|しろ]な[地面|じめん]に[大|おお]きさの[違|ちが]う[足跡|あしあと]が[並|なら]びました。 :: 눈이 쌓인 길을 개와 걸으니 새하얀 땅에 크기가 다른 발자국이 나란히 남았어요. :: Walking my dog along a snowy path left two different sizes of footprints side by side on the white ground.
[来週|らいしゅう][友達|ともだち]が[泊|と]まりに[来|く]るので、[使|つか]っていなかった[部屋|へや]を[掃除|そうじ]して[新|あたら]しいシーツを[用意|ようい]しました。 :: 다음 주에 친구가 자러 오기 때문에 쓰지 않던 방을 청소하고 새 시트를 준비했어요. :: A friend is staying over next week, so I cleaned the unused room and prepared fresh sheets.
[待|ま]ち[合|あ]わせの[時間|じかん]を[勘違|かんちが]いしていたことに[気|き]づいて、[友達|ともだち]に[電話|でんわ]して[約束|やくそく]を[確認|かくにん]しました。 :: 약속 시간을 잘못 알고 있었다는 것을 깨닫고 친구에게 전화해 약속을 확인했어요. :: I realized I had mixed up our meeting time, so I called my friend to confirm the arrangements.
[混|こ]んでいるバスで[席|せき]を[譲|ゆず]ると、お[年寄|としよ]りが[笑顔|えがお]でお[礼|れい]を[言|い]ってくれて[嬉|うれ]しくなりました。 :: 붐비는 버스에서 자리를 양보하니 어르신이 미소 지으며 고맙다고 해서 기뻤어요. :: When I offered my seat on a crowded bus, an older passenger thanked me with a smile, which made me happy.
[喫茶店|きっさてん]で[携帯|けいたい]を[充電|じゅうでん]したかったので、コンセントを[使|つか]ってもいいか[店員|てんいん]に[聞|き]いてみました。 :: 카페에서 휴대전화를 충전하고 싶어서 콘센트를 사용해도 되는지 직원에게 물어봤어요. :: I wanted to charge my phone at the café, so I asked a staff member whether I could use an outlet.
[自分|じぶん]の[日本語|にほんご]を[録音|ろくおん]して[聞|き]いてみると、[話|はな]しているときには[気|き]づかなかった[発音|はつおん]の[癖|くせ]が[分|わ]かります。 :: 자신의 일본어를 녹음해 들어 보면 말할 때는 몰랐던 발음 습관을 알 수 있어요. :: Listening to a recording of my Japanese reveals pronunciation habits I do not notice while speaking.
[覚|おぼ]えたばかりの[言葉|ことば]を[使|つか]って[短|みじか]い[文章|ぶんしょう]を[作|つく]ると、[意味|いみ]だけでなく[使|つか]い[方|かた]も[覚|おぼ]えやすくなります。 :: 막 배운 단어로 짧은 글을 만들면 뜻뿐 아니라 사용법도 외우기 쉬워져요. :: Writing short sentences with newly learned words makes both their meanings and usage easier to remember.
[好|す]きな[歌|うた]を[口|くち]ずさみながら[部屋|へや]を[片付|かたづ]けていたら、[面倒|めんどう]だと[思|おも]っていた[掃除|そうじ]も[早|はや]く[終|お]わりました。 :: 좋아하는 노래를 흥얼거리며 방을 정리했더니 귀찮게 느꼈던 청소도 빨리 끝났어요. :: Tidying my room while humming a favorite song made a chore I had been dreading go by quickly.
[速|はや]く[打|う]とうとして[何度|なんど]も[間違|まちが]えたので、まずは[一文字|ひともじ]ずつ[確|たし]かめながら[入力|にゅうりょく]することにしました。 :: 빨리 치려다가 여러 번 틀려서 우선 한 글자씩 확인하며 입력하기로 했어요. :: After making several mistakes while trying to type fast, I decided to check each character as I typed.
[同|おな]じ[姿勢|しせい]で[長|なが]く[座|すわ]っていたので、[作業|さぎょう]を[中断|ちゅうだん]して[窓|まど]のそばで[少|すこ]し[体|からだ]を[動|うご]かしました。 :: 같은 자세로 오래 앉아 있어서 작업을 멈추고 창가에서 몸을 조금 움직였어요. :: After sitting in the same position for a long time, I paused my work and moved around by the window.
[届|とど]いた[荷物|にもつ]を[開|あ]けると、[注文|ちゅうもん]した[本|ほん]のほかに[店|みせ]からの[小|ちい]さなお[礼|れい]の[手紙|てがみ]が[入|はい]っていました。 :: 도착한 택배를 열어 보니 주문한 책 외에 가게에서 보낸 작은 감사 편지가 들어 있었어요. :: Inside the parcel, I found the book I ordered and a small thank-you note from the shop.
[小|ちい]さいころに[使|つか]っていた[筆箱|ふでばこ]を[見|み]つけて、[学校|がっこう]で[友達|ともだち]と[過|す]ごした[時間|じかん]を[懐|なつ]かしく[思|おも]いました。 :: 어릴 때 쓰던 필통을 발견하고 학교에서 친구들과 보내던 시간이 그리워졌어요. :: Finding my old childhood pencil case brought back fond memories of time spent with friends at school.
[道|みち]で[落|お]とし[物|もの]の[財布|さいふ]を[見|み]つけたので、[持|も]ち[主|ぬし]が[困|こま]っていると[思|おも]い、[近|ちか]くの[交番|こうばん]へ[届|とど]けました。 :: 길에서 떨어진 지갑을 발견해 주인이 곤란할 거라 생각하고 근처 파출소에 맡겼어요. :: I found a lost wallet on the street and took it to a nearby police box, thinking its owner must be worried.
[地下鉄|ちかてつ]の[出口|でぐち]を[間違|まちが]えたのですが、[通|とお]りがかった[人|ひと]に[聞|き]いたおかげで[無事|ぶじ]に[約束|やくそく]の[場所|ばしょ]に[着|つ]きました。 :: 지하철 출구를 잘못 나왔지만 지나가던 사람에게 물어본 덕분에 무사히 약속 장소에 도착했어요. :: I took the wrong subway exit, but asking a passerby helped me reach our meeting place safely.
[旅先|たびさき]で[買|か]った[茶碗|ちゃわん]を[毎日|まいにち][使|つか]っていると、[何気|なにげ]ない[食事|しょくじ]の[時間|じかん]にも[旅|たび]のことを[思|おも]い[出|だ]せます。 :: 여행지에서 산 밥공기를 매일 쓰면 평범한 식사 시간에도 여행을 떠올릴 수 있어요. :: Using a rice bowl I bought on a trip brings back travel memories even during an ordinary meal.
[店|みせ]で[見|み]た[上着|うわぎ]の[色|いろ]が[決|き]められなかったので、[一度|いちど][家|いえ]に[帰|かえ]って[手持|ても]ちの[服|ふく]と[合|あ]うか[考|かんが]えました。 :: 가게에서 본 겉옷의 색을 정하지 못해서 일단 집에 돌아가 가지고 있는 옷과 어울릴지 생각했어요. :: Unable to choose a jacket color at the shop, I went home to think about what would match my clothes.
[友達|ともだち]の[引|ひ]っ[越|こ]しを[手伝|てつだ]った[後|あと]、[片付|かたづ]いたばかりの[部屋|へや]で[一緒|いっしょ]に[温|あたた]かいうどんを[食|た]べました。 :: 친구의 이사를 도운 뒤 막 정리한 방에서 함께 따뜻한 우동을 먹었어요. :: After helping a friend move, we ate warm udon together in the freshly tidied room.
[朝食|ちょうしょく]のパンが[少|すこ]し[残|のこ]っていたので、[卵|たまご]と[牛乳|ぎゅうにゅう]に[浸|ひた]してフライパンで[焼|や]いてみました。 :: 아침 빵이 조금 남아 있어서 달걀과 우유에 적셔 프라이팬에 구워 봤어요. :: With some breakfast bread left over, I soaked it in egg and milk and tried frying it in a pan.
[夜|よる]に[外|そと]を[歩|ある]いていたら、[家|いえ]の[窓|まど]から[夕食|ゆうしょく]の[明|あか]かりが[漏|も]れていて、[私|わたし]も[早|はや]く[帰|かえ]りたくなりました。 :: 밤에 밖을 걷다 집 창문으로 저녁 불빛이 새어 나오는 것을 보니 저도 빨리 돌아가고 싶어졌어요. :: Seeing dinner lights glowing through windows during an evening walk made me want to get home too.
[古|ふる]い[写真|しゃしん]を[整理|せいり]していたら[家族旅行|かぞくりょこう]の[一枚|いちまい]が[出|で]てきて、[母|はは]とその[日|ひ]のことを[話|はな]し[込|こ]みました。 :: 오래된 사진을 정리하다 가족여행 사진 한 장이 나와 어머니와 그날 이야기를 한참 나눴어요. :: While sorting old photos, I found one from a family trip and spent a long time talking about that day with my mother.
[休日|きゅうじつ]に[遠|とお]くへ[出|で]かけなくても、[近所|きんじょ]の[歩|ある]いたことがない[道|みち]に[入|はい]るだけで[新鮮|しんせん]な[気分|きぶん]になります。 :: 휴일에 멀리 나가지 않아도 동네에서 걸어 본 적 없는 길에 들어서는 것만으로 새로운 기분이 들어요. :: Even without going far on a day off, taking an unfamiliar neighborhood street makes me feel refreshed.
[初|はじ]めて[陶芸|とうげい]を[体験|たいけん]したときはうまく[形|かたち]を[作|つく]れませんでしたが、できあがった[器|うつわ]には[愛着|あいちゃく]があります。 :: 처음 도예를 체험했을 때 모양을 잘 만들지 못했지만 완성된 그릇에는 애착이 있어요. :: I could not shape the clay well at my first pottery class, but I am attached to the bowl I made.
[朝|あさ]の[市場|いちば]は[活気|かっき]があって、[店|みせ]の[人|ひと]に[料理|りょうり]の[仕方|しかた]を[聞|き]きながら[買|か]い[物|もの]をするのが[楽|たの]しいです。 :: 아침 시장은 활기가 있어서 가게 사람에게 조리법을 물으며 장을 보는 것이 즐거워요. :: The morning market is lively, and I enjoy shopping while asking the stallholders how to cook their produce.
[仕事|しごと]が[早|はや]く[終|お]わったので[夕食|ゆうしょく]までに[少|すこ]し[時間|じかん]ができて、[読|よ]みかけの[小説|しょうせつ]を[進|すす]めることができました。 :: 일이 일찍 끝나 저녁 전까지 시간이 조금 생겨서 읽던 소설을 더 읽을 수 있었어요. :: Finishing work early gave me a little time before dinner to continue the novel I was reading.
[家|いえ]の[近|ちか]くにできた[小|ちい]さな[公園|こうえん]には、[雨|あめ]の[日|ひ]でも[休|やす]めるように[屋根|やね]のあるベンチが[置|お]かれています。 :: 집 근처에 생긴 작은 공원에는 비 오는 날에도 쉴 수 있도록 지붕 있는 벤치가 놓여 있어요. :: The new little park near my home has covered benches where people can rest even on rainy days.
[間違|まちが]えた[言葉|ことば]をすぐに[消|け]すのではなく、[正|ただ]しい[形|かたち]と[比|くら]べてから[打|う]ち[直|なお]すと[違|ちが]いがよく[分|わ]かります。 :: 틀린 단어를 바로 지우기보다 올바른 형태와 비교한 뒤 다시 입력하면 차이를 잘 알 수 있어요. :: Comparing a mistyped word with the correct form before retyping helps me see the difference clearly.
[週|しゅう]に[一度|いちど]、[冷蔵庫|れいぞうこ]の[中|なか]を[確認|かくにん]してから[献立|こんだて]を[考|かんが]えると、[残|のこ]った[食材|しょくざい]を[使|つか]い[切|き]りやすくなります。 :: 일주일에 한 번 냉장고 안을 확인하고 식단을 생각하면 남은 식재료를 다 쓰기 쉬워져요. :: Checking the fridge once a week before planning meals makes it easier to use up leftover ingredients.
[旅行|りょこう]の[最終日|さいしゅうび]は[予定|よてい]を[詰|つ]め[込|こ]まずに、[気|き]に[入|い]った[通|とお]りをもう[一度|いちど]ゆっくり[歩|ある]くことにしています。 :: 여행 마지막 날에는 일정을 꽉 채우지 않고 마음에 든 거리를 한 번 더 천천히 걷기로 해요. :: On the last day of a trip, I leave my schedule open and take another slow walk along a street I liked.
[雨音|あまおと]が[聞|き]こえる[静|しず]かな[夜|よる]は、[画面|がめん]を[見|み]る[時間|じかん]を[少|すこ]し[減|へ]らして[紙|かみ]の[本|ほん]を[読|よ]みたくなります。 :: 빗소리가 들리는 조용한 밤에는 화면을 보는 시간을 조금 줄이고 종이책을 읽고 싶어져요. :: On quiet nights filled with the sound of rain, I feel like spending less time on screens and reading a paper book.
[駅前|えきまえ]の[時計|とけい]が[止|と]まっていたことに[気|き]づかず、[約束|やくそく]の[時間|じかん]までまだ[余裕|よゆう]があると[思|おも]っていました。 :: 역 앞 시계가 멈춘 것을 모르고 약속 시간까지 아직 여유가 있다고 생각하고 있었어요. :: I did not notice that the station clock had stopped and thought I still had plenty of time before our meeting.
[友達|ともだち]から[借|か]りた[漫画|まんが]を[読|よ]み[終|お]えたので、[次|つぎ]に[会|あ]ったときに[感想|かんそう]を[伝|つた]えて[返|かえ]そうと[思|おも]っています。 :: 친구에게 빌린 만화를 다 읽어서 다음에 만날 때 감상을 이야기하고 돌려주려 해요. :: I finished the manga I borrowed from a friend and plan to share my thoughts and return it when we next meet.
[新|あたら]しい[店|みせ]に[入|はい]るのは[少|すこ]し[緊張|きんちょう]しますが、[店員|てんいん]が[笑顔|えがお]で[迎|むか]えてくれると[気持|きも]ちが[楽|らく]になります。 :: 새 가게에 들어가는 것은 조금 긴장되지만 직원이 웃으며 맞아 주면 마음이 편해져요. :: Entering a new shop makes me a little nervous, but a smiling welcome from the staff puts me at ease.
[一週間|いっしゅうかん]の[終|お]わりに[手帳|てちょう]を[見返|みかえ]すと、[何|なに]もなかったと[思|おも]った[日|ひ]にも[小|ちい]さな[出来事|できごと]があったと[気|き]づきます。 :: 한 주가 끝날 때 수첩을 돌아보면 아무 일 없었다고 생각한 날에도 작은 일이 있었다는 것을 깨달아요. :: Looking back through my planner at the end of the week reminds me that even uneventful days held small moments.
[電車|でんしゃ]が[遅|おく]れているという[案内|あんない]を[聞|き]いたので、[先|さき]に[友達|ともだち]へ[連絡|れんらく]してから[別|べつ]の[行|い]き[方|かた]を[調|しら]べました。 :: 전철이 지연된다는 안내를 들어서 먼저 친구에게 연락한 뒤 다른 가는 방법을 알아봤어요. :: After hearing that the train was delayed, I contacted my friend first and then looked for another route.
[小|ちい]さな[鉢植|はちう]えを[窓辺|まどべ]に[置|お]いてから、[朝|あさ]に[葉|は]の[様子|ようす]を[確|たし]かめるのが[毎日|まいにち]の[習慣|しゅうかん]になりました。 :: 작은 화분을 창가에 놓은 후 아침마다 잎의 상태를 확인하는 것이 일상 습관이 되었어요. :: Since putting a small plant on the windowsill, checking its leaves each morning has become a daily habit.
[初|はじ]めて[行|い]く[場所|ばしょ]には[少|すこ]し[早|はや]めに[向|む]かうと、[道|みち]を[確|たし]かめたり[周|まわ]りの[景色|けしき]を[楽|たの]しんだりする[余裕|よゆう]が[生|う]まれます。 :: 처음 가는 곳에는 조금 일찍 출발하면 길을 확인하거나 주변 풍경을 즐길 여유가 생겨요. :: Heading to an unfamiliar place a little early leaves time to check the route and enjoy the surroundings.
[家族|かぞく]で[夕食|ゆうしょく]を[作|つく]るときは、[私|わたし]が[野菜|やさい]を[切|き]り、[父|ちち]が[鍋|なべ]を[見|み]て、[弟|おとうと]が[食器|しょっき]を[並|なら]べます。 :: 가족이 함께 저녁을 만들 때는 제가 채소를 썰고 아버지가 냄비를 보고 남동생이 식기를 놓아요. :: When we cook dinner as a family, I chop vegetables, my father watches the pot, and my brother sets the table.
[日差|ひざ]しが[強|つよ]くなったのでカーテンを[少|すこ]し[閉|し]めると、[部屋|へや]の[中|なか]が[落|お]ち[着|つ]いた[柔|やわ]らかい[明|あか]るさになりました。 :: 햇살이 강해져 커튼을 조금 닫으니 방 안이 차분하고 부드러운 밝기가 되었어요. :: Closing the curtains a little against the strong sunlight gave the room a calmer, softer light.
[毎晩|まいばん][明日|あした]の[持|も]ち[物|もの]を[玄関|げんかん]に[揃|そろ]えておくようにしたら、[朝|あさ]に[忘|わす]れ[物|もの]をして[慌|あわ]てることが[減|へ]りました。 :: 매일 밤 내일 챙길 물건을 현관에 모아 두기 시작하니 아침에 물건을 빠뜨려 당황하는 일이 줄었어요. :: Since I began gathering tomorrow's things by the door each evening, I have had fewer frantic mornings over forgotten items.
[苦手|にがて]だった[文字|もじ]が[一度|いちど]で[入力|にゅうりょく]できると、[短|みじか]い[練習|れんしゅう]でも[続|つづ]けてきたことに[意味|いみ]があったと[感|かん]じます。 :: 어려워하던 글자를 한 번에 입력하면 짧은 연습이라도 계속해 온 의미가 있었다고 느껴요. :: Typing a once-difficult character correctly at the first try makes even short, steady practice feel worthwhile.
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
