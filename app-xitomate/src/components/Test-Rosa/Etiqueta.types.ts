export type EtiquetaColor = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface EtiquetaProps {
  text: string
  color?: EtiquetaColor
}