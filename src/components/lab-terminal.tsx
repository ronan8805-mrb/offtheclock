import { useState } from "react";
import { LAB_COMMANDS } from "@/data/studio";

export function LabTerminal() {
  const [i, setI] = useState(0);
  const active = LAB_COMMANDS[i];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#0a0b08] shadow-[0_0_80px_rgb(200_245_66/0.06)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[11px] uppercase tracking-widest text-fg-subtle">
          ronan@studio — zsh
        </span>
      </div>
      <div className="space-y-4 p-5 font-mono text-sm">
        <p className="text-fg-subtle">// tap a command. this is the short version.</p>
        <div className="flex flex-wrap gap-2">
          {LAB_COMMANDS.map((c, idx) => (
            <button
              key={c.cmd}
              type="button"
              onClick={() => setI(idx)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                i === idx
                  ? "border-lime/40 bg-lime text-ink"
                  : "border-border text-fg-muted hover:text-fg"
              }`}
            >
              {c.cmd}
            </button>
          ))}
        </div>
        <div>
          <p className="text-lime">
            <span className="text-fg-subtle">$</span> {active.cmd}
          </p>
          <p className="mt-2 leading-relaxed text-fg">{active.out}</p>
        </div>
      </div>
    </div>
  );
}
