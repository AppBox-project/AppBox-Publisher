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
} from "@material-ui/core";
import { FaSitemap, FaCaretRight } from "react-icons/fa";

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
    console.log(site._id);

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
                    return (
                      <ListItem>
                        <ListItemIcon>
                          <FaSitemap />
                        </ListItemIcon>
                        <ListItemText>{page.data.title}</ListItemText>
                        <ListItemSecondaryAction>
                          <ListItemIcon>
                            <Tooltip placement="right" title="Add to menu">
                              <IconButton>
                                <FaCaretRight />
                              </IconButton>
                            </Tooltip>
                          </ListItemIcon>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
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
              {detailId}
            </context.UI.Design.Card>
          </context.UI.Animations.AnimationItem>
        </Grid>
      </Grid>
    </context.UI.Animations.AnimationContainer>
  );
};

export default AppPublisherSiteMenuDetail;
