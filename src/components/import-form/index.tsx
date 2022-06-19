import { FormLayout } from "../form-layout";
import { useMemo, useState } from "preact/compat";
import { FileUploader } from "react-drag-drop-files";
import { useImport } from "./use-import";
import { Icon } from "@iconify/react/dist/iconify";

const fileTypes = ["JSON"];

const Index = () => {
  const [file, setFile] = useState(null);

  const {
    onJsonUpload,
    duplicatedData,
    setDataToImport,
    isKeyUnique,
    startImport,
    dataToImport,
  } = useImport(file);

  const handleChange = (file) => {
    setFile(file);
    onJsonUpload(file);
  };

  const handleDuplicateDataChange = (e, item) => {
    setDataToImport(
      duplicatedData.map((data) =>
        data.id === item.id
          ? {
              ...item,
              key: e.target.value,
            }
          : data
      )
    );
  };

  const duplicatedList = useMemo(
    () =>
      duplicatedData?.map((item) => {
        const isDuplicateKey = !isKeyUnique(item.key);
        return (
          <div class="form-control my-2" key={item.id.toString()}>
            <label class="input-group">
              <span
                className={`${isDuplicateKey ? "text-error" : "text-success"}`}
              >
                <Icon
                  icon={
                    isDuplicateKey
                      ? "akar-icons:triangle-alert"
                      : "clarity:success-standard-line"
                  }
                  className="mr-1"
                />{" "}
                Key
              </span>
              <input
                type="text"
                defaultValue={item.key}
                placeholder="Unique Key"
                class={`input input-bordered bg-gray-200 text-gray-800 text-md ${
                  isDuplicateKey ? "input-error" : "input-success"
                }`}
                onChange={(e) => handleDuplicateDataChange(e, item)}
              />
            </label>
          </div>
        );
      }),
    [duplicatedData]
  );

  const newKeysCount = dataToImport?.length - duplicatedData?.length;

  return (
    <FormLayout
      title="Import Super Keys"
      actionItems={
        !!dataToImport?.length && (
          <button className="btn btn-outline btn-success" onClick={startImport}>
            Start Import
          </button>
        )
      }
    >
      <div className="m-auto file-uploader-container">
        <p className="text-center my-1 text-lg">
          Drop or click to {file ? "Change" : "Upload"} .json file
        </p>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>
      {!!duplicatedData?.length && (
        <div class="alert alert-warning shadow-lg">
          <div className="m-auto">
            <Icon icon="akar-icons:triangle-alert" className="mr-1" />
            <p>
              These keys exists already! Keys need to be unique. You can change
              theme here or directly on the .json file
            </p>
          </div>
        </div>
      )}

      <div className="m-auto">{duplicatedList}</div>

      {!!newKeysCount && (
        <div class="alert shadow-lg mt-3">
          <div className="m-auto">
            <Icon icon="dashicons:database-import" className="mr-1" />
            <p>Click 'Start Import' button to import {newKeysCount} keys</p>
          </div>
        </div>
      )}
    </FormLayout>
  );
};

export default Index;
