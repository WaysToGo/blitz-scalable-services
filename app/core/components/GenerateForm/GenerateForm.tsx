import React, { Suspense, useState } from "react"
import TextField from "@material-ui/core/TextField"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Button from "@material-ui/core/Button"
import { Controller, useFormContext } from "react-hook-form"
import DialogActions from "@material-ui/core/DialogActions"
import { Box, Checkbox, Divider, FormControlLabel, Grid, Typography } from "@material-ui/core"
import AutoCompleteWithSearch from "./AutoCompleteWithSearch"
import { AppConstants } from "app/core/constants/AppConstants"
import AutoCompleteWithImage from "./AutoCompleteWithImage"
import AutoCompleteWithDropdown from "./AutoCompleteWithDropdown"
import DropdownWithStaticImage from "./DropdownWithStaticImage"
import AutoCompleteWithImageDifferentSource from "./AutoCompleteWithImageDifferentSource"
import SectionHeader from "../common/SectionHeader"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import AutoCompleteWithDropDownUnMerged from "./AutoCompleteWithDropDownUnMerged"
import AutoCompleteWithSearchUnMerged from "./AutoCompleteWithSearchUnMerged"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    section: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      margin: "20px",
    },
    field: {
      width: "100%",
    },
    saveBtn: {
      position: "absolute",
      bottom: 0,
      right: 10,
      marginBottom: "2px",
      [theme.breakpoints.down("sm")]: {
        position: "relative !important",
      },
    },
    divider: {
      height: 3,
      backgroundColor: theme.palette.secondary.light,
    },
    checkbox: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
    },
  })
)

