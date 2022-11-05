import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    modalheader: {
      textAlign: "center",
    },
    modalActions: {
      margin: "5px",
    },
  })
)

export default function ImageModal(props) {
  const { open, handleClose, title } = props
  const classes = useStyles()

  const handleCloseModal = () => {
    handleClose()
  }

  return (
    <div>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth="lg"
        disableBackdropClick={true}
        onClose={handleCloseModal}
        aria-labelledby="max-width-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        {title && (
          <DialogTitle id="max-width-dialog-title" className={classes.modalheader}>
            <h1>{title}</h1>
          </DialogTitle>
        )}
        <DialogContent dividers>{props.children}</DialogContent>
        <DialogActions className={classes.modalActions}>
          <Button onClick={() => handleClose()} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
