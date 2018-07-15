/* eslint no-param-reassign: 0 */

const getNormalizedPage = (
  page,
  pageStartIndex
) => {
  const offset = Math.abs(1 - pageStartIndex);
  return page + offset;
};

const endIndex = (
  page,
  sizePerPage,
  pageStartIndex
) => (getNormalizedPage(page, pageStartIndex) * sizePerPage) - 1;

const startIndex = (
  end,
  sizePerPage,
) => end - (sizePerPage - 1);

export const alignPage = (store, pageStartIndex, sizePerPage) => {
  const end = endIndex(store.page, sizePerPage, pageStartIndex);
  const dataSize = store.data.length;

  if (end - 1 > dataSize) {
    return pageStartIndex;
  }
  return store.page;
};

export const getByCurrPage = (store, pageStartIndex) => {
  const dataSize = store.data.length;
  if (!dataSize) return [];
  const end = endIndex(store.page, store.sizePerPage, pageStartIndex);
  const start = startIndex(end, store.sizePerPage);

  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push(store.data[i]);
    if (i + 1 === dataSize) break;
  }
  return result;
};
