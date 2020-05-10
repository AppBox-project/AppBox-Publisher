import React from "react";
import { AppContextType } from "../../../../Utils/Types";
import { Typography, Paper, Grid, Button } from "@material-ui/core";
import styles from "./styles.module.scss";

const AppPublisherSiteDashboard: React.FC<{
  context: AppContextType;
  site;
}> = ({ context, site }) => {
  return (
    <div className={styles.root}>
      <context.UI.Animations.AnimationContainer>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            style={{ padding: 10, boxSizing: "border-box" }}
          >
            <context.UI.Animations.AnimationItem>
              <Paper className="paper">
                <Typography variant="h6" gutterBottom>
                  {site.data.name}
                </Typography>
                Bla
              </Paper>
            </context.UI.Animations.AnimationItem>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ padding: 10, boxSizing: "border-box" }}
          >
            <context.UI.Animations.AnimationItem>
              <Paper className="paper">
                <Typography variant="h6" gutterBottom>
                  Statistics
                </Typography>
                Bla
              </Paper>
            </context.UI.Animations.AnimationItem>
          </Grid>
          <Grid item xs={12} style={{ padding: 10, boxSizing: "border-box" }}>
            <context.UI.Animations.AnimationItem>
              <Paper className="paper">
                <Typography variant="h6" gutterBottom>
                  Publish
                </Typography>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    context.callBackendAction("publishSite", {
                      siteId: site.data.id,
                    });
                  }}
                >
                  Publish site
                </Button>
              </Paper>
            </context.UI.Animations.AnimationItem>
          </Grid>
        </Grid>
      </context.UI.Animations.AnimationContainer>
    </div>
  );
};

export default AppPublisherSiteDashboard;
