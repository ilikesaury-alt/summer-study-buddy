import { useCallback, useEffect, useState } from "react";
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
  synthSupported = "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance !== "undefined";
  return synthSupported;
}

/**
 * 通用发音按钮组件
 * 
 * 用于朗读英文单词或句子,适配移动端浏览器:
 * - 移动端要求用户手势触发音频播放,本组件通过 onClick 满足
 * - 朗读前先 cancel 避免叠加
 * - 不支持 speechSynthesis 时降级为打开 Google 翻译发音链接
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

  // 组件卸载时停止朗读
  useEffect(() => {
    return () => {
      if (checkSynthSupport()) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // 忽略
        }
      }
    };
  }, []);

  const speak = useCallback(() => {
    if (!text) return;

    if (!checkSynthSupport()) {
      // 降级:打开 Google 翻译发音(在新标签页)
      window.open(
        `https://translate.google.com/?sl=en&tl=zh-CN&text=${encodeURIComponent(text)}&op=translate`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    try {
      // 先取消正在播放的语音
      window.speechSynthesis.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      utter.rate = rate;
      utter.pitch = 1.1; // 略高音调,更友好

      utter.onstart = () => setSpeaking(true);
      utter.onend = () => setSpeaking(false);
      utter.onerror = () => setSpeaking(false);

      // 部分移动端浏览器需要先 resume
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      window.speechSynthesis.speak(utter);

      // 兜底:某些移动端不触发 onend,2.5 秒后强制重置
      setTimeout(() => setSpeaking(false), 2500);
    } catch {
      setSpeaking(false);
    }
  }, [text, rate]);

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
    return null;
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        speak();
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
