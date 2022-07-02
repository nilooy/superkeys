import Form, { IFormProps } from './form'
import { FunctionComponent } from 'preact'

interface IAddKeyModalProps {
 checkIfExists: IFormProps['checkIfExists']
 keyLists: IFormProps['keyLists']
 setKeyLists: IFormProps['setKeyLists']
}

export const AddKeyModal: FunctionComponent<IAddKeyModalProps> = ({
 checkIfExists,
 setKeyLists,
 keyLists,
}) => {
 return (
  <div
   className="modal"
   id="add-key-modal"
   style={{
    '--tw-bg-opacity': '0.8',
   }}
  >
   <div className="modal-box w-11/12 max-w-5xl relative">
    <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2">
     ✕
    </a>
    <h3 className="font-bold text-lg">Add Super Key</h3>

    <Form
     checkIfExists={checkIfExists}
     setKeyLists={setKeyLists}
     keyLists={keyLists}
    />
   </div>
  </div>
 )
}
