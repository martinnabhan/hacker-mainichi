import { FunctionComponent } from 'react';

type Props = Pick<JSX.IntrinsicElements['input'], 'autoFocus' | 'onInput' | 'onKeyDown' | 'value'> & {
  inputRef: JSX.IntrinsicElements['input']['ref'];
};

const Digit: FunctionComponent<Props> = ({ autoFocus, inputRef, onInput, onKeyDown, value }) => (
  <input
    ref={inputRef}
    autoFocus={autoFocus}
    className="h-16 w-12 select-none appearance-none rounded-md border border-[#393a3b] bg-[#242526] text-center text-3xl caret-transparent shadow-inner ring-[#506bf0] focus:border-none focus:outline-none focus:ring"
    inputMode="numeric"
    onChange={() => undefined}
    onInput={onInput}
    onKeyDown={onKeyDown}
    pattern="[0-9]*"
    value={value}
  />
);

export { Digit };
