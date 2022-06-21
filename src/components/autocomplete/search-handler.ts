import browser from "webextension-polyfill";
import { ISearchHandler } from "../../types";
import { checkFirefoxBrowser, isFirefoxBrowser } from "../../utils";

export const DEFAULT_VALUES: {
  separator: string;
  querySeparator: string;
} = {
  separator: " ",
  querySeparator: "-",
};

const isValidUrl = (urlString: string) => {
  let url;

  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  return ["https:", "http:", "chrome:", "file:"].includes(url.protocol);
};

export const buildSearchUrl = ({ keyItem, value }: ISearchHandler) => {
  const { queryUrl, subKeys = [], searchValue } = keyItem || {};

  // Handle when no search query url and no subKeys is found
  if (keyItem?.url && !queryUrl && !subKeys.length) return keyItem.url;
  // just to make it less complex
  if (queryUrl && !searchValue) return keyItem?.url;

  // Check if sub-keys match with keywords
  const findSubKey = subKeys.find((subKey) => subKey?.key === searchValue);
  if (findSubKey) return findSubKey.url;

  if (queryUrl && searchValue) return `${queryUrl}=${encodeURI(searchValue)}`;

  return value;
};

export const fireSubmitAction = async ({
  keyItem,
  value = "",
}: ISearchHandler) => {
  const searchUrl = buildSearchUrl({ keyItem, value });

  if (!searchUrl) return;

  if (isValidUrl(searchUrl))
    return browser.tabs.create({
      url: searchUrl,
    });
  else {
    const isFirefoxBrowser: boolean = await checkFirefoxBrowser();
    const browserSearchMethod: any = isFirefoxBrowser
      ? browser.search?.search
      : chrome.search.query;
    const searchParams = isFirefoxBrowser
      ? {
          query: searchUrl,
        }
      : {
          text: searchUrl,
          disposition: "NEW_TAB",
        };

    return browserSearchMethod(searchParams);
  }
};
