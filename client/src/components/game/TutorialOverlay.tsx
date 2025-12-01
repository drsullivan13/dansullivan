import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function TutorialOverlay({ onDismiss, onSkip }: { onDismiss: () => void, onSkip: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hasSeen = localStorage.getItem("tutorial_seen");
    if (hasSeen) {
      setVisible(false);
      onDismiss();
    }
  }, [onDismiss]);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem("tutorial_seen", "true");
    onDismiss();
  };

  useEffect(() => {
    const handleKey = () => {
      if (visible) handleDismiss();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="max-w-md w-full border border-primary/50 bg-black p-8 rounded-xl shadow-[0_0_50px_rgba(0,255,255,0.1)] text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-game text-primary text-glow">WELCOME COMMANDER</h2>
        
        <div className="space-y-4 text-left font-hud text-lg text-muted-foreground">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span>MOVE</span>
            <span className="text-white font-bold">← → / A D</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span>SHOOT</span>
            <span className="text-white font-bold">SPACE</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span>NAVIGATE</span>
            <span className="text-white font-bold">DESTROY TARGETS</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground italic">
          "The game IS the interface."
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Button 
            onClick={handleDismiss} 
            className="font-game text-xs bg-primary text-black hover:bg-primary/90 w-full"
          >
            START MISSION
          </Button>
        </div>
        
        <button 
          onClick={onSkip}
          className="text-xs text-muted-foreground hover:text-white underline font-mono"
        >
          Skip to Menu
        </button>
      </div>
    </div>
  );
}
