import { ReactNode, Suspense, useEffect, useState } from "react"
import { Head, useRouter, Link } from "blitz"
import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { fade } from "@material-ui/core/styles"
import Badge from "@material-ui/core/Badge"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined"
import NotificationsNoneOutlined from "@material-ui/icons/NotificationsNoneOutlined"
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined"
import { Box, SwipeableDrawer } from "@material-ui/core"
import { useMutation, Routes, useSession } from "blitz"
import logout from "app/auth/mutations/logout"
import Loader from "../components/Loader"
import {
  AccountCircleSharp,
  AddCircleOutlineOutlined,
  AddCircleOutlineSharp,
  AssignmentTurnedInOutlined,
  ContactSupportOutlined,
  NotificationsActive,
} from "@material-ui/icons"
import boxShadows from "../theme/components/box-shadow"
import Modal from "../components/Modal/Modal"
import useModal from "../hooks/useModal";
import themeColors from "../theme/colors"
import { useDispatch } from "react-redux"
import { setTheme } from "app/features/theme/themeSlice"
import { isUserAuthorized } from "app/util/util"

const drawerWidth = 260
const appBarHight = 55

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    //backgroundColor: themeColors.gray[901],
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: appBarHight,
    boxShadow: boxShadows.boxShadow,
    backgroundColor: theme.palette.primary.main,
    color: themeColors.white.main,
    opacity: 0.9,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    position: "absolute",
  },
  drawerOpen: {
    width: drawerWidth,
    marginTop: appBarHight,
    boxShadow: "0px 0px 8px rgb(0 0 0 / 30%)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    marginTop: appBarHight,
    boxShadow: "0px 0px 8px rgb(0 0 0 / 30%)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  title: {
    display: "none",
    cursor: "pointer",
    paddingLeft: "15px",
    color: `${theme.palette.primary.contrastText} !important`,
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
  search: {
    position: "absolute",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    right: 100,
    // marginLeft: 0,
    width: "20%",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "auto",
    // },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    paddingRight: "10px",
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
  },
  hideDrawerOnMobile: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
  },
  menuIconMobile: {
    display: "flex",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  iconSize: {
    width: "30px",
    height: "30px",
  },
  mobileDrawer: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  children: {
    width: "100%",
    paddingTop: appBarHight,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(7) + 1,
      margin: theme.spacing(3),
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
}))

type DashboardLayout = {
  title?: string
  children: ReactNode
  pageUrl?: string
}

const DashboardLayout = ({ title, children, pageUrl }: DashboardLayout) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const session = useSession()
  const [open, setOpen] = React.useState(false)
  const [logoutMutation] = useMutation(logout)
  useEffect(() => {
    if (session?.role && pageUrl && !isUserAuthorized(session.role, pageUrl)) {
      router.replace(Routes.Page401().pathname)
    }
  }, [session])
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [addAnchorEl, setAddAnchorEl] = React.useState(null)
  const [editAnchorEl, setEditAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const [themeAncorEl, setThemeAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isAddMenuOpen = Boolean(addAnchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const isThemeMenuOpen = Boolean(themeAncorEl)
  const isEditMenuOpen = Boolean(editAnchorEl)
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleLogout = async () => {
    await logoutMutation()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleAddMenuOpen = (event) => {
    setAddAnchorEl(event.currentTarget)
  }
  const handleHelpMenuOpen = (event) => {
    setEditAnchorEl(event.currentTarget)
  }

  const handleThemeMenuOpen = (event) => {
    setThemeAnchorEl(event.currentTarget)
  }

  const handleThemeMenuClose = () => {
    setThemeAnchorEl(null)
    handleMobileMenuClose()
  }

  const navToProfile = () => {
    handleMenuClose()
    router.push(Routes.ProfilePage())
  }



  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={navToProfile}>My Profile</MenuItem>
      <MenuItem onClick={handleThemeMenuOpen}>Theme</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )

  const addMenuId = "primary-search-account-menu"


  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={navToProfile}>My Profile</MenuItem>
      <MenuItem onClick={handleThemeMenuOpen}>Theme</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )

  const themeMenuId = "theme-menu"
  const themes = [
    {
      id: "texturized-and-dynamic",
      name: "Texurized Dynamic",
      color: "#376E6F",
    },
    {
      id: "clean-and-modern",
      name: "Clean and Modern",
      color: "#3AAFA9",
    },
    {
      id: "artsy-and-creative",
      name: "Artsy and Creative",
      color: "#4056a1",
    },
  ]
  const changeTheme = (theme) => {
    dispatch(setTheme(theme.id))
    localStorage.setItem("themeId", theme.id)
    handleThemeMenuClose()
  }
  const renderThemeMenu = (
    <Menu
      anchorEl={themeAncorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={themeMenuId}
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={isThemeMenuOpen}
      onClose={handleThemeMenuClose}
    >
      {themes.map((theme) => {
        return (
          <MenuItem key={theme.id} onClick={() => changeTheme(theme)}>
            <div
              style={{
                height: "12px",
                width: "12px",
                backgroundColor: theme.color,
                borderRadius: "2px",
                marginRight: "10px",
              }}
            ></div>
            {theme.name}
          </MenuItem>
        )
      })}
    </Menu>
  )

  const [mobileDrawer, setMobileDrawer] = useState(false)
  const toggleMobileDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return
    }
    setMobileDrawer(!mobileDrawer)
  }

  const onNavItemClick = () => {
    router.events.on("routeChangeComplete", (url) => {
      setMobileDrawer(false)
    })
  }


  const { toggle: toggleAdd, isShowing: newSurvey } = useModal()
  return (
    <>
      <Head>
        <title>{title || "ATS"}</title>
      </Head>
      {session ? (
        <>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar)} color="inherit" elevation={1}>
              <Toolbar disableGutters={true}>
                <div className={classes.menuIconMobile}>
                  <IconButton
                    aria-label="Menu Button"
                    onClick={toggleMobileDrawer()}
                    color="inherit"
                  >
                    <MenuIcon className={classes.iconSize} />
                  </IconButton>
                  <Link href="/">
                    <h2>ATS</h2>
                  </Link>
                </div>
                <Typography className={classes.title} variant="h6" noWrap>
                  <Link href="/">
                    <h1>ATS</h1>
                  </Link>
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircleSharp />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>

                  <IconButton
                    aria-label="account details"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircleOutlined />
                  </IconButton>
                </div>
              </Toolbar>
              {/* <div
            style={{
              backgroundColor: theme.palette.secondary.light,
              padding: "4px",
              marginTop: "-2px",
            }}
          ></div> */}
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {renderThemeMenu}
            <div
              onMouseOver={handleDrawerOpen}
              onMouseOut={handleDrawerClose}
              className={classes.hideDrawerOnMobile}
            >

            </div>
            <Box className={classes.children}>
              <Suspense fallback={<Loader />}>{children}</Suspense>
            </Box>
          </div>

        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default DashboardLayout
