import React from "react";
import { AppContextType } from "../../../../Utils/Types";
import { Typography, Paper, Grid } from "@material-ui/core";
import styles from "./styles.module.scss";

const AppPublisherSiteDesign: React.FC<{
  context: AppContextType;
  site;
}> = ({ context, site }) => {
  return (
    <div className={styles.root}>
      <context.UI.Animations.AnimationContainer>
        <Grid container>
          <Grid item xs={12} style={{ padding: 10, boxSizing: "border-box" }}>
            <context.UI.Animations.AnimationItem>
              <Paper className="paper">
                <Typography variant="h6" gutterBottom>
                  Design
                </Typography>
                <context.UI.Field
                  fieldId="template"
                  modelId="publish-sites"
                  object={site}
                />
              </Paper>
            </context.UI.Animations.AnimationItem>
          </Grid>
        </Grid>
      </context.UI.Animations.AnimationContainer>
    </div>
  );
};

export default AppPublisherSiteDesign;
