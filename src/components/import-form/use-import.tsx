import { useEffect, useState } from "preact/compat";
import browser from "webextension-polyfill";

export const useImport = (file) => {
  const [dataToImport, setDataToImport] = useState();
  const [duplicatedData, setDuplicatedData] = useState();
  const [allData, setAllData] = useState();

  useEffect(() => {
    browser.storage.sync.get(null).then((items) => {
      if (items) {
        setAllData(Object?.values(items)?.sort((a, b) => a.id - b.id)); // sort by id
      }
    });
  }, []);

  const onJsonUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(file);
  };

  const onReaderLoad = (event) => {
    const data = JSON.parse(event.target.result) || [];

    browser.storage.sync.get(null).then((items) => {
      if (items) {
        const savedArray = Object.values(items);
        const filtered = data.filter((each) =>
          savedArray.find((item) => each.key === item.key)
        );
        setDuplicatedData(filtered);
      }
    });

    setAllData(data);
  };

  const isKeyUnique = (key) => !allData.find((item) => item.key === key);

  console.log({ duplicatedData, dataToImport });

  return {
    onJsonUpload,
    duplicatedData,
    setDuplicatedData,
    dataToImport,
    setDataToImport,
    isKeyUnique,
  };
};
