import { PrismaClient, Gender, LanguageLevel } from "../src/generated/prisma"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const users = [
  // 日本人ユーザー（英語・韓国語・中国語等を学習）
  {
    name: "田中 花子", gender: Gender.FEMALE, age: 28, prefecture: 13,
    native: ["ja"], learn: [{ language: "en", level: LanguageLevel.INTERMEDIATE }, { language: "ko", level: LanguageLevel.BEGINNER }],
    introduction: "東京在住のフリーランスデザイナーです。主にWebデザインとブランディングを手がけており、クライアントとのコミュニケーションで英語を使う機会が増えてきました。英語はビジネスシーンでも使えるレベルを目指して勉強中で、韓国語は好きなK-POPアーティストの歌詞を理解したくて始めました。映画や音楽が大好きで、週末は渋谷や恵比寿のカフェで作業しながらインプットするのが日課です。楽しく会話しながらお互いの言語を伸ばせる練習相手を探しています！一緒に成長しましょう。",
    interests: ["映画鑑賞", "デザイン", "音楽", "カフェ巡り"],
  },
  {
    name: "鈴木 太郎", gender: Gender.MALE, age: 34, prefecture: 14,
    native: ["ja"], learn: [{ language: "en", level: LanguageLevel.ADVANCED }],
    introduction: "神奈川のIT企業でバックエンドエンジニアとして働いています。最近は海外チームとのやり取りが増え、英語でのビジネスコミュニケーションをもっと自然にこなせるようになりたいと感じています。特にミーティングでの発言やメール文章の表現力を鍛えたいです。休日は湘南の海でサーフィンをするのが最大の楽しみで、朝イチの波を楽しんでから仕事に臨む日もあります。料理も好きで、週末に新しいレシピに挑戦するのが趣味のひとつです。",
    interests: ["テクノロジー", "サーフィン", "料理", "旅行"],
  },
  {
    name: "佐藤 あかり", gender: Gender.FEMALE, age: 22, prefecture: 27,
    native: ["ja"], learn: [{ language: "zh", level: LanguageLevel.BEGINNER }, { language: "en", level: LanguageLevel.INTERMEDIATE }],
    introduction: "大阪の大学で国際文化学部に在籍しています。卒業後は商社や国際NGOで働きたいという夢があり、そのために中国語と英語を同時進行で勉強中です。中国語はまだ初級ですが、発音の難しさに苦戦しながらも楽しんでいます。英語は日常会話レベルなので、もっと流暢に話せるようになりたいです。アニメとマンガが大好きで、特に少年漫画や異世界ものにハマっています。好きな作品について語り合える人も大歓迎です！",
    interests: ["アニメ", "マンガ", "J-POP", "食べ歩き"],
  },
  {
    name: "山田 健二", gender: Gender.MALE, age: 45, prefecture: 1,
    native: ["ja"], learn: [{ language: "fr", level: LanguageLevel.BEGINNER }],
    introduction: "北海道の大自然の中で野菜農家を営んでいます。数年前にフランスのワイナリーを旅行で訪れたことがきっかけで、フランス語に興味を持ちました。今は週に数時間、独学でゆっくりと学んでいます。農業の話、食の話、北海道の自然の話なら時間を忘れて語れます。フランス料理やワインも好きなので、フランス文化に詳しい方とぜひ交流したいです。都会とは違うスローライフを送っていますが、世界とつながることへの好奇心は誰にも負けないつもりです。",
    interests: ["農業", "アウトドア", "料理", "ワイン"],
  },
  {
    name: "中村 さくら", gender: Gender.FEMALE, age: 31, prefecture: 23,
    native: ["ja"], learn: [{ language: "es", level: LanguageLevel.INTERMEDIATE }],
    introduction: "愛知県在住で、週2回スペイン語教室に通っています。フラメンコの動画を見てラテン文化に一目惚れし、スペイン語を始めました。いつかセビージャのフェリアや、メキシコのオアハカを訪れるのが夢です。料理が得意で、スペインのパエリャやメキシコのタコスを自己流にアレンジして作るのが好きです。食や文化を通じて言語を学ぶのが私のスタイルで、スペイン語圏のネイティブの方と気軽に話せる機会を求めています。一緒においしいものの話もしましょう！",
    interests: ["スペイン料理", "ダンス", "旅行", "映画"],
  },
  {
    name: "加藤 雄大", gender: Gender.MALE, age: 26, prefecture: 40,
    native: ["ja"], learn: [{ language: "de", level: LanguageLevel.BEGINNER }, { language: "en", level: LanguageLevel.INTERMEDIATE }],
    introduction: "福岡出身で、地元のサッカークラブでプレーしています。ドイツのブンデスリーガが大好きで、バイエルン・ミュンヘンの試合は欠かさず見ています。選手やコーチのインタビューをドイツ語で理解したくてドイツ語の勉強を始めました。いつかドイツでプレーすることも夢のひとつです。英語も日常会話くらいはできます。スポーツの話はもちろん、フィジカルトレーニングや栄養管理についても話せます。スポーツ好きの方、ぜひ盛り上がりましょう！",
    interests: ["サッカー", "スポーツ観戦", "筋トレ", "音楽"],
  },
  {
    name: "吉田 美穂", gender: Gender.FEMALE, age: 38, prefecture: 26,
    native: ["ja"], learn: [{ language: "ko", level: LanguageLevel.INTERMEDIATE }],
    introduction: "京都で着物の仕立て職人として働いて15年になります。日本の伝統工芸に誇りを持ちながら、一方で韓国のドラマと音楽にすっかりはまってしまいました。最初は字幕で見ていたのですが、台詞をそのまま理解したくなって韓国語の勉強を始めました。今は基本的な会話はできるようになり、ドラマを8割くらい字幕なしで楽しめています。着物の文化や日本の伝統工芸に興味がある方、また韓国文化・ドラマ・K-POPについて語り合える方と交流したいです。お互いの文化を深く知れる時間にしましょう。",
    interests: ["韓国ドラマ", "K-POP", "着物", "茶道"],
  },
  {
    name: "渡辺 拓也", gender: Gender.MALE, age: 29, prefecture: 11,
    native: ["ja"], learn: [{ language: "pt", level: LanguageLevel.BEGINNER }],
    introduction: "埼玉在住の会社員です。数年前にボサノバのカフェライブを偶然聴いて以来、ブラジル音楽にどっぷりとはまってしまいました。ジョアン・ジルベルトやアントニオ・カルロス・ジョビンが特に好きで、最近はサンバやMPBも聴くようになりました。歌詞の意味を理解したくてポルトガル語の勉強を始め、今は週2〜3回自習しています。ギターも弾くので、コード弾きしながら曲の練習をするのが楽しいです。ブラジル文化やポルトガル語について話せる方、音楽の話で盛り上がれる方をお待ちしています！",
    interests: ["ボサノバ", "ギター", "サッカー", "コーヒー"],
  },
  {
    name: "伊藤 奈々", gender: Gender.FEMALE, age: 24, prefecture: 13,
    native: ["ja"], learn: [{ language: "zh", level: LanguageLevel.INTERMEDIATE }, { language: "ko", level: LanguageLevel.ADVANCED }],
    introduction: "東京の語学学校に通いながら、中国語と韓国語を本格的に学んでいます。将来は会議通訳者か翻訳者として働くことを目指しており、毎日3〜4時間は言語の勉強に充てています。韓国語は上級レベルに達し、最近はニュースや映画をほぼ字幕なしで楽しめるようになりました。中国語は中級で、発音のコツをつかむのに苦労しています。アジア料理も大好きで、韓国料理・中国料理・タイ料理などを食べ歩くのが好きです。ネイティブの方と実践的な会話練習がしたいです！",
    interests: ["語学学習", "アジア料理", "K-POP", "読書"],
  },
  {
    name: "小林 誠", gender: Gender.MALE, age: 52, prefecture: 28,
    native: ["ja"], learn: [{ language: "en", level: LanguageLevel.BEGINNER }],
    introduction: "兵庫県で中学校の理科教師をしています。定年まであと数年となり、退職後はヨーロッパやオセアニアをゆっくり旅したいという夢があります。そのために英語を学び始めましたが、若い頃に少し勉強した程度なので、基礎からやり直しているところです。急ぐ必要はないので、丁寧に・楽しく教えてもらえる方が理想です。歴史と読書が趣味で、旅行先の文化や歴史についても深く知りたいと思っています。人に教えることが好きなので、日本語や日本文化についてなら喜んでお伝えします。",
    interests: ["読書", "歴史", "旅行", "園芸"],
  },
  {
    name: "松本 ゆり", gender: Gender.FEMALE, age: 33, prefecture: 13,
    native: ["ja"], learn: [{ language: "fr", level: LanguageLevel.INTERMEDIATE }, { language: "de", level: LanguageLevel.BEGINNER }],
    introduction: "東京でアパレルブランドのPRとして働いています。年に数回パリとベルリンへ出張があり、現地のバイヤーやプレスとのコミュニケーションをスムーズにするためにフランス語とドイツ語を勉強しています。フランス語は日常会話レベルになってきましたが、ドイツ語はまだまだ初歩段階です。パリのセレクトショップ巡りやベルリンのストリートファッションが大好きで、最新トレンドや美容の話なら時間を忘れて話し続けられます。おしゃれや言語に興味がある方、ぜひ一緒に練習しましょう！",
    interests: ["ファッション", "美容", "アート", "カフェ"],
  },
  {
    name: "井上 浩二", gender: Gender.MALE, age: 27, prefecture: 27,
    native: ["ja"], learn: [{ language: "es", level: LanguageLevel.ADVANCED }],
    introduction: "大阪・南堀江でバーを経営しています。スペイン語は20代のころメキシコを旅したのをきっかけに独学で始め、10年かけて上級レベルまで到達しました。店ではラテン音楽を流しながら、スペイン語圏からのお客さんとスペイン語でカウンター越しに話すのが最高の楽しみです。テキーラとメスカルの奥深さについて語り始めると止まりません。今はポルトガル語も少し勉強中で、ブラジル音楽への興味からサンバやボサノバも聴くようになりました。一緒に楽しく話しましょう、乾杯！",
    interests: ["バーテンダー", "ラテン音楽", "旅行", "料理"],
  },
  {
    name: "木村 ひとみ", gender: Gender.FEMALE, age: 41, prefecture: 47,
    native: ["ja"], learn: [{ language: "en", level: LanguageLevel.INTERMEDIATE }],
    introduction: "沖縄の美しい自然に囲まれてヨガインストラクターとして活動しています。最近、外国人観光客向けのビーチヨガクラスを英語で開催したいと思い、日常会話以上の英語力をつけるために練習中です。自然・健康・マインドフルネスが生活の中心にあり、毎朝の太陽礼拝と瞑想が欠かせません。沖縄の海や食文化についてもたくさん語れます。リラックスした雰囲気で楽しく話しながら、お互いの言語と文化を深め合えたら嬉しいです。",
    interests: ["ヨガ", "瞑想", "海", "自然"],
  },
  {
    name: "清水 大輔", gender: Gender.MALE, age: 36, prefecture: 22,
    native: ["ja"], learn: [{ language: "zh", level: LanguageLevel.BEGINNER }],
    introduction: "静岡県で日本茶の輸出業を営んでいます。主にヨーロッパへの輸出を手がけていましたが、最近は中国市場への展開を本格的に進めており、現地のバイヤーと直接交渉できるよう中国語を勉強中です。お茶の産地や製法、抹茶・煎茶・ほうじ茶の違いなど、日本茶の奥深さについてなら何時間でも話せます。休日は富士山麓をトレッキングしながら自然の中でリフレッシュするのが好きです。お茶や日本文化、そしてビジネスについて語り合える方と繋がりたいです。",
    interests: ["お茶", "ビジネス", "登山", "写真"],
  },
  {
    name: "林 あゆみ", gender: Gender.FEMALE, age: 25, prefecture: 13,
    native: ["ja"], learn: [{ language: "ko", level: LanguageLevel.ADVANCED }, { language: "en", level: LanguageLevel.ADVANCED }],
    introduction: "東京の大手メーカーで海外営業を担当しています。韓国のパートナー企業との商談や英語でのグローバル会議など、両言語を仕事で日常的に使っています。語学は実践が一番の近道だと信じているので、ネイティブの方との会話をとても大切にしています。映画は年間100本以上観るほど好きで、韓国映画・ハリウッド映画どちらも大好きです。グルメにもこだわりがあり、新しいレストランの開拓が週末の楽しみです。フレンドリーでオープンな性格なので、気軽に話しかけてください！",
    interests: ["映画", "グルメ", "K-POP", "ランニング"],
  },

  // 英語ネイティブ
  {
    name: "Emily Johnson", gender: Gender.FEMALE, age: 28, prefecture: 13,
    native: ["en"], learn: [{ language: "ja", level: LanguageLevel.INTERMEDIATE }, { language: "ko", level: LanguageLevel.BEGINNER }],
    introduction: "I'm an English teacher at a language school in Shibuya, Tokyo. I've been living in Japan for 4 years and have been studying Japanese for 3 of them. I love Japanese culture — from traditional things like tea ceremony and kabuki to modern anime and street fashion. My Japanese is at an intermediate level, so I can hold a conversation but still make plenty of mistakes! I also just started learning Korean and would love a study buddy. Let's have fun conversations and help each other grow — I'm patient, encouraging, and always happy to help with English in return.",
    interests: ["Teaching", "Anime", "Hiking", "Photography"],
  },
  {
    name: "Michael Brown", gender: Gender.MALE, age: 32, prefecture: 27,
    native: ["en"], learn: [{ language: "ja", level: LanguageLevel.ADVANCED }],
    introduction: "I'm a software developer working for a tech company in Osaka. I've been studying Japanese seriously for 5 years, and I can now read manga in the original Japanese and follow most conversations. I'm particularly fascinated by Japanese history — especially the Edo and Meiji periods — and love visiting old castle towns on weekends. Anime and manga are my daily entertainment, and I'm always looking for recommendations. I'm a native English speaker and happy to help you practice reading, writing, or conversation in exchange for Japanese practice. Let's swap skills!",
    interests: ["Programming", "Manga", "History", "Gaming"],
  },
  {
    name: "Sarah Davis", gender: Gender.FEMALE, age: 24, prefecture: 14,
    native: ["en"], learn: [{ language: "zh", level: LanguageLevel.BEGINNER }],
    introduction: "I'm a graduate student at a university in Kanagawa, researching East Asian cultural history. I just started learning Mandarin Chinese a few months ago and I'm looking for a patient language exchange partner to practice with. It's a challenging but incredibly rewarding language! Outside of studying, I love cooking — especially experimenting with Asian recipes at home — and doing yoga to stay balanced. I also enjoy exploring new places on weekends, from local temples to hidden cafes. Happy to help with English in return, whether it's conversation practice, writing, or pronunciation!",
    interests: ["Cooking", "Yoga", "Travel", "Reading"],
  },
  {
    name: "James Wilson", gender: Gender.MALE, age: 40, prefecture: 13,
    native: ["en"], learn: [{ language: "ja", level: LanguageLevel.BEGINNER }, { language: "ko", level: LanguageLevel.BEGINNER }],
    introduction: "I work in marketing at an international company in Tokyo and have been living here for 2 years. I'm a complete beginner in both Japanese and Korean, but I'm highly motivated to learn! Japanese is essential for my daily life here, and I started Korean because I've fallen in love with Korean food and pop culture. I love sports — I play recreational basketball and follow the NBA closely — and I'm always on the hunt for great new restaurants in the city. If you're patient with beginners and enjoy a good laugh while learning, I think we'd get along great!",
    interests: ["Sports", "Music", "Food", "Travel"],
  },
  {
    name: "Ashley Martinez", gender: Gender.FEMALE, age: 29, prefecture: 6,
    native: ["en"], learn: [{ language: "es", level: LanguageLevel.INTERMEDIATE }, { language: "ja", level: LanguageLevel.INTERMEDIATE }],
    introduction: "I'm a nurse working at a hospital in Yamagata, and I've been living in Japan for 3 years. I'm half Latina (Colombian mother) and half American, so I grew up in a bilingual household. I'm studying Spanish to deepen my connection with my Latin heritage and rediscover roots I feel I've partially lost. I'm also learning Japanese to better connect with my patients and the local community — it's been challenging but incredibly rewarding. I love salsa dancing, hiking in the beautiful Tohoku mountains, and trying to recreate my mom's recipes. Friendly, patient, and always up for a good conversation!",
    interests: ["Healthcare", "Salsa dancing", "Cooking", "Nature"],
  },

  // 韓国語ネイティブ
  {
    name: "김지수 (Ji-su Kim)", gender: Gender.FEMALE, age: 26, prefecture: 13,
    native: ["ko"], learn: [{ language: "ja", level: LanguageLevel.ADVANCED }, { language: "en", level: LanguageLevel.INTERMEDIATE }],
    introduction: "한국에서 온 뷰티 블로거입니다. 일본 뷰티 시장에 진출하고 싶어서 3년 전부터 일본어를 열심히 공부했어요. 덕분에 지금은 일본어로 SNS도 운영하고, 일본 브랜드와 협업도 할 수 있게 됐어요. K-beauty 트렌드나 스킨케어 루틴에 대해 이야기하는 걸 정말 좋아해요. 일본 화장품도 많이 써보고 있는데, 한국과 일본 뷰티 문화의 차이가 재미있어요. 패션, 여행, 음식 얘기도 환영해요! 서로 언어를 가르쳐주면서 친해질 수 있으면 좋겠어요.",
    interests: ["K-beauty", "ファッション", "料理", "旅行"],
  },
  {
    name: "박민준 (Min-jun Park)", gender: Gender.MALE, age: 31, prefecture: 27,
    native: ["ko"], learn: [{ language: "ja", level: LanguageLevel.INTERMEDIATE }],
    introduction: "大阪のIT企業でフロントエンドエンジニアとして働いている韓国人です。日本に来て2年が経ちましたが、日本語はまだまだ勉強中で、特に敬語と読み書きに苦労しています。日本の文化がとても好きで、休日には大阪や京都の寺社仏閣を訪れたり、ラーメン屋を食べ歩いたりしています。韓国語は母語なので、韓国語を学びたい方には喜んでお手伝いします。プログラミングや技術の話も大好きなので、エンジニア同士での交流も歓迎です。一緒に語学交換しながら友達になれれば嬉しいです！",
    interests: ["テクノロジー", "サッカー", "日本食", "アニメ"],
  },
  {
    name: "이수진 (Su-jin Lee)", gender: Gender.FEMALE, age: 22, prefecture: 13,
    native: ["ko"], learn: [{ language: "en", level: LanguageLevel.ADVANCED }, { language: "zh", level: LanguageLevel.BEGINNER }],
    introduction: "I'm a Korean university student doing a year abroad in Tokyo. My English is at an advanced level from years of studying and watching English content, and I recently started Mandarin Chinese as a third language challenge. K-dramas and fashion are my biggest passions — I love discussing new releases and styling tips. Tokyo's food scene is absolutely amazing and I've been exploring a new neighborhood every weekend. I'm happy to help you with Korean or share insights about Korean culture. Let's grab a virtual coffee and practice together!",
    interests: ["K-drama", "Fashion", "Food", "Music"],
  },
  {
    name: "정호성 (Ho-seong Jeong)", gender: Gender.MALE, age: 35, prefecture: 11,
    native: ["ko"], learn: [{ language: "ja", level: LanguageLevel.BEGINNER }],
    introduction: "埼玉の韓国料理レストランでシェフとして働いています。日本に来て1年半になりますが、日本語はまだ挨拶や簡単な会話ができる程度です。お客さんやスタッフとのコミュニケーションをもっとスムーズにしたくて、日本語を本格的に勉強し始めました。料理を通じた文化交流が大好きで、韓国料理と日本料理の共通点や違いについて話すのが楽しいです。韓国料理のレシピや食文化についてはいくらでも話せるので、料理好きな方はぜひ話しかけてください！",
    interests: ["料理", "食文化", "スポーツ", "映画"],
  },

  // 中国語ネイティブ
  {
    name: "王 芳 (Wang Fang)", gender: Gender.FEMALE, age: 30, prefecture: 13,
    native: ["zh"], learn: [{ language: "ja", level: LanguageLevel.ADVANCED }, { language: "en", level: LanguageLevel.INTERMEDIATE }],
    introduction: "我是一名在东京工作的中国平面设计师，主要从事品牌视觉和包装设计。我学习日语已经有4年了，日常沟通基本没问题，但还是想继续提高，尤其是商务场合的表达和书面日语。我非常喜欢日本的传统文化，经常利用休息日去参观神社、茶室和博物馆。同时也对日本的现代艺术和设计充满热情。如果你对设计、艺术或文化感兴趣，我们一定能聊得很愉快！欢迎一起语言交换，互相学习。",
    interests: ["デザイン", "伝統文化", "アート", "旅行"],
  },
  {
    name: "李 明 (Li Ming)", gender: Gender.MALE, age: 27, prefecture: 27,
    native: ["zh"], learn: [{ language: "ja", level: LanguageLevel.INTERMEDIATE }, { language: "ko", level: LanguageLevel.BEGINNER }],
    introduction: "大阪の大学院で情報工学を専攻している中国人留学生です。日本語は中級レベルで、授業や日常生活では困らない程度に話せますが、もっと自然な表現を身につけたいです。韓国語は好きなアイドルグループがきっかけで少し勉強し始めました。アニメとゲームが大好きで、RPGや格闘ゲームを特に好みます。最近はラーメン屋巡りにもハマっていて、大阪のおすすめスポットならいくつも紹介できます。中国語を学びたい方には喜んでお手伝いします！",
    interests: ["アニメ", "ゲーム", "ラーメン", "漫画"],
  },
  {
    name: "陳 美玲 (Chen Meiling)", gender: Gender.FEMALE, age: 23, prefecture: 14,
    native: ["zh"], learn: [{ language: "en", level: LanguageLevel.INTERMEDIATE }],
    introduction: "I'm originally from Shanghai and currently living in Kanagawa while studying at university. My dream is to work in an international environment — perhaps in fashion, media, or cultural exchange — so I'm working hard to improve my English. I love music of all kinds, from Mandopop to Western indie, and I enjoy dancing in my free time. Discovering new cultures through food, film, and conversation is one of my greatest joys. I'm also happy to help you practice Chinese or share insights about life in Shanghai. Let's learn from each other and have fun along the way!",
    interests: ["Music", "Dancing", "Fashion", "Travel"],
  },
  {
    name: "張 偉 (Zhang Wei)", gender: Gender.MALE, age: 38, prefecture: 13,
    native: ["zh", "en"], learn: [{ language: "ja", level: LanguageLevel.BEGINNER }, { language: "fr", level: LanguageLevel.BEGINNER }],
    introduction: "I'm a bilingual business consultant based in Tokyo, working primarily in Chinese and English with clients across Asia and Europe. I grew up speaking both Mandarin and English, so I'm comfortable in either language. I've recently started learning Japanese and French purely for personal enrichment — I believe learning new languages keeps the mind sharp and opens doors to deeper cultural understanding. In my free time I enjoy wine tasting, playing tennis, and listening to jazz. I'm happy to help with either Chinese or English at any level, and would love a patient partner for my Japanese and French practice.",
    interests: ["Business", "Wine", "Tennis", "Jazz"],
  },

  // スペイン語ネイティブ
  {
    name: "María García", gender: Gender.FEMALE, age: 29, prefecture: 13,
    native: ["es"], learn: [{ language: "ja", level: LanguageLevel.INTERMEDIATE }, { language: "en", level: LanguageLevel.ADVANCED }],
    introduction: "¡Hola a todos! Soy de Madrid y llevo dos años viviendo en Tokio, donde trabajo como profesora de español en una academia de idiomas. Me enamoré de la cultura japonesa desde la primera vez que vi anime de pequeña, y ahora que vivo aquí, cada día descubro algo nuevo que me fascina. Me encanta la gastronomía japonesa —especialmente el ramen y el sushi—, visitar templos y explorar barrios tranquilos. Estudio japonés con mucha dedicación y ya puedo mantener conversaciones cotidianas. Si quieres mejorar tu español o simplemente charlar sobre nuestras culturas, ¡estaré encantada de ayudarte!",
    interests: ["スペイン料理", "フラメンコ", "アニメ", "旅行"],
  },
  {
    name: "Carlos Rodríguez", gender: Gender.MALE, age: 33, prefecture: 27,
    native: ["es"], learn: [{ language: "ja", level: LanguageLevel.BEGINNER }, { language: "pt", level: LanguageLevel.INTERMEDIATE }],
    introduction: "I'm a Venezuelan chef living and working in Osaka, where I run a small Latin American restaurant. My menu blends Venezuelan, Mexican, and Colombian flavors, and I love introducing Japanese customers to the diversity of Latin cuisine. I want to improve my Japanese so I can connect more deeply with my regulars and the local community — right now I can handle daily conversations but struggle with complex topics. I'm also brushing up my Portuguese since I have plans to collaborate with Brazilian suppliers. Music and photography are my biggest passions outside the kitchen. Let's exchange languages and cultures!",
    interests: ["料理", "音楽", "サッカー", "写真"],
  },
  {
    name: "Ana López", gender: Gender.FEMALE, age: 25, prefecture: 23,
    native: ["es"], learn: [{ language: "en", level: LanguageLevel.INTERMEDIATE }, { language: "zh", level: LanguageLevel.BEGINNER }],
    introduction: "I'm a Mexican exchange student spending a year at a university in Aichi. Being here has been one of the best experiences of my life — I've fallen in love with Japanese food, especially takoyaki and curry, and I've been exploring local anime culture too. I'm studying English to improve my academic and professional skills, and I recently started Chinese because I'm fascinated by how interconnected East Asian cultures are. I love drawing, going to art museums, and trying new dance styles. I'm friendly, open-minded, and always excited to make new friends across cultures. Come practice with me!",
    interests: ["Anime", "Asian food", "Art", "Dancing"],
  },

  // フランス語ネイティブ
  {
    name: "Sophie Martin", gender: Gender.FEMALE, age: 27, prefecture: 13,
    native: ["fr"], learn: [{ language: "ja", level: LanguageLevel.ADVANCED }, { language: "en", level: LanguageLevel.ADVANCED }],
    introduction: "Je suis journaliste française installée à Tokyo depuis trois ans. Je travaille pour un média francophone qui couvre l'actualité asiatique, ce qui me plonge chaque jour dans la langue et la culture japonaises. Mon japonais est courant — je mène des interviews et rédige des articles sans problème — mais je cherche toujours à progresser, surtout dans les nuances et l'expression orale naturelle. J'adore les mangas, la gastronomie japonaise et me perdre dans les petites rues de Tokyo le week-end. Si tu veux pratiquer le français ou l'anglais, je suis là avec plaisir. Échangeons nos langues et nos regards sur le monde !",
    interests: ["Journalism", "Manga", "Gastronomy", "Art"],
  },
  {
    name: "Pierre Dupont", gender: Gender.MALE, age: 36, prefecture: 14,
    native: ["fr"], learn: [{ language: "ja", level: LanguageLevel.INTERMEDIATE }],
    introduction: "I'm a French architect based in Kanagawa, working on residential and commercial projects across the greater Tokyo area. I've been in Japan for 3 years and study Japanese every day to communicate better with clients, contractors, and colleagues. Architecture is my life — I'm endlessly inspired by how Japanese design balances function, beauty, and nature. On weekends I love exploring traditional gardens and historic buildings on my bicycle. Wine is my other great passion, and I'm always happy to recommend a good French bottle. If you want to practice French or discuss architecture, art, or Japanese culture, let's connect!",
    interests: ["建築", "ワイン", "サイクリング", "庭園"],
  },
  {
    name: "Camille Bernard", gender: Gender.FEMALE, age: 22, prefecture: 13,
    native: ["fr"], learn: [{ language: "ko", level: LanguageLevel.BEGINNER }, { language: "zh", level: LanguageLevel.BEGINNER }],
    introduction: "I'm a French university student who just arrived in Tokyo for a semester abroad, and I'm absolutely loving it! I've been obsessed with K-pop since middle school, which sparked my interest in all things Asian. I just started both Korean and Chinese at the same time — yes, it's a lot, but I thrive on challenges! Music is a huge part of my life; I go to concerts whenever I can and love discovering new artists. I'm also really into fashion and street style. If you want a cheerful, motivated language partner who will never run out of things to talk about, I'm your person!",
    interests: ["K-POP", "Fashion", "Music", "Food"],
  },

  // ドイツ語ネイティブ
  {
    name: "Anna Schmidt", gender: Gender.FEMALE, age: 31, prefecture: 27,
    native: ["de"], learn: [{ language: "ja", level: LanguageLevel.INTERMEDIATE }, { language: "en", level: LanguageLevel.ADVANCED }],
    introduction: "I'm a German research scientist living in Osaka, working at a university laboratory on materials science. I've been in Japan for 2 years and have been studying Japanese since I arrived. I can now handle most daily conversations and read hiragana and katakana fluently, but kanji is still a mountain I'm climbing! Outside the lab, I love hiking in the Kansai mountains, attending classical music concerts, and visiting the many beautiful temples and shrines around Osaka and Kyoto. I'm very motivated to keep improving my Japanese and would love a regular practice partner. Happy to help with German or English in return!",
    interests: ["科学", "ハイキング", "クラシック音楽", "読書"],
  },
  {
    name: "Lukas Müller", gender: Gender.MALE, age: 28, prefecture: 13,
    native: ["de"], learn: [{ language: "ja", level: LanguageLevel.BEGINNER }, { language: "ko", level: LanguageLevel.BEGINNER }],
    introduction: "I'm a German game developer working at a studio in Tokyo. I've been passionate about Japanese RPGs since I was a kid — games like Final Fantasy and Dragon Quest are what first made me fall in love with Japan. That love eventually brought me here, and now I'm learning Japanese to better understand the culture behind the games I grew up with. I'm still a beginner, so I'd really appreciate a patient practice partner! I'm also a huge fan of Korean food and culture, and I just started dabbling in Korean too. In my free time I play board games, watch anime, and go to gaming cafes.",
    interests: ["ゲーム開発", "アニメ", "RPG", "韓国料理"],
  },

  // ポルトガル語ネイティブ
  {
    name: "Beatriz Silva", gender: Gender.FEMALE, age: 26, prefecture: 13,
    native: ["pt"], learn: [{ language: "ja", level: LanguageLevel.INTERMEDIATE }, { language: "en", level: LanguageLevel.INTERMEDIATE }],
    introduction: "I'm a Brazilian dancer living in Tokyo, where I teach samba and bossa nova classes to both Japanese and international students. I moved here two years ago and absolutely fell in love with the city. I'm learning Japanese to build a deeper connection with my students and the local dance community — right now I can get by in daily life but I want to become truly fluent. Outside of dancing, I'm obsessed with Japanese food, especially yakitori and okonomiyaki. Music is my life — I listen to everything from bossa nova classics to modern Brazilian funk. Always happy to share a bit of Brazil with you!",
    interests: ["サンバ", "ボサノバ", "ダンス", "日本食"],
  },
  {
    name: "Rafael Oliveira", gender: Gender.MALE, age: 34, prefecture: 27,
    native: ["pt"], learn: [{ language: "ja", level: LanguageLevel.BEGINNER }, { language: "es", level: LanguageLevel.INTERMEDIATE }],
    introduction: "I'm a Brazilian football coach working with a youth academy in Osaka. I came to Japan two years ago and have been amazed by the dedication and discipline of Japanese players. I'm learning Japanese to communicate better with the kids, their parents, and the coaching staff — it's essential for doing my job well. I'm also polishing my Spanish since I'm planning to take a coaching course in Spain next year. When I'm not on the training ground, you'll find me at a BBQ with friends, listening to pagode and forró, or watching football from around the world. Vamos!",
    interests: ["サッカー", "BBQ", "音楽", "旅行"],
  },

  // その他・多言語
  {
    name: "高橋 凛", gender: Gender.OTHER, age: 23, prefecture: 13,
    native: ["ja"], learn: [{ language: "en", level: LanguageLevel.INTERMEDIATE }, { language: "fr", level: LanguageLevel.BEGINNER }],
    introduction: "東京でフリーランスのグラフィックデザイナーとして活動しています。ブランドロゴ、ポスター、SNSコンテンツなど幅広い制作をしています。英語は海外クライアントとのやり取りで必要になり、フランス語はフランスのデザインシーンへの憧れから勉強を始めました。アートと音楽が大好きで、ライブやギャラリーにはよく足を運びます。LGBTQ+コミュニティとも深く関わっており、多様性や表現の自由について語り合える方は特に大歓迎です。お互いの言語と文化をリスペクトしながら楽しく交流しましょう。",
    interests: ["グラフィックデザイン", "アート", "音楽", "映画"],
  },
  {
    name: "西村 光", gender: Gender.OTHER, age: 29, prefecture: 40,
    native: ["ja"], learn: [{ language: "de", level: LanguageLevel.INTERMEDIATE }],
    introduction: "福岡を拠点に活動するフォトグラファーです。ポートレート・風景・ドキュメンタリーと幅広く撮影していますが、特に人の表情や日常の瞬間を切り取ることが好きです。ドイツはバウハウスをはじめとするデザインや写真の文化が非常に豊かで、それを深く理解するためにドイツ語を勉強し始めました。いつかベルリンやライプツィヒで現地のアーティストと交流することが夢です。写真・旅・自然の話なら何時間でも話し続けられます。ドイツ語をゆっくり丁寧に教えてもらえる方を探しています。",
    interests: ["写真", "旅行", "自然", "アート"],
  },
  {
    name: "橋本 真由", gender: Gender.FEMALE, age: 44, prefecture: 28,
    native: ["ja"], learn: [{ language: "es", level: LanguageLevel.BEGINNER }, { language: "pt", level: LanguageLevel.BEGINNER }],
    introduction: "兵庫県でピアノ教室を主宰しています。子どもから大人まで幅広い生徒に教えており、音楽を通じて人と繋がる喜びを日々感じています。定年後の夢はブラジルのリオのカーニバルと、アルゼンチンでタンゴを習うことです。その夢に向けてスペイン語とポルトガル語を勉強し始めました。どちらもまだ初歩の段階ですが、毎日少しずつ楽しみながら続けています。クラシック音楽と料理が大きな趣味で、週末はのんびりと腕を振るっています。ゆっくりでも確実に上達できるよう、優しく教えてもらえると嬉しいです。",
    interests: ["ピアノ", "クラシック音楽", "料理", "旅行"],
  },
  {
    name: "前田 裕也", gender: Gender.MALE, age: 21, prefecture: 34,
    native: ["ja"], learn: [{ language: "ko", level: LanguageLevel.INTERMEDIATE }, { language: "zh", level: LanguageLevel.BEGINNER }],
    introduction: "広島の大学でアジア地域研究を専攻しています。韓国の政治・文化・歴史に特に興味があり、卒業論文も韓国をテーマに書く予定です。韓国語はYouTubeや独学で中級レベルまで伸ばしましたが、リスニングとスピーキングをもっと鍛えたいです。中国語も第二外国語として勉強中で、まだ初歩ですが頑張っています。休日は地元広島でカープの試合を観たり、友達とゲームをして過ごしています。アジア文化全般が大好きなので、いろんな国の方と話してみたいです！",
    interests: ["野球", "ゲーム", "アジア文化", "映画"],
  },
  {
    name: "藤田 実咲", gender: Gender.FEMALE, age: 37, prefecture: 13,
    native: ["ja"], learn: [{ language: "fr", level: LanguageLevel.ADVANCED }],
    introduction: "東京のパティスリーでシェフパティシエとして働いています。フランス菓子の奥深さに魅せられ、本場の文献やレシピを原文で読むためにフランス語を本格的に学び始めました。今では上級レベルに達し、フランス人パティシエとも問題なく会話できます。マカロン、エクレア、タルトなどの製作が専門ですが、日本のモダンフレンチスイーツにも力を入れています。ワインとの相性を考えながらデザートを作るのが好きで、ワイン好きの方とも盛り上がれると思います。甘いものが好きな方、ぜひ語り合いましょう！",
    interests: ["パティシエ", "フランス菓子", "ワイン", "旅行"],
  },
  {
    name: "上田 龍", gender: Gender.MALE, age: 50, prefecture: 25,
    native: ["ja"], learn: [{ language: "en", level: LanguageLevel.INTERMEDIATE }, { language: "zh", level: LanguageLevel.INTERMEDIATE }],
    introduction: "滋賀県で製造業の中小企業を経営しています。海外取引先とのコミュニケーションのために英語と中国語をビジネスレベルで活用しており、どちらも実務で鍛えてきた実践的なスキルがあります。経営・貿易・異文化ビジネスについて深く語り合える方と繋がりたいと思っています。仕事以外では、茶道を長年嗜んでおり、日本の精神文化に誇りを持っています。ゴルフとビジネス書の読書も趣味です。さまざまなバックグラウンドを持つ方の話を聞くことが好きで、刺激的な交流を楽しみにしています。",
    interests: ["経営", "茶道", "ゴルフ", "読書"],
  },
  {
    name: "河野 はな", gender: Gender.FEMALE, age: 20, prefecture: 13,
    native: ["ja"], learn: [{ language: "ko", level: LanguageLevel.BEGINNER }, { language: "en", level: LanguageLevel.BEGINNER }],
    introduction: "東京の短期大学で観光・ホスピタリティを学んでいます。好きなK-POPアイドルの影響で韓国語を始め、今では簡単な日常会話ができるようになりました。将来はホテルや航空業界で働きたいので、英語も並行して勉強中です。明るくてフレンドリーな性格で、初対面の方とでもすぐ打ち解けられます。アイドルやK-POP全般はもちろん、ショッピングやカフェ巡りが大好きです。同世代の方だけでなく、年齢問わずいろんな方とお話ししてみたいです。気軽に話しかけてください！",
    interests: ["K-POP", "アイドル", "ショッピング", "カフェ"],
  },
  {
    name: "Yuki Tanaka", gender: Gender.FEMALE, age: 27, prefecture: 14,
    native: ["ja", "en"], learn: [{ language: "fr", level: LanguageLevel.INTERMEDIATE }, { language: "de", level: LanguageLevel.BEGINNER }],
    introduction: "I'm half Japanese and half American, born and raised in Kanagawa. Growing up bilingual gave me a deep appreciation for languages and how they shape the way we see the world. I now work for an international fashion company where I often act as a bridge between the Japanese and overseas teams. For work I'm learning French and German — French for our Paris partnerships and German for a new Berlin collaboration. I love the fashion world but also have a quiet side: I enjoy visiting art galleries, tasting wine, and traveling slowly to really absorb local culture. Happy to help with either English or Japanese!",
    interests: ["Fashion", "Travel", "Art", "Wine"],
  },
  {
    name: "竹内 誠一郎", gender: Gender.MALE, age: 43, prefecture: 6,
    native: ["ja"], learn: [{ language: "es", level: LanguageLevel.INTERMEDIATE }],
    introduction: "山形県の病院で内科医として働いています。数年前にボランティア団体を通じて中南米での医療支援活動の話を聞き、自分もいつか参加したいと思うようになりました。現地で直接患者さんやスタッフとコミュニケーションを取るためにスペイン語の勉強を始め、今は中級レベルに達しています。仕事の合間に東北の山を登るのが最大のリフレッシュで、岩手山や月山などがお気に入りです。医療・国際支援・登山・読書などについて語れる方と繋がりたいです。スペイン語ネイティブの方、ぜひ会話の練習に付き合ってください。",
    interests: ["医療", "登山", "読書", "クラシック音楽"],
  },
  {
    name: "岡田 涼子", gender: Gender.FEMALE, age: 35, prefecture: 39,
    native: ["ja"], learn: [{ language: "pt", level: LanguageLevel.INTERMEDIATE }, { language: "en", level: LanguageLevel.ADVANCED }],
    introduction: "高知県でサーフィンスクールを経営しています。高知の海は日本でも屈指のサーフスポットで、国内外から多くのサーファーが訪れます。数年前に常連になったブラジル人サーファーたちと仲良くなり、彼らのポルトガル語と陽気な文化に一気に魅了されました。今では中級レベルで会話できるようになり、ブラジルのサーフ文化やビーチライフについて語り合えるのが楽しみです。英語も外国人のお客さん対応で日常的に使っています。海・サーフィン・アウトドアが好きな方、ぜひ話しかけてください！",
    interests: ["サーフィン", "マリンスポーツ", "音楽", "旅行"],
  },
]

async function main() {
  console.log("Deleting existing users...")
  await prisma.learnStatus.deleteMany()
  await prisma.user.deleteMany()

  console.log(`Seeding ${users.length} users...`)
  const hashedPassword = await bcrypt.hash("password123", 10)

  for (let i = 0; i < users.length; i++) {
    const u = users[i]
    const email = `user${i + 1}@example.com`
    const birthday = new Date(
      new Date().getFullYear() - u.age,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    )

    await prisma.user.create({
      data: {
        name: u.name,
        email,
        password: hashedPassword,
        gender: u.gender,
        birthday,
        prefectureCode: u.prefecture,
        nativeLanguage: u.native,
        introduction: u.introduction,
        interests: u.interests,
        learnLanguage: {
          create: u.learn.map((l) => ({
            language: l.language,
            level: l.level,
          })),
        },
      },
    })
  }

  console.log(`✅ Seeded ${users.length} users.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
