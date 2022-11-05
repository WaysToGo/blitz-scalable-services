import { Dialog } from "@material-ui/core"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import * as React from "react"
import { getSignedUrl } from "app/core/utils/aws"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      position: "fixed",
      zIndex: 1,
      paddingTop: "100px",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      overflow: "auto",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
    close: {
      position: "absolute",
      top: "15px",
      right: "35px",
      color: "#f1f1f1",
      fontSize: " 40px",
      fontWeight: "bold",
      transition: " 0.3s",
      "&:hover": {
        color: "#bbb",
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    modalContent: {
      margin: "auto",
      display: "block",
      width: "80%",
      maxWidth: "700px",
      transition: "all 3s ease-in-out",
    },
    caption: {
      margin: "auto",
      display: "block",
      width: "80%",
      maxWidth: "700px",
      textAlign: "center",
      color: "#ccc",
      padding: "10px 0",
      height: "150px",
    },
  })
)

export default function PreviewImage(props) {
  const classes = useStyles()
  const { name, src, type } = props.img
  /* eslint-disable @next/next/no-img-element */
  return (
    <div>
      <Dialog open={props.preview} keepMounted onClose={() => props.handleClose()}>
        <div className={classes.modal}>
          <span className={classes.close} onClick={() => props.handleClose()}>
            &times;
          </span>
          {type.includes("image") ? (
            <img alt={name} className={classes.modalContent} src={getSignedUrl(src)} />
          ) : (
            <video preload="metadata" controls className={classes.modalContent}>
              <source src={getSignedUrl(src)} type={type}></source>
            </video>
          )}

          <div className={classes.caption}>{name}</div>
        </div>
      </Dialog>
    </div>
  )
}
