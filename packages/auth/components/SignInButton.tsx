import { useUser } from '@hacker-mainichi/auth/hooks';
import { signInDialogOpened } from '@hacker-mainichi/auth/state';
import { useDispatch } from '@hacker-mainichi/state/hooks';
import { signOut } from 'next-auth/react';

const SignInButton = () => {
  const dispatch = useDispatch();
  const user = useUser();

  return (
    <button
      className="absolute top-3 right-2 cursor-pointer rounded-md px-2 py-1.5 text-[#9c9ea2] hover:bg-[#3a3b3c] sm:px-3 sm:py-2 md:relative md:top-0 md:right-0"
      onClick={() => (user ? signOut({ redirect: false }) : dispatch(signInDialogOpened()))}
      title={user ? 'ログアウト' : 'ログイン'}
      type="button"
    >
      {user ? (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export { SignInButton };
