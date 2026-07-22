import type { Question } from "@/types";

// 二年级复习题库 - 每学科 50+ 题,随机抽取闯关

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
  // 古诗填空
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
];

export const MATH_QUESTIONS: Question[] = [
  // 100以内加减
  { id: "m1", subject: "math", type: "fill", stem: "计算:36 + 28 = ?", answer: "64", explanation: "36+28,个位6+8=14进1,十位3+2+1=6,得64。" },
  { id: "m2", subject: "math", type: "fill", stem: "计算:72 - 35 = ?", answer: "37", explanation: "72-35,个位2-5不够减借1,12-5=7,十位6-3=3,得37。" },
  { id: "m3", subject: "math", type: "choice", stem: "45 + □ = 80,□ 里填?", options: ["35", "45", "25", "30"], answer: "35", explanation: "80-45=35,所以填35。" },
  { id: "m4", subject: "math", type: "fill", stem: "计算:56 + 19 = ?", answer: "75", explanation: "56+19=75,个位6+9=15进1,十位5+1+1=7。" },
  { id: "m5", subject: "math", type: "fill", stem: "计算:90 - 47 = ?", answer: "43", explanation: "90-47=43,个位0-7借1,10-7=3,十位8-4=4。" },
  // 乘法口诀
  { id: "m6", subject: "math", type: "fill", stem: "计算:7 × 8 = ?", answer: "56", explanation: "七八五十六,7×8=56。" },
  { id: "m7", subject: "math", type: "fill", stem: "计算:6 × 9 = ?", answer: "54", explanation: "六九五十四,6×9=54。" },
  { id: "m8", subject: "math", type: "fill", stem: "计算:4 × 7 = ?", answer: "28", explanation: "四七二十八,4×7=28。" },
  { id: "m9", subject: "math", type: "choice", stem: "“八九”的下一句是?", options: ["七十二", "六十三", "八十一", "五十六"], answer: "七十二", explanation: "乘法口诀:八九七十二,8×9=72。" },
  { id: "m10", subject: "math", type: "fill", stem: "计算:9 × 9 = ?", answer: "81", explanation: "九九八十一,9×9=81。" },
  { id: "m11", subject: "math", type: "fill", stem: "计算:3 × 8 = ?", answer: "24", explanation: "三八二十四,3×8=24。" },
  { id: "m12", subject: "math", type: "fill", stem: "计算:5 × 6 = ?", answer: "30", explanation: "五六三十,5×6=30。" },
  // 应用题
  { id: "m13", subject: "math", type: "choice", stem: "小明有5盒铅笔,每盒6支,一共有多少支?", options: ["11支", "30支", "35支", "25支"], answer: "30支", explanation: "每盒6支,5盒就是5×6=30支。" },
  { id: "m14", subject: "math", type: "choice", stem: "一捆铅笔24支,平均分给4个小朋友,每人几支?", options: ["6支", "5支", "4支", "8支"], answer: "6支", explanation: "24÷4=6,每人6支。" },
  { id: "m15", subject: "math", type: "fill", stem: "应用:一根绳子长 1 米,剪去 40 厘米,还剩( )厘米。", answer: "60", explanation: "1米=100厘米,100-40=60厘米。" },
  { id: "m16", subject: "math", type: "choice", stem: "一节课40分钟,两节课一共多少分钟?", options: ["60分钟", "70分钟", "80分钟", "90分钟"], answer: "80分钟", explanation: "40+40=80分钟。" },
  // 时间
  { id: "m17", subject: "math", type: "choice", stem: "钟面上分针走一圈是?", options: ["1小时", "1分钟", "60秒", "12小时"], answer: "1小时", explanation: "分针走一圈60分钟,等于1小时。" },
  { id: "m18", subject: "math", type: "fill", stem: "1小时 = ( )分钟。", answer: "60", explanation: "1小时=60分钟。" },
  { id: "m19", subject: "math", type: "fill", stem: "1米 = ( )厘米。", answer: "100", explanation: "1米=100厘米。" },
  { id: "m20", subject: "math", type: "choice", stem: "现在是3:00,过2小时是几点?", options: ["4:00", "5:00", "6:00", "1:00"], answer: "5:00", explanation: "3+2=5,所以是5:00。" },
  // 图形
  { id: "m21", subject: "math", type: "choice", stem: "正方形有几条边?", options: ["3条", "4条", "5条", "6条"], answer: "4条", explanation: "正方形有4条相等的边。" },
  { id: "m22", subject: "math", type: "choice", stem: "三角形有几个角?", options: ["2个", "3个", "4个", "6个"], answer: "3个", explanation: "三角形有3个角。" },
  { id: "m23", subject: "math", type: "choice", stem: "下面哪个不是平面图形?", options: ["正方形", "三角形", "圆形", "正方体"], answer: "正方体", explanation: "正方体是立体图形,其余是平面图形。" },
  // 比较大小
  { id: "m24", subject: "math", type: "choice", stem: "比较大小:45 ○ 54", options: [">", "<", "=", "≈"], answer: "<", explanation: "45比54小,45<54。" },
  { id: "m25", subject: "math", type: "fill", stem: "找规律填数:2, 4, 6, 8, ( ), 12。", answer: "10", explanation: "每次加2,8后面是10。" },
  { id: "m26", subject: "math", type: "fill", stem: "找规律填数:5, 10, 15, ( ), 25。", answer: "20", explanation: "每次加5,15后面是20。" },
  { id: "m27", subject: "math", type: "fill", stem: "找规律填数:3, 6, 9, ( ), 15。", answer: "12", explanation: "每次加3,9后面是12。" },
  // 综合
  { id: "m28", subject: "math", type: "fill", stem: "计算:8 + 8 + 8 = ?", answer: "24", explanation: "3个8相加,8×3=24。" },
  { id: "m29", subject: "math", type: "fill", stem: "计算:100 - 28 - 32 = ?", answer: "40", explanation: "100-28=72,72-32=40。" },
  { id: "m30", subject: "math", type: "choice", stem: "最大的两位数是?", options: ["90", "99", "100", "98"], answer: "99", explanation: "最大的两位数是99。" },
  { id: "m31", subject: "math", type: "fill", stem: "计算:25 + 25 + 25 + 25 = ?", answer: "100", explanation: "4个25相加,25×4=100。" },
  { id: "m32", subject: "math", type: "choice", stem: "小明带了1元钱,买一块橡皮用去5角,还剩?", options: ["3角", "4角", "5角", "6角"], answer: "5角", explanation: "1元=10角,10-5=5角。" },
];

