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

const Story = () => (
  <div className="max-w-4xl mx-auto animate-pulse">
    <div className="shadow-sm p-4 mb-4 rounded-md bg-white dark:bg-secondary-dark border border-border-color dark:border-border-color-dark">
      <div className={`rounded bg-gray-300 dark:bg-gray-600 h-4 w-full ${randomWidth()} mb-0.5 mt-1`} />

      <div>
        <div className="rounded bg-gray-200 dark:bg-gray-500 h-3 w-16 inline-block mr-4" />
        <div className="rounded bg-gray-200 dark:bg-gray-500 h-3 w-16 inline-block" />
      </div>
    </div>
  </div>
);

const Loading = () => {
  const [storyCount, setStoryCount] = useState(Math.round(1000 / storyHeight));

  useEffect(() => {
    setStoryCount(Math.round((window.innerHeight - approximateNavHeight) / storyHeight));
  }, []);

  return (
    <>
      {[...Array(storyCount).keys()].map(index => (
        <Story key={index} />
      ))}
    </>
  );
};
export { Loading };
