import type { PomodoroMode } from './components/types/mode'

export type Variant = 'primary' | 'secondary' | 'ghost';
export type Color = 'blue' | 'green' | 'red';
export type Size = 'small' | 'medium' | 'large';

export function buttonStyle(variant: Variant, color: Color, size: Size): string {
    return `${variant}-${color} ${size}`;
}

export const modeColorMap: Record<PomodoroMode, string> = {
  focus: 'red',
  shortBreak: 'blue',
  longBreak: 'green',
}