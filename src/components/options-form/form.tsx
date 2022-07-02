import { Col, Row } from '../flex-grid'
import Input from '../input'
import { useFieldArray, useForm } from 'react-hook-form'
import { useState } from 'preact/compat'
import { getAutoIncId } from '../../utils'
import browser from 'webextension-polyfill'
import { ISuperKey, ISuperKeyOptional } from '../../types'
import { FunctionComponent } from 'preact/compat'

// ISuperKeyOptional as the form is used for both create and update
export interface IFormProps extends ISuperKeyOptional {
 tabIndex?: number
 checkedOption?: string
 setCheckedOption?: (option: string) => void
 checkIfExists?: (key: string) => boolean
 setKeyLists: (option: ISuperKey[]) => void
 keyLists: ISuperKey[]
}

const Form: FunctionComponent<IFormProps> = ({
 id: existingId,
 key = '',
 separator = '',
 url = '',
 queryUrl = '',
 querySeparator = '',
 subKeys = [],
 checkedOption,
 setCheckedOption,
 checkIfExists,
 keyLists,
}) => {
 const defaultValues = {
  key,
  separator,
  url,
  queryUrl,
  querySeparator,
  subKeys,
 }

 const [showQueryForm, setShowQueryForm] = useState(!!queryUrl)

 const { register, control, handleSubmit, formState, reset } =
  useForm<ISuperKey>({
   defaultValues,
  })

 const { fields, append, remove } = useFieldArray({
  name: 'subKeys',
  control,
 })

 const onSubmit = (data: ISuperKey) => {
  // data.key is the new key
  if (checkIfExists?.(data.key)) return alert('already exists')

  const idToSet = existingId || getAutoIncId(keyLists)
  // if there's key, it means form is in edit mode
  browser.storage.sync.set({ [idToSet]: { ...data, id: idToSet } }).then(() => {
   if (!existingId) {
    reset(defaultValues)
    return location.replace('#')
   }

   if (setCheckedOption) {
    setCheckedOption('')
   }
  })
 }

 return (
  <form onSubmit={handleSubmit(onSubmit)} className="text-primary-content p-2">
   <Row gutter={10}>
    <Col span={6}>
     <Input label="Key" register={register} name="key" fullWidth required />
    </Col>
    <Col span={6}>
     <Input label="Url" register={register} name="url" fullWidth required />
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
      </Row>
     )}

     <div className="p-2 mt-4 border rounded-md">
      <span
       onClick={() =>
        append({
         key: '',
         url: '',
        })
       }
       className="btn mb-1 btn-outline"
      >
       Add SubKey
      </span>
      {fields.map((field, index) => (
       // eslint-disable-next-line react/jsx-key
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
 )
}

export default Form
