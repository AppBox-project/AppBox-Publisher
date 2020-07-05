import React, { useState, useEffect } from "react";
import { AppContextType } from "../../../../Utils/Types";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Tooltip,
  IconButton,
  Button,
} from "@material-ui/core";
import {
  FaSitemap,
  FaCaretRight,
  FaCogs,
  FaCaretUp,
  FaCaretDown,
} from "react-icons/fa";
import { filter } from "lodash";

interface MenuItem {
  title: string;
  page: string;
}

const AppPublisherSiteMenuDetail: React.FC<{
  context: AppContextType;
  site;
  match: { params: { detailId } };
}> = ({
  context,
  site,
  match: {
    params: { detailId },
  },
}) => {
  //Vars
  const [newMenu, setNewMenu] = useState<MenuItem[]>([]);
  const [pages, setPages] = useState<any>([]);

  // Lifecycle
  useEffect(() => {
    const pageListener = context.getObjects(
      "publisher-pages",
      { "data.site": site._id },
      (response) => {
        if (response.success) {
          setPages(response.data);
        } else {
          console.log(response);
        }
      }
    );

    return () => {
      pageListener.stop();
    };
  }, []);

  useEffect(() => {
    setNewMenu((site.data.menus || {})[detailId] || []);
  }, [site.data.menus]);

  // UI
  return (
    <context.UI.Animations.AnimationContainer>
      <Grid container>
        <Grid item xs={12} md={6}>
          <context.UI.Animations.AnimationItem>
            <context.UI.Design.Card
              hoverable
              style={{ margin: 15 }}
              title={"Pages"}
            >
              {pages.length > 0 ? (
                <List>
                  {pages.map((page) => {
                    if (
                      filter(newMenu, (o) => o.page === page._id).length === 0 // Todo improve logic
                    ) {
                      return (
                        <ListItem>
                          <ListItemIcon>
                            <FaSitemap />
                          </ListItemIcon>
                          <ListItemText>{page.data.title}</ListItemText>
                          <ListItemSecondaryAction>
                            <ListItemIcon>
                              <Tooltip placement="right" title="Add to menu">
                                <IconButton
                                  onClick={() => {
                                    setNewMenu([
                                      {
                                        title: page.data.title,
                                        page: page._id,
                                      },
                                    ]);
                                  }}
                                >
                                  <FaCaretRight />
                                </IconButton>
                              </Tooltip>
                            </ListItemIcon>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    }
                  })}
                </List>
              ) : (
                <Typography variant="body1">No pages exist.</Typography>
              )}
            </context.UI.Design.Card>
          </context.UI.Animations.AnimationItem>
        </Grid>
        <Grid item xs={12} md={6}>
          <context.UI.Animations.AnimationItem>
            <context.UI.Design.Card
              hoverable
              style={{ margin: 15 }}
              title={`Menu: ${detailId}`}
            >
              {newMenu.length > 0 ? (
                <List>
                  {newMenu.map((menuItem) => {
                    return (
                      <ListItem>
                        <ListItemIcon>
                          <Tooltip placement="left" title="Edit link">
                            <IconButton>
                              <FaCogs />
                            </IconButton>
                          </Tooltip>
                        </ListItemIcon>
                        <ListItemText>{menuItem.title}</ListItemText>
                        <ListItemSecondaryAction>
                          <IconButton>
                            <FaCaretUp />
                          </IconButton>
                          <IconButton>
                            <FaCaretDown />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <Typography variant="body1">This menu is empty.</Typography>
              )}
            </context.UI.Design.Card>
          </context.UI.Animations.AnimationItem>
        </Grid>
      </Grid>
      {JSON.stringify(newMenu) !==
        JSON.stringify((site.data?.menus || {})[detailId] || []) && (
        <context.UI.Animations.AnimationItem>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            style={{ marginTop: 15 }}
            onClick={() => {
              const menus = site.data.menus || {};
              menus[detailId] = newMenu;
              context.updateObject("publish-sites", { menus }, site._id);
            }}
          >
            Save
          </Button>
        </context.UI.Animations.AnimationItem>
      )}
    </context.UI.Animations.AnimationContainer>
  );
};

export default AppPublisherSiteMenuDetail;