export const ENGLISH_QUESTIONS: Question[] = [
  // 字母
  { id: "e1", subject: "english", type: "choice", stem: "Which letter comes after “B”?", options: ["A", "C", "D", "E"], answer: "C", explanation: "字母顺序 A B C,B 后面是 C。" },
  { id: "e2", subject: "english", type: "choice", stem: "字母表中有多少个字母?", options: ["24", "25", "26", "27"], answer: "26", explanation: "英语字母表共 26 个字母。" },
  { id: "e3", subject: "english", type: "fill", stem: "补全字母顺序:A, B, C, D, ( )", answer: "E", explanation: "A B C D 后面是 E。" },
  // 颜色
  { id: "e4", subject: "english", type: "choice", stem: "“红色”的英文是?", options: ["blue", "red", "green", "yellow"], answer: "red", explanation: "red 是红色。" },
  { id: "e5", subject: "english", type: "choice", stem: "“蓝色”的英文是?", options: ["blue", "red", "green", "black"], answer: "blue", explanation: "blue 是蓝色。" },
  { id: "e6", subject: "english", type: "choice", stem: "What color is the sun? (太阳)", options: ["blue", "yellow", "purple", "black"], answer: "yellow", explanation: "太阳是黄色的,yellow。" },
  { id: "e7", subject: "english", type: "fill", stem: "“绿色”的英文是?(小写)", answer: "green", explanation: "绿色是 green。" },
  // 数字
  { id: "e8", subject: "english", type: "choice", stem: "“three”表示数字几?", options: ["2", "3", "4", "5"], answer: "3", explanation: "three 是 3。" },
  { id: "e9", subject: "english", type: "fill", stem: "用英文写出数字 5:", answer: "five", explanation: "5 的英文是 five。" },
  { id: "e10", subject: "english", type: "choice", stem: "“ten”表示数字几?", options: ["1", "10", "12", "2"], answer: "10", explanation: "ten 是 10。" },
  { id: "e11", subject: "english", type: "fill", stem: "用英文写出数字 1:", answer: "one", explanation: "1 的英文是 one。" },
  // 动物
  { id: "e12", subject: "english", type: "choice", stem: "“cat”是什么?", options: ["狗", "猫", "鸟", "鱼"], answer: "猫", explanation: "cat 是猫。" },
  { id: "e13", subject: "english", type: "choice", stem: "“dog”是什么?", options: ["狗", "猫", "猪", "牛"], answer: "狗", explanation: "dog 是狗。" },
  { id: "e14", subject: "english", type: "fill", stem: "“鱼”的英文是?(小写)", answer: "fish", explanation: "鱼是 fish。" },
  { id: "e15", subject: "english", type: "choice", stem: "“bird”是什么动物?", options: ["鱼", "鸟", "猫", "狗"], answer: "鸟", explanation: "bird 是鸟。" },
  // 问候语
  { id: "e16", subject: "english", type: "choice", stem: "早上好怎么说?", options: ["Good night", "Good morning", "Goodbye", "Hello"], answer: "Good morning", explanation: "Good morning 是早上好。" },
  { id: "e17", subject: "english", type: "choice", stem: "和别人打招呼说“你好”,用?", options: ["Thank you", "Hello", "Sorry", "Goodbye"], answer: "Hello", explanation: "Hello 是常用的打招呼用语。" },
  { id: "e18", subject: "english", type: "choice", stem: "“Thank you”的意思是?", options: ["对不起", "谢谢", "你好", "再见"], answer: "谢谢", explanation: "Thank you 表示感谢,谢谢。" },
  { id: "e19", subject: "english", type: "choice", stem: "晚上睡觉前说“晚安”,用?", options: ["Good morning", "Good night", "Goodbye", "Hello"], answer: "Good night", explanation: "Good night 是晚安。" },
  // 水果食物
  { id: "e20", subject: "english", type: "choice", stem: "“apple”是什么?", options: ["香蕉", "苹果", "橘子", "葡萄"], answer: "苹果", explanation: "apple 是苹果。" },
  { id: "e21", subject: "english", type: "fill", stem: "“香蕉”的英文是?(小写)", answer: "banana", explanation: "香蕉是 banana。" },
  { id: "e22", subject: "english", type: "choice", stem: "“water”的意思是?", options: ["火", "水", "土", "空气"], answer: "水", explanation: "water 是水。" },
  // 身体部位
  { id: "e23", subject: "english", type: "choice", stem: "“hand”是什么?", options: ["脚", "手", "头", "眼睛"], answer: "手", explanation: "hand 是手。" },
  { id: "e24", subject: "english", type: "fill", stem: "“眼睛”的英文是?(小写)", answer: "eye", explanation: "眼睛是 eye。" },
  // 简单句子
  { id: "e25", subject: "english", type: "choice", stem: "“I am a student.”意思是?", options: ["我是一名老师", "我是一名学生", "我是一只猫", "我很好"], answer: "我是一名学生", explanation: "student 是学生,I am a student 表示我是一名学生。" },
  { id: "e26", subject: "english", type: "choice", stem: "“What's your name?”意思是?", options: ["你几岁了", "你叫什么名字", "你好吗", "再见"], answer: "你叫什么名字", explanation: "What's your name? 询问对方的名字。" },
  { id: "e27", subject: "english", type: "choice", stem: "“stand up”的意思是?", options: ["坐下", "站起来", "举手", "走开"], answer: "站起来", explanation: "stand up 是起立、站起来的意思。" },
  { id: "e28", subject: "english", type: "fill", stem: "大写字母表第一个字母是?", answer: "A", explanation: "字母表第一个字母是 A。" },
];

export const ALL_QUESTIONS: Question[] = [
  ...CHINESE_QUESTIONS,
  ...MATH_QUESTIONS,
  ...ENGLISH_QUESTIONS,
];

export function getQuestionsBySubject(subject: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.subject === subject);
}
