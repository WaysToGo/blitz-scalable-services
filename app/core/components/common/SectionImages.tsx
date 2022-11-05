import {
  Box,
  Button,
  DialogActions,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core"

import React, { Suspense, useState } from "react"
import { useQuery, invalidateQuery, useMutation, getConfig } from "blitz"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import boxShadows from "app/core/theme/components/box-shadow"
import Loader from "../Loader"
import PreviewImage from "./PreviewImage"
import { Delete } from "@material-ui/icons"
import Confirmation from "./Confirmation"
import { AppConstants } from "app/core/constants/AppConstants"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import themeColors from "app/core/theme/colors"
import ImageModal from "../Modal/ImageModal"

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
    paper: {
      boxShadow: boxShadows.boxShadow,
    },
    heading: {
      fontSize: theme.typography.pxToRem(17),
      fontWeight: 500,
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
    sectionTitle: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: themeColors.secondary.light,
      padding: "12px 12px 10px 20px",
      borderRadius: "5px",
      fontSize: "15px",
      fontWeight: "bold",
      color: "#484747",
    },
    imgContainer: {
      width: "150px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      padding: "12px",
      textAlign: "left",
    },
    imgBox: {
      border: "0.1px solid #e9e9e9",
      cursor: "pointer",
      position: "relative",
    },
    deleteIcon: {
      position: "absolute",
      zIndex: 9999,
      right: "0",
      color: "#202020",
      opacity: "0.5",
      backgroundColor: "#FFFF",
      borderRadius: "6px",
      padding: "3px",
      cursor: "pointer",
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

function SectionImages(props) {
  const groupByCategory = (objectArray, property) => {
    let res: any = []
    const groupByObj = objectArray.reduce((acc, obj) => {
      const key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
    Object.keys(groupByObj).forEach((key) => {
      res = [
        ...res,
        {
          fieldName: key,
          images: groupByObj[key],
        },
      ]
    })
    return res
  }

  const [previewImg, setPreviewImg] = useState({})
  const [preview, setPreview] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [deleteMedia, setDeleteMeda] = useState({})
  const currentUser = useCurrentUser()

  const handlePreview = (img) => {
    setPreview(true)
    setPreviewImg({
      name: img.attachmentname,
      src: img.attachmenturl,
      type: img.contenttype,
    })
  }
  const handleClosePreview = (img) => {
    setPreview(false)
    setPreviewImg({})
  }
  const handleDeleteMedia = async () => {
    // @ts-ignore
    const data = await updateAttachmentMut({
      ...deleteMedia,
      tenantid: 0,
      isdeleted: true,
      updatedat: new Date(),
      updatedby: currentUser?.id || 0,
    })
    setIsDelete(false)
    setIsDelete(false)
  }
  const handleDeleteItem = (item) => {
    setDeleteMeda(item)
    setIsDelete(true)
  }
  const classes = useStyles()
  const { publicRuntimeConfig } = getConfig()
  return (
    <Suspense fallback={<Loader />}>
      <ImageModal open={props.open} handleClose={() => props.handleImageModal()} title={"Images"}>
        <Box className={classes.root}>No Images to display!</Box>
        {preview && (
          <PreviewImage preview={preview} img={previewImg} handleClose={handleClosePreview} />
        )}
      </ImageModal>
    </Suspense>
  )
}

export default SectionImages
