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
import useModal from "app/core/hooks/useModal"
import { getSignedUrl } from "app/core/utils/aws"
import Image from "next/image"
import React, { Suspense } from "react"
import { Controller } from "react-hook-form"
import ImageModal from "../Modal/ImageModal"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // field: { maxWidth: "50%" },
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

export default function AutoCompleteWithImage(props) {
  const { field } = props
  const classes = useStyles()
  const { toggle, isShowing } = useModal()
  const { toggle: toggleEnlarge, isShowing: showEnlargedImage } = useModal()
  const [selectedImage, setSelectedImage] = React.useState({})
  const data: any = field.dataSource
  // this is to watch for changes and update the form on image selection
  const fieldKey = props.watch(field.name)
  const handleImageSelect = (item) => {
    props.setValue(field.name, item, { shouldDirty: true })
    toggle()
  }
  const availableForDropDownData = data?.filter((item) => item.availableForDropDown)
  const availableForImageData = data?.filter((item) => item.availableForImageRef)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box key={field.name} display="flex">
        <Controller
          key={fieldKey}
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              style={{ width: "95%" }}
              options={availableForDropDownData}
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
                {availableForImageData.length ? (
                  availableForImageData.map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item.id}>
                      <Typography variant="body1">{item.assetname}</Typography>
                      <Tooltip title={item.assetdesc}>
                        <Box style={{ cursor: "pointer" }}>
                          <img
                            src={getSignedUrl(item.assetlink)}
                            className={classes.image}
                            onClick={() => {
                              toggleEnlarge()
                              setSelectedImage({
                                name: item.assetname,
                                src: item.assetlink,
                                type: "image",
                              })
                            }}
                          />
                        </Box>
                      </Tooltip>
                      {!field.hideSelect && (
                        <Box display="flex" justifyContent="center">
                          <Button
                            style={{ marginLeft: "-60px" }}
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => handleImageSelect(item)}
                          >
                            Select
                          </Button>
                        </Box>
                      )}
                    </Grid>
                  ))
                ) : (
                  <Box m={3}>No images to display!</Box>
                )}
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
