"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { completeTodo, saveWorkSession } from "../../../actions/todo";
import { toast } from "sonner";
import { Header } from "../../../../components/Header";
import { LayoutView } from "../../../../components/LayoutView";
import { Button } from "../../../../components/UI/Button";
import { InputField } from "../../../../components/UI/InputField";
import { AuthEmptyState } from "../../../../components/UI/AuthEmptyState";
import { useSession, signIn } from "next-auth/react";

type Mode = "focus" | "break";

let globalAudioCtx: AudioContext | null = null;
const playCyberpunkAlarm = () => {
  try {
    if (typeof window === "undefined") return;
    const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextCtor) return;
    
    if (!globalAudioCtx) {
      globalAudioCtx = new AudioContextCtor();
    }
    const ctx = globalAudioCtx;
    
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    
    const playBeep = (startTime: number) => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(440, startTime);
      osc1.frequency.exponentialRampToValueAtTime(880, startTime + 0.2); 
      
      osc2.type = "square";
      osc2.frequency.setValueAtTime(220, startTime); 
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      
      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + 0.3);
      osc2.stop(startTime + 0.3);
    };

    const now = ctx.currentTime;
    [0, 0.4, 0.8, 1.6, 2.0, 2.4].forEach(offset => {
      playBeep(now + offset);
    });
  } catch (error) {
    console.warn("Audio playback failed:", error);
  }
};

