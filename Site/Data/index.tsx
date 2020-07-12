import React, { useState, useEffect } from "react";
import { AppContextType, ModelType } from "../../../../Utils/Types";
import ObjectOverview from "./ObjectOverview";

const AppPublisherSiteData: React.FC<{
  context: AppContextType;
  site;
}> = ({ context, site }) => {
  // Vars
  const [dataItems, setDataItems] = useState<any>([]);

  // Lifecycle
  useEffect(() => {
    const newDataItems = [];
    site.data?.data?.map((dataItem) => {
      newDataItems.push({ label: dataItem, id: dataItem });
    });
    setDataItems(newDataItems);
  }, [site.data]);
  // UI

  return (
    <>
      <context.UI.Layouts.ListDetailLayout
        list={dataItems}
        title="Data"
        baseUrl={`/publisher/${site.data.id}/data`}
        DetailComponent={ObjectOverview}
        detailComponentProps={{ site, context }}
        navWidth={2}
        context={context}
        addFunction={() => {
          context.setDialog({
            display: true,
            title: "Add items to your site.",
            content:
              "Type the ID for a dataset you want to publush on your website.",
            form: [{ label: "ID", key: "id" }],
            buttons: [
              {
                label: "Add",
                onClick: (form) => {
                  const newData = site.data.data || [];
                  newData.push(form.id);
                  context.updateObject(
                    "publish-sites",
                    { data: newData },
                    site._id
                  );
                },
              },
            ],
          });
        }}
      />
    </>
  );
};

export default AppPublisherSiteData;
