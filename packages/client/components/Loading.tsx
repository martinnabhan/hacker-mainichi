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
    <>
      {[...Array(storyCount).keys()].map(index => (
        <div key={index} className="mx-auto max-w-4xl animate-pulse">
          <div className="mb-4 rounded-md border border-border-color bg-white p-4 shadow-sm dark:border-border-color-dark dark:bg-secondary-dark">
            <div className={`h-4 w-full rounded bg-gray-300 dark:bg-gray-600 ${randomWidth()} mb-0.5 mt-1`} />

            <div>
              <div className="mr-4 inline-block h-3 w-16 rounded bg-gray-200 dark:bg-gray-500" />
              <div className="inline-block h-3 w-16 rounded bg-gray-200 dark:bg-gray-500" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export { Loading };
