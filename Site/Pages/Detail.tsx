import React, { useState, useEffect } from "react";
import { AppContextType } from "../../../../Utils/Types";
import { find } from "lodash";
import { Typography } from "@material-ui/core";

const AppPublisherSitePagesDetail: React.FC<{
  match: { params: { detailId } };
  context: AppContextType;
  site;
  pages;
}> = ({
  match: {
    params: { detailId },
  },
  context,
  site,
  pages,
}) => {
  // Vars
  const [page, setPage] = useState<any>();

  // Lifecycle
  useEffect(() => {
    setPage(
      find(pages, (o) => {
        return o.data.slug === detailId;
      })
    );
  }, [detailId]);

  // UI
  if (!page) return <context.UI.Loading />;
  return (
    <context.UI.Animations.AnimationContainer>
      <context.UI.Animations.AnimationItem>
        <Typography variant="h6">{page.data.name}</Typography>
      </context.UI.Animations.AnimationItem>
    </context.UI.Animations.AnimationContainer>
  );
};

export default AppPublisherSitePagesDetail;
