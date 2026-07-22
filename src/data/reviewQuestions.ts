import type { Question } from "@/types";

// 二年级复习题库
// 语文:人教版(部编版)二年级下册重点
// 数学:北师版二年级下册重点
// 英语:外研版(新标准)新启航二年级下册重点

// ========== 语文(人教版部编版) ==========
export const CHINESE_QUESTIONS: Question[] = [
  // 拼音选择
  { id: "cn1", subject: "chinese", type: "choice", stem: "“春”字的正确拼音是?", options: ["cūn", "chūn", "cūn", "chūn"], answer: "chūn", explanation: "“春”是翘舌音 chūn,不是平舌音。" },
  { id: "cn2", subject: "chinese", type: "choice", stem: "“绿”字的正确读音是?", options: ["lù", "lǜ", "lú", "lǔ"], answer: "lǜ", explanation: "“绿”读 lǜ,第四声,绿色的绿。" },
  { id: "cn3", subject: "chinese", type: "choice", stem: "“树”字共有几画?", options: ["7画", "8画", "9画", "10画"], answer: "9画", explanation: "“树”字部首木字旁4画,右边对5画,共9画。" },
  // 形近字
  { id: "cn4", subject: "chinese", type: "choice", stem: "选择正确的字:妈妈在( )衣服。", options: ["洗", "先", "鲜", "显"], answer: "洗", explanation: "“洗衣服”的洗是三点水旁,表示用水清洗。" },
  { id: "cn5", subject: "chinese", type: "choice", stem: "选择正确的字:小河里( )着小鱼。", options: ["游", "邮", "由", "油"], answer: "游", explanation: "“游”是三点水,表示在水中游动。" },
  { id: "cn6", subject: "chinese", type: "choice", stem: "选词填空:我家( )了一只小猫。", options: ["养", "氧", "样", "仰"], answer: "养", explanation: "“养”表示饲养,养小猫。" },
  // 量词
  { id: "cn7", subject: "chinese", type: "choice", stem: "填入合适的量词:一( )花。", options: ["朵", "条", "本", "辆"], answer: "朵", explanation: "花用“朵”,一朵花。" },
  { id: "cn8", subject: "chinese", type: "choice", stem: "填入合适的量词:一( )书。", options: ["朵", "本", "条", "只"], answer: "本", explanation: "书用“本”,一本书。" },
  { id: "cn9", subject: "chinese", type: "choice", stem: "填入合适的量词:一( )小河。", options: ["条", "本", "朵", "头"], answer: "条", explanation: "细长的东西用“条”,一条小河。" },
  { id: "cn10", subject: "chinese", type: "choice", stem: "填入合适的量词:一( )牛。", options: ["只", "头", "条", "匹"], answer: "头", explanation: "牛、猪等较大的动物用“头”,一头牛。" },
  // 词语搭配
  { id: "cn11", subject: "chinese", type: "choice", stem: "哪个词语搭配不正确?", options: ["明亮的教室", "灿烂的阳光", "绿色的歌声", "温暖的春天"], answer: "绿色的歌声", explanation: "“歌声”不能用颜色形容,应说“动听的歌声”。" },
  { id: "cn12", subject: "chinese", type: "choice", stem: "“开心”的近义词是?", options: ["难过", "快乐", "生气", "伤心"], answer: "快乐", explanation: "开心和快乐都表示心情愉快,是近义词。" },
  { id: "cn13", subject: "chinese", type: "choice", stem: "“认真”的反义词是?", options: ["仔细", "马虎", "努力", "用心"], answer: "马虎", explanation: "认真和马虎意思相反,是反义词。" },
  // 古诗填空(人教版二年级必背)
  { id: "cn14", subject: "chinese", type: "fill", stem: "补全诗句:床前明月光,疑是地上( )。", answer: "霜", explanation: "李白《静夜思》:床前明月光,疑是地上霜。" },
  { id: "cn15", subject: "chinese", type: "fill", stem: "补全诗句:春眠不觉( ),处处闻啼鸟。", answer: "晓", explanation: "孟浩然《春晓》:春眠不觉晓,处处闻啼鸟。" },
  { id: "cn16", subject: "chinese", type: "fill", stem: "补全诗句:锄禾日当午,汗滴禾下( )。", answer: "土", explanation: "《悯农》:锄禾日当午,汗滴禾下土。" },
  { id: "cn17", subject: "chinese", type: "choice", stem: "《静夜思》的作者是?", options: ["杜甫", "李白", "白居易", "王维"], answer: "李白", explanation: "《静夜思》是唐代诗人李白的作品。" },
  // 词语接龙逻辑
  { id: "cn18", subject: "chinese", type: "choice", stem: "“春天”的下一个词语接龙应是?", options: ["天空", "天空", "天气", "气球"], answer: "天气", explanation: "词语接龙:春天→天气→气候,首尾字相同。" },
  // 偏旁部首
  { id: "cn19", subject: "chinese", type: "choice", stem: "“说、话、读”的共同部首是?", options: ["口字旁", "言字旁", "心字旁", "手字旁"], answer: "言字旁", explanation: "都与说话有关,部首是言字旁(讠)。" },
  { id: "cn20", subject: "chinese", type: "choice", stem: "“跑、跳、跃”的共同部首是?", options: ["足字旁", "手字旁", "口字旁", "木字旁"], answer: "足字旁", explanation: "都与脚的动作有关,部首是足字旁(⻊)。" },
  // 标点
  { id: "cn21", subject: "chinese", type: "choice", stem: "疑问句末尾应该用哪个标点?", options: ["句号。", "问号?", "感叹号!", "逗号,"], answer: "问号?", explanation: "表示疑问的句子末尾用问号。" },
  { id: "cn22", subject: "chinese", type: "fill", stem: "数一数,“森林”两个字一共有几个木字?", answer: "5", explanation: "“森”有3个木,“林”有2个木,共5个木。" },
  // 成语
  { id: "cn23", subject: "chinese", type: "choice", stem: "“守株待兔”告诉我们的道理是?", options: ["要勤劳不能心存侥幸", "兔子很可爱", "种树很有用", "要保护动物"], answer: "要勤劳不能心存侥幸", explanation: "守株待兔讽刺不主动努力、心存侥幸的人。" },
  // 字音辨析
  { id: "cn24", subject: "chinese", type: "choice", stem: "下面哪个字的读音和其他不同?", options: ["找", "爪", "照", "早"], answer: "爪", explanation: "“爪”读 zhǎo,其他都读 zhǎo/zǎo?实际“找”zhǎo、“照”zhào、“早”zǎo,“爪”zhǎo,声母韵母不同,选爪。" },
  // 词语归类
  { id: "cn25", subject: "chinese", type: "choice", stem: "哪个词不是同一类?", options: ["苹果", "香蕉", "葡萄", "白菜"], answer: "白菜", explanation: "苹果、香蕉、葡萄是水果,白菜是蔬菜。" },
  { id: "cn26", subject: "chinese", type: "fill", stem: "写出“大”的反义词(一个字)。", answer: "小", explanation: "大和小是反义词。" },
  { id: "cn27", subject: "chinese", type: "fill", stem: "写出“高”的反义词(一个字)。", answer: "矮", explanation: "高和矮是反义词。" },
  // 句子排序逻辑
  { id: "cn28", subject: "chinese", type: "choice", stem: "“一边…一边…”表示?", options: ["同时做两件事", "只做一件事", "先后做事", "不做任何事"], answer: "同时做两件事", explanation: "“一边…一边…”表示两个动作同时进行。" },
  { id: "cn29", subject: "chinese", type: "choice", stem: "“把”字句:我把书( )好了。", options: ["看", "读", "收", "玩"], answer: "收", explanation: "“把书收好”是常见搭配,表示整理。" },
  { id: "cn30", subject: "chinese", type: "fill", stem: "比一比,再组词:请(   ),清(   )。请写出“请”能组的词(两个字)。", answer: "请客", explanation: "“请”是言字旁,可组“请客、请坐”。“清”是三点水,组“清水”。" },
  // 人教版二年级下册课文相关
  { id: "cn31", subject: "chinese", type: "choice", stem: "《彩色的梦》中,彩色铅笔是什么?", options: ["玩具", "画画工具", "零食", "衣服"], answer: "画画工具", explanation: "人教版二下《彩色的梦》,彩色铅笔是画画的工具。" },
  { id: "cn32", subject: "chinese", type: "fill", stem: "《传统节日》中,春节贴窗花、放( )。", answer: "鞭炮", explanation: "人教版二下《传统节日》:春节到,人欢笑,贴窗花,放鞭炮。" },
  { id: "cn33", subject: "chinese", type: "choice", stem: "《枫树上的喜鹊》中,喜鹊的窝像什么?", options: ["小船", "沙漏", "黑色的球", "帐篷"], answer: "黑色的球", explanation: "人教版二下课文,喜鹊的窝像黑色的球。" },
  { id: "cn34", subject: "chinese", type: "choice", stem: "《亡羊补牢》告诉我们?", options: ["做错了及时改正还不晚", "羊很可爱", "不用修补", "狼很聪明"], answer: "做错了及时改正还不晚", explanation: "人教版二下寓言《亡羊补牢》,出问题后及时补救,不算晚。" },
];

