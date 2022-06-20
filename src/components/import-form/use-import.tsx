import { useState } from "preact/compat";
import { getAutoIncId } from "../../utils";
import browser from "webextension-polyfill";
import { ISuperKey, ISuperKeyOptional } from "../../types";

export const useImport = () => {
  const [dataToImport, setDataToImport] = useState<ISuperKeyOptional[]>([]);
  const [allData, setAllData] = useState<ISuperKey[]>([]);

  const onJsonUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(file);
  };

  const onReaderLoad = (event: Event) => {
    const jsonData =
      JSON.parse((event?.target as HTMLInputElement | any).result!) || [];

    browser.storage.sync.get(null).then((items) => {
      if (items) {
        const existingItems: any = Object.values(items) || [];

        const importData = jsonData.map((jsonItem: any) => {
          return existingItems.find(
            (jsonItemEach: any) => jsonItem.key === jsonItemEach.key
          )
            ? {
                // update if edited or insert
                ...jsonItem,
                duplicate: true,
                id: jsonItem.id || getAutoIncId(existingItems),
                edited: true,
              }
            : {
                // New item to insert
                ...jsonItem,
                id: getAutoIncId(existingItems),
                duplicate: false,
                edited: false,
              };
        });

        setDataToImport(importData);
        // Save all data from storage
        setAllData(existingItems);
      }
    });
  };

  const isKeyUnique = (key: string | undefined) =>
    !allData.find((item) => item.key === key);

  const duplicatedData = dataToImport?.filter(
    (item) => item.duplicate || item.edited
  );

  const newKeysCount = dataToImport?.filter((item) => item.duplicate).length;

  const startImport = async () => {
    const dataImportAsync: Promise<any>[] = [];
    const usedIds: ISuperKeyOptional[] = [];
    dataToImport.forEach((item) => {
      const existingItem = allData.find((each) => each.key === item.key);
      const idToSet = existingItem
        ? item.id
        : getAutoIncId([...allData, ...usedIds]);

      if (idToSet && item.key) {
        usedIds.push({ id: idToSet });
        dataImportAsync.push(
          browser.storage.sync.set({ [idToSet]: { ...item, id: idToSet } })
        );
      }
    });

    try {
      await Promise.all(dataImportAsync);
      await browser.notifications.create(
        `superkeys-import-${new Date().getTime()}`,
        {
          type: "basic",
          title: "🚀 Superkeys Import Success",
          message: `${dataToImport.length} ${
            dataToImport.length > 1 ? "keys" : "key"
          } imported successfully`,
          priority: 2,
          iconUrl: browser.runtime.getURL("assets/img/logo128.png"),
        }
      );
      await browser.runtime.openOptionsPage();
    } catch (e) {
      console.error({ e });
    }
  };

  const handleDuplicateDataChange = (e: Event, item: ISuperKeyOptional) => {
    const { value } = e.target as HTMLInputElement;
    setDataToImport(
      duplicatedData.map((data) =>
        data.id === item.id
          ? {
              ...item,
              key: value,
              duplicate: !isKeyUnique(value),
              edited: true,
            }
          : data
      )
    );
  };

  return {
    onJsonUpload,
    duplicatedData,
    dataToImport,
    setDataToImport,
    isKeyUnique,
    startImport,
    newKeysCount,
    handleDuplicateDataChange,
  };
};
