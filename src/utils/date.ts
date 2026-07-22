// 日期工具函数

// 获取本地日期字符串 YYYY-MM-DD
export function todayStr(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// 中文星期
const WEEKDAYS = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
export function weekdayCN(date = new Date()): string {
  return WEEKDAYS[date.getDay()];
}

// 中文日期 "7月22日"
export function dateCN(date = new Date()): string {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// 计算连续打卡:对比上次打卡日期与今天/昨天
export function computeStreak(
  lastCheckinDate: string | null,
  prevStreak: number
): number {
  if (!lastCheckinDate) return 0;
  const today = todayStr();
  const yesterday = todayStr(new Date(Date.now() - 86400000));
  if (lastCheckinDate === today) return prevStreak;
  if (lastCheckinDate === yesterday) return prevStreak; // 今天还没打卡,延续昨天的
  return 0; // 断了
}

// 两个日期相差天数
export function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

// 暑假日期范围(7月1日 - 8月31日)
export function isSummerDate(date = new Date()): boolean {
  const m = date.getMonth() + 1;
  return m === 7 || m === 8;
}

// 获取某月日历网格(含前后补齐)
export function getMonthGrid(year: number, month: number): (string | null)[] {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= days; d++) {
    cells.push(
      `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
    );
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
