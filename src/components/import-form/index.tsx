import { FormLayout } from "../form-layout";
import { useMemo, useState } from "preact/compat";
import { FileUploader } from "react-drag-drop-files";
import { useImport } from "./use-import";
import { Icon } from "@iconify/react/dist/iconify";

const fileTypes = ["JSON"];

const Index = () => {
  const [file, setFile] = useState(null);

  const { onJsonUpload, duplicatedData, setDuplicatedData, isKeyUnique } =
    useImport(file);

  const handleChange = (file) => {
    setFile(file);
    onJsonUpload(file);
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
                onChange={(e) => {
                  setDuplicatedData(
                    duplicatedData.map((data) =>
                      data.id === item.id
                        ? {
                            ...item,
                            key: e.target.value,
                          }
                        : data
                    )
                  );
                }}
              />
            </label>
          </div>
        );
      }),
    [duplicatedData]
  );

  return (
    <FormLayout
      title="Import Super Keys"
      actionItems={
        <button class="btn btn-outline btn-success">Start Import</button>
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
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p>
              These keys exists already! Keys need to be unique. You can change
              theme here or directly on the .json file
            </p>
          </div>
        </div>
      )}

      <div className="m-auto">{duplicatedList}</div>
    </FormLayout>
  );
};

export default Index;
