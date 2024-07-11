const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let additionalData = [
  { id: 1, artist_name: "Vaundy", bio: "Vaundyの音楽はポップやインディーズの要素を融合させた、独自の感性と深みのあるサウンドが特徴的です。彼の歌声は独特でありながらも心地よく、その楽曲はしばしば日常や個人の感情をテーマにしています。特に代表曲「卒業」や「良いのかな」などは、そのリリックの深さとメロディの美しさが多くの聴衆に響きました。Vaundyは若手アーティストとして注目を集め、その独創性と才能で日本の音楽シーンに新しい風を吹き込んでいます。彼の音楽はその感受性と音楽性で多くのリスナーに支持されており、今後の活躍にも期待が寄せられています。", homepage: "https://vaundy.jp" },
  { id: 2, artist_name: "BLUE ENCOUNT", bio: "BLUE ENCOUNTの音楽はロックやポップパンクの要素を融合させた、エネルギッシュで力強いサウンドが特徴的です。彼らの歌声は情熱的であり、その楽曲はしばしば勇気や希望、挑戦などをテーマにしています。特に代表曲「手紙」や「DAY×DAY」などは、そのダイナミックな演奏と共に多くのファンを魅了しました。BLUE ENCOUNTはバンドとしてのキャリアを積み重ね、その成長と共に日本のロックシーンで確固たる地位を築いています。彼らの音楽はパワフルなエモーションと、ポジティブなメッセージが詰まった魅力で、多くの聴衆に愛され続けています。", homepage: "https://blueencount.jp" },
  { id: 3, artist_name: "WurtS", bio: "WurtSは独自の音楽スタイルで知られる日本のアーティストです。ポップ、ロック、エレクトロニカを融合した楽曲は、キャッチーかつ複雑な構成が特徴です。自身で作詞、作曲、編曲、プロデュースを手掛けるセルフプロデュース能力も高く評価されています。また、ミュージックビデオやライブパフォーマンスにおいて視覚的な演出にも力を入れており、音楽と映像の融合が魅力です。幅広い年齢層に支持され、特に若年層に人気があります。", homepage: "https://wurts.jp" },
   { id: 4, artist_name: "wacci", bio: "wacciは、感情豊かでメロディアスな楽曲を得意とし、その歌声は聴く人の心に直接響きます。彼らの音楽はしばしば恋愛や日常の情景をテーマにしており、その歌詞はリスナーに共感を呼び起こします。また、ライブパフォーマンスでは熱狂的なファンを惹きつけ、その独自の音楽スタイルと感性豊かな表現力が特徴です。", homepage: "https://wacci.jp/" },
   { id: 5, artist_name: "SEKAI NO OWARI", bio: "SEKAI NO OWARIは、幻想的でファンタジックな世界観を持つ楽曲と、洗練された音楽性が特徴です。彼らの音楽はポップ、ロック、エレクトロニカなど複数のジャンルを融合させ、独自のサウンドを築いています。また、その壮大なステージセットや映像表現により、ライブパフォーマンスは視覚的にも魅力的です。SEKAI NO OWARIの楽曲はしばしば希望や夢、愛情などのテーマを掘り下げ、多くのリスナーに感動と共鳴を与えています。", homepage: "https://sekainoowari.jp/" },
   { id: 6, artist_name: "Mrs. GREEN APPLE", bio: "Mrs. GREEN APPLEは、明るく爽やかなポップロックサウンドが特徴的です。彼らの楽曲はキャッチーでメロディアスでありながら、独創性に富んだアレンジが施されています。特に、リードボーカルの声質やバンド全体の演奏が認められており、ライブパフォーマンスでもその魅力を存分に発揮しています。彼らの歌詞にはしばしば青春や成長、日常の感情がテーマとして取り上げられ、聴く人々に共感を呼び起こします。", homepage: "https://mrsgreenapple.com/" },
   { id: 7, artist_name: "yonige", bio: "yonigeは、実験的で独創的な音楽スタイルが特徴的なバンドです。彼らの楽曲はジャンルを超えた要素を取り入れつつも、ロックやポップの要素が強く現れます。特に、独特なボーカルスタイルと斬新な楽曲アレンジが注目され、ファンの間で独自のカルチャーアイコンとして支持されています。彼らの歌詞にはしばしば日常の哲学や社会的なテーマが掘り下げられ、聴く人々に深い感動を与えます。", homepage: "https://yonige.net/" },
   { id: 8, artist_name: "indigo la End", bio: "indigo la Endは、独特な感性と繊細なメロディが特徴的なバンドです。彼らの音楽はエモーショナルでありながら、深い哲学的なテーマ性も持ち合わせています。特に、リードボーカルの歌声と楽曲の構成がバランスよく調和し、独自の音楽世界を築いています。彼らの歌詞には日常の喜びや悲しみ、青春の情景が描かれ、多くのリスナーに共感を呼び起こしています。", homepage: "https://indigolaend.com/" },
   { id: 9, artist_name: "あいみょん", bio: "あいみょんの音楽は、独特の感性と深い感情表現が特徴的です。彼女の歌声は柔らかく力強く、聴く人の心に直接響きます。彼女の楽曲はしばしば日常の喜びや悲しみ、人間関係の複雑さをテーマにしており、その歌詞には深い共感が込められています。また、彼女の音楽はポップな要素とエモーショナルな要素が融合し、幅広い世代から支持されています。", homepage: "https://www.aimyong.net/" },
   { id: 10, artist_name: "クリープハイプ", bio: "クリープハイプの音楽は、独特の世界観と深い詩情が特徴的です。バンドのリーダーである尾崎世界観の独特の歌声と、斬新で実験的な楽曲アレンジが彼らのサウンドを形成しています。彼らの歌詞にはしばしば日常のささいな出来事から深い哲学的なテーマまで幅広く取り上げられ、その表現力が聴く人の心を捉えます。クリープハイプの音楽はロックのエッセンスを持ちながらも、ポップやフォークの要素も巧みに取り入れており、多様な音楽性が魅力です。", homepage: "https://www.creephyp.com/" },
   { id: 11, artist_name: "ちゃんみな", bio: "ちゃんみなの音楽は、力強いラップと独特のリリックが特徴的です。彼女の歌詞は日常の生活や自身の経験に基づき、時には社会的なテーマも取り上げます。彼女の音楽スタイルはヒップホップを基盤としながらも、ポップな要素やエレクトロニックミュージックの影響も感じさせます。また、彼女のパフォーマンスはエネルギッシュでありながら、その歌声とリズム感が聴衆を引き込みます。ちゃんみなは近年、日本国内外で注目を集める新しい世代の音楽アーティストの一人として確固たる地位を築いています。", homepage: "https://chanmina.com/" },
   { id: 12, artist_name: "Saucy Dog", bio: "Saucy Dogは、パンクロックやロックンロールの要素を取り入れたエネルギッシュな音楽スタイルが特徴です。彼らの楽曲は力強いギターリフとメロディックなボーカルが特徴で、ライブパフォーマンスでは熱狂的なファンを魅了します。また、彼らの歌詞には反抗的な姿勢や若者の日常のリアリティが反映されており、聴く人々に強いインパクトを与えます。Saucy Dogは、ロックシーンでの活動を通じて、その個性と音楽性を確立しています。", homepage: "https://saucydog.jp/" },
   { id: 13, artist_name: "藤井　風", bio: "藤井風の音楽は、深い感情を込めた歌声と、アコースティックギターを中心としたシンプルなアレンジが特徴的です。彼の歌詞はしばしば日常の風景や人間の喜びや哀しみを描き、聴く人の心に直接訴えかけます。彼の音楽はフォークやポップスの要素を取り入れつつも、独自のメロディと表現力が特徴です。藤井風は若手ながらも、その独特の音楽スタイルと深い歌詞で多くの支持を集め、日本国内外で注目を浴びています。", homepage: "https://fujiikaze.com/" },
   { id: 14, artist_name: "Ado", bio: "Adoの音楽は、エモーショナルでパワフルな歌声と、繊細でメロディアスな楽曲が特徴的です。彼女の歌詞はしばしば内面の葛藤や感情の起伏を描き、その深い表現力が聴く人の心を打ちます。また、彼女の音楽はJ-POPやロックの要素を取り入れつつも、独自のスタイルとアプローチで新しい音楽シーンを築いています。Adoは若手ながらも、その才能と表現力で多くのリスナーに影響を与え、注目を集めています。", homepage: "https://www.universal-music.co.jp/ado/" },
   { id: 15, artist_name: "back number", bio: "back numberの音楽は、メロディアスで感情豊かな楽曲が特徴的です。彼らの歌詞はしばしば恋愛や日常の切なさ、喜びをテーマにしており、聴く人々に深い感動を与えます。特に、ボーカルの滝沢秀明の独特の歌声と、バンド全体のアンサンブルが彼らの音楽を支えています。back numberの音楽はポップスやロックの要素を巧みに融合させながらも、その独自の感性と楽曲のクオリティで多くのファンを魅了しています。", homepage: "https://backnumber.info/" },
   { id: 16, artist_name: "女王蜂", bio: "女王蜂の音楽は、パワフルでダイナミックなロックサウンドが特徴的です。彼らの楽曲は力強いボーカルとアグレッシブなギターリフが特徴であり、そのステージパフォーマンスはエネルギッシュで圧倒的な存在感を放ちます。また、彼らの歌詞には社会や個人の内面を掘り下げたテーマが多く取り入れられており、そのリリックも鋭く印象的です。女王蜂はロックシーンでの活動を通じて、その独自の音楽性とパフォーマンスで多くの支持を集めています。", homepage: "https://www.ziyoou-vachi.com/" },
   { id: 17, artist_name: "WANIMA", bio: "WANIMAの音楽は、ポップな要素を取り入れたエネルギッシュでキャッチーなロックサウンドが特徴的です。彼らの楽曲は明るく前向きなメッセージが多く、リズム感溢れる演奏と共に聴く人を元気付けます。特に、ライブパフォーマンスではその高いパフォーマンス力と親しみやすいスタイルでファンを魅了しています。WANIMAの音楽は若者を中心に広く支持されており、日本国内外で活動を展開しています。", homepage: "https://wanima.net/" },
   { id: 18, artist_name: "Eve", bio: "Eveの音楽は独自の感性と繊細な歌声が特徴的で、エレクトロニックやポップスの要素を巧みに取り入れています。彼の楽曲はしばしば幻想的でありながらも、深い哲学的なテーマ性を持ち、聴く人に青春の情景や感情の葛藤を鮮やかに描き出します。また、彼の音楽はオリジナリティに溢れ、特に若い世代から支持を集めています。Eveはその音楽性と表現力で、日本のポップカルチャーに新しい風を吹き込んでいます。", homepage: "https://eveofficial.com/" },
   { id: 19, artist_name: "RADWINMPS", bio: "RADWIMPSの音楽は、独創性に富んだメロディと深い歌詞が特徴的です。彼らの楽曲は時に実験的でありながらも、ポップでキャッチーな要素も含んでおり、その音楽性は多様で広範なファン層に支持されています。特に、バンドのリーダーである野田洋次郎の感受性豊かな歌声と、バンドメンバーそれぞれの楽器のテクニックが彼らのサウンドを特徴付けています。RADWIMPSは、映画『君の名は。』のサウンドトラックで国内外で大きな注目を集め、日本を代表するバンドの一つとして確固たる地位を築いています。", homepage: "https://radwimps.jp/" },
   { id: 20, artist_name: "ずっと真夜中でいいのに。", bio: "ずっと真夜中でいいのに。の音楽は、独特のサウンドと哲学的な歌詞が特徴的です。ユニットの音楽はポップな要素を取り入れつつも、深いメッセージや情感を豊かに表現しています。特に、ボーカルのACAねのキャッチーで透明感のある歌声が印象的であり、バンドの楽曲全体に独自の色合いを与えています。ずっと真夜中でいいのに。は、新しい音楽スタイルで若いリスナーを中心に支持を集め、日本の音楽シーンで注目を浴びています。", homepage: "https://zutomayo.net/" },
   { id: 21, artist_name: "THE ORAL CIGARETTES", bio: "THE ORAL CIGARETTESの音楽は、力強いロックサウンドと独特のボーカルスタイルが特徴的です。バンドのリーダーである山中拓也の独特のヴォーカルと、テクニカルでダイナミックな楽曲アレンジが彼らのサウンドを支えています。彼らの歌詞には社会的な問題や個人の内面を描いたものが多く、その表現力がリスナーに強い共鳴を呼び起こします。また、ライブパフォーマンスではそのエネルギッシュさと情熱が際立ち、ファンを魅了しています。THE ORAL CIGARETTESはロックシーンでの活動を通じて、その独自の音楽性で多くの支持を集めています。", homepage: "https://theoralcigarettes.com/" },
   { id: 22, artist_name: "YOASOBI", bio: "YOASOBIの音楽は、エレクトロニックミュージックとポップスの要素を融合させた独自のサウンドが特徴的です。ユニットの楽曲はしばしばストーリーテリングの要素を含み、聴く人に物語を感じさせる魅力があります。特に、ボーカルのikuraの透明感のある歌声と、コンポーザーのayaseの緻密なアレンジが彼らの音楽を支えています。YOASOBIの歌詞には時には切なさや希望、日常の風景が織り交ぜられ、その感情表現が聴く人の心を深く揺さぶります。YOASOBIは若者を中心に急速に人気を博し、日本の音楽シーンで注目を集めています。", homepage: "https://www.yoasobi-music.jp/" },
   { id: 23, artist_name: "優里", bio: "優里の音楽は、キャッチーでメロディアスな楽曲が特徴的です。彼女の歌声は透明感があり、その歌詞には日常の感情や生活の一場面が綴られています。特に彼女の楽曲は若者を中心に広く支持され、そのポップな要素と感情豊かな歌詞が聴く人の心を打ちます。優里は近年、その独特の音楽スタイルと表現力で、日本の音楽シーンで注目を集めています。", homepage: "https://www.yuuriweb.com/" },
   { id: 24, artist_name: "Official 髭男 dism", bio: "Official髭男dismの音楽は、メロディアスで感動的な楽曲が特徴的です。彼らの楽曲はポップスやロックの要素を巧みに取り入れつつも、独自の感性と表現で多くのリスナーに訴えかけます。特に、ボーカルの藤原聡の歌声は力強く魅力的であり、バンド全体のアンサンブルも彼らのサウンドを引き立てています。Official髭男dismはその音楽性と共に、日本国内外で大きな人気を誇り、数々のヒット曲を生み出しています。", homepage: "https://higedan.com/" },
   { id: 25, artist_name: "ポルカドットスティングレイ", bio: "ポルカドットスティングレイの音楽は、エネルギッシュでポップなロックサウンドが特徴的です。彼らの楽曲はキャッチーなメロディと、独特のリズム感が特徴であり、聴く人を魅了します。特に、ボーカルのヒグチアイのパワフルで可愛らしい歌声がバンドの象徴となっています。ポルカドットスティングレイはその独自の音楽スタイルと、ライブパフォーマンスでファンを楽しませ、日本の音楽シーンで確固たる地位を築いています。", homepage: "https://polkadot-stingray.jp/" },
   { id: 26, artist_name: "Maneskin", bio: "Maneskinは、イタリアのロックバンドで、Maneskinの音楽は、パワフルでエネルギッシュなロックサウンドが特徴的です。彼らの楽曲は、グルーヴィーでダイナミックな演奏と、ボーカルのダミアーノの力強い歌声が印象的です。バンドのスタイルはロックやポップの要素を融合させながらも、彼ら独自のアイデンティティとエキサイティングなステージパフォーマンスが支持されています。Maneskinは特にユーロビジョン・ソング・コンテスト2021での活躍が知られ、国際的にも注目を集めています。", homepage: "https://maneskin.com/" },
   { id: 27, artist_name: "Shawn Mendes", bio: "Shawn Mendes（ショーン・メンデス）は、カナダ出身のシンガーソングライターで、Shawn Mendesの音楽は、ポップスやロックの要素を取り入れたキャッチーで感情豊かな楽曲が特徴的です。彼の歌声は透明感があり、しばしば恋愛や成長に関するテーマを掘り下げた歌詞が特徴です。特に彼の曲の多くは、その感受性とメロディアスなアレンジが若者を中心に大きな支持を得ています。また、Shawn Mendesは音楽活動だけでなく、その外見やパーソナルな魅力もファンに人気です。", homepage: "https://www.shawnmendesofficial.com/#/" },
   { id: 28, artist_name: "Maroon 5", bio: "Maroon 5（マルーン・ファイブ）は、アメリカ合衆国のポップロックバンドで、Maroon 5の音楽は、ポップスやファンクの要素を融合させたスタイリッシュで洗練されたサウンドが特徴的です。バンドは、リードボーカルのアダム・レヴィーンの魅力的な歌声と、エレクトリックギター、キーボード、ベース、ドラムなどの多様な楽器の組み合わせで知られています。彼らの楽曲はしばしば恋愛や人間関係のテーマを取り扱い、そのポップでメロディアスなサウンドが広く聴衆に支持されています。Maroon 5は長年に渡り、国際的に成功を収め、グラミー賞を含む数々の賞を受賞しています。", homepage: "https://www.maroon5.com/" },
   { id: 29, artist_name: "Justin Bieber", bio: "Justin Bieber（ジャスティン・ビーバー）は、カナダ出身のシンガーソングライターで、Justin Bieberの音楽は、ポップやR&Bの要素を融合させたスタイリッシュで現代的なサウンドが特徴的です。彼の歌声は豊かで感情的な表現があり、特に若者を中心に幅広い世代から支持されています。初期のキャリアからYouTubeでの動画が話題となり、その後世界的なスターダムにのし上がりました。彼の楽曲はしばしば愛情や成長、人間関係の葛藤をテーマにし、その感情豊かな歌詞とヒット曲が数多くあります。Justin Bieberは音楽だけでなく、ファッションや社会的な活動でも注目を集めています。", homepage: "https://www.justinbiebermusic.com/" },
   { id: 30, artist_name: "Taylor Swift", bio: "Taylor Swift（テイラー・スウィフト）は、アメリカ出身のシンガーソングライターで、Taylor Swiftの音楽は、カントリーからポップまで幅広いジャンルを網羅し、その才能と多様性で知られています。彼女の歌詞はしばしば個人の体験や感情を描写し、そのリアリティと共感性が彼女のファンに支持されています。特に彼女の楽曲は恋愛や成長、社会的な問題をテーマにしたものが多く、その深みとポップさが同居したスタイルが特徴です。Taylor Swiftは数々のヒット曲やアルバムを生み出し、グラミー賞を含む数々の賞を受賞するなど、国際的に高い評価を得ています。", homepage: "https://www.taylorswift.com/" },
   { id: 31, artist_name: "Ed Sheeran", bio: "Ed Sheeran（エド・シーラン）は、イギリス出身のシンガーソングライターで、Ed Sheeranの音楽は、ポップやフォークの要素を取り入れた独特のサウンドが特徴的です。彼の歌声は情感豊かでありながらも、力強さと繊細さを兼ね備えています。彼の楽曲はしばしば個人的な経験や感情をテーマにし、そのリリカルな歌詞とメロディが聴く人の心を打ちます。特にギターを駆使したパフォーマンスが彼の音楽の特徴であり、その独特のスタイルが多くのファンに支持されています。Ed Sheeranは世界的なスターであり、多くのヒット曲と共にグラミー賞などの数々の賞を受賞しています。", homepage: "https://www.edsheeran.com/" },
   { id: 32, artist_name: "Shakira", bio: "Shakira（シャキーラ）は、コロンビア出身のシンガーソングライターで、Shakiraの音楽は、ラテンポップやロック、ダンスミュージックの要素を融合させた独自のスタイルが特徴的です。彼女の歌声はパワフルで感情的な表現があり、特にその特徴的なヒップムーブとダイナミックなパフォーマンスが彼女のシグネチャーとなっています。彼女の楽曲はしばしば愛情や解放、社会的な問題をテーマにし、その多様性とリズミカルな魅力が世界中のファンを引きつけています。Shakiraは国際的なスーパースターであり、その音楽活動だけでなく、チャリティー活動や人権問題への取り組みでも高い評価を受けています。", homepage: "https://www.shakira.com/" },
   { id: 33, artist_name: "Katy Perry", bio: "Katy Perry（ケイティ・ペリー）は、アメリカ出身のシンガーソングライターで、Katy Perryの音楽はポップスやダンスミュージックの要素を取り入れた、カラフルでエネルギッシュなサウンドが特徴的です。彼女の歌声は力強く、時には感情的でありながらも、楽しくキャッチーなメロディが彼女の楽曲の特徴です。彼女の曲はしばしば愛や自己表現、自己肯定感などのテーマを掘り下げ、特に若い女性を中心に広く支持されています。Katy Perryは多くのヒット曲を生み出し、そのポップなスタイルとパフォーマンスで国際的なスターダムを築いています。", homepage: "https://www.katyperry.com/" },
   { id: 34, artist_name: "Eminem", bio: "Eminem（エミネム）は、アメリカ出身のラッパーで、Eminemの音楽は、その独特のラップスタイルとリリックが特徴的です。彼の歌詞はしばしば彼自身の人生や経験、社会的な問題を率直に描写し、その言葉の鋭さと表現力が彼のファンに強い印象を与えています。彼の楽曲は時には過激で挑発的でありながらも、その才能と技術で多くのリスナーに訴えかけます。特に彼のアルバム「The Marshall Mathers LP」や「The Eminem Show」などが高い評価を受け、彼の地位を確立しました。Eminemはラップ界の重要な存在であり、数々の賞を受賞し、国際的にも高い影響力を持つアーティストです。", homepage: "https://www.eminem.com/" },
   { id: 35, artist_name: "Avicii", bio: "Avicii（アヴィーチー）は、スウェーデン出身のDJ兼プロデューサーで、Aviciiの音楽はエレクトロニックダンスミュージック（EDM）の分野で大きな影響力を持ち、そのメロディアスで感動的な楽曲が特徴的です。彼の楽曲はしばしばエネルギッシュでありながらも、感情的な要素を含んでおり、そのサウンドは多くの人々に共鳴しました。特に代表曲「Wake Me Up」や「Levels」などは世界的なヒットとなり、EDMシーンにおいて革新的な存在として知られています。Aviciiはその才能と業績により多くの賞を受賞し、数々のアーティストやファンに深い感動と影響を与えました。彼の突然の死は音楽界に大きな喪失感をもたらしましたが、彼の音楽は今もなお多くの人々に愛され続けています。", homepage: "https://avicii.com/" },
   { id: 36, artist_name: "Bruno Mars", bio: "Bruno Mars（ブルーノ・マーズ）は、アメリカ出身のシンガーソングライター兼プロデューサーで、Bruno Marsの音楽は、ファンク、R&B、ポップスの要素を巧みに融合させたスタイリッシュでダイナミックなサウンドが特徴的です。彼の歌声はその幅広い音域と滑らかな表現力で知られ、その楽曲はしばしば恋愛やパーティー、自己表現などのテーマを取り扱います。特に「Just the Way You Are」や「Uptown Funk」などのヒット曲は国際的な成功を収め、彼の音楽キャリアを支えています。Bruno Marsは多くのグラミー賞を含む数々の賞を受賞し、そのステージパフォーマンスや音楽的才能で広く賞賛されています。", homepage: "https://www.brunomars.com/" },
   { id: 37, artist_name: "Luis Fonsi", bio: "Luis Fonsi（ルイス・フォンシ）は、プエルトリコ出身のシンガーソングライターで、Luis Fonsiの音楽は、ラテンポップやバラードの要素を取り入れた感動的でロマンチックなサウンドが特徴的です。彼の歌声は柔らかく力強く、感情を込めた歌唱で聴く人の心を魅了します。特に代表曲「Despacito」は世界的な大ヒットとなり、そのリズミカルで耳に残るメロディと踊りやすいリズムが多くのファンに愛されました。Luis Fonsiはその音楽で多くの賞を受賞し、ラテン音楽界での重要な地位を確立しています。彼の楽曲は恋愛や感動、人間関係のテーマをテーマにしたものが多く、その歌詞の深さと音楽性が彼の魅力を引き立てています。", homepage: "https://www.luisfonsi.com/" },
   { id: 38, artist_name: "Charlie Puth", bio: "Charlie Puth（チャーリー・プース）は、アメリカ出身のシンガーソングライターで、Charlie Puthの音楽はポップスやR&Bの要素を融合させたスタイリッシュで洗練されたサウンドが特徴的です。彼の歌声は柔らかく感情豊かでありながらも、高音域での表現力が際立ちます。彼の楽曲はしばしば恋愛や別れ、成長や自己探求などのテーマを取り扱い、そのリリカルな歌詞とキャッチーなメロディが多くのリスナーに響きます。特に「Attention」や「See You Again」などのヒット曲は国際的な成功を収め、彼の人気を不動のものとしました。Charlie Puthはその音楽性だけでなく、プロデューサーとしても活躍し、多くの楽曲でその才能を発揮しています。", homepage: "https://www.charlieputh.com/" },
   { id: 39, artist_name: "Ariana Grande", bio: "Ariana Grande（アリアナ・グランデ）は、アメリカ出身のシンガーソングライターで、Ariana Grandeの音楽はポップやR&Bの要素を融合させた、力強く感情豊かなサウンドが特徴的です。彼女の歌声はその広い音域と柔軟性で知られ、感情のこもった歌唱が多くのファンを惹きつけています。彼女の楽曲はしばしば愛や自己肯定感、女性のエンパワーメントなどのテーマを掘り下げ、特に若い世代に強い共感を呼び起こします。代表曲としては「Thank U, Next」や「7 Rings」などがあり、これらの曲は世界中で大ヒットしました。Ariana Grandeはその歌唱力や音楽的才能だけでなく、ファッションや演技など多岐にわたる才能を持ち、国際的なスーパースターとして活躍しています。", homepage: "https://www.arianagrande.com/" },
   { id: 40, artist_name: "Ricky Martin", bio: "Ricky Martin（リッキー・マーティン）は、プエルトリコ出身のシンガーソングライターで、Ricky Martinの音楽はラテンポップやダンスミュージックの要素を取り入れた、情熱的でリズミカルなサウンドが特徴的です。彼の歌声は力強く感情豊かであり、そのパフォーマンスはエネルギッシュで魅力的です。特に代表曲「Livin' la Vida Loca」や「She Bangs」などは世界的なヒットとなり、そのリズムと楽しさが多くのファンに愛されました。Ricky Martinは音楽活動だけでなく、俳優としても活動し、ラテンアメリカ文化の大使としても知られています。彼の楽曲はパーティーや愛、生命力をテーマにしたものが多く、その音楽性とカリスマ性でラテンポップ界において重要な位置を占めています。", homepage: "https://outwithrm.com/" },
   { id: 41, artist_name: "Carly Rae Jepsen", bio: "Carly Rae Jepsen（カーリー・レイ・ジェプセン）は、カナダ出身のシンガーソングライターで、Carly Rae Jepsenの音楽はポップスやインディーポップの要素を融合させた、キャッチーでフレッシュなサウンドが特徴的です。彼女の歌声は明るく、その楽曲はしばしば恋愛や青春、自己表現などのテーマを描きます。特に代表曲「Call Me Maybe」は世界中で大ヒットし、そのキュートで耳に残るメロディが多くの人々に親しまれました。Carly Rae Jepsenはそのポップなスタイルと、独自の感性で多くのファンを魅了し、その後もアルバム「Emotion」シリーズなどでその才能を発揮しています。彼女の音楽はポジティブなエネルギーとキャッチーな魅力で広く支持されています。", homepage: "https://www.carlyraemusic.com/" },
   { id: 42, artist_name: "Pitbull", bio: "Pitbull（ピットブル）は、アメリカ出身のラッパー兼音楽プロデューサーで、Pitbullの音楽はラテン音楽やヒップホップ、ポップスの要素を融合させたダンスミュージックが特徴的です。彼の歌声は力強く、その楽曲はパーティー、自己表現、成功への向かい合いなどをテーマにしています。特に代表曲「Give Me Everything」や「Timber」などは世界的なヒットとなり、そのリズムとエネルギーが多くのリスナーに支持されました。Pitbullは「Mr. Worldwide」としても知られ、国際的な舞台でその楽曲とパフォーマンスで注目を集めています。彼の音楽はポジティブなメッセージとダンスフロアを盛り上げる力強さで、世界中で人気を博しています。", homepage: "https://pitbullmusic.com/" },
   { id: 43, artist_name: "CNCO", bio: "CNCOは、ラテンポップボーイバンドで、CNCOの音楽は、ダンスポップやレゲトンの要素を取り入れた、リズミカルでエネルギッシュなサウンドが特徴的です。彼らの歌声は若々しく、グループ全体のハーモニーが際立ちます。特に代表曲「Reggaetón Lento (Bailemos)」や「Hey DJ」などは、ラテンアメリカだけでなく国際的にも大ヒットし、そのキャッチーで踊りやすい楽曲が多くのファンを魅了しました。CNCOはテレビ番組「La Banda」で結成され、その後迅速にラテンポップ界で注目される存在となりました。彼らの音楽は若者向けのポジティブなエネルギーと楽しい雰囲気で、多くのリスナーに広く受け入れられています。", homepage: "https://www.cncomusic.com/" },
   { id: 44, artist_name: "Camila Cabello", bio: "Camila Cabello（カミラ・カベロ）は、キューバ系アメリカ人のシンガーソングライターで、Camila Cabelloの音楽はポップやラテンポップの要素を融合させた、感情豊かで情熱的なサウンドが特徴的です。彼女の歌声は力強く、その楽曲はしばしば恋愛や自己成長、女性の力強さなどをテーマにしています。特に代表曲「Havana」や「Senorita」などは世界的なヒットとなり、その魅力的な歌声とキャッチーなメロディが多くのファンに支持されました。Camila Cabelloはソロアーティストとしてだけでなく、元フィフス・ハーモニーのメンバーとしても知られており、その個性的なスタイルと才能で国際的なスターとしての地位を確立しています。彼女の音楽はその感情のこもった歌唱と、ポップスの新しい側面を見せる力強さで、現代のポップシーンに大きな影響を与えています。", homepage: "https://store.camilacabello.com/" },
   { id: 45, artist_name: "DJ Khaled", bio: "DJ Khaled（ディージェイ・カレド）は、アメリカ出身のDJ兼音楽プロデューサーで、DJ Khaledの音楽はヒップホップやレゲエ、ダンスホールの要素を取り入れた、エネルギッシュでパーティー感満載のサウンドが特徴的です。彼の楽曲はしばしば多くのアーティストとのコラボレーションによって成り立ち、その豪華なフィーチャリングとヒットメーカーとしての評価が高いです。特に代表曲「Wild Thoughts」や「I'm the One」などは、そのリズムとキャッチーなフックが世界的なヒットとなり、クラブやラジオで頻繁に流れました。DJ Khaledは自身の楽曲だけでなく、音楽ビジネス全般での影響力も大きく、そのソーシャルメディアでのプレゼンスや「キーアドバイス」などのキャッチフレーズで知られています。彼の音楽はポジティブなエネルギーと、ヒップホップ文化の象徴として、広範なファン層に支持されています。", homepage: "https://www.djkhaledofficial.com/" },
   { id: 46, artist_name: "Maluma", bio: "Maluma（マルマ）は、コロンビア出身のレゲトン歌手およびソングライターであり、Malumaの音楽はレゲトンやラテンポップの要素を融合させた、セクシーで感情的なサウンドが特徴的です。彼の歌声は深みがあり、その楽曲はしばしば恋愛や夜の生活、自己表現などをテーマにしています。特に代表曲「Felices los 4」や「Hawái」などは、そのリズムとラテンなエッセンスが国際的なヒットとなり、彼の名声を確立しました。Malumaはそのスタイリッシュな外見とステージパフォーマンスで知られ、ラテンポップ界での重要な存在としての地位を築いています。彼の音楽はセクシーさと情熱的な表現で、ラテン音楽ファンだけでなく、世界中の多くのリスナーに愛されています。", homepage: "https://maluma.online/en" },
   { id: 47, artist_name: "Marshmello", bio: "Marshmello（マシュメロ）は、アメリカ出身のDJ兼音楽プロデューサーであり、Marshmelloの音楽はエレクトロニックダンスミュージック（EDM）やフューチャーベースの要素を取り入れた、メロディアスでエネルギッシュなサウンドが特徴的です。彼の楽曲はキャッチーなメロディとパワフルなビートが特徴であり、しばしばポップな要素も含まれています。特に代表曲「Alone」や「Happier」などは世界的なヒットとなり、その楽曲のクオリティとパフォーマンスが多くのファンを魅了しました。Marshmelloはそのトレードマークとなるマシュマロ型のヘルメットをかぶり、匿名性を保ちながら音楽活動を行っており、その個性的な外見も彼の人気の一因です。彼の音楽はエネルギッシュでポジティブなエモーションを伝え、EDMファンのみならず幅広いリスナーから支持を受けています。", homepage: "https://avex.jp/marshmello/" },
   { id: 48, artist_name: "One Direction", bio: "One Direction（ワン・ダイレクション）は、イギリス出身のボーイバンドで、One Directionの音楽はポップやロックの要素を融合させた、若々しくキャッチーなサウンドが特徴的です。彼らの歌声は明るく爽やかであり、恋愛や友情、青春などをテーマにした楽曲が多くを占めます。特に代表曲「What Makes You Beautiful」や「Story of My Life」などは世界的なヒットとなり、多くのファンを獲得しました。One Directionはテレビ番組「The X Factor」で結成され、その後迅速に国際的なスターダムにのし上がりました。彼らの音楽は若者を中心に大きな人気を誇り、グループ解散後もメンバーそれぞれがソロ活動で成功を収めています。One Directionの楽曲はポジティブなエネルギーと爽やかな魅力で、世界中の多くのリスナーに愛され続けています。", homepage: "https://www.onedirectionmusic.com/gb/home.html" },
   { id: 49, artist_name: "Lady Gaga", bio: "Lady Gaga（レディー・ガガ）は、アメリカ出身のシンガーソングライター、女優、そしてアクティヴィストであり、Lady Gagaの音楽はポップ、ダンスポップ、エレクトロポップの要素を取り入れた斬新で多様なサウンドが特徴的です。彼女の歌声はパワフルで多様性に富み、その楽曲はしばしば自己表現や愛、社会的メッセージなどをテーマにしています。特に代表曲「Poker Face」や「Bad Romance」などは世界的なヒットとなり、その革新的なスタイルとステージパフォーマンスが多くのファンを魅了しました。Lady Gagaは音楽だけでなく、ファッションやアートにおいても先駆的な存在として知られ、その個性的なスタイルで多くの支持を集めています。彼女の音楽は強烈な個性と感情の深さを伴い、ポップカルチャーに大きな影響を与えています。", homepage: "https://www.ladygaga.com/" },
   { id: 50, artist_name: "Britney Spears", bio: "Britney Spears（ブリトニー・スピアーズ）は、アメリカ出身のシンガーソングライター、ダンサー、そして女優であり、Britney Spearsの音楽はポップ、ダンスポップの要素を融合させたキャッチーで躍動感溢れるサウンドが特徴的です。彼女の歌声は甘く魅力的であり、恋愛や自己表現などをテーマにした楽曲が多くあります。特に代表曲「...Baby One More Time」や「Toxic」などは世界的なヒットとなり、そのスタイルとパフォーマンスが世界中で多くのファンを獲得しました。Britney Spearsは若い頃からポップ界のアイコンとして注目され、その後も長期にわたり音楽シーンで活躍しています。彼女の音楽はポジティブなエネルギーと、キャッチーなメロディで多くのリスナーに愛されています。", homepage: "https://britneyspears.com/" },
];


