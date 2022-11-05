import { useRouter, useMutation, invalidateQuery } from "blitz"
import { FORM_ERROR } from "app/core/components/Form"
import { Suspense } from "react"
import { FormWrapper } from "app/core/components/GenerateForm/FormWrapper"
import updateUser from "../mutations/updateUser"
import getUsers from "../queries/getUsers"
import getCurrentUser from "../queries/getCurrentUser"

const EditUserFormWrapper = (props: any) => {
  const router = useRouter()
  const [updateUserMut] = useMutation(updateUser)
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FormWrapper
          initialValues={props.selectedRow}
          formSchema={props.formSchema}
          onSubmit={async (values) => {
            try {
              const data = await updateUserMut({
                ...values,
                updatedAt: new Date(),
                manager: values.manager ? values.manager.id : null,
                isdeleted: false,
              })
              props.handleClose()
              invalidateQuery(getUsers)
              invalidateQuery(getCurrentUser)
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

export default EditUserFormWrapper
