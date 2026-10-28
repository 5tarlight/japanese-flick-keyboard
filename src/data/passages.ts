import { parseRuby } from './types';
import type { PracticeItem } from './types';

const originals = [
  {
    title: '조금 여유로운 아침',
    text: '[今日|きょう]はいつもより[少|すこ]し[早|はや]く[目|め]が[覚|さ]めました。[窓|まど]を[開|あ]けると、[涼|すず]しい[風|かぜ]と[鳥|とり]の[声|こえ]が[部屋|へや]に[入|はい]ってきました。[温|あたた]かいお[茶|ちゃ]を[入|い]れて、ゆっくり[朝|あさ]ご[飯|はん]を[食|た]べました。[急|いそ]がない[朝|あさ]があると、[一日|いちにち]を[穏|おだ]やかな[気持|きも]ちで[始|はじ]められます。',
    ko: '오늘은 평소보다 조금 일찍 눈이 떠졌습니다. 창문을 열자 시원한 바람과 새소리가 방으로 들어왔습니다. 따뜻한 차를 우려 천천히 아침을 먹었습니다. 서두르지 않는 아침이 있으면 차분한 마음으로 하루를 시작할 수 있습니다.',
    en: 'I woke a little earlier than usual today. When I opened the window, a cool breeze and birdsong entered the room. I made warm tea and ate breakfast slowly. An unhurried morning helps me start the day calmly.',
  },
  {
    title: '골목의 작은 빵집',
    text: '[駅|えき]へ[向|む]かう[途中|とちゅう]で、[新|あたら]しいパン[屋|や]を[見|み]つけました。[店|みせ]の[前|まえ]には、[焼|や]きたてのパンのいい[匂|にお]いが[広|ひろ]がっていました。[丸|まる]いパンを[二|ふた]つ[買|か]って、[一|ひと]つを[友達|ともだち]に[渡|わた]しました。[美味|おい]しいものを[誰|だれ]かと[分|わ]けると、[嬉|うれ]しさも[増|ふ]える[気|き]がします。',
    ko: '역으로 가는 길에 새 빵집을 발견했습니다. 가게 앞에는 갓 구운 빵의 좋은 냄새가 퍼져 있었습니다. 둥근 빵을 두 개 사서 하나를 친구에게 건넸습니다. 맛있는 것을 누군가와 나누면 기쁨도 늘어나는 것 같습니다.',
    en: 'On the way to the station, I found a new bakery. The smell of fresh bread filled the air outside. I bought two round rolls and gave one to a friend. Sharing something delicious seems to make the happiness grow too.',
  },
  {
    title: '비 오는 날의 도서관',
    text: '[雨|あめ]の[土曜日|どようび]に、[近|ちか]くの[図書館|としょかん]へ[行|い]きました。[窓際|まどぎわ]の[席|せき]に[座|すわ]って、[旅行|りょこう]の[本|ほん]を[開|ひら]きました。[雨|あめ]の[音|おと]を[聞|き]きながら[写真|しゃしん]を[眺|なが]めていると、[遠|とお]い[町|まち]を[歩|ある]いているような[気分|きぶん]になりました。[帰|かえ]るころには[雨|あめ]がやんで、[空|そら]が[少|すこ]し[明|あか]るくなっていました。',
    ko: '비 오는 토요일에 근처 도서관에 갔습니다. 창가 자리에 앉아 여행 책을 펼쳤습니다. 빗소리를 들으며 사진을 바라보니 먼 도시를 걷는 듯한 기분이 들었습니다. 돌아갈 무렵에는 비가 그치고 하늘이 조금 밝아져 있었습니다.',
    en: 'On a rainy Saturday, I visited the local library. I sat by a window and opened a travel book. Looking at the photos to the sound of rain felt like walking through a distant town. By the time I left, the rain had stopped and the sky was brighter.',
  },
  {
    title: '주말의 채소 수프',
    text: '[冷蔵庫|れいぞうこ]を[開|あ]けると、[野菜|やさい]が[少|すこ]しずつ[残|のこ]っていました。[玉葱|たまねぎ]と[人参|にんじん]を[小|ちい]さく[切|き]って、[鍋|なべ]でゆっくり[煮|に]ました。[塩|しお]で[味|あじ]を[整|ととの]えると、[優|やさ]しい[味|あじ]のスープができました。[特別|とくべつ]な[材料|ざいりょう]がなくても、[温|あたた]かい[食事|しょくじ]は[作|つく]れるのだと[思|おも]いました。',
    ko: '냉장고를 열어 보니 채소가 조금씩 남아 있었습니다. 양파와 당근을 작게 썰어 냄비에 천천히 끓였습니다. 소금으로 간을 맞추니 순한 맛의 수프가 되었습니다. 특별한 재료가 없어도 따뜻한 식사를 만들 수 있다고 생각했습니다.',
    en: 'I opened the fridge and found small amounts of leftover vegetables. I chopped onion and carrot and simmered them slowly. A little salt turned them into a mild soup. I realized that a warm meal does not need special ingredients.',
  },
  {
    title: '벚꽃길 산책',
    text: '[春|はる]になると、[川沿|かわぞ]いの[道|みち]に[桜|さくら]が[咲|さ]きます。[今日|きょう]は[友達|ともだち]と、その[道|みち]をゆっくり[歩|ある]きました。[風|かぜ]が[吹|ふ]くたびに、[薄|うす]い[桃色|ももいろ]の[花|はな]びらが[水面|すいめん]に[落|お]ちていきました。[写真|しゃしん]を[撮|と]った[後|あと]は、しばらく[何|なに]も[言|い]わずに[景色|けしき]を[眺|なが]めていました。',
    ko: '봄이 되면 강변 길에 벚꽃이 핍니다. 오늘은 친구와 그 길을 천천히 걸었습니다. 바람이 불 때마다 연분홍 꽃잎이 수면으로 떨어졌습니다. 사진을 찍은 뒤에는 잠시 아무 말 없이 풍경을 바라보았습니다.',
    en: 'In spring, cherry blossoms bloom along the river path. Today, I walked there slowly with a friend. Each breeze sent pale pink petals falling onto the water. After taking photos, we quietly watched the scenery for a while.',
  },
  {
    title: '길을 잃어 만난 풍경',
    text: '[初|はじ]めての[町|まち]で、[地図|ちず]を[見|み]ながら[歩|ある]いていました。[曲|ま]がる[道|みち]を[間違|まちが]えて、[予定|よてい]とは[違|ちが]う[場所|ばしょ]に[着|つ]きました。そこには[静|しず]かな[池|いけ]と[古|ふる]い[橋|はし]がありました。[少|すこ]し[遠回|とおまわ]りになりましたが、[思|おも]いがけない[景色|けしき]に[出会|であ]えて[嬉|うれ]しかったです。',
    ko: '처음 온 동네에서 지도를 보며 걷고 있었습니다. 길을 잘못 돌아 예정과 다른 곳에 도착했습니다. 그곳에는 조용한 연못과 오래된 다리가 있었습니다. 조금 돌아가게 되었지만 뜻밖의 풍경을 만나 기뻤습니다.',
    en: 'I was walking through an unfamiliar town with a map. A wrong turn took me somewhere unexpected. There was a quiet pond and an old bridge. It was a small detour, but I was glad to discover the unexpected view.',
  },
  {
    title: '손으로 쓰는 편지',
    text: '[遠|とお]くに[住|す]む[祖母|そぼ]に、[久|ひさ]しぶりに[手紙|てがみ]を[書|か]きました。[最近|さいきん]の[出来事|できごと]を[思|おも]い[出|だ]しながら、[一文字|ひともじ]ずつ[丁寧|ていねい]に[書|か]きました。[封筒|ふうとう]には、[庭|にわ]で[撮|と]った[花|はな]の[写真|しゃしん]も[入|い]れました。[返事|へんじ]が[届|とど]くまでの[時間|じかん]も、[手紙|てがみ]の[楽|たの]しみの[一|ひと]つです。',
    ko: '멀리 사는 할머니께 오랜만에 편지를 썼습니다. 최근의 일을 떠올리며 한 글자씩 정성껏 썼습니다. 봉투에는 정원에서 찍은 꽃 사진도 넣었습니다. 답장이 올 때까지의 시간도 편지의 즐거움 중 하나입니다.',
    en: 'I wrote a letter to my grandmother who lives far away. Recalling recent events, I wrote each character carefully. I included a photo of flowers from the garden. Waiting for a reply is also part of the joy of letters.',
  },
  {
    title: '고양이의 오후',
    text: 'うちの[猫|ねこ]は、[窓|まど]のそばの[椅子|いす]が[好|す]きです。[午後|ごご]になると、そこに[丸|まる]くなって[眠|ねむ]ります。[私|わたし]が[本|ほん]を[読|よ]んでいると、ときどき[目|め]を[開|あ]けてこちらを[見|み]ます。[静|しず]かな[部屋|へや]で[一緒|いっしょ]に[過|す]ごす[時間|じかん]が、[私|わたし]の[小|ちい]さな[楽|たの]しみです。',
    ko: '우리 집 고양이는 창가의 의자를 좋아합니다. 오후가 되면 그곳에서 몸을 둥글게 말고 잡니다. 제가 책을 읽고 있으면 가끔 눈을 떠서 이쪽을 봅니다. 조용한 방에서 함께 보내는 시간이 저의 작은 즐거움입니다.',
    en: 'My cat likes the chair by the window. In the afternoon, it curls up there to sleep. While I read, it sometimes opens its eyes and looks at me. Spending time together in a quiet room is one of my small pleasures.',
  },
  {
    title: '가을 산에서',
    text: '[秋|あき]の[晴|は]れた[日|ひ]に、[低|ひく]い[山|やま]へ[登|のぼ]りました。[道|みち]には[赤|あか]や[黄色|きいろ]の[葉|は]が[落|お]ちていました。[頂上|ちょうじょう]で[食|た]べたおにぎりは、いつもより[美味|おい]しく[感|かん]じました。[帰|かえ]りは[足元|あしもと]に[気|き]をつけながら、ゆっくり[山|やま]を[下|お]りました。',
    ko: '맑은 가을날 낮은 산에 올랐습니다. 길에는 빨간 잎과 노란 잎이 떨어져 있었습니다. 정상에서 먹은 주먹밥은 평소보다 맛있게 느껴졌습니다. 돌아올 때는 발밑을 조심하며 천천히 산을 내려왔습니다.',
    en: 'On a clear autumn day, I climbed a small mountain. Red and yellow leaves covered the path. The rice ball I ate at the top tasted better than usual. On the way back, I watched my footing and descended slowly.',
  },
  {
    title: '새로운 습관',
    text: '[日本語|にほんご]の[練習|れんしゅう]を[毎日|まいにち][五分|ごふん]だけ[続|つづ]けることにしました。[初|はじ]めは[指|ゆび]が[思|おも]うように[動|うご]かず、よく[間違|まちが]えました。それでも[短|みじか]い[言葉|ことば]から[少|すこ]しずつ[入力|にゅうりょく]していきました。[今|いま]では[練習|れんしゅう]を[終|お]えた[後|あと]に、[小|ちい]さな[達成感|たっせいかん]を[感|かん]じられます。',
    ko: '일본어 연습을 매일 5분씩 이어 가기로 했습니다. 처음에는 손가락이 마음대로 움직이지 않아 자주 틀렸습니다. 그래도 짧은 단어부터 조금씩 입력해 나갔습니다. 이제는 연습을 마친 뒤 작은 성취감을 느낄 수 있습니다.',
    en: 'I decided to practice Japanese for just five minutes every day. At first, my fingers would not move as I wanted and I made many mistakes. Still, I kept typing, starting with short words. Now, I feel a small sense of achievement after each practice.',
  },
  {
    title: '바닷가 여행',
    text: '[朝|あさ]の[電車|でんしゃ]に[乗|の]って、[海|うみ]の[近|ちか]くの[町|まち]へ[行|い]きました。[駅|えき]を[出|で]ると、[潮|しお]の[香|かお]りがしました。[浜辺|はまべ]を[歩|ある]きながら、[波|なみ]が[寄|よ]せては[返|かえ]す[音|おと]を[聞|き]きました。[夕日|ゆうひ]が[海|うみ]に[沈|しず]むまで、[時間|じかん]を[気|き]にせず[過|す]ごしました。',
    ko: '아침 전철을 타고 바닷가 마을에 갔습니다. 역을 나오니 바다 내음이 났습니다. 해변을 걸으며 파도가 밀려왔다 돌아가는 소리를 들었습니다. 석양이 바다로 질 때까지 시간에 신경 쓰지 않고 보냈습니다.',
    en: 'I took a morning train to a seaside town. Outside the station, I could smell the sea. Walking along the beach, I listened to waves rolling in and out. I spent the day without watching the clock until the sun set over the water.',
  },
  {
    title: '작은 방의 변화',
    text: '[休|やす]みの[日|ひ]に、[部屋|へや]の[模様替|もようが]えをしました。[机|つくえ]を[窓|まど]の[近|ちか]くに[動|うご]かして、[棚|たな]の[本|ほん]を[並|なら]べ[直|なお]しました。[空|あ]いた[場所|ばしょ]には、[小|ちい]さな[鉢植|はちう]えを[置|お]きました。[同|おな]じ[部屋|へや]なのに、[新|あたら]しい[場所|ばしょ]に[来|き]たような[気持|きも]ちになりました。',
    ko: '쉬는 날에 방의 배치를 바꿨습니다. 책상을 창가로 옮기고 선반의 책을 다시 정리했습니다. 비어 있는 곳에는 작은 화분을 놓았습니다. 같은 방인데도 새로운 장소에 온 듯한 기분이 들었습니다.',
    en: 'On a day off, I rearranged my room. I moved my desk near the window and reordered the books on the shelf. I put a small potted plant in the empty space. The same room felt like somewhere new.',
  },
];

export const passages: PracticeItem[] = originals.map((item, index) => ({
  id: `passage-${index}`,
  mode: 'passage',
  category: '일상 이야기',
  segments: parseRuby(item.text),
  title: item.title,
  ko: item.ko,
  en: item.en,
}));
