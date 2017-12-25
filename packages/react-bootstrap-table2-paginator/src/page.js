export const getByCurrPage = (store, pageStartIndex) => {
  const dataSize = store.data.length;
  if (!dataSize) return [];
  const getNormalizedPage = () => {
    const offset = Math.abs(1 - pageStartIndex);
    return store.page + offset;
  };
  const end = (getNormalizedPage() * store.sizePerPage) - 1;
  const start = end - (store.sizePerPage - 1);

  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push(store.data[i]);
    if (i + 1 === dataSize) break;
  }
  return result;
};
