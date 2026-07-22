import type {
  ReciteItem,
  DictationItem,
  MathPreviewItem,
  EnglishWord,
} from "@/types";

// 预习内容 - 三年级上册
// 语文:人教版(部编版)三年级上册
// 数学:北师版三年级上册
// 英语:外研版(新标准)新启航三年级上册

// ========== 语文必背闯关(人教版三上) ==========
export const RECITE_ITEMS: ReciteItem[] = [
  {
    id: "recite1",
    title: "所见",
    author: "清·袁枚",
    content: "牧童骑黄牛,歌声振林樾。\n意欲捕鸣蝉,忽然闭口立。",
    tip: "人教版三上第1课,想象小牧童骑牛唱歌,突然想抓蝉的样子,很好玩!",
  },
  {
    id: "recite2",
    title: "山行",
    author: "唐·杜牧",
    content: "远上寒山石径斜,白云生处有人家。\n停车坐爱枫林晚,霜叶红于二月花。",
    tip: "人教版三上第2课,“坐”在这里是“因为”的意思,停车是因为爱看枫林。",
  },
  {
    id: "recite3",
    title: "赠刘景文",
    author: "宋·苏轼",
    content: "荷尽已无擎雨盖,菊残犹有傲霜枝。\n一年好景君须记,最是橙黄橘绿时。",
    tip: "人教版三上第2课,这首诗写的是初冬景色,记住“橙黄橘绿”这四个字。",
  },
  {
    id: "recite4",
    title: "夜书所见",
    author: "宋·叶绍翁",
    content: "萧萧梧叶送寒声,江上秋风动客情。\n知有儿童挑促织,夜深篱落一灯明。",
    tip: "人教版三上第2课,“促织”就是蟋蟀,想象秋夜孩子捉蟋蟀的画面。",
  },
  {
    id: "recite5",
    title: "望天门山",
    author: "唐·李白",
    content: "天门中断楚江开,碧水东流至此回。\n两岸青山相对出,孤帆一片日边来。",
    tip: "人教版三上第17课,想象长江冲开天门山的壮丽景象。",
  },
  {
    id: "recite6",
    title: "饮湖上初晴后雨",
    author: "宋·苏轼",
    content: "水光潋滟晴方好,山色空蒙雨亦奇。\n欲把西湖比西子,淡妆浓抹总相宜。",
    tip: "人教版三上第17课,这是写西湖的名诗,“西子”就是美女西施。",
  },
  {
    id: "recite7",
    title: "望洞庭",
    author: "唐·刘禹锡",
    content: "湖光秋月两相和,潭面无风镜未磨。\n遥望洞庭山水翠,白银盘里一青螺。",
    tip: "人教版三上第17课,把洞庭湖比作白银盘,把君山比作青螺,多形象!",
  },
  {
    id: "recite8",
    title: "采莲曲",
    author: "唐·王昌龄",
    content: "荷叶罗裙一色裁,芙蓉向脸两边开。\n乱入池中看不见,闻歌始觉有人来。",
    tip: "人教版三上第17课,想象采莲姑娘的绿裙子和荷叶融为一体。",
  },
  {
    id: "recite9",
    title: "早发白帝城",
    author: "唐·李白",
    content: "朝辞白帝彩云间,千里江陵一日还。\n两岸猿声啼不住,轻舟已过万重山。",
    tip: "人教版三上拓展,李白写船顺流而下速度很快,千里江陵一天就到。",
  },
];

