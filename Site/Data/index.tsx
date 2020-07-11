import React, { useState, useEffect } from "react";
import { AppContextType } from "../../../../Utils/Types";
import ObjectOverview from "./ObjectOverview";

const AppPublisherSiteData: React.FC<{
  context: AppContextType;
  site;
}> = ({ context, site }) => {
  // Vars
  const [dataItems, setDataItems] = useState<any>([]);

  // Lifecycle
  useEffect(() => {}, [site.data]);
  // UI

  return (
    <>
      <context.UI.Layouts.ListDetailLayout
        list={dataItems}
        baseUrl={`/publisher/${site.id}`}
        DetailComponent={ObjectOverview}
        context={context}
      />
    </>
  );
};

export default AppPublisherSiteData;
