import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import SearchIcon from "@material-ui/icons/Search"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { Suspense } from "react"
import { Controller } from "react-hook-form"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      //  width: "50%",
    },
    searchIcon: {
      transform: "initial",
    },
  })
)

export default function AutoCompleteWithSearch(props) {
  const { field, register, defaultValues = {} } = props
  const classes = useStyles()
  const data: any = field.dataSource
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div key={field.name} className={classes.field}>
        <Controller
          //  key={fieldKey}
          control={props.control}
          name={field.name}
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              options={data}
              disabled={field.disabled}
              getOptionLabel={field.getOptionLabel}
              value={data.find((item) => field.getOptionLabel(item) === defaultValues[field.name])}
              popupIcon={<SearchIcon />}
              forcePopupIcon
              classes={{
                popupIndicatorOpen: classes.searchIcon,
              }}
              onChange={(e, data) => {
                onChange(data)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  label={field.label}
                  required={field.required}
                  placeholder={field.label}
                  {...register(field.name)}
                />
              )}
            />
          )}
        />
      </div>
    </Suspense>
  )
}
