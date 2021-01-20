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

const randomNumber = () => Math.floor(Math.random() * 3) + 1;
const randomWidth = () => desktopWidths[randomNumber()];

const Story = () => (
  <div className="max-w-4xl mx-auto animate-pulse">
    <div className="shadow-sm p-4 mb-4 rounded-md bg-white border border-borderColor">
      <div className={`rounded bg-gray-300 h-4 w-full ${randomWidth()} mb-0.5 mt-1`} />

      <div>
        <div className="rounded bg-gray-200 h-3 w-16 inline-block mr-4" />
        <div className="rounded bg-gray-200 h-3 w-16 inline-block" />
      </div>
    </div>
  </div>
);

const storyHeight = 110;
const stories = Math.round(window.innerHeight / storyHeight);

const Loading = () => (
  <>
    {[...Array(stories)].map(_ => (
      <Story />
    ))}
  </>
);

export { Loading };
