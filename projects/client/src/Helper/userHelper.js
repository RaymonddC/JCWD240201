export const convertDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('id-ID', {
    dateStyle: 'long',
  });
};