app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('show', {mes:message});
});

app.get("/db", (req, res) => {
    db.serialize( () => {
        db.all("select id, 都道府県, 人口 from example;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select', {data:row});
        })
    })
})
app.get("/top", (req, res) => {
    //console.log(req.query.pop);    // ①
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id, 都道府県, 人口 from example order by 人口" + desc + " limit " + req.query.pop + ";";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('select', {data:data});
        })
    })
})

app.get("/car_maker", (req, res) => { 
let sql = ` 
select car.id, car.name as car_name, maker.name as maker_name 
from car 
inner join maker on car.maker_id = maker.id;
`; 

db.serialize(() => { 
　 db.all(sql, (error, data) => {
　　 if (error) { 
　　　res.render('show', { mes: "エラーです" }); } 
　　　else {
 　　　res.render('select', { data: data});
　　　 }
　　 });
 　});
 }); 

app.get("/stpr_man", (req, res) => { 
let sql = ` 
select STPR.id, STPR.name as stpr_name, man.name as man_name 
from STPR 
inner join man on STPR.stpr_id = man.id; 
`; 

db.serialize(() => { 
　db.all(sql, (error, data) => { 
　　if (error) { 
　　　res.render('show', { mes: "エラーです" }); 
　　} else { 
　　　res.render('select', { data: data }); 
　　}
　　});
　});
});

