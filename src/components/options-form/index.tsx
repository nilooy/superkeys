import { useEffect, useState } from "preact/compat";
import { FormItem } from "./form-item";
import { FormLayout } from "../form-layout";
import { AddKeyModal } from "./add-key-modal";
import browser from "webextension-polyfill";

export const OptionsForm = () => {
  const [checkedOption, setCheckedOption] = useState("");
  const [keyLists, setKeyLists] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const getAllKeys = (collapseAll?) => {
    browser.storage.sync.get(null).then((items) => {
      if (items) {
        setKeyLists(Object?.values(items)?.sort((a, b) => a.id - b.id)); // sort by id
        if (collapseAll) setCheckedOption("");
      }
    });
  };

  useEffect(() => {
    getAllKeys();

    browser.storage.onChanged.addListener(function (changes, namespace) {
      getAllKeys(true);
    });
  }, []);

  const checkIfExists = (newKey) =>
    !!keyLists?.find((keyList) => keyList.key === newKey);

  const downloadObjectAsJson = (exportObj, exportName) => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportObj));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const deleteKeys = () => {
    console.log("delete");
    if (!selectedIds?.length) return alert("No key has been selected");

    console.log({ selectedIds });

    const ids = selectedIds.map((id) => id.split("-")?.[1]);

    if (confirm("Are you sure to delete?") === true) {
      browser.storage.sync.get(ids).then((itemsToDelete) => {
        browser.storage.sync.remove(ids).then(() => {
          console.log({ itemsToDelete });
          downloadObjectAsJson(
              Object.values(itemsToDelete),
              `superkey-removed-${new Date()}`
          );
        });
      });
    }
  };

  return (
    <FormLayout
      title="Key Lists"
      actionItems={
        <>
          <button
            onClick={deleteKeys}
            className="btn btn-error btn-outline mr-2"
          >
            Delete
          </button>
          <a href="#add-key-modal" className="btn btn-success btn-outline">
            Add Key
          </a>
        </>
      }
    >
      {keyLists?.length ? (
        keyLists.map((keyItem) => (
          <FormItem
            {...{
              ...keyItem,
              checkedOption,
              setCheckedOption,
              setKeyLists,
              keyLists,
              setSelectedIds,
              selectedIds,
            }}
          />
        ))
      ) : (
        <span className="text-md text-center">No Keys Available</span>
      )}
      <AddKeyModal
        keyLists={keyLists}
        checkIfExists={checkIfExists}
        setKeyLists={setKeyLists}
      />
    </FormLayout>
  );
};