export default function GenerateForm(props) {
  const {
    register,
    formState: { isSubmitting, errors },
    getValues,
    watch,
    setValue,
    control,
    // @ts-ignore
    defaultValues,
  } = useFormContext()
  const { schema, handleClose } = props
  const classes = useStyles()
  const currentUser = useCurrentUser()
  return (
    <Box className={classes.root}>
      {schema.sections.map((section) => {
        return (
          <>
            <Box key={section.name}>
              <SectionHeader
                sectionId={props.initialValues?.sectionId}
                section={section}
                sectionName={schema.name}
                currentUser={currentUser}
                storeInfo={props.initialValues?.storeInfo ? props.initialValues?.storeInfo : {}}
              />
              <Box className={classes.section}>
                <Grid container spacing={2}>
                  {section.fields.map((field) => {
                    switch (field.type) {
                      case AppConstants.fieldTypes.checkbox:
                        return (
                          <Grid xs={12} md={6} key={field.name} className={classes.checkbox}>
                            <Controller
                              name={field.name}
                              control={control}
                              render={({ field: { value, onChange } }) => {
                                return (
                                  <>
                                    <FormControlLabel
                                      key={field.name}
                                      label={field.label}
                                      disabled={field.disabled}
                                      control={
                                        <Checkbox checked={value} onChange={(e) => onChange(e)} />
                                      }
                                    />
                                  </>
                                )
                              }}
                            />
                          </Grid>
                        )
                      case "number":
                        return (
                          <Grid xs={12} md={6} key={field.name} className={classes.field}>
                            <TextField
                              className={classes.field}
                              variant="outlined"
                              size="small"
                              type={field.type}
                              required={field.required}
                              disabled={field.disabled}
                              label={field.label}
                              placeholder={field.label}
                              {...register(field.name)}
                            />
                          </Grid>
                        )
                      case "textfield":
                        return (
                          <Grid xs={12} md={6} key={field.name} className={classes.field}>
                            <TextField
                              className={classes.field}
                              variant="outlined"
                              size="small"
                              type={field.type}
                              required={field.required}
                              disabled={field.disabled}
                              label={field.label}
                              placeholder={field.label}
                              {...register(field.name)}
                            />
                          </Grid>
                        )
                      // when data is coming from server
                      case AppConstants.fieldTypes.dropdownWithDBSource:
                        return (
                          <Grid xs={12} md={6} key={field.name} className={classes.field}>
                            <AutoCompleteWithDropdown
                              register={register}
                              field={field}
                              pickBy={field.pickBy}
                              setValue={setValue}
                              getValues={getValues}
                              watch={watch}
                              control={control}
                              defaultValues={defaultValues}
                            />
                          </Grid>
                        )
                      // when data is coming from server not merged at formWrapper
                      case AppConstants.fieldTypes.dropdownWithDBSourceUnMerged:
                        return (
                          <Grid xs={12} md={6} key={field.name} className={classes.field}>
                            <AutoCompleteWithDropDownUnMerged
                              register={register}
                              field={field}
                              pickBy={field.pickBy}
                              setValue={setValue}
                              getValues={getValues}
                              watch={watch}
                              control={control}
                              defaultValues={defaultValues}
                            />
                          </Grid>
                        )
                      //when data is passed in config
                      case AppConstants.fieldTypes.dropdownWithStaticData:
                        return (
                          <Grid xs={12} md={6} key={field.name} className={classes.field}>
                            <Autocomplete
                              options={field.dropdownData}
                              disabled={field.disabled}
                              getOptionLabel={field.getOptionLabel}
                              defaultValue={
                                field.dropdownData.find(
                                  (item) =>
                                    field.getOptionLabel(item) ===
                                    (defaultValues ? defaultValues[field.name] : "")
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
                          </Grid>
                        )
                      // when data is coming from server
                      case "search":
                        return (
                          <Suspense fallback={<Box>Loading...</Box>}>
                            <Grid xs={12} md={6} key={field.name} className={classes.field}>
                              <AutoCompleteWithSearch
                                register={register}
                                field={field}
                                setValue={setValue}
                                getValues={getValues}
                                watch={watch}
                                control={control}
                                defaultValues={defaultValues}
                              />
                            </Grid>
                          </Suspense>
                        )
                      // when data is coming from server
                      case "search_unmerged":
                        return (
                          <Suspense fallback={<Box>Loading...</Box>}>
                            <Grid xs={12} md={6} key={field.name} className={classes.field}>
                              <AutoCompleteWithSearchUnMerged
                                register={register}
                                field={field}
                                setValue={setValue}
                                getValues={getValues}
                                watch={watch}
                                control={control}
                                defaultValues={defaultValues}
                              />
                            </Grid>
                          </Suspense>
                        )
                      // when data is coming from server and has image component with select option
                      /*
                       hideSelect: true, for hiding select option and data source is used same for both dropdown and image
                      required: true, for making dropdown required
                      dataSource: dropdown and image data source is same
                       */
                      case AppConstants.fieldTypes.searchWithImage:
                        return (
                          <Suspense fallback={<Box>Loading...</Box>}>
                            <Grid xs={12} md={6} key={field.name} className={classes.field}>
                              <AutoCompleteWithImage
                                register={register}
                                field={field}
                                setValue={setValue}
                                getValues={getValues}
                                watch={watch}
                                control={control}
                              />
                            </Grid>
                          </Suspense>
                        )
                      // when data is coming from server dropdown and image has different data source
                      /*
                      required: true, for making dropdown required
                      dataSource: is for dropdown data source
                      imageDataSource: is for image data source
                       */
                      case AppConstants.fieldTypes.autoCompleteWithImageDifferentSource:
                        return (
                          <Suspense fallback={<Box>Loading...</Box>}>
                            <Grid xs={12} md={6} key={field.name} className={classes.field}>
                              <AutoCompleteWithImageDifferentSource
                                register={register}
                                field={field}
                                setValue={setValue}
                                getValues={getValues}
                                watch={watch}
                                control={control}
                              />
                            </Grid>
                          </Suspense>
                        )
                      //dropdown data is coming from config and image data is coming from the data source
                      /*


                      */
                      case AppConstants.fieldTypes.dropdownWithStaticImage:
                        return (
                          <Suspense fallback={<Box>Loading...</Box>}>
                            <Grid xs={12} md={6} key={field.name} className={classes.field}>
                              <DropdownWithStaticImage
                                register={register}
                                field={field}
                                setValue={setValue}
                                getValues={getValues}
                                watch={watch}
                                control={control}
                              />
                            </Grid>
                          </Suspense>
                        )
                      case "date":
                        return (
                          <Grid xs={12} md={6} key={field.name} className={classes.field}>
                            <TextField
                              className={classes.field}
                              variant="outlined"
                              size="small"
                              required={field.required}
                              label={field.label}
                              placeholder={field.label}
                              {...register(field.name)}
                              type="date"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Grid>
                        )
                      case "text":
                        return (
                          <Grid xs={12} md={6} key={field.name} className={classes.field}>
                            <Box m={2}>
                              <Typography variant="body1">{field.label}</Typography>
                              <Typography>{field.content}</Typography>
                            </Box>
                          </Grid>
                        )
                      case AppConstants.fieldTypes.divider:
                        return (
                          <Grid xs={12} key={field.name} className={classes.field}>
                            <Divider className={classes.divider} />
                          </Grid>
                        )
                    }
                  })}
                </Grid>
              </Box>
            </Box>
          </>
        )
      })}
      <DialogActions className={classes.saveBtn}>
        <Button onClick={() => handleClose()} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Box>
  )
}