// ========== 数学(北师版) ==========
export const MATH_QUESTIONS: Question[] = [
  // 北师版二年级下册:除法
  { id: "m1", subject: "math", type: "fill", stem: "计算:24 ÷ 6 = ?", answer: "4", explanation: "北师版二下除法,24÷6=4,因为4×6=24。" },
  { id: "m2", subject: "math", type: "fill", stem: "计算:35 ÷ 5 = ?", answer: "7", explanation: "35÷5=7,因为7×5=35。" },
  { id: "m3", subject: "math", type: "choice", stem: "42 ÷ 7 = ?", options: ["5", "6", "7", "8"], answer: "6", explanation: "42÷7=6,因为6×7=42。" },
  { id: "m4", subject: "math", type: "fill", stem: "计算:72 ÷ 8 = ?", answer: "9", explanation: "72÷8=9,因为9×8=72。" },
  { id: "m5", subject: "math", type: "choice", stem: "有18个苹果,平均分给3个小朋友,每人几个?", options: ["5个", "6个", "7个", "8个"], answer: "6个", explanation: "18÷3=6,每人6个。" },
  // 余数除法(北师版二下重点)
  { id: "m6", subject: "math", type: "fill", stem: "计算:13 ÷ 4 = ?…?", answer: "3余1", explanation: "13÷4=3余1,因为3×4=12,13-12=1。" },
  { id: "m7", subject: "math", type: "fill", stem: "计算:17 ÷ 3 = ?…?", answer: "5余2", explanation: "17÷3=5余2,因为5×3=15,17-15=2。" },
  { id: "m8", subject: "math", type: "choice", stem: "22 ÷ 5 的商和余数是?", options: ["4余2", "3余7", "5余0", "4余3"], answer: "4余2", explanation: "22÷5=4余2,4×5=20,22-20=2。" },
  { id: "m9", subject: "math", type: "choice", stem: "除法算式 20 ÷ 6 = 3 … 2 中,余数是?", options: ["20", "6", "3", "2"], answer: "2", explanation: "余数是除完剩下的数,这里是2。" },
  { id: "m10", subject: "math", type: "choice", stem: "除数是5,余数最大是?", options: ["3", "4", "5", "6"], answer: "4", explanation: "余数必须比除数小,除数5,余数最大是4。" },
  // 乘法口诀(基础)
  { id: "m11", subject: "math", type: "fill", stem: "计算:7 × 8 = ?", answer: "56", explanation: "七八五十六,7×8=56。" },
  { id: "m12", subject: "math", type: "fill", stem: "计算:6 × 9 = ?", answer: "54", explanation: "六九五十四,6×9=54。" },
  { id: "m13", subject: "math", type: "choice", stem: "“八九”的下一句是?", options: ["七十二", "六十三", "八十一", "五十六"], answer: "七十二", explanation: "乘法口诀:八九七十二,8×9=72。" },
  // 千以内数的认识(北师版二下)
  { id: "m14", subject: "math", type: "fill", stem: "北师版二下:10个一百是( )。", answer: "一千", explanation: "10个一百是一千,100×10=1000。" },
  { id: "m15", subject: "math", type: "choice", stem: "读数:305 读作?", options: ["三五", "三百零五", "三十五", "三百五十"], answer: "三百零五", explanation: "305读作三百零五,百位3,十位0,个位5。" },
  { id: "m16", subject: "math", type: "choice", stem: "下面哪个数最大?", options: ["298", "302", "289", "320"], answer: "320", explanation: "320>302>298>289,320最大。" },
  { id: "m17", subject: "math", type: "fill", stem: "找规律填数:100, 200, 300, ( ), 500。", answer: "400", explanation: "每次加100,300后是400。" },
  // 三位数加减法(北师版二下)
  { id: "m18", subject: "math", type: "fill", stem: "计算:120 + 80 = ?", answer: "200", explanation: "120+80=200,12个十加8个十等于20个十。" },
  { id: "m19", subject: "math", type: "fill", stem: "计算:560 - 200 = ?", answer: "360", explanation: "560-200=360,560减200等于360。" },
  { id: "m20", subject: "math", type: "choice", stem: "345 + 213 = ?", options: ["558", "548", "552", "562"], answer: "558", explanation: "345+213:5+3=8,4+1=5,3+2=5,得558。" },
  // 方向与位置(北师版二下)
  { id: "m21", subject: "math", type: "choice", stem: "地图上通常是“上北下( )”。", options: ["南", "东", "西", "左"], answer: "南", explanation: "地图方向:上北下南,左西右东。" },
  { id: "m22", subject: "math", type: "choice", stem: "面向北方时,右手所指的方向是?", options: ["东", "西", "南", "北"], answer: "东", explanation: "面向北,右手边是东,左手边是西,背后是南。" },
  // 测量(北师版二下:分米毫米)
  { id: "m23", subject: "math", type: "fill", stem: "1米 = ( )分米。", answer: "10", explanation: "北师版二下:1米=10分米。" },
  { id: "m24", subject: "math", type: "fill", stem: "1分米 = ( )厘米。", answer: "10", explanation: "1分米=10厘米。" },
  { id: "m25", subject: "math", type: "fill", stem: "1厘米 = ( )毫米。", answer: "10", explanation: "1厘米=10毫米。" },
  { id: "m26", subject: "math", type: "choice", stem: "铅笔长约15( )。", options: ["米", "分米", "厘米", "毫米"], answer: "厘米", explanation: "铅笔长约15厘米,符合日常经验。" },
  // 图形(北师版二下:角)
  { id: "m27", subject: "math", type: "choice", stem: "角有( )个顶点。", options: ["1个", "2个", "3个", "0个"], answer: "1个", explanation: "角由一个顶点和两条边组成。" },
  { id: "m28", subject: "math", type: "choice", stem: "比直角大的角叫?", options: ["锐角", "直角", "钝角", "平角"], answer: "钝角", explanation: "比直角大的角是钝角,比直角小的是锐角。" },
  { id: "m29", subject: "math", type: "choice", stem: "三角板上最大的角是?", options: ["锐角", "直角", "钝角", "平角"], answer: "直角", explanation: "三角板上的最大角是直角(90度)。" },
  // 统计与综合
  { id: "m30", subject: "math", type: "choice", stem: "最大的三位数是?", options: ["900", "990", "999", "1000"], answer: "999", explanation: "最大的三位数是999。" },
  { id: "m31", subject: "math", type: "fill", stem: "计算:300 + 400 = ?", answer: "700", explanation: "3个百加4个百是7个百,即700。" },
  { id: "m32", subject: "math", type: "choice", stem: "小明面向东,向后转后面向?", options: ["北", "南", "西", "东"], answer: "西", explanation: "东的相反方向是西,向后转即面向西。" },
];

