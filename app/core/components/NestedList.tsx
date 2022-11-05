import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Collapse from "@material-ui/core/Collapse"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import { Link } from "blitz"
import themeColors from "../theme/colors"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    borderBottom: "1px solid #d4d9e6",
  },
  navItem: {
    borderBottom: "1px solid #d4d9e6",
  },
  icon: {
    color: themeColors.primary.main,
  },
}))

type Props = {
  key?: string
  icon?: any
  title?: string
  subItems?: Array<any>
  handleHover?: any
  handleHoverOut?: any
  profile: string
}
export default function NestedList(props: Props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const { icon, title, subItems = [], profile } = props
  const handleClick = () => {
    setOpen(!open)
  }
  const Icon = icon
  return (
    <div key={props.key}>
      <ListItem button onClick={handleClick} key={props.key} className={classes.navItem}>
        <ListItemIcon>
          <Icon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subItems.map((item) => {
            const Icon = item.icon
            if (item.permissions.includes(profile)) {
              return (
                <Link key={item.id} href={item.url || ""}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <Icon className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              )
            }
          })}
        </List>
      </Collapse>
    </div>
  )
}
