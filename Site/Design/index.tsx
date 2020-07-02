import React from "react";
import { AppContextType } from "../../../../Utils/Types";
import { Typography, Paper, Grid, Button } from "@material-ui/core";
import styles from "./styles.module.scss";
import { GrUpdate } from "react-icons/gr";

const AppPublisherSiteDesign: React.FC<{
  context: AppContextType;
  site;
}> = ({ context, site }) => {
  // Vars
  console.log(site);

  // Lifecycle
  // UI
  return (
    <div className={styles.root}>
      <context.UI.Animations.AnimationContainer>
        <Grid container>
          <Grid item xs={6} style={{ padding: 10, boxSizing: "border-box" }}>
            <context.UI.Animations.AnimationItem>
              <Paper className="paper">
                <Typography variant="h6" gutterBottom>
                  Design
                </Typography>
                <context.UI.Field
                  fieldId="design"
                  modelId="publish-sites"
                  object={site}
                />
                <Button startIcon={<GrUpdate />}>Update</Button>
              </Paper>
            </context.UI.Animations.AnimationItem>
          </Grid>
          <Grid item xs={6}>
            <context.UI.Animations.AnimationItem>
              <Paper className="paper">
                <Typography variant="h6" gutterBottom>
                  Design settings
                </Typography>
                <Grid container>
                  {site.data.design_settings.map((dsetting) => {
                    console.log(dsetting);

                    return (
                      <>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            {dsetting.label}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <context.UI.Inputs.TextInput
                            label={dsetting.label}
                            value={dsetting.default || ""}
                          />
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Paper>
            </context.UI.Animations.AnimationItem>
          </Grid>
        </Grid>
      </context.UI.Animations.AnimationContainer>
    </div>
  );
};

export default AppPublisherSiteDesign;
