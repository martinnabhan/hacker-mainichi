import { FunctionComponent, useEffect, useState } from 'react';

type Props = Story;

const Story: FunctionComponent<Props> = ({ comments, id, score, title }) => {
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    setVisited(Boolean(localStorage.getItem(id.toString())));
  }, [id]);

  const handleClick = () => {
    if (!visited) {
      localStorage.setItem(id.toString(), id.toString());
      setVisited(true);
    }
  };

  return (
    <a
      href={`https://news.ycombinator.com/item?id=${id}`}
      onClick={handleClick}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div
        className={`${
          visited ? 'opacity-60 dark:opacity-40' : 'shadow-sm'
        } p-4 mb-4 rounded-md bg-white dark:bg-secondary-dark border border-border-color dark:border-border-color-dark`}
      >
        <p className="font-bold text-title dark:text-title-dark">{title}</p>

        <div className="text-sm text-subtitle dark:text-subtitle-dark">
          <span>{score} ポイント・</span>
          <span>{comments} コメント</span>
        </div>
      </div>
    </a>
  );
};

export { Story };
