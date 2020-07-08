import React from "react";
import { AppContextType } from "../../../../Utils/Types";
import { Typography, Grid, Button } from "@material-ui/core";
import styles from "./styles.module.scss";
import { FaGlobeEurope } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";

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
              <context.UI.Design.Card hoverable>
                <Typography variant="h6" gutterBottom>
                  {site.data.name}
                </Typography>
                <Button fullWidth startIcon={<FaGlobeEurope />} color="primary">
                  View
                </Button>
                <Button
                  fullWidth
                  startIcon={<RiSendPlaneLine />}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    context.callBackendAction("publishSite", {
                      siteId: site.data.id,
                    });
                  }}
                >
                  Publish
                </Button>
              </context.UI.Design.Card>
            </context.UI.Animations.AnimationItem>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ padding: 10, boxSizing: "border-box" }}
          >
            <context.UI.Animations.AnimationItem>
              <context.UI.Design.Card hoverable>
                <Typography variant="h6" gutterBottom>
                  Statistics
                </Typography>
                Bla
              </context.UI.Design.Card>
            </context.UI.Animations.AnimationItem>
          </Grid>
        </Grid>
      </context.UI.Animations.AnimationContainer>
    </div>
  );
};

export default AppPublisherSiteDashboard;
