import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpeakButtonProps {
  /** 要朗读的文本(英文单词或句子) */
  text: string;
  /** 按钮尺寸 */
  size?: "sm" | "md" | "lg";
  /** 按钮样式变体 */
  variant?: "solid" | "ghost" | "pill";
  /** 自定义类名 */
  className?: string;
  /** 是否显示文字标签 */
  label?: string;
  /** 朗读语速,默认 0.8 适合儿童跟读 */
  rate?: number;
}

// 缓存检测 speechSynthesis 支持情况
let synthSupported: boolean | null = null;
function checkSynthSupport(): boolean {
  if (synthSupported !== null) return synthSupported;
  if (typeof window === "undefined") {
    synthSupported = false;
    return false;
  }
  // 不仅检测 API 是否存在,还要确认能取到 voices
  // 部分国产系统浏览器虽然 API 存在但实际不可用,会抛异常
  try {
    if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance === "undefined") {
      synthSupported = false;
      return false;
    }
    // 触发一次 getVoices,某些浏览器在这里就会抛错
    const voices = window.speechSynthesis.getVoices();
    // 有英文声音才算真正可用
    if (voices.length > 0) {
      synthSupported = voices.some((v) => /^en/i.test(v.lang));
      return synthSupported;
    }
    // voices 异步加载,先乐观认为支持,后续 speak 失败再降级
    synthSupported = true;
    return true;
  } catch {
    synthSupported = false;
    return false;
  }
}

// 安全调用 speechSynthesis.cancel,避免某些浏览器在不可用状态抛错
function safeCancel(): void {
  try {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  } catch {
    // 忽略
  }
}

/**
 * 用 <audio> 元素播放有道词典 TTS 音频作为降级方案。
 * - 国内网络可访问,无需翻墙
 * - 在用户手势触发下调用 audio.play() 符合移动端自动播放策略
 * - 支持单词和短句(URL 编码即可)
 * 返回 true 表示成功触发播放(无论是否真正出声)
 */
function playWithAudio(text: string): boolean {
  try {
    const url = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`;
    const audio = new Audio(url);
    audio.crossOrigin = "anonymous";
    // 不阻塞用户,出错就静默
    audio.onerror = () => {};
    // play() 返回 Promise,某些浏览器会 reject(如被拦截),静默处理
    const p = audio.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
    return true;
  } catch {
    return false;
  }
}

/**
 * 通用发音按钮组件
 *
 * 三级降级策略,保证不崩溃:
 *  1. 优先用浏览器原生 speechSynthesis
 *  2. 失败或不支持时,用 <audio> 播放有道词典 TTS
 *  3. 仍然失败就静默,不影响页面
 *
 * 所有异步回调都用 try/catch 包裹,避免错误冒泡到 React 18 导致整页卸载。
 */
export default function SpeakButton({
  text,
  size = "md",
  variant = "solid",
  className,
  label,
  rate = 0.8,
}: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const [supported] = useState(() => checkSynthSupport());
  // 记录 speechSynthesis 是否真正可用过(避免没声音时反复尝试)
  const synthFailedRef = useRef(false);
  // 兜底定时器引用,便于清理
  const fallbackTimerRef = useRef<number | null>(null);

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      clearFallbackTimer();
      safeCancel();
    };
  }, [clearFallbackTimer]);

  const speak = useCallback(() => {
    if (!text) return;

    // 已知 speechSynthesis 不可用或之前失败过,直接走 audio 降级
    if (!supported || synthFailedRef.current) {
      playWithAudio(text);
      // 短暂高亮一下,给用户反馈
      setSpeaking(true);
      clearFallbackTimer();
      fallbackTimerRef.current = window.setTimeout(() => setSpeaking(false), 1500);
      return;
    }

    // 尝试 speechSynthesis,出错就降级到 audio
    let utter: SpeechSynthesisUtterance | null = null;
    try {
      safeCancel();
      utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      utter.rate = rate;
      utter.pitch = 1.1;

      // 所有回调都用 try/catch 保护,防止异步错误冒泡
      utter.onstart = () => {
        try { setSpeaking(true); } catch { /* ignore */ }
      };
      utter.onend = () => {
        try {
          setSpeaking(false);
          clearFallbackTimer();
        } catch { /* ignore */ }
      };
      utter.onerror = () => {
        try {
          setSpeaking(false);
          clearFallbackTimer();
          // speechSynthesis 报错,标记失败并降级到 audio
          synthFailedRef.current = true;
          playWithAudio(text);
        } catch { /* ignore */ }
      };

      // 部分移动端浏览器需要先 resume
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch { /* ignore */ }

      window.speechSynthesis.speak(utter);

      // 兜底:某些移动端不触发 onend,2.5 秒后强制重置
      clearFallbackTimer();
      fallbackTimerRef.current = window.setTimeout(() => {
        try { setSpeaking(false); } catch { /* ignore */ }
      }, 2500);
    } catch {
      // 同步抛错,降级到 audio
      synthFailedRef.current = true;
      setSpeaking(false);
      clearFallbackTimer();
      try {
        if (utter) {
          utter.onstart = null;
          utter.onend = null;
          utter.onerror = null;
        }
      } catch { /* ignore */ }
      playWithAudio(text);
    }
  }, [text, rate, supported, clearFallbackTimer]);

  const sizeCls = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  }[size];

  const iconSize = { sm: 14, md: 18, lg: 22 }[size];

  const variantCls = {
    solid: "bg-sky2-100 text-sky2-500 hover:bg-sky2-200 active:scale-95",
    ghost: "bg-transparent text-sky2-500 hover:bg-sky2-50",
    pill: "bg-white/70 text-sky2-500 hover:bg-white active:scale-95",
  }[variant];

  if (!supported && variant === "ghost") {
    // 不支持且为 ghost 模式时不显示,避免界面杂乱
    // 注意:即使 speechSynthesis 不支持,audio 降级仍然可用,
    // 但 ghost 模式太多会显得杂乱,这里保持原行为
    return null;
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // 再包一层 try/catch,极端情况下也绝不让点击导致页面崩溃
        try {
          speak();
        } catch {
          try { playWithAudio(text); } catch { /* ignore */ }
        }
      }}
      aria-label={`朗读 ${text}`}
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-full transition-all",
        size !== "sm" && "shadow-soft",
        variantCls,
        label ? "px-3" : sizeCls,
        speaking && "animate-pulse",
        className
      )}
    >
      {speaking ? <VolumeX size={iconSize} /> : <Volume2 size={iconSize} />}
      {label && <span className="text-xs font-bold">{label}</span>}
    </button>
  );
}
