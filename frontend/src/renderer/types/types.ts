import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export type IconButtonSize = 'sm' | '1x' | '2x';

export interface IconButtonProps {
  color: string;
  size: IconButtonSize;
  style?: React.CSSProperties;
  className?: string;
  icon: IconDefinition;
  to: string;
}

export interface SizesProps {
  sm: React.CSSProperties;
  '1x': React.CSSProperties;
  '2x': React.CSSProperties;
}

export interface DashboardCounterProps {
  count: number;
  style?: React.CSSProperties;
  className?: string;
  icon: IconDefinition;
  color: string;
  title: string;
}

export interface DataTableProps {
  data: object[];
  columns: string[];
  endpoint: string;
  getData: Function;
  dependencies?: object;
  color: string;
}

export interface TablePanelProps extends DataTableProps, DashboardCounterProps {
  references: IconButtonProps[];
}

export interface ModalProps {
  columns: string[];
  endpoint: string;
  getData: Function;
  dependencies?: object;
}

export interface ServerResponse {
  message: string;
  object: {
    columns: [];
    rows: [];
    from: string;
  };
  statusCode: number;
}

export interface InfoPanelProps {
  icon: IconDefinition;
  color: string;
}

export enum colors {
  pinkAccent = '#f91889',
  redAccent = '#ff4d6d',
  salmonAccent = '#ff7c56',
}
