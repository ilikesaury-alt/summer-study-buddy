import type {
  ReciteItem,
  DictationItem,
  MathPreviewItem,
  EnglishWord,
} from "@/types";

// 语文必背闯关 - 三年级上册常见古诗与课文
export const RECITE_ITEMS: ReciteItem[] = [
  {
    id: "recite1",
    title: "所见",
    author: "清·袁枚",
    content: "牧童骑黄牛,歌声振林樾。\n意欲捕鸣蝉,忽然闭口立。",
    tip: "想象小牧童骑牛唱歌,突然想抓蝉的样子,很好玩!",
  },
  {
    id: "recite2",
    title: "山行",
    author: "唐·杜牧",
    content: "远上寒山石径斜,白云生处有人家。\n停车坐爱枫林晚,霜叶红于二月花。",
    tip: "“坐”在这里是“因为”的意思,停车是因为爱看枫林。",
  },
  {
    id: "recite3",
    title: "赠刘景文",
    author: "宋·苏轼",
    content: "荷尽已无擎雨盖,菊残犹有傲霜枝。\n一年好景君须记,最是橙黄橘绿时。",
    tip: "这首诗写的是初冬景色,记住“橙黄橘绿”这四个字。",
  },
  {
    id: "recite4",
    title: "夜书所见",
    author: "宋·叶绍翁",
    content: "萧萧梧叶送寒声,江上秋风动客情。\n知有儿童挑促织,夜深篱落一灯明。",
    tip: "“促织”就是蟋蟀,想象秋夜孩子捉蟋蟀的画面。",
  },
  {
    id: "recite5",
    title: "望天门山",
    author: "唐·李白",
    content: "天门中断楚江开,碧水东流至此回。\n两岸青山相对出,孤帆一片日边来。",
    tip: "想象长江冲开天门山的壮丽景象。",
  },
  {
    id: "recite6",
    title: "饮湖上初晴后雨",
    author: "宋·苏轼",
    content: "水光潋滟晴方好,山色空蒙雨亦奇。\n欲把西湖比西子,淡妆浓抹总相宜。",
    tip: "这是写西湖的名诗,“西子”就是美女西施。",
  },
  {
    id: "recite7",
    title: "望洞庭",
    author: "唐·刘禹锡",
    content: "湖光秋月两相和,潭面无风镜未磨。\n遥望洞庭山水翠,白银盘里一青螺。",
    tip: "把洞庭湖比作白银盘,把君山比作青螺,多形象!",
  },
  {
    id: "recite8",
    title: "采莲曲",
    author: "唐·王昌龄",
    content: "荷叶罗裙一色裁,芙蓉向脸两边开。\n乱入池中看不见,闻歌始觉有人来。",
    tip: "想象采莲姑娘的绿裙子和荷叶融为一体。",
  },
];

// 默写词语 - 三年级常见词语
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
];

// 数学新知识预习 - 三年级上册
export const MATH_PREVIEW_ITEMS: MathPreviewItem[] = [
  {
    id: "mp1",
    title: "时、分、秒",
    concept:
      "钟面上有3根针。最细最快的是秒针,走1小格是1秒,走1圈60秒就是1分。分针走1小格是1分,走1圈60分就是1小时。时针走1大格是1小时。",
    example: "1分 = 60秒,1时 = 60分",
    steps: ["认准时针、分针、秒针", "看时针走过几就是几时", "分针走几小格就是几分"],
    practice: { question: "2分 = (  )秒", answer: "120" },
  },
  {
    id: "mp2",
    title: "万以内的加法",
    concept:
      "三位数加法,要把相同数位对齐,从个位加起,哪一位上的数相加满十,就要向前一位进1。",
    example: "365 + 218 = ?",
    steps: ["个位:5+8=13,写3进1", "十位:6+1+1=8,写8", "百位:3+2=5,写5", "结果:583"],
    practice: { question: "247 + 156 = ?", answer: "403" },
  },
  {
    id: "mp3",
    title: "万以内的减法",
    concept:
      "三位数减法,相同数位对齐,从个位减起,哪一位上的数不够减,要从前一位退1,在本位上加10再减。",
    example: "532 - 287 = ?",
    steps: ["个位:2-7不够,退1,12-7=5", "十位:2-8不够,退1,12-8=4", "百位:4-2=2", "结果:245"],
    practice: { question: "600 - 348 = ?", answer: "252" },
  },
  {
    id: "mp4",
    title: "倍的认识",
    concept:
      "“倍”是比较两个数量的关系。求一个数是另一个数的几倍,用除法;求一个数的几倍是多少,用乘法。",
    example: "苹果有6个,梨有2个,苹果是梨的几倍?6÷2=3,苹果是梨的3倍。",
    steps: ["找到标准量(被比的数)", "用除法:大数÷小数=倍数"],
    practice: { question: "红花8朵,黄花2朵,红花是黄花的几倍?", answer: "4" },
  },
  {
    id: "mp5",
    title: "多位数乘一位数",
    concept:
      "从个位乘起,用一位数分别去乘多位数每一位上的数,哪一位上乘得的积满几十,就向前一位进几。",
    example: "234 × 2 = ?",
    steps: ["个位:4×2=8", "十位:3×2=6", "百位:2×2=4", "结果:468"],
    practice: { question: "123 × 3 = ?", answer: "369" },
  },
  {
    id: "mp6",
    title: "长方形和正方形的周长",
    concept:
      "周长就是图形一圈的长度。长方形周长 =(长+宽)×2;正方形周长 = 边长×4。",
    example: "长方形长5厘米,宽3厘米,周长=(5+3)×2=16厘米。",
    steps: ["长方形:(长+宽)×2", "正方形:边长×4"],
    practice: { question: "正方形边长6厘米,周长是多少厘米?", answer: "24" },
  },
];

// 英语新词汇 - 三年级上册核心单词
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
];
