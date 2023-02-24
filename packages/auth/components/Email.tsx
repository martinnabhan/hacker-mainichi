import { Button, Input } from '@hacker-mainichi/components';
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import isEmail from 'validator/lib/isEmail';

interface Props {
  email: string;
  onSubmit: () => void;
  setEmail: Dispatch<SetStateAction<string>>;
}

const Email: FunctionComponent<Props> = ({ email, onSubmit, setEmail }) => {
  const [emailValid, setEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleEmailSubmit = async () => {
    setLoading(true);

    try {
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA を実行出来ませんでした。');
      }

      const response = await fetch('/api/auth/verify-email', {
        body: JSON.stringify({ email, reCaptchaToken: await executeRecaptcha('auth') }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('確認コードを送信出来ませんでした。');
      }

      onSubmit();
    } catch (err) {
      setEmail('');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEmailValid(isEmail(email));
  }, [email]);

  return (
    <div className="flex w-[calc(100vw-28px-32px)] gap-2 md:w-80">
      <Input
        autoFocus
        disabled={loading}
        onChange={({ target }) => setEmail(target.value.toLowerCase())}
        onEnter={() => emailValid && !loading && handleEmailSubmit()}
        placeholder="email@hacker-mainichi.vercel.app"
        type="email"
        value={email}
      />

      <Button disabled={!emailValid} loading={loading} onClick={handleEmailSubmit}>
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  );
};

export { Email };
