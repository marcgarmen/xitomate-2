export type EtiquetaColor = 'default' | 'success' | 'error' | 'info';

export interface EtiquetaProps {
  text: string;
  color?: EtiquetaColor;
}
