import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { Suspense } from "react"
import { useQuery } from "blitz"
import { AppConstants } from "app/core/constants/AppConstants"

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

export default function AutoCompleteWithDropDownUnMerged(props) {
  const { field, register, getValues, defaultValues = {} } = props
  const classes = useStyles()
  const [{ data }] = useQuery(
    field.dataSource,
    {
      orderBy: { id: "asc" },
      where: {
        ...field.where,
        isdeleted: false,
      },
    },
    { refetchOnWindowFocus: false }
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div key={field.name} className={classes.field}>
        <Autocomplete
          options={[...data, ...(field.showDefault ? [] : [])]}
          getOptionLabel={field.getOptionLabel}
          defaultValue={
            [...data, ...(field.showDefault ? [] : [])].find(
              (item) => field.getOptionLabel(item) === defaultValues[field.name]
            ) || ""
          }
          disabled={field.disabled}
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
