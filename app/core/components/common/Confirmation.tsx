import React from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    content: {
      padding: "15px",
    },
    actions: {
      paddingRight: "10px",
      paddingBottom: "10px",
    },
  })
)

export default function Confirmation(props) {
  const classes = useStyles()
  const { openDialog, message, handleNo, handleYes } = props
  return (
    <div>
      <Dialog
        open={openDialog}
        disableBackdropClick={true}
        aria-labelledby="max-width-dialog-title"
        aria-describedby="scroll-dialog-description"
        onClose={() => handleNo()}
      >
        <DialogContent>
          <DialogContentText className={classes.content}>{message}</DialogContentText>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button variant="outlined" color="secondary" onClick={() => handleNo()}>
            No
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleYes()}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
