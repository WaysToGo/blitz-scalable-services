import {
  Box,
  Button,
  DialogActions,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import InfoIcon from "@material-ui/icons/Info"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Modal from "app/core/components/Modal/Modal"
import { AppConstants } from "app/core/constants/AppConstants"
import useModal from "app/core/hooks/useModal"
import { getSignedUrl } from "app/core/utils/aws"
import { useQuery } from "blitz"
import Image from "next/image"
import React, { Suspense } from "react"
import { Controller } from "react-hook-form"
import ImageModal from "../Modal/ImageModal"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchIcon: {
      transform: "initial",
    },
    footer: {
      position: "absolute",
      bottom: 0,
      right: 10,
      marginBottom: "8px",
      [theme.breakpoints.down("sm")]: {
        position: "relative !important",
        top: "0 !important",
      },
    },
    image: {
      height: "170px",
      width: "150px",
      [theme.breakpoints.down("sm")]: {
        height: "200px",
        width: "200px",
      },
    },
  })
)

export default function AutoCompleteWithImageDifferentSource(props) {
  const { field, register, getValues } = props
  const classes = useStyles()
  const { toggle, isShowing } = useModal()
  const [{ data }] = useQuery(
    field.dataSource,
    {
      orderBy: { id: "asc" },
      where: field.where,
    },
    { refetchOnWindowFocus: false }
  )
  const { toggle: toggleEnlarge, isShowing: showEnlargedImage } = useModal()
  const [selectedImage, setSelectedImage] = React.useState("")
  const [{ data: imageData }] = useQuery(
    field.imageDataSource,
    {
      orderBy: { id: "asc" },
      where: field.where,
    },
    { refetchOnWindowFocus: false }
  )
  // this is to watch for changes and update the form on image selection
  const fieldKey = props.watch(field.name)
  const handleImageSelect = (item) => {
    props.setValue(field.name, item, { shouldDirty: true })
    toggle()
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box key={field.name} display="flex">
        <Controller
          key={fieldKey}
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              style={{ width: "95%" }}
              options={[...data]}
              getOptionLabel={field.getOptionLabel}
              // popupIcon={<SearchIcon />}
              // forcePopupIcon
              // classes={{
              //   popupIndicatorOpen: classes.searchIcon,
              // }}
              onChange={(e, data) => {
                onChange(data)
              }}
              value={value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  label={field.label}
                  required={field.required}
                  placeholder={field.label}
                />
              )}
            />
          )}
          control={props.control}
          name={field.name}
        />
        {isShowing && (
          <ImageModal open={isShowing} handleClose={toggle} title={field.label}>
            <Box>
              <Grid container spacing={2}>
                {imageData.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Typography variant="body1">{item.assetname}</Typography>
                    <Tooltip title={item.assetdesc}>
                      <Box>
                        <img
                          src={getSignedUrl(item.assetlink)}
                          className={classes.image}
                          onClick={() => {
                            toggleEnlarge()
                            setSelectedImage(item.assetlink)
                          }}
                        />
                      </Box>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </ImageModal>
        )}

        <Box component="span" mt={1.2} ml={-2}>
          <IconButton color="primary" onClick={toggle}>
            <InfoIcon />
          </IconButton>
        </Box>
      </Box>
    </Suspense>
  )
}
