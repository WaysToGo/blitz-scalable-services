import { useMutation, invalidateQuery } from "blitz"
import { FORM_ERROR } from "app/core/components/Form"
import { Suspense } from "react"
import { FormWrapper } from "app/core/components/GenerateForm/FormWrapper"
import createRole from "../mutations/createRole"
import getRoles from "../queries/getRoles"
import { roleFormSchema } from "../schemas/roleFormSchema"

const NewRoleFormWrapper = (props: any) => {
  const [createRoleMutation] = useMutation(createRole)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormWrapper
        formSchema={roleFormSchema}
        onSubmit={async (values) => {
          const payload = {
            ...values,
            tenantid: 0,
            isdeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          try {
            const data = await createRoleMutation(payload)
            props.handleClose()
            invalidateQuery(getRoles)
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

export default NewRoleFormWrapper
