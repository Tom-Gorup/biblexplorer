import type { Kingdom, KingAssessment } from '../types/samuel-kings';

// ============================================================
// COLOR SCHEMES FOR KINGDOMS & KING ASSESSMENTS
// ============================================================

export const kingdomColors: Record<Kingdom, { bg: string; border: string; text: string; light: string }> = {
  united: {
    bg: '#6B21A8',      // purple-800
    border: '#A855F7',   // purple-500
    text: '#F3E8FF',     // purple-50
    light: '#EDE9FE',    // purple-100
  },
  judah: {
    bg: '#1E40AF',      // blue-800
    border: '#3B82F6',   // blue-500
    text: '#EFF6FF',     // blue-50
    light: '#DBEAFE',    // blue-100
  },
  israel: {
    bg: '#B45309',      // amber-700
    border: '#F59E0B',   // amber-500
    text: '#FFFBEB',     // amber-50
    light: '#FEF3C7',    // amber-100
  },
};

export const assessmentColors: Record<KingAssessment, { bg: string; border: string; text: string }> = {
  good: {
    bg: '#166534',      // green-800
    border: '#22C55E',   // green-500
    text: '#F0FDF4',     // green-50
  },
  evil: {
    bg: '#991B1B',      // red-800
    border: '#EF4444',   // red-500
    text: '#FEF2F2',     // red-50
  },
  mixed: {
    bg: '#854D0E',      // yellow-800
    border: '#EAB308',   // yellow-500
    text: '#FEFCE8',     // yellow-50
  },
};

export const kingdomLabel: Record<Kingdom, string> = {
  united: 'United Monarchy',
  judah: 'Kingdom of Judah',
  israel: 'Kingdom of Israel',
};
