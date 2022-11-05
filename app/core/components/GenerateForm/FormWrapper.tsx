import { Form } from "app/core/components/Form"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"
import GenerateForm from "app/core/components/GenerateForm/GenerateForm"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { useQuery } from "blitz"
import formQueryWrapper from "../common/queries/formQueryWrapper"
import { AppConstants } from "app/core/constants/AppConstants"
import { cloneDeep } from "lodash"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1),
        width: "95%",
      },
    },
  })
)
const dataSourceTypes = [
  AppConstants.fieldTypes.searchWithImage,
  AppConstants.fieldTypes.dropdownWithStaticImage,
  AppConstants.fieldTypes.dropdownWithDBSource,
  AppConstants.fieldTypes.search,
]

export function FormWrapper<S extends z.ZodType<any, any>>(props: any) {
  const classes = useStyles()
  const schema = props.formSchema
  const [groupedByFieldIdData] = useQuery(
    formQueryWrapper,
    {
      schema,
      dataSourceTypes,
    },
    { refetchOnWindowFocus: false }
  )
  const getModifiedSchema = () => {
    const schema = cloneDeep(props.formSchema)
    schema.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (dataSourceTypes.includes(field.type)) {
          field.dataSource = groupedByFieldIdData[field.fieldid] || []
        }
      })
    })
    return schema
  }

  const modifiedSchema = getModifiedSchema()
  return (
    <Form<S> {...props} className={classes.root} initialValues={props.initialValues}>
      <GenerateForm
        schema={modifiedSchema}
        handleClose={props.handleClose}
        initialValues={props.initialValues}
      />
    </Form>
  )
}
