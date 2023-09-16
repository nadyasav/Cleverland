/* eslint-disable react/no-array-index-key */
export const getSearchTextHighlighted = (searchValue: string, text: string) => {
  const str = text.split(new RegExp(`(${searchValue})`, 'gi'));

  return (
    <span>
      {searchValue
        ? str.map((part, index) =>
            part.toLowerCase() === searchValue.toLowerCase() ? (
              <span key={index} className='accent' data-test-id='highlight-matches'>
                {part}
              </span>
            ) : (
              part
            )
          )
        : text}
    </span>
  );
};
