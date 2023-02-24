import { FunctionComponent, InputHTMLAttributes } from 'react';

interface Props {
  autoFocus?: boolean;
  disabled?: boolean;
  onChange: NonNullable<InputHTMLAttributes<HTMLInputElement>['onChange']>;
  onEnter?: () => void;
  placeholder?: string;
  type?: string;
  value: string | undefined;
}

const Input: FunctionComponent<Props> = ({ autoFocus, disabled, onChange, onEnter, placeholder, type, value }) => (
  <input
    autoFocus={autoFocus}
    className="h-11 w-full appearance-none rounded bg-[#242526] px-3 shadow-inner ring-[#506bf0] placeholder:text-[#9c9ea2] focus:border-0 focus:outline-none focus:ring disabled:cursor-not-allowed disabled:bg-[#3a3b3c] md:text-sm"
    disabled={disabled}
    onChange={onChange}
    onKeyDown={onEnter ? ({ key }) => key === 'Enter' && onEnter() : undefined}
    placeholder={placeholder}
    type={type}
    value={value}
  />
);

export { Input };
