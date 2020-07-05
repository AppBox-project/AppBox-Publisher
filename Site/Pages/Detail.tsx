import React, { useState, useEffect } from "react";
import { AppContextType } from "../../../../Utils/Types";
import { find } from "lodash";
import { Typography } from "@material-ui/core";
import PublisherLayoutDesigner from "../../Components/LayoutDesigner";

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
    <div style={{ padding: "15px", boxSizing: "border-box" }}>
      <context.UI.Animations.AnimationContainer>
        <context.UI.Animations.AnimationItem>
          <Typography variant="h4">{page.data.title}</Typography>
        </context.UI.Animations.AnimationItem>
        <context.UI.Animations.AnimationItem>
          <PublisherLayoutDesigner
            layout={page.data.body}
            context={context}
            onSave={(body) => {
              context.updateObject("publisher-pages", { body }, page._id);
            }}
          />
        </context.UI.Animations.AnimationItem>
      </context.UI.Animations.AnimationContainer>
    </div>
  );
};

export default AppPublisherSitePagesDetail;