// ========== 英语(外研版新标准新启航) ==========
// 外研版二年级以听说为主,词汇贴近儿童生活
export const ENGLISH_QUESTIONS: Question[] = [
  // 字母
  { id: "e1", subject: "english", type: "choice", stem: "Which letter comes after “B”?", options: ["A", "C", "D", "E"], answer: "C", explanation: "字母顺序 A B C,B 后面是 C。" },
  { id: "e2", subject: "english", type: "choice", stem: "字母表中有多少个字母?", options: ["24", "25", "26", "27"], answer: "26", explanation: "英语字母表共 26 个字母。" },
  { id: "e3", subject: "english", type: "fill", stem: "补全字母顺序:A, B, C, D, ( )", answer: "E", explanation: "A B C D 后面是 E。" },
  // 外研版二年级常见问候与课堂用语
  { id: "e4", subject: "english", type: "choice", stem: "早上好怎么说?", options: ["Good night", "Good morning", "Goodbye", "Hello"], answer: "Good morning", explanation: "Good morning 是早上好。" },
  { id: "e5", subject: "english", type: "choice", stem: "和别人打招呼说“你好”,用?", options: ["Thank you", "Hello", "Sorry", "Goodbye"], answer: "Hello", explanation: "Hello 是常用的打招呼用语。" },
  { id: "e6", subject: "english", type: "choice", stem: "“Thank you”的意思是?", options: ["对不起", "谢谢", "你好", "再见"], answer: "谢谢", explanation: "Thank you 表示感谢,谢谢。" },
  { id: "e7", subject: "english", type: "choice", stem: "“Goodbye”的意思是?", options: ["你好", "再见", "谢谢", "对不起"], answer: "再见", explanation: "Goodbye 是再见。" },
  { id: "e8", subject: "english", type: "choice", stem: "“Stand up”的意思是?", options: ["坐下", "站起来", "举手", "走开"], answer: "站起来", explanation: "Stand up 是起立、站起来。" },
  { id: "e9", subject: "english", type: "choice", stem: "“Sit down”的意思是?", options: ["坐下", "站起来", "举手", "走开"], answer: "坐下", explanation: "Sit down 是坐下。" },
  // 颜色(外研版二年级重点)
  { id: "e10", subject: "english", type: "choice", stem: "“red”是什么颜色?", options: ["蓝色", "红色", "绿色", "黄色"], answer: "红色", explanation: "red 是红色。" },
  { id: "e11", subject: "english", type: "choice", stem: "“blue”是什么颜色?", options: ["蓝色", "红色", "黑色", "白色"], answer: "蓝色", explanation: "blue 是蓝色。" },
  { id: "e12", subject: "english", type: "fill", stem: "“绿色”的英文是?(小写)", answer: "green", explanation: "绿色是 green。" },
  { id: "e13", subject: "english", type: "choice", stem: "What color is the sun? (太阳)", options: ["blue", "yellow", "purple", "black"], answer: "yellow", explanation: "太阳是黄色的,yellow。" },
  // 数字 1-10(外研版二年级)
  { id: "e14", subject: "english", type: "choice", stem: "“three”表示数字几?", options: ["2", "3", "4", "5"], answer: "3", explanation: "three 是 3。" },
  { id: "e15", subject: "english", type: "fill", stem: "用英文写出数字 5:", answer: "five", explanation: "5 的英文是 five。" },
  { id: "e16", subject: "english", type: "choice", stem: "“ten”表示数字几?", options: ["1", "10", "12", "2"], answer: "10", explanation: "ten 是 10。" },
  { id: "e17", subject: "english", type: "fill", stem: "用英文写出数字 1:", answer: "one", explanation: "1 的英文是 one。" },
  // 动物(外研版二年级常见话题)
  { id: "e18", subject: "english", type: "choice", stem: "“cat”是什么?", options: ["狗", "猫", "鸟", "鱼"], answer: "猫", explanation: "cat 是猫。" },
  { id: "e19", subject: "english", type: "choice", stem: "“dog”是什么?", options: ["狗", "猫", "猪", "牛"], answer: "狗", explanation: "dog 是狗。" },
  { id: "e20", subject: "english", type: "fill", stem: "“鱼”的英文是?(小写)", answer: "fish", explanation: "鱼是 fish。" },
  { id: "e21", subject: "english", type: "choice", stem: "“bird”是什么动物?", options: ["鱼", "鸟", "猫", "狗"], answer: "鸟", explanation: "bird 是鸟。" },
  // 水果食物(外研版二年级)
  { id: "e22", subject: "english", type: "choice", stem: "“apple”是什么?", options: ["香蕉", "苹果", "橘子", "葡萄"], answer: "苹果", explanation: "apple 是苹果。" },
  { id: "e23", subject: "english", type: "fill", stem: "“香蕉”的英文是?(小写)", answer: "banana", explanation: "香蕉是 banana。" },
  { id: "e24", subject: "english", type: "choice", stem: "“water”的意思是?", options: ["火", "水", "土", "空气"], answer: "水", explanation: "water 是水。" },
  // 身体部位(外研版二年级话题)
  { id: "e25", subject: "english", type: "choice", stem: "“hand”是什么?", options: ["脚", "手", "头", "眼睛"], answer: "手", explanation: "hand 是手。" },
  { id: "e26", subject: "english", type: "fill", stem: "“眼睛”的英文是?(小写)", answer: "eye", explanation: "眼睛是 eye。" },
  // 简单句子
  { id: "e27", subject: "english", type: "choice", stem: "“I am a student.”意思是?", options: ["我是一名老师", "我是一名学生", "我是一只猫", "我很好"], answer: "我是一名学生", explanation: "student 是学生,I am a student 表示我是一名学生。" },
  { id: "e28", subject: "english", type: "choice", stem: "“What's your name?”意思是?", options: ["你几岁了", "你叫什么名字", "你好吗", "再见"], answer: "你叫什么名字", explanation: "What's your name? 询问对方的名字。" },
  { id: "e29", subject: "english", type: "fill", stem: "大写字母表第一个字母是?", answer: "A", explanation: "字母表第一个字母是 A。" },
  { id: "e30", subject: "english", type: "choice", stem: "“Happy birthday!”的意思是?", options: ["新年快乐", "生日快乐", "圣诞快乐", "儿童节快乐"], answer: "生日快乐", explanation: "Happy birthday! 表示生日快乐,外研版二年级常见表达。" },
];

export const ALL_QUESTIONS: Question[] = [
  ...CHINESE_QUESTIONS,
  ...MATH_QUESTIONS,
  ...ENGLISH_QUESTIONS,
];

export function getQuestionsBySubject(subject: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.subject === subject);
}
