import { useState } from "preact/compat";
import { getAutoIncId } from "../../utils";
import browser from "webextension-polyfill";

export const useImport = (file) => {
  const [dataToImport, setDataToImport] = useState([]);
  const [allData, setAllData] = useState([]);

  const onJsonUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(file);
  };

  const onReaderLoad = (event) => {
    const jsonData = JSON.parse(event.target.result) || [];

    browser.storage.sync.get(null).then((items) => {
      if (items) {
        const existingItems: any = Object.values(items) || [];

        const importData = jsonData.map((jsonItem: any) =>
          existingItems.find(
            (existingItem: any) => jsonItem.key === existingItem.key
          ) ||
          jsonData.find(
            (jsonItemEach: any) => jsonItem.key === jsonItemEach.key
          )
            ? {
                ...jsonItem,
                duplicate: true,
                id: jsonItem.id || getAutoIncId(existingItems),
              }
            : { jsonItem, id: jsonItem.id || getAutoIncId(existingItems) }
        );

        setDataToImport(importData);
        // Save all data from storage
        setAllData(existingItems);
      }
    });
  };

  const isKeyUnique = (key) => !allData.find((item) => item.key === key);

  const duplicatedData = dataToImport?.filter((item) => item.duplicate);

  const startImport = () => {
    dataToImport.forEach((item) => {
      const idToSet = item.id || getAutoIncId(allData);
      browser.storage.sync.set({ [idToSet]: { ...item, id: idToSet } });
    });
  };

  return {
    onJsonUpload,
    duplicatedData,
    dataToImport,
    setDataToImport,
    isKeyUnique,
    startImport,
  };
};