// ========== 默写词语(人教版三上) ==========
export const DICTATION_ITEMS: DictationItem[] = [
  { id: "d1", word: "早晨", hint: "早上的意思,时间词。" },
  { id: "d2", word: "放假", hint: "不用上学的日子。" },
  { id: "d3", word: "花瓣", hint: "花的片状部分。" },
  { id: "d4", word: "观察", hint: "仔细地看。" },
  { id: "d5", word: "跳舞", hint: "随着音乐做动作。" },
  { id: "d6", word: "荒野", hint: "荒凉的原野。" },
  { id: "d7", word: "狂风", hint: "猛烈的风。" },
  { id: "d8", word: "能够", hint: "表示有能力做某事。" },
  { id: "d9", word: "双臂", hint: "两条胳膊。" },
  { id: "d10", word: "柔软", hint: "软软的,不硬。" },
  { id: "d11", word: "颜料", hint: "画画用的颜色。" },
  { id: "d12", word: "邮票", hint: "寄信贴的纸片。" },
  { id: "d13", word: "凉爽", hint: "凉快舒服。" },
  { id: "d14", word: "欢唱", hint: "高兴地唱歌。" },
  { id: "d15", word: "忘记", hint: "记不起来了。" },
  { id: "d16", word: "原来", hint: "表示发现真实情况。" },
  { id: "d17", word: "可爱", hint: "讨人喜欢。" },
  { id: "d18", word: "晴朗", hint: "天气好,没有云。" },
  { id: "d19", word: "礼物", hint: "送人的东西。" },
  { id: "d20", word: "飘扬", hint: "在空中随风摆动。" },
  { id: "d21", word: "朗读", hint: "清晰响亮地把文章读出来。" },
  { id: "d22", word: "汗水", hint: "出汗时流出的水。" },
];

// ========== 数学新知识预习(北师版三上) ==========
export const MATH_PREVIEW_ITEMS: MathPreviewItem[] = [
  {
    id: "mp1",
    title: "混合运算",
    concept:
      "北师版三上第一单元。在一个算式里,既有乘除法又有加减法,要先算乘除法,后算加减法;有括号的要先算括号里面的。",
    example: "3 + 4 × 5 = ?",
    steps: ["先算乘法:4×5=20", "再算加法:3+20=23", "结果:23"],
    practice: { question: "20 - 15 ÷ 3 = ?", answer: "15" },
  },
  {
    id: "mp2",
    title: "观察物体",
    concept:
      "北师版三上第二单元。从不同方向观察同一个物体,看到的形状可能不同。一般从前面、上面、左面观察。",
    example: "观察一个长方体,从前面看是长方形。",
    steps: ["确定观察方向", "想象看到的形状", "画出看到的图形"],
    practice: { question: "从正面观察正方体,看到的是?(正方形/圆形)", answer: "正方形" },
  },
  {
    id: "mp3",
    title: "加与减(三位数)",
    concept:
      "北师版三上第三单元。三位数加法:相同数位对齐,从个位加起,满十进一。三位数减法:相同数位对齐,从个位减起,不够减退一当十。",
    example: "365 + 218 = ?",
    steps: ["个位:5+8=13,写3进1", "十位:6+1+1=8,写8", "百位:3+2=5,写5", "结果:583"],
    practice: { question: "247 + 156 = ?", answer: "403" },
  },
  {
    id: "mp4",
    title: "乘与除",
    concept:
      "北师版三上第四单元。整十整百数的乘法:先把0前面的数相乘,再在末尾添上相应个数的0。如 30×2,先算3×2=6,再添1个0,得60。",
    example: "整十数乘法:40 × 3 = ?",
    steps: ["先算4×3=12", "再添1个0", "结果:120"],
    practice: { question: "50 × 4 = ?", answer: "200" },
  },
  {
    id: "mp5",
    title: "周长",
    concept:
      "北师版三上第五单元。周长就是图形一周的长度。长方形周长 =(长+宽)×2;正方形周长 = 边长×4。",
    example: "长方形长5厘米,宽3厘米,周长=(5+3)×2=16厘米。",
    steps: ["长方形:(长+宽)×2", "正方形:边长×4"],
    practice: { question: "正方形边长6厘米,周长是多少厘米?", answer: "24" },
  },
  {
    id: "mp6",
    title: "乘法(多位数乘一位数)",
    concept:
      "北师版三上第六单元。从个位乘起,用一位数分别去乘多位数每一位上的数,哪一位上乘得的积满几十,就向前一位进几。",
    example: "234 × 2 = ?",
    steps: ["个位:4×2=8", "十位:3×2=6", "百位:2×2=4", "结果:468"],
    practice: { question: "123 × 3 = ?", answer: "369" },
  },
  {
    id: "mp7",
    title: "年、月、日",
    concept:
      "北师版三上第七单元。一年有12个月,大月31天(1、3、5、7、8、10、12月),小月30天(4、6、9、11月),平年二月28天,闰年二月29天。",
    example: "拳记法:凸起处是大月(31天),凹处是小月(30天),二月特殊。",
    steps: ["大月31天:1、3、5、7、8、10、12", "小月30天:4、6、9、11", "平年二月28天,闰年29天"],
    practice: { question: "一年中有几个大月?", answer: "7" },
  },
];

