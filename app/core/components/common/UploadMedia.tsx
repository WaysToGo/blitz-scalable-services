import { Menu, MenuItem, Snackbar } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useParams, useMutation, getConfig } from "blitz"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import { CloudUploadOutlined } from "@material-ui/icons"
import { Alert } from "@material-ui/lab"
import { getAwsBucket } from "app/core/utils/aws"
import { useSnackbar } from "notistack"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    uploadIcon: {
      height: "20px",
      width: "20px",
      marginLeft: "20px",
      cursor: "pointer",
    },
    imageUpload: {
      "& input": {
        display: "none",
        cursor: "pointer",
      },
    },
    label: {
      cursor: "pointer",
      width: "100%",
    },
  })
)

function UploadMedia(props) {
  const { publicRuntimeConfig } = getConfig()
  const { enqueueSnackbar } = useSnackbar()
  const { fields, currentUser, storeInfo } = props
  const options = fields.filter((field) => field.isUploadRequired)
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleUploadMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [openSnack, setOpenSnack] = useState(false)

  useEffect(() => {
    if (uploadError) {
      setOpenSnack(true)
    }
  }, [uploadError])
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpenSnack(false)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [progress, setProgress] = useState(0)

  const convertFilesObjToArray = (files) => {
    return Object.keys(files).map(function (key) {
      return files[key]
    })
  }

  const myBucket = getAwsBucket()


  return (
    <>
      <CloudUploadOutlined className={classes.uploadIcon} onClick={handleUploadMenu} />
      <Menu id="field-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem key={"disabled"} disabled={true}>
          {"-- Select field to upload --"}
        </MenuItem>

      </Menu>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnack}
        autoHideDuration={10000}
        onClose={handleCloseSnack}
      >
        <Alert severity="error">
          Something went wrong! Please contact administrator for AWS configuration settings.
          <div>Error message: {uploadError}</div>
        </Alert>
      </Snackbar>
    </>
  )
}

export default UploadMedia
