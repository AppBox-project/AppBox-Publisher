import React from "react";
import { AppContextType } from "../../../../Utils/Types";

const AppPublisherSitePagesDetail: React.FC<{
  match: { params: { detailId } };
  context: AppContextType;
}> = ({
  match: {
    params: { detailId },
  },
  context,
}) => {
  return <>{detailId}</>;
};

export default AppPublisherSitePagesDetail;
