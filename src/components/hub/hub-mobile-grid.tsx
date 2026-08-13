"use client";

import {
  LuHistory,
  LuLayers,
  LuBrainCircuit,
  LuFolderGit2,
  LuFlaskConical,
  LuTrophy,
  LuFileText,
  LuMail,
} from "react-icons/lu";
import { HUB_NODES, scrollToNode } from "@/three/hubNodes";

const NODE_ICONS = [LuHistory, LuLayers, LuBrainCircuit, LuFolderGit2, LuFlaskConical, LuTrophy, LuFileText, LuMail];

export function HubMobileGrid() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {HUB_NODES.map((node, i) => {
          const Icon = NODE_ICONS[i % NODE_ICONS.length];
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => scrollToNode(node.targetId)}
              aria-label={`Go to ${node.label}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-line bg-bg-elevated px-3 py-4 font-display text-[12px] text-ink-muted transition-colors hover:border-accent-line hover:text-accent cursor-pointer"
            >
              <Icon size={20} aria-hidden />
              {node.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
