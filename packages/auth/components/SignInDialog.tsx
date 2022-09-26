/* eslint-disable react/no-danger */
import { Code } from '@hacker-mainichi/auth/components/Code';
import { Email } from '@hacker-mainichi/auth/components/Email';
import { selectSignInDialogOpen, signInDialogClosed } from '@hacker-mainichi/auth/state';
import { Dialog } from '@hacker-mainichi/components';
import { useDispatch } from '@hacker-mainichi/state/hooks';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useSelector } from 'react-redux';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

if (!RECAPTCHA_SITE_KEY) {
  throw new Error('RECAPTCHA_SITE_KEY を設定してください。');
}

const SignInDialog = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectSignInDialogOpen);

  const [email, setEmail] = useState('');
  const [emailVerificationCodeSent, setEmailVerificationCodeSent] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail('');
      setEmailVerificationCodeSent(false);
    }
  }, [open]);

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: '.grecaptcha-badge{visibility:hidden}' }} />
      </Head>

      <Dialog onClose={() => dispatch(signInDialogClosed())} open={open}>
        {emailVerificationCodeSent ? (
          <Code email={email} />
        ) : (
          <GoogleReCaptchaProvider language="ja" reCaptchaKey={RECAPTCHA_SITE_KEY}>
            <Email email={email} onSubmit={() => setEmailVerificationCodeSent(true)} setEmail={setEmail} />
          </GoogleReCaptchaProvider>
        )}
      </Dialog>
    </>
  );
};

export { SignInDialog };
