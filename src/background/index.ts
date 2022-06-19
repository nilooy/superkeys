import browser from "webextension-polyfill";
import { keyLists } from "./superkey.db.json";

const KEY_PREFIX = "superkey";

function handleSearch(info: any, tab: any) {
  const [keyPrefix, indexKey] = info.menuItemId.split("-");

  if (keyPrefix !== KEY_PREFIX || !info.selectionText) return;

  browser.storage.sync.get(indexKey).then((item) => {
    const keyItem = item[indexKey];
    console.log({ keyItem });

    browser.tabs.create({
      url: `${keyItem.queryUrl}=${encodeURI(info.selectionText)}`,
    });
  });
}

browser.runtime.onInstalled.addListener(async () => {
  keyLists.forEach((keyItem, index) => {
    const indexKey = index + 1;
    browser.storage.sync
      .set({ [indexKey]: { id: indexKey, ...keyItem } })
      .then(() => browser.runtime.openOptionsPage());

    // context menu
    if (keyItem.queryUrl) {
      browser.contextMenus.create({
        title: `Search on ${keyItem.url}`,
        contexts: ["selection"],
        id: `${KEY_PREFIX}-${indexKey}`,
      });
    }
  });
});

browser.contextMenus.onClicked.addListener(handleSearch);

browser.storage.onChanged.addListener(function (changes) {
  console.log({ changes });

  const { newValue } = Object.values(changes)?.[0] || {};

  console.log({ newValue, id: `${KEY_PREFIX}-${newValue.id}` });

  if (newValue.queryUrl)
    browser.contextMenus.create({
      title: `Search on ${newValue.url}`,
      contexts: ["selection"],
      id: `${KEY_PREFIX}-${newValue.id}`,
    });
});
