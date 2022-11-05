import { useMutation, invalidateQuery } from "blitz"

import { FORM_ERROR } from "app/core/components/Form"
import { Suspense } from "react"
import { FormWrapper } from "app/core/components/GenerateForm/FormWrapper"
import updateSetting from "../mutations/updateSetting"
import { settingsSchema } from "../schemas/settingsSchema"
import getSettings from "../queries/getSettings"

const EditSettingsFormWrapper = (props: any) => {
  const { selectedRow } = props
  const [updateSettingsMut] = useMutation(updateSetting)
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FormWrapper
          formSchema={settingsSchema}
          initialValues={props.selectedRow}
          onSubmit={async (values) => {
            try {
              const data = await updateSettingsMut({
                id: selectedRow.id,
                updatedat: new Date(),
                ...values,
              })
              invalidateQuery(getSettings)
              props.handleClose()
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
          handleClose={props.handleClose}
        />
      </Suspense>
    </div>
  )
}

export default EditSettingsFormWrapper
