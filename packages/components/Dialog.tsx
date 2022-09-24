import { Transition } from '@headlessui/react';
import { Fragment, FunctionComponent, ReactNode, useCallback, useEffect } from 'react';

interface Props {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
}

const Dialog: FunctionComponent<Props> = ({ children, onClose, open }) => {
  const handleClose = useCallback(() => {
    // Safari は focus されている input が DOM から消えたらページの最後までスクロールしてしまうために
    // ダイアログを閉じる直前に focus されている要素を blur します。
    // https://github.com/sweetalert2/sweetalert2/issues/2088#issuecomment-720151825
    if (document.activeElement && 'blur' in document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }

    onClose();
  }, [onClose]);

  useEffect(() => {
    const close = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') {
        handleClose();
      }
    };

    if (open) {
      window.addEventListener('keydown', close);
    } else {
      window.removeEventListener('keydown', close);
    }

    return () => window.removeEventListener('keydown', close);
  }, [handleClose, open]);

  return (
    <Transition
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={open}
    >
      <div className="fixed inset-0 z-50 !mt-0 flex max-h-screen items-center justify-center bg-black/50 p-4">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          enterTo="opacity-100 translate-y-0 md:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 md:scale-100"
          leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
        >
          <div className="w-full rounded-md border border-[#393a3b] bg-[#18191a] p-3 shadow-sm md:w-auto">
            {children}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export { Dialog };
