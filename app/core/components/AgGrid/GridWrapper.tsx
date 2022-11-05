import React, { useMemo, useEffect, useState } from "react"
import { AgGridReact } from "@ag-grid-community/react"
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model"
import { CsvExportModule } from "@ag-grid-community/csv-export"
import themeColors from "app/core/theme/colors"
import boxShadows from "app/core/theme/components/box-shadow"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: "10px",
    height: "100%",
    width: "100%",
    boxShadow: boxShadows.boxShadow,
    backgroundColor: themeColors.primary.contrastText,
  },
  wrapperContainer: {
    height: "100%",
    width: "100%",
    border: `1px solid #dedada`,
  },
}))

function GridWrapper(props: any) {
  // never changes, so we can use useMemo
  const modules = useMemo(() => [ClientSideRowModelModule, CsvExportModule], [])
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperContainer}>
        <AgGridReact
          reactUi="true"
          // all other properties as normal...
          className="ag-theme-material"
          animateRows="true"
          modules={modules}
          {...props}
        />
      </div>
    </div>
  )
}
export { GridWrapper }
