/* eslint-disable react/no-danger */
export const getMessageHighlighted = (error: string, text: string) => {
  const words = error.split(/\s/);
  const pattern = new RegExp(`(${words.join('|')})`, 'g');

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: text.replace(pattern, (match) => `<span class="accent">${match}</span>`),
      }}
    />
  );
};
