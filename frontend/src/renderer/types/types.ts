import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export type IconButtonSize = 'sm' | '1x' | '2x';

export interface IconButtonProps {
  color: string;
  size: IconButtonSize;
  style?: React.CSSProperties;
  className?: string;
  icon: IconDefinition;
}

export interface SizesProps {
  sm: React.CSSProperties;
  '1x': React.CSSProperties;
  '2x': React.CSSProperties;
}

export enum colors {
  pinkAccent = '#f91889',
  redAccent = '#ff4d6d',
  salmonAccent = '#ff7c56',
}
