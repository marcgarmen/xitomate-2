export type HeaderType = 'noAuth' | 'restaurante' | 'proveedor' | 'admin';

export interface HeaderProps {
  type: HeaderType;
}
