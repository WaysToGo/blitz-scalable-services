import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import SearchIcon from "@material-ui/icons/Search"
import Autocomplete from "@material-ui/lab/Autocomplete"
import React, { Suspense } from "react"
import { useQuery } from "blitz"
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

function AutoCompleteWithSearchUnMerged(props) {
  const { field, register, defaultValues = {}, getValues, setValue } = props
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
        <Controller
          // key={fieldKey}
          control={props.control}
          name={field.name}
          render={({ field: { value, onChange } }) => {
            return (
              <Autocomplete
                options={data}
                disabled={field.disabled}
                getOptionLabel={field.getOptionLabel}
                value={data.find(
                  (item) =>
                    field.getValueLabel(item) === value ||
                    field.getValueLabel(item) === field.getValueLabel(value)
                )}
                popupIcon={<SearchIcon />}
                // defaultValue={data.find((item) => field.getValueLabel(item) === defaultValues[field.name])}
                forcePopupIcon
                classes={{
                  popupIndicatorOpen: classes.searchIcon,
                }}
                onChange={(e, newValue) => {
                  setValue(field.name, newValue)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    label={field.label}
                    required={field.required}
                    placeholder={field.label}
                    // {...register(field.name)}
                  />
                )}
              />
            )
          }}
        />
      </div>
    </Suspense>
  )
}
export default React.memo(AutoCompleteWithSearchUnMerged)
