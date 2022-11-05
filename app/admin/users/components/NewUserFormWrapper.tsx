import { useRouter, useMutation, invalidateQuery } from "blitz"
import { FORM_ERROR } from "app/core/components/Form"
import { Suspense } from "react"
import { FormWrapper } from "app/core/components/GenerateForm/FormWrapper"
import createUser from "../mutations/createUser"
import { userFormSchema } from "../schemas/userFormSchema"
import getUsers from "../queries/getUsers"

const NewUserFormWrapper = (props: any) => {
  const router = useRouter()
  const [createUserMut] = useMutation(createUser)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormWrapper
        formSchema={userFormSchema}
        onSubmit={async (values) => {
          try {
            const payload = {
              ...values,
              tenantId: 0,
              manager: values.manager ? values.manager.id : null,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
            const data = await createUserMut(payload)
            if (data.id) {
              props.handleClose()
              invalidateQuery(getUsers)
            }
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
  )
}

export default NewUserFormWrapper
