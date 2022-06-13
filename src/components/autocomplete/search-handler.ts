import browser from 'webextension-polyfill'

const HANDLER = {
  key: "key",
  separator: ":",
  queryUrl: "",
  querySeparator: "",
  queryBuilder: () => {}, // required
  subKeys: [],
};

const queryBuilder = (terms) => {
  return terms;
};

export const DEFAULT_VALUES = {
  separator: " ",
  querySeparator: "-",
  queryBuilder,
};

const isValidUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return ["https:", "http:", "chrome:", "file:"].includes(url.protocol);
};

export const buildSearchUrl = ({ keyItem, value }) => {
  const { queryUrl, subKeys = [], searchValue } = keyItem || {};

  // Handle when no search query url and no subKeys is found
  if (keyItem?.url && !queryUrl && !subKeys.length) return keyItem.url;
  // just to make it less complex
  if (queryUrl && !searchValue) return keyItem.url;

  // Check if sub-keys match with keywords
  const findSubKey = subKeys.find((subKey) => subKey?.key === searchValue);
  if (findSubKey) return findSubKey.url;

  if (queryUrl && searchValue) return `${queryUrl}=${encodeURI(searchValue)}`;

  return value;
};

export const fireSubmitAction = ({ keyItem, value= '' }) => {
  const searchUrl = buildSearchUrl({ keyItem, value });

  if (!searchUrl) return;

  if (isValidUrl(searchUrl))
    return browser.tabs.create({
      url: searchUrl,
    });
  else
    return browser.search.search({
      disposition: "NEW_TAB",
      query: searchUrl
    });
};
