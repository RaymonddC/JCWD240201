export const formatDateParams = (date) => {
  return date
    .toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .replace(',', '');
};

export const formatDate = (date) => {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
