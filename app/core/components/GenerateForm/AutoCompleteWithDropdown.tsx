import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { AppConstants } from "app/core/constants/AppConstants"
import React, { Suspense } from "react"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      //   width: "50%",
    },
    searchIcon: {
      transform: "initial",
    },
  })
)

export default function AutoCompleteWithDropdown(props) {
  const { field, register, getValues, defaultValues = {} } = props
  const classes = useStyles()
  const data: any = field.dataSource

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div key={field.name} className={classes.field}>
        <Autocomplete
          disabled={field.disabled}
          options={[...data, ...(field.showDefault ? [] : [])]}
          getOptionLabel={field.getOptionLabel}
          defaultValue={
            [...data, ...(field.showDefault ? [] : [])].find(
              (item) => field.getOptionLabel(item) === defaultValues[field.name]
            ) || ""
          }
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.field}
              variant="outlined"
              size="small"
              required={field.required}
              label={field.label}
              placeholder={field.label}
              {...register(field.name)}
            />
          )}
        />
      </div>
    </Suspense>
  )
}