app.get("/db/:id", (req, res) => {
db.serialize( () => {
db.all("select id, 都道府県, 人口, 大学 from example where id=" + req.params.id + ";", (error, row) => {
if( error ) {
res.render('show', {mes:"エラーです"});
}
res.render('db', {data:row});
})
})
})

app.post("/insert", (req, res) => {
 let sql = `
insert into example (都道府県,人口,大学) values ("` + req.body.name + `",` + req.body.jinko + `,` + req.body.daigaku + `);
`
 console.log(sql);
 db.serialize( () => {
  db.run( sql, (error, row) => {
   console.log(error);
   if(error) {
    res.render('show', {mes:"エラーです"});
   }
   res.redirect('/db');
  });
 });
 console.log(req.body);
});

// ホームページ
app.get("/home", (req, res) => {
  const message = "Music festival";
  res.render('music', { mes: message });
});

// アーティスト一覧
app.get("/artist", (req, res) => {
  const sql = `SELECT id, name AS artist_name FROM artist;`;

  console.log(sql);

  db.serialize(() => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.log("Database error: ", error);
        res.render('music', { mes: "エラーです" });
      } else {
        console.log("Query result: ", rows);
        
        // データをマージする
        const mergedData = rows.map(row => {
          const additionalInfo = additionalData.find(data => data.id === row.id);
          return { ...row, ...additionalInfo };
        });

        res.render('artist', { data: mergedData });
      }
    });
  });
});


