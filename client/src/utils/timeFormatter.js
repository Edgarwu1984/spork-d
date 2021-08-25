export const timeFormatter = timestamp => {
  let date = new Date(timestamp * 1000);
  return date.toUTCString().slice(5, 16);
};
