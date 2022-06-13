import { FormLayout } from "../form-layout";
import { useState } from "preact/compat";
import { FileUploader } from "react-drag-drop-files";
import { useImport } from "./use-import";

const fileTypes = ["JPG", "PNG", "GIF", "JSON"];

const Index = () => {
  const [file, setFile] = useState(null);

  const { onJsonUpload } = useImport(file);

  const handleChange = (file) => {
    setFile(file);
    onJsonUpload(file);
  };

  return (
    <FormLayout title="Import Super Keys">
      <div className="m-auto">
        <p className="text-center my-1 text-lg">Upload .json file</p>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>
    </FormLayout>
  );
};

export default Index;
