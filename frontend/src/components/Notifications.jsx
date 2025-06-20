import React, { useState } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
  Divider,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const notifications = [
    "New message from Alice",
    "Server maintenance at 9 PM",
    "New comment on your post",
  ];

  return (
    <>
      <IconButton
        size="large"
        aria-label="show new notifications"
        color="inherit"
        onClick={handleOpen}
        sx={{mr: 1.5}}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 250,
          },
        }}
      >
        <MenuItem disabled>
          <strong>Notifications</strong>
        </MenuItem>
        <Divider />
        {notifications.length === 0 ? (
          <MenuItem>No new notifications</MenuItem>
        ) : (
          notifications.map((note, index) => (
            <MenuItem key={index} onClick={handleClose}>
              <ListItemText primary={note} />
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default NotificationMenu;
