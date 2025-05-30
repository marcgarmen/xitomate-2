export type ButtonType =
  | 'SignUpRed'
  | 'AccountRed'
  | 'SignUpGreen'
  | 'OutlineGreen';

export interface ButtonProps {
  buttonType?: ButtonType;
  variant?: 'SignUpRed' | 'AccountRed' | 'SignupGreen' | 'OutlineGreen';
}