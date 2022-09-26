import clsx from 'clsx';
import { useEffect, useState } from 'react';

const desktopWidths = [
  'sm:w-4/12',
  'sm:w-5/12',
  'sm:w-6/12',
  'sm:w-7/12',
  'sm:w-8/12',
  'sm:w-9/12',
  'sm:w-10/12',
  'sm:w-11/12',
];

const approximateNavHeight = 112;
const randomNumber = () => Math.floor(Math.random() * 3) + 1;
const randomWidth = () => desktopWidths[randomNumber()];
const storyHeight = 94;

const Loading = () => {
  const [storyCount, setStoryCount] = useState(Math.round(1000 / storyHeight));

  useEffect(() => {
    setStoryCount(Math.round((window.innerHeight - approximateNavHeight) / storyHeight));
  }, []);

  return (
    <div className="grid w-full animate-pulse grid-cols-1 gap-4">
      {[...Array(storyCount).keys()].map(index => (
        <div key={index} className="rounded-md border border-[#393a3b] bg-[#242526] p-4 shadow-sm">
          <div className={clsx(randomWidth(), 'mb-0.5 mt-1 h-4 w-full rounded bg-gray-600')} />

          <div>
            <div className="mr-4 inline-block h-3 w-16 rounded bg-gray-500" />
            <div className="inline-block h-3 w-16 rounded bg-gray-500" />
          </div>
        </div>
      ))}
    </div>
  );
};
export { Loading };
