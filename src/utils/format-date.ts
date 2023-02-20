export const formatDate = (dateStr: string, fullDate = true) => {
  let date;

  if (fullDate) {
    date = new Date(dateStr).toLocaleString('ru', { day: 'numeric', month: 'long' });
    const year = new Date(dateStr).getFullYear();

    return `${date} ${year}`;
  }
  date = new Date(dateStr).toLocaleDateString('ru', { day: '2-digit', month: '2-digit' });

  return date;
};
