import { useMutation, invalidateQuery } from "blitz"
import { FORM_ERROR } from "app/core/components/Form"
import { Suspense } from "react"
import { FormWrapper } from "app/core/components/GenerateForm/FormWrapper"
import getRoles from "../queries/getRoles"
import { roleFormSchema } from "../schemas/roleFormSchema"
import updateRole from "../mutations/updateRole"

const EditRoleFormWrapper = (props: any) => {
  const [updateRoleMut] = useMutation(updateRole)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormWrapper
        formSchema={roleFormSchema}
        initialValues={props.selectedRow}
        onSubmit={async (values) => {
          const paylod = {
            ...values,
            tenantid: 0,
            isdeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          try {
            const data = await updateRoleMut(paylod)
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

export default EditRoleFormWrapper
