import { Col, Row } from "../flex-grid";
import Input from "../input";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "preact/compat";
import { getAutoIncId } from "../../utils";
import browser from "webextension-polyfill";

type FormValues = {
  queryUrl: string;
  subKeys: any[];
  querySeparator: string;
  separator: string;
  key: string;
  url: string;
};

const Form = ({
  tabIndex,
  id: existingId,
  key = "",
  separator = "",
  url = "",
  queryUrl = "",
  querySeparator = "",
  subKeys = [],
  checkedOption,
  setCheckedOption,
  checkIfExists,
  setKeyLists,
  keyLists,
}) => {
  const defaultValues = {
    key,
    separator,
    url,
    queryUrl,
    querySeparator,
    subKeys,
  };

  const [showQueryForm, setShowQueryForm] = useState(!!queryUrl);

  const { register, control, handleSubmit, formState, reset } =
    useForm<FormValues>({
      defaultValues,
    });

  console.log({ formState, checkIfExists, setCheckedOption });

  const { fields, append, remove } = useFieldArray({
    name: "subKeys",
    control,
  });

  console.log({ checkedOption, setCheckedOption });

  const onSubmit = (data) => {
    // data.key is the new key
    if (checkIfExists?.(data.key)) return alert("already exists");

    const idToSet = existingId || getAutoIncId(keyLists);
    console.log({ idToSet, existingId });
    // if there's key, it means form is in edit mode
    browser.storage.sync
      .set({ [idToSet]: { ...data, id: idToSet } })
      .then(() => {
        if (!existingId) {
          reset(defaultValues);
          return location.replace("#");
        }

        setCheckedOption("");
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-primary-content p-2"
    >
      <Row gutter={10}>
        <Col span={6}>
          <Input
            label="Key"
            register={register}
            name="key"
            fullWidth
            required
          />
        </Col>
        <Col span={6}>
          <Input
            label="Url"
            register={register}
            name="url"
            fullWidth
            required
          />
        </Col>
      </Row>

      <div className="mt-4">
        <div>
          <div className="form-control ">
            <label className="label cursor-pointer justify-start">
              <span className="label-text mr-2">Allow Search Query</span>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                onChange={() => setShowQueryForm(!showQueryForm)}
                checked={showQueryForm}
              />
            </label>
          </div>
          {showQueryForm && (
            <Row gutter={10}>
              <Col span={6}>
                <Input
                  register={register}
                  name="queryUrl"
                  label="Query Url"
                  fullWidth
                />
              </Col>
              <Col span={6}>
                {/*<Input*/}
                {/*  label="Query Separator"*/}
                {/*  register={register}*/}
                {/*  name="querySeparator"*/}
                {/*  fullWidth*/}
                {/*/>*/}
              </Col>
            </Row>
          )}

          <div className="p-2 mt-4 border rounded-md">
            <span
              onClick={() =>
                append({
                  key: "",
                  url: "",
                })
              }
              className="btn mb-1 btn-outline"
            >
              Add SubKey
            </span>
            {fields.map((field, index) => (
              <div className="flex gap-1.5 my-2">
                <Input
                  register={register}
                  name={`subKeys.${index}.key`}
                  placeholder="SubKey"
                  wrapperClass="w-32"
                />
                <Input
                  register={register}
                  name={`subKeys.${index}.url`}
                  placeholder="Url"
                  fullWidth
                />
                <span
                  className="btn btn-warning btn-outline"
                  onClick={() => remove(index)}
                >
                  x
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {formState.isDirty && (
        <div className="modal-action items-center">
          <span className="text-gray-600">Press &#9166;</span>
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      )}
    </form>
  );
};

export default Form;
