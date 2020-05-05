import React from "react";
import { AppContextType } from "../../../../Utils/Types";
import { Grid, Typography } from "@material-ui/core";
import image from "./noPage.svg";

const AppPublisherSitePagesNoObject: React.FC<{
  context: AppContextType;
  site;
}> = ({ context, site }) => {
  return (
    <context.UI.Animations.AnimationContainer>
      <Grid container className="center">
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <context.UI.Animations.AnimationItem>
            <img
              src={image}
              alt="No page"
              style={{
                height: 350,
              }}
            />
          </context.UI.Animations.AnimationItem>
        </Grid>
        <Grid item xs={6} style={{ height: "100%", verticalAlign: "middle" }}>
          <context.UI.Animations.AnimationItem>
            <Typography variant="h6">No object set yet</Typography>
            <context.UI.Field
              modelId="publish-sites"
              object={site}
              fieldId="pageObject"
              directSave
              directSaveDelay={1000}
            />
          </context.UI.Animations.AnimationItem>
        </Grid>
      </Grid>
    </context.UI.Animations.AnimationContainer>
  );
};

export default AppPublisherSitePagesNoObject;
