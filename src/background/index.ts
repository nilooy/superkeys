import browser, { Menus } from "webextension-polyfill";
import { keyLists } from "./superkey.db.json";
import { handleStorageChange } from "./events";
import { KEY_PREFIX } from "../constants";

interface IDefaultMenu extends Menus.CreateCreatePropertiesType{
  // for future
}

const DEFAULT_CONTEXT_MENUS: IDefaultMenu[] = [
  {
    title: `Manage Keys`,
    contexts: ["all"],
    id: `addNew`,
  }
]

const handleDefaultMenuClick = async (id: string) => {
  const defaultKey = DEFAULT_CONTEXT_MENUS.find(each => each.id === id)
  let urlToGo:string = '';
  if(defaultKey?.id === 'addNew')
    urlToGo = browser.runtime.getURL('dist/options/index.html')

  return urlToGo && browser.tabs.create({
    url: urlToGo,
  });
}

async function handleSearch(info: any, tab: any) {
  const [keyPrefix, indexKey] = info.menuItemId.split("-");

  if (keyPrefix !== KEY_PREFIX) return;

  await handleDefaultMenuClick(indexKey)

  if(!info.index) return;

  browser.storage.sync.get(indexKey).then((item) => {
    const keyItem = item[indexKey];

    return keyItem && browser.tabs.create({
      url: `${keyItem.queryUrl}=${encodeURI(info.selectionText)}`,
    });
  });
}

browser.runtime.onInstalled.addListener(async () => {
  // CLEAN ALL CONTEXT MENU BEFORE ADDING/RESETTING ALL KEYS
  await browser.contextMenus.removeAll()

  // Add Default Menus
  DEFAULT_CONTEXT_MENUS.forEach(({title,contexts,id }:Menus.CreateCreatePropertiesType) =>
    browser.contextMenus.create({
    title,contexts,id: `${KEY_PREFIX}-${id}`
  }))

  // Add User Keys
  keyLists.forEach((keyItem, index) => {
    const indexKey = index + 1;
    browser.storage.sync
      // @ts-ignore
      .set({ [indexKey]: { id: indexKey, ...keyItem } }) // TODO: Test carefully.
      .then(() => browser.runtime.openOptionsPage());
    // This will trigger handleStorageChange
  });
});

browser.contextMenus.onClicked.addListener(handleSearch);

browser.storage.onChanged.addListener(handleStorageChange);
