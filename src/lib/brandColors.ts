export const BRAND = {
  cyan: '#36beef',
  red: '#e51842',
  plum: '#560d50',
} as const;

export type PillarId = 'flow' | 'form' | 'recovery';

export const PILLAR_COLORS: Record<
  PillarId,
  { accent: string; accentClass: string; borderHoverClass: string; watermarkClass: string; dividerHoverClass: string }
> = {
  flow: {
    accent: BRAND.cyan,
    accentClass: 'text-brand-cyan',
    borderHoverClass: 'group-hover:border-brand-cyan/40',
    watermarkClass: 'text-brand-cyan/25',
    dividerHoverClass: 'group-hover:bg-brand-cyan/30',
  },
  form: {
    accent: BRAND.red,
    accentClass: 'text-brand-red',
    borderHoverClass: 'group-hover:border-brand-red/40',
    watermarkClass: 'text-brand-red/25',
    dividerHoverClass: 'group-hover:bg-brand-red/30',
  },
  recovery: {
    accent: BRAND.plum,
    accentClass: 'text-brand-plum',
    borderHoverClass: 'group-hover:border-brand-plum/40',
    watermarkClass: 'text-brand-plum/25',
    dividerHoverClass: 'group-hover:bg-brand-plum/30',
  },
};
