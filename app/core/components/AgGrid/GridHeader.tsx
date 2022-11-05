import { Box, Grid, IconButton, makeStyles } from "@material-ui/core"
import InputBase from "@material-ui/core/InputBase"
import Add from "@material-ui/icons/Add"
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined"
import SearchIcon from "@material-ui/icons/Search"
import React, { useEffect, useState } from "react"

import { fade } from "@material-ui/core/styles/colorManipulator"
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined"
import { Typography } from "@material-ui/core"
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined"
import themeColors from "app/core/theme/colors"

const useStyles = makeStyles((theme) => ({
  header: {
    display: "inline-block",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "9px !important",
      paddingRight: "9px !important",
    },
  },
  searchContainer: {
    display: "inline-block",
    marginTop: "-1px !important",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  search: {
    display: "inline-block",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: themeColors.primary.contrastText,
    marginLeft: 0,
    width: "100%",
    transform: "translateY(8px)",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(),
      width: "auto",
    },
  },
  searchInputRoot: {
    color: "inherit",
    width: "100%",
    height: 32,
    fontSize: 14,
  },
  searchInput: {
    color: "#000000",
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(5),
  },
  searchIcon: {
    color: fade("#000000", 0.35),
    width: theme.spacing(1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    marginLeft: "10px",
  },
  container: {
    display: "flex",
    placeItems: "center",
    alignItems: "center",
    fontSize: "14",
    backgroundColor: theme.palette.secondary.light,
  },
  rowCount: {
    padding: "5px",
    fontWeight: "bold",
    height: "28px",
    minWidth: "50px",
    textAlign: "center",
    marginTop: "9px",
    marginRight: "20px",
    opacity: 0.8,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}))

interface GridHeaderProps {
  headerConfig: {
    showExportCSV?: boolean
    clearAllFilters?: boolean
    showSearch?: boolean
    showAdd?: boolean
    showEdit?: boolean
    showDelete?: boolean
    showSendEmail?: boolean
  }
  gridApi?: any
  scenarioId?: any
  scenarioName?: any
  selectedDropdown?: string
  menuList?: any
  quickFilterText?: string
  setQuickFilterText?: (event: any) => void
  title?: string | JSX.Element
  handleAddClick?: () => void
  handleEditClick?: () => void
  selectedRow?: any
  handleDeleteClick?: () => void
  renderAdditionalItems?: any
  renderToLeftSide?: boolean
  exportCSVName?: string
  handleEmailClick?: () => void
}

const GridHeader: React.FC<GridHeaderProps> = (props: GridHeaderProps) => {
  const classes = useStyles()
  const [headerConfig] = useState(props?.headerConfig || {})
  const [rowsSelected, setRowsSelected] = useState(false)
  const [rowsCount, setRowsCount] = useState(0)
  const [enableEdit, setEnableEdit] = useState(false)
  const {
    renderAdditionalItems,
    selectedRow,
    handleDeleteClick,
    handleEditClick,
    handleEmailClick,
  } = props
  const isRowSelected = () => {
    return (
      props?.gridApi?.getSelectedRows &&
      Array.isArray(props?.gridApi?.getSelectedRows()) &&
      props?.gridApi?.getSelectedRows()?.length > 0
    )
  }
  useEffect(() => {
    if (props?.gridApi) {
      setRowsCount(props.gridApi.getDisplayedRowCount())
      props.gridApi.addEventListener("selectionChanged", () => {
        const selectedRowCount = props.gridApi.getSelectedRows()?.length
        setRowsSelected(Boolean(selectedRowCount))
        setEnableEdit(isRowSelected())
      })
    }
  }, [props?.gridApi])

  // function clearAllFilters(): void {
  //   if (props.gridApi !== null && props.gridApi !== undefined && props.gridApi.current !== null && props.gridApi.current !== undefined) {
  //     setTimeout(() => {
  //       props.gridApi?.current.setFilterModel(null);
  //       props.gridApi?.current.refreshCells();
  //     }, 0);
  //   } else {
  //     console.log('Error gridApi is not present', props.gridApi.current);
  //   }
  // }
  // const renderClearAllFilters = () => (
  //   <Box
  //     className={`${classes.headerIconStyles} ${classes.iconLayout} glHeaderIcons ${classes.enabledIcon}`}
  //     onClick={clearAllFilters}
  //   >
  //     <Tooltip title='Clear All Filters'>
  //       <Box>
  //         {/* <RiFilterOffFill style={iconStyles} /> */}
  //       </Box>
  //     </Tooltip>
  //   </Box>
  // );
  function exportCSV(): void {
    if (props.gridApi) {
      const date = new Date()
      const params = {
        fileName: `${props.exportCSVName}.csv`,
      }

      props.gridApi?.exportDataAsCsv(params)
    } else {
      console.log("Error gridApi is not present", props.gridApi)
    }
  }

  const renderExportToCsv = () => (
    <Box component="span" onClick={exportCSV}>
      <IconButton color="primary">
        <GetAppOutlinedIcon />
      </IconButton>
    </Box>
  )
  const renderAdd = () => (
    <Box component="span" onClick={props.handleAddClick}>
      <IconButton color="primary">
        <Add />
      </IconButton>
    </Box>
  )

  const renderEdit = () => {
    return (
      <Box
        component="span"
        onClick={() => {
          enableEdit && handleEditClick && handleEditClick()
        }}
      >
        <IconButton color="primary" disabled={!enableEdit}>
          <EditOutlinedIcon />
        </IconButton>
      </Box>
    )
  }
  const renderDelete = () => {
    return (
      <Box
        component="span"
        onClick={() => {
          enableEdit && handleDeleteClick && handleDeleteClick()
        }}
      >
        <IconButton color="primary" disabled={!enableEdit}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
    )
  }
  const renderSearch = () => (
    <div className={classes.searchContainer}>
      <span className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.searchInputRoot,
            input: classes.searchInput,
          }}
          onChange={(e) => props.setQuickFilterText && props.setQuickFilterText(e.target.value)}
          value={props.quickFilterText}
        />
      </span>
    </div>
  )
  const renderSendEmail = () => {
    return (
      <Box
        component="span"
        onClick={() => {
          enableEdit && handleEmailClick && handleEmailClick()
        }}
      >
        <IconButton color="primary" disabled={!enableEdit}>
          <MailOutlineOutlinedIcon />
        </IconButton>
      </Box>
    )
  }

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={4}>
          <Box ml={1} pt={1}>
            {props?.title && (
              <Typography variant="h5" component="h2" color="primary">
                {props?.title}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid className={classes.headerContainer} item xs={12} md={8} container>
          <Grid item xs={12} md={4} style={{ display: "flex" }}>
            <div className={classes.rowCount}>{props?.gridApi?.getDisplayedRowCount()}</div>
            {headerConfig?.showSearch && renderSearch()}
          </Grid>
          {headerConfig?.showAdd && renderAdd()}
          {headerConfig?.showEdit && renderEdit()}
          {headerConfig?.showDelete && renderDelete()}
          {headerConfig?.showExportCSV && renderExportToCsv()}
          {headerConfig?.showSendEmail && renderSendEmail()}
        </Grid>
      </Grid>
    </>
  )
}

export { GridHeader }