export default function WorkSpace() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [mode, setMode] = useState<Mode>("focus");
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [endTime, setEndTime] = useState<number | null>(null);

  // Timer logic using target time calculation
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && endTime !== null) {
      interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
        
        setTimeLeft(remaining);

        if (remaining <= 0) {
          setIsRunning(false);
          setEndTime(null);
          playCyberpunkAlarm();
          
          // Save the completed session to the database
          const duration = mode === "focus" ? focusTime : breakTime;
          saveWorkSession(mode, duration)
            .then(() => toast.success(`${mode === "focus" ? "Odak" : "Mola"} oturumu kaydedildi.`))
            .catch((err) => {
              console.error("Session save error:", err);
              toast.error("Oturum süresi kaydedilemedi.");
            });
            
          setTimeLeft(duration * 60);
        }
      }, 200); // Check frequently
    }

    return () => clearInterval(interval);
  }, [isRunning, endTime, mode, focusTime, breakTime]);

  // Reset display when times change while paused
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft((mode === "focus" ? focusTime : breakTime) * 60);
    }
  }, [mode, focusTime, breakTime, isRunning]);

  const toggleTimer = () => {
    if (!isRunning) {
      const durationSeconds = timeLeft > 0 ? timeLeft : (mode === "focus" ? focusTime : breakTime) * 60;
      setEndTime(Date.now() + durationSeconds * 1000);
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setEndTime(null);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setEndTime(null);
    setIsRunning(false);
    setTimeLeft((mode === "focus" ? focusTime : breakTime) * 60);
  };

  const completeTask = async () => {
    setIsRunning(false);
    setEndTime(null);
    
    // Yükleniyor bildirimi başlat
    const toastId = toast.loading("Görev tamamlanıyor...");
    
    try {
      if (id) {
        await completeTodo(id);
      }
      
      // Süre kaldıysa kalan miktarı hesaplayıp başarı bildirimi gösterilebilir ama genelde basit tutulur.
      toast.success("Görev başarıyla tamamlandı!", { id: toastId });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Görev tamamlanırken bir hata oluştu.", { id: toastId });
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const totalSeconds = (mode === "focus" ? focusTime : breakTime) * 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  return (
    <LayoutView>
      <Header title="Focus_Flow // WorkSpace" description="Çalışma Alanı" />
      
      {status === "loading" ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 rounded-full border-t-2 border-emerald-500 animate-spin" />
        </div>
      ) : !isAuthenticated ? (
        <AuthEmptyState onLogin={() => signIn("google")} />
      ) : (
        <div className="flex flex-col gap-8 w-full mt-4">
          {/* Ayarlar & Mod Seçimi */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 md:p-6 rounded-xl border border-zinc-800/80 bg-[#0a0a0a] relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500/10 to-transparent rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500 pointer-events-none" />
            
            <div className="flex gap-1 sm:gap-2 p-1 rounded-lg border border-zinc-800 bg-[#050505] w-full md:flex-1 relative z-10">
              <button
                onClick={() => { setMode("focus"); setIsRunning(false); }}
                className={`flex-1 px-2 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "focus" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-zinc-500 hover:text-zinc-300 border border-transparent"}`}
              >
                Odak Modu
              </button>
              <button
                onClick={() => { setMode("break"); setIsRunning(false); }}
                className={`flex-1 px-2 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "break" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-zinc-500 hover:text-zinc-300 border border-transparent"}`}
              >
                Mola Modu
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-2 sm:gap-4 w-full md:flex-1 relative z-10">
              <div className="flex items-center gap-2">
                <label className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Odak (dk)</label>
                <InputField
                  type="number"
                  min="1"
                  max="120"
                  value={focusTime}
                  onChange={(e) => setFocusTime(Number(e.target.value))}
                  className="w-16 px-2! py-1! text-center bg-[#050505] rounded-md!"
                  disabled={isRunning}
                />
              </div>
              <div className="w-px h-6 bg-zinc-800"></div>
              <div className="flex items-center gap-2">
                <label className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Mola (dk)</label>
                <InputField
                  type="number"
                  min="1"
                  max="60"
                  value={breakTime}
                  onChange={(e) => setBreakTime(Number(e.target.value))}
                  className="w-16 px-2! py-1! text-center bg-[#050505] rounded-md!"
                  disabled={isRunning}
                />
              </div>
            </div>
          </div>

          {/* Sayaç Dairesi */}
          <div className="relative flex items-center justify-center py-8">
            <div className={`relative flex items-center justify-center w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full border border-dashed ${mode === 'focus' ? 'border-emerald-500/20' : 'border-cyan-500/20'} bg-[#0a0a0a] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]`}>
              {/* SVG Progress Circle */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-lg" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="48" 
                  fill="none" 
                  stroke={mode === 'focus' ? 'rgba(52, 211, 153, 0.8)' : 'rgba(34, 211, 238, 0.8)'} 
                  strokeWidth="1.5" 
                  strokeDasharray="301.59" 
                  strokeDashoffset={301.59 - (301.59 * progressPercent) / 100}
                  className="transition-all duration-1000 ease-linear shadow-[0_0_15px_currentColor]"
                />
              </svg>
              
              <div className="flex flex-col items-center z-10 select-none">
                <span className={`text-[3.5rem] sm:text-[5rem] font-light tracking-widest leading-none ${mode === 'focus' ? 'text-emerald-400' : 'text-cyan-400'} ${mode === 'focus' ? 'drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]' : 'drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]'}`}>
                  {formatTime(timeLeft)}
                </span>
                <span className={`text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] mt-4 uppercase font-bold text-center ${mode === 'focus' ? 'text-emerald-500/50' : 'text-cyan-500/50'}`}>
                  {mode === "focus" ? "Bölgeye Gir" : "Sistemi Soğut"}
                </span>
              </div>

              {/* Glowing inner effect */}
              <div className={`absolute inset-0 rounded-full blur-[60px] opacity-10 ${mode === 'focus' ? 'bg-emerald-500' : 'bg-cyan-500'} pointer-events-none`} />
            </div>
          </div>

          {/* Kontroller */}
          <div className="flex justify-center mt-2">
            <div className="flex items-center justify-center gap-2 sm:gap-4 bg-[#0a0a0a] p-2 rounded-2xl border border-zinc-800/80 w-full sm:w-auto flex-wrap sm:flex-nowrap">
              {/* Reset Butonu */}
              <Button 
                  onClick={resetTimer}
                  className="px-3! py-3! bg-[#050505]! text-zinc-400 border-zinc-800 hover:bg-zinc-800! hover:text-white! rounded-xl shadow-none hover:shadow-none"
                  title="Sıfırla"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </Button>
              
              {/* Oynat/Durdur Butonu */}
              <Button 
                onClick={toggleTimer}
                className={`w-40 justify-center flex font-bold tracking-[0.2em] rounded-xl py-3 ${isRunning ? 'bg-red-500/10! text-red-400! border-red-500/30! hover:bg-red-500/20!' : (mode === 'focus' ? '' : 'bg-cyan-500/10! text-cyan-400! border-cyan-500/30! hover:bg-cyan-500/20! hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]')}`}
              >
                {isRunning ? 'DURDUR' : 'BAŞLAT'}
              </Button>

              {/*Görevi Tamamla Butonu*/}
              <Button 
                onClick={completeTask}
                className={`w-40 justify-center flex font-bold tracking-[0.2em] rounded-xl py-3  hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]`}
              >
                Görevi Tamamla
              </Button>
            </div>
          </div>
        </div>
      )}
    </LayoutView>
  );
}