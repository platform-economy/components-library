export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: 'text'|'password'|'date'|'email'|'number'|'search'|'tel'|'url';
  value?: string;
  onBlur?: React.FocusEventHandler;
  onChange?: React.FormEventHandler;
  onClick?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  name?: string;
  hollow?: boolean;
  clearIcon?: React.ReactNode;
}
