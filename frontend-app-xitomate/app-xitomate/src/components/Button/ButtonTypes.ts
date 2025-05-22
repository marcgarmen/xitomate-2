export type ButtonType = 'SignUpRed' | 'AccountRed' | 'SignUpGreen';

export interface ButtonProps {
  buttonType: ButtonType;
  variant?: 'SignUpRed' | 'AccountRed' | 'SignupGreen'; // Add the variant prop
}