import { useState } from "preact/compat";
import browser from "webextension-polyfill";

export const useImport = (file) => {
  const [allData, setAllData] = useState();
  const [duplicatedData, setDuplicatedData] = useState();

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
        const filtered = data.filter(
            (each) => !savedArray.find((item) => each.key === item.key)
        );
        setDuplicatedData(filtered);
      }
    })

    setAllData(data);
  };

  return {
    onJsonUpload,
  };
};
