"use client";

import React from "react";
import styled from "styled-components";

type PlayButtonProps = {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const PlayButton: React.FC<PlayButtonProps> = ({ label = "P L A Y", onClick, disabled, className }) => {
  return (
    <StyledWrapper className={className} $disabled={!!disabled}>
      <button onClick={onClick} disabled={disabled} aria-label={label}>
        {label}
        <div id="clip">
          <div id="leftTop" className="corner" />
          <div id="rightBottom" className="corner" />
          <div id="rightTop" className="corner" />
          <div id="leftBottom" className="corner" />
        </div>
        <span id="rightArrow" className="arrow" />
        <span id="leftArrow" className="arrow" />
      </button>
    </StyledWrapper>
  );
};

export default PlayButton;

// Theme-aligned colors (no glow)
// Primary: Indigo/Purple (#8b5cf6), Hover Accent: Cyan (#22d3ee)
const StyledWrapper = styled.div<{ $disabled: boolean }>`
  --primary: #8b5cf6;
  --primary-600: #7c3aed;
  --accent: #22d3ee;
  --text: #e5e7eb;
  --muted: #94a3b8;
  --border: rgba(255,255,255,0.18);
  --bg-inner: rgba(255,255,255,0.03);

  button {
    position: relative;
    width: 13.5em;
    height: 3.5em;
    outline: none;
    transition: transform 0.12s ease, opacity 0.2s ease;
    background: transparent;
    border: none;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: var(--text);
    cursor: ${props => (props.$disabled ? "not-allowed" : "pointer")};
    opacity: ${props => (props.$disabled ? 0.5 : 1)};
  }

  #clip {
    --color: var(--primary);
    position: absolute;
    top: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: 2px solid var(--border);
    /* polygon frame */
    -webkit-clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    background: var(--bg-inner);
    box-shadow: inset 0 0 0 1px var(--border);
  }

  .arrow {
    position: absolute;
    transition: 0.25s ease;
    background-color: var(--primary);
    top: 35%;
    width: 11%;
    height: 30%;
  }

  #leftArrow {
    left: -13.5%;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 50%);
            clip-path: polygon(100% 0, 100% 100%, 0 50%);
  }
  #rightArrow {
    -webkit-clip-path: polygon(100% 49%, 0 0, 0 100%);
            clip-path: polygon(100% 49%, 0 0, 0 100%);
    left: 102%;
  }

  button:hover #rightArrow {
    background-color: var(--accent);
    left: -15%;
    animation: 0.6s ease-in-out both infinite alternate rightArrow8;
  }
  button:hover #leftArrow {
    background-color: var(--accent);
    left: 103%;
    animation: 0.6s ease-in-out both infinite alternate leftArrow8;
  }

  .corner {
    position: absolute;
    width: 3.2em;
    height: 3.2em;
    background-color: var(--primary);
    transform: scale(1) rotate(45deg);
    transition: 0.22s ease;
    box-shadow: inset 0 0 0 1px var(--border);
  }

  #rightTop { top: -1.8em; left: 90%; }
  #leftTop { top: -1.8em; left: -2.9em; }
  #leftBottom { top: 2.0em; left: -2.1em; }
  #rightBottom { top: 45%; left: 87%; }

  button:hover .corner { transform: scale(1.18) rotate(45deg); }

  button:hover #clip { --color: var(--accent); }

  @keyframes leftArrow8 { from { transform: translateX(0); } to { transform: translateX(10px); } }
  @keyframes rightArrow8 { from { transform: translateX(0); } to { transform: translateX(-10px); } }
`;