import React from "react";
import { AppContextType, ModelType } from "../../../../Utils/Types";

const AppPublisherSiteDataEditor: React.FC<{
  context: AppContextType;
  model: ModelType;
  site;
  match: {
    params: { detailId };
  };
}> = ({
  context,
  site,
  model,
  match: {
    params: { detailId },
  },
}) => {
  // Vars

  // Lifecycle
  //UI
  return (
    <context.UI.Layouts.Object.ObjectLayout
      model={model}
      layoutId="default"
      appId="publisher"
      objectId={detailId}
    />
  );
};

export default AppPublisherSiteDataEditor;
