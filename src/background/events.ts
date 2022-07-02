import browser  from "webextension-polyfill";
import { KEY_PREFIX } from "../constants";
import { StorageChange } from "../types";



export const handleStorageChange = async (changes: {
  [index: string]: StorageChange
}) => {
  {
    const changedArray: StorageChange[] = Object.values(changes)

    if(!changedArray?.length) return null;

    changedArray.forEach(({oldValue, newValue}: StorageChange) => {
      // ADD KEY
      if(!oldValue && newValue) {
        console.log({'create': true, oldValue, newValue});
        browser.contextMenus.create({
          title: `Search on ${newValue.url}`,
          contexts: ["selection"],
          id: `${KEY_PREFIX}-${newValue.id}`,
        });
      }
      // REMOVE KEY
      else if (oldValue && !newValue){
        console.log({'REMOVE': true, oldValue, newValue});
        browser.contextMenus.remove(oldValue.id);
      }
      // EDIT KEY
      else if (oldValue && newValue){
        console.log({'EDIT': true, oldValue, newValue});
        browser.contextMenus.update(oldValue.id, {
          title: `Search on ${newValue.url}`,
          contexts: ["selection"],
        });
      }
    })
  }
}