// ========== 英语新词汇(外研版新启航三上) ==========
// 外研版三年级以听说为主,词汇贴近儿童生活
export const ENGLISH_WORDS: EnglishWord[] = [
  { id: "w1", word: "ruler", meaning: "尺子", emoji: "📏", sentence: "I have a ruler. 我有一把尺子。" },
  { id: "w2", word: "pen", meaning: "钢笔", emoji: "🖊️", sentence: "This is my pen. 这是我的钢笔。" },
  { id: "w3", word: "pencil", meaning: "铅笔", emoji: "✏️", sentence: "I have a pencil. 我有一支铅笔。" },
  { id: "w4", word: "eraser", meaning: "橡皮", emoji: "🧽", sentence: "I have an eraser. 我有一块橡皮。" },
  { id: "w5", word: "bag", meaning: "书包", emoji: "🎒", sentence: "My bag is big. 我的书包很大。" },
  { id: "w6", word: "book", meaning: "书", emoji: "📖", sentence: "Open your book. 打开你的书。" },
  { id: "w7", word: "school", meaning: "学校", emoji: "🏫", sentence: "I go to school. 我去上学。" },
  { id: "w8", word: "teacher", meaning: "老师", emoji: "👩‍🏫", sentence: "My teacher is kind. 我的老师很和蔼。" },
  { id: "w9", word: "student", meaning: "学生", emoji: "🧑‍🎓", sentence: "I am a student. 我是一名学生。" },
  { id: "w10", word: "face", meaning: "脸", emoji: "😀", sentence: "Wash your face. 洗脸。" },
  { id: "w11", word: "head", meaning: "头", emoji: "🗣️", sentence: "Touch your head. 摸摸你的头。" },
  { id: "w12", word: "eye", meaning: "眼睛", emoji: "👁️", sentence: "Close your eyes. 闭上眼睛。" },
  { id: "w13", word: "ear", meaning: "耳朵", emoji: "👂", sentence: "I have two ears. 我有两只耳朵。" },
  { id: "w14", word: "nose", meaning: "鼻子", emoji: "👃", sentence: "Touch your nose. 摸摸你的鼻子。" },
  { id: "w15", word: "mouth", meaning: "嘴", emoji: "👄", sentence: "Open your mouth. 张开嘴。" },
  { id: "w16", word: "red", meaning: "红色", emoji: "🔴", sentence: "The apple is red. 苹果是红色的。" },
  { id: "w17", word: "yellow", meaning: "黄色", emoji: "🟡", sentence: "The sun is yellow. 太阳是黄色的。" },
  { id: "w18", word: "blue", meaning: "蓝色", emoji: "🔵", sentence: "The sky is blue. 天空是蓝色的。" },
  { id: "w19", word: "green", meaning: "绿色", emoji: "🟢", sentence: "The grass is green. 草是绿色的。" },
  { id: "w20", word: "cat", meaning: "猫", emoji: "🐱", sentence: "I like cats. 我喜欢猫。" },
  { id: "w21", word: "dog", meaning: "狗", emoji: "🐶", sentence: "The dog is cute. 这只狗很可爱。" },
  { id: "w22", word: "bird", meaning: "鸟", emoji: "🐦", sentence: "The bird can fly. 鸟会飞。" },
  { id: "w23", word: "fish", meaning: "鱼", emoji: "🐟", sentence: "I see a fish. 我看到一条鱼。" },
  { id: "w24", word: "apple", meaning: "苹果", emoji: "🍎", sentence: "I like apples. 我喜欢苹果。" },
  { id: "w25", word: "banana", meaning: "香蕉", emoji: "🍌", sentence: "Have a banana. 吃根香蕉。" },
];
