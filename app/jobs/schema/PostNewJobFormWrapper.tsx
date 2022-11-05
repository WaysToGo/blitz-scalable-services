import { useMutation, invalidateQuery } from "blitz"
import { FORM_ERROR } from "app/core/components/Form"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Suspense } from "react"
import { FormWrapper } from "app/core/components/GenerateForm/FormWrapper"

import { removeEmpty } from "app/core/utils/common"
import { useSnackbar } from "notistack"
import createJob from "../mutations/createJob"

const PostNewJobFormWrapper = (props: any) => {
  const [updateNewJobForm] = useMutation(createJob)
  const currentUser = useCurrentUser()
  const { enqueueSnackbar } = useSnackbar()

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FormWrapper
          formSchema={props.schema}
          initialValues={props.initialValues}
          onSubmit={async (values) => {
            try {
              const filterEmptyValues = removeEmpty(values)
              const data = await updateNewJobForm({ ...values, experience: +values.experience, })
              enqueueSnackbar("Section Saved Successfully", { variant: "success" })
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

export default PostNewJobFormWrapper
