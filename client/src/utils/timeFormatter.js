export const timeFormatter = timestamp => {
  // let date = new Date(timestamp * 1000);
  return new Date(timestamp).toLocaleString();
};