// アーティストのページ
app.get("/artist/:id", (req, res) => {
  const artistId = req.params.id;
  const sql = `SELECT id, name AS artist_name FROM artist WHERE id = ?`;

  db.get(sql, [artistId], (error, row) => {
    if (error) {
      console.log("Database error: ", error);
      res.render('music', { mes: "エラーです" });
    } else if (row) {
      const additionalInfo = additionalData.find(data => data.id == artistId);
      const artistData = { ...row, ...additionalInfo };
      res.render('artistDetail', { artist: artistData });
    } else {
      res.render('music', { mes: "アーティストが見つかりません" });
    }
  });
});




// 曲一覧
app.get("/song", (req, res) => {
  console.log("/song");

  const sql = `
    SELECT id, name AS song_name
    FROM music;
  `;

  console.log(sql);

  db.serialize(() => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.log(error);
        res.render('music', { mes: "エラーです" });
      } else {
        console.log(rows);
        res.render('song', { data: rows });
      }
    });
  });
});

// アーティストと曲の一覧
app.get("/artist_song", (req, res) => {
  const sql = `
    SELECT music.id, music.name AS song_name, artist.name AS artist_name
    FROM music
    INNER JOIN artist ON music.artist_id = artist.id;
  `;

  db.serialize(() => {
    db.all(sql, (error, rows) => {
      if (error) {
        res.render('music', { mes: "エラーです" });
      } else {
        res.render('artist_song', { data: rows });
      }
    });
  });
});

// 特定のアーティストの曲一覧
app.get("/song/:id", (req, res) => {
  console.log("/song/:id");
  const artistId = req.params.id;

  db.serialize(() => {
    db.all("SELECT * FROM music WHERE artist_id = ?", [artistId], (error, rows) => {
      if (error) {
        console.error(error);
        return res.render('music', { mes: "エラーです" });
      }

      res.render('song', { data: rows });
    });
  });
});

app.get("/song/popular", (req, res) => {
  const sql = `
    SELECT id, name AS song_name
    FROM music
    ORDER BY popularity DESC;
  `;

  db.serialize(() => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.log(error);
        res.render('music', { mes: "エラーです" });
      } else {
        console.log(rows);
        res.render('popular_song_artist', { data: rows });
      }
    });
  });
});


// 404エラーハンドリング
app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

