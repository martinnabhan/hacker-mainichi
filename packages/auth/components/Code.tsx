import { Digit } from '@hacker-mainichi/auth/components/Digit';
import { signInDialogClosed } from '@hacker-mainichi/auth/state';
import { Spinner } from '@hacker-mainichi/components';
import { useDispatch } from '@hacker-mainichi/state/hooks';
import { signIn } from 'next-auth/react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

interface Props {
  email: string;
}

const Code: FunctionComponent<Props> = ({ email }) => {
  const dispatch = useDispatch();

  const [digit1, setDigit1] = useState('');
  const [digit2, setDigit2] = useState('');
  const [digit3, setDigit3] = useState('');
  const [digit4, setDigit4] = useState('');
  const [loading, setLoading] = useState(false);
  const [onInputRequired, setOnInputRequired] = useState(false);

  const digit1Ref = useRef<HTMLInputElement>(null);
  const digit2Ref = useRef<HTMLInputElement>(null);
  const digit3Ref = useRef<HTMLInputElement>(null);
  const digit4Ref = useRef<HTMLInputElement>(null);

  const handleDigitKeyDown = ({ digit, key }: { digit: number; key: string }) => {
    if (key !== 'Backspace' && !Number.isInteger(Number(key))) {
      // Android は Backspace 以外の key は全て Unidentified になるために onKeyDown が使えません。
      // その代わりに onInput を使います。
      if (key === 'Unidentified') {
        setOnInputRequired(true);
      }

      return;
    }

    if (key !== 'Backspace' && onInputRequired) {
      setOnInputRequired(false);
    }

    switch (digit) {
      case 1:
        if (key === 'Backspace') {
          setDigit1('');
        } else {
          setDigit1(key);
          digit2Ref.current?.focus();
        }

        break;
      case 2:
        if (key === 'Backspace') {
          setDigit1('');
          setDigit2('');
          digit1Ref.current?.focus();
        } else {
          setDigit2(key);
          digit3Ref.current?.focus();
        }

        break;
      case 3:
        if (key === 'Backspace') {
          setDigit2('');
          setDigit3('');
          digit2Ref.current?.focus();
        } else {
          setDigit3(key);
          digit4Ref.current?.focus();
        }

        break;
      case 4:
        if (key === 'Backspace') {
          setDigit3('');
          setDigit4('');

          digit3Ref.current?.focus();
        } else {
          setDigit4(key);
          digit4Ref.current?.blur();
        }

        break;
      default:
    }
  };

  useEffect(() => {
    const handleCodeSubmit = async () => {
      setLoading(true);

      const response = await signIn<'credentials'>('credentials', {
        code: `${digit1}${digit2}${digit3}${digit4}`,
        email,
        redirect: false,
      });

      if (response?.ok) {
        dispatch(signInDialogClosed());
        return;
      }

      setDigit1('');
      setDigit2('');
      setDigit3('');
      setDigit4('');
      setLoading(false);

      digit1Ref.current?.focus();
    };

    if (digit1 && digit2 && digit3 && digit4) {
      handleCodeSubmit();
    }
  }, [digit1, digit2, digit3, digit4, dispatch, email]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-2">
      <Digit
        autoFocus
        inputRef={digit1Ref}
        onInput={({ currentTarget }) =>
          onInputRequired && handleDigitKeyDown({ digit: 1, key: currentTarget.value.replaceAll(digit1, '') })
        }
        onKeyDown={({ key }) => handleDigitKeyDown({ digit: 1, key })}
        value={digit1}
      />
      <Digit
        inputRef={digit2Ref}
        onInput={({ currentTarget }) =>
          onInputRequired && handleDigitKeyDown({ digit: 2, key: currentTarget.value.replaceAll(digit2, '') })
        }
        onKeyDown={({ key }) => handleDigitKeyDown({ digit: 2, key })}
        value={digit2}
      />
      <Digit
        inputRef={digit3Ref}
        onInput={({ currentTarget }) =>
          onInputRequired && handleDigitKeyDown({ digit: 3, key: currentTarget.value.replaceAll(digit3, '') })
        }
        onKeyDown={({ key }) => handleDigitKeyDown({ digit: 3, key })}
        value={digit3}
      />
      <Digit
        inputRef={digit4Ref}
        onInput={({ currentTarget }) =>
          onInputRequired && handleDigitKeyDown({ digit: 4, key: currentTarget.value.replaceAll(digit4, '') })
        }
        onKeyDown={({ key }) => handleDigitKeyDown({ digit: 4, key })}
        value={digit4}
      />
    </div>
  );
};

export { Code };
