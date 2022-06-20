import { useEffect, useState } from "preact/compat";
import { FormItem } from "./form-item";
import { FormLayout } from "../form-layout";
import { AddKeyModal } from "./add-key-modal";
import browser from "webextension-polyfill";
import { getUniqueKey } from "../helper";
import { ISuperKey } from "../../types";
import { FunctionComponent } from "preact";

export const OptionsForm: FunctionComponent = () => {
  const [checkedOption, setCheckedOption] = useState<string>("");
  const [keyLists, setKeyLists] = useState<ISuperKey[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const getAllKeys = (collapseAll?: boolean) => {
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

  const checkIfExists = (newKey: string): boolean =>
    !!keyLists?.find((keyList: ISuperKey) => keyList.key === newKey);

  const downloadObjectAsJson = (
    exportObj: ISuperKey[],
    exportName: string = "superkeys"
  ) => {
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
    if (!selectedIds?.length) return alert("No key has been selected");

    const ids = selectedIds.map((id) => id.split("-")?.[1]);

    if (confirm("Are you sure to delete?")) {
      browser.storage.sync.get(ids).then((itemsToDelete) => {
        browser.storage.sync.remove(ids).then(() => {
          downloadObjectAsJson(
            Object.values(itemsToDelete),
            `superkey-removed-${new Date().toJSON()}`
          );
        });
      });
    }
  };

  const exportKeys = () => {
    const itemsToExport = keyLists.filter((item: any) =>
      selectedIds.includes(getUniqueKey(item.key, item.id))
    );

    downloadObjectAsJson(
      Object.values(itemsToExport),
      `superkey-${new Date().toJSON()}`
    );
  };

  const isAllKeySelected = keyLists.every((item: any) =>
    selectedIds.includes(getUniqueKey(item.key, item.id))
  );

  const selectAllKeys = () => {
    if (isAllKeySelected) return setSelectedIds([]);

    setSelectedIds(
      keyLists.map((item: any) => getUniqueKey(item.key, item.id))
    );
  };

  return (
    <FormLayout
      title={
        <label className="mr-2">
          <input
            type="checkbox"
            className={`checkbox checkbox-accent m-[-4px]`}
            onChange={selectAllKeys}
            checked={isAllKeySelected}
          />
          <span className="text-2xl text-green-300 ml-2 italic">Key List</span>
        </label>
      }
      actionItems={
        <>
          {!!selectedIds.length && (
            <>
              <button
                onClick={deleteKeys}
                className="btn btn-error btn-outline mr-2"
              >
                Delete
              </button>
              <button onClick={exportKeys} className="btn btn-outline mr-2">
                Export
              </button>
            </>
          )}
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
