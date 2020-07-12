import React, { useState, useEffect } from "react";
import { AppContextType, ModelType } from "../../../../Utils/Types";
import AppPublisherSiteDataEditor from "./ObjectEditor";

const AppPublisherSiteDataOverview: React.FC<{
  context: AppContextType;
  site;
  match: { params: { detailId } };
}> = ({
  site,
  context,
  match: {
    params: { detailId },
  },
}) => {
  // Vars
  const [dataList, setDataList] = useState<any>([]);
  const [model, setModel] = useState<ModelType>();

  // Lifecycle
  useEffect(() => {
    let objectsRequest;
    const modelRequest = context.getModel(detailId, (response) => {
      if (response.success) {
        const newModel = response.data;

        objectsRequest = context.getObjects(detailId, {}, (response) => {
          if (response.success) {
            const newDataList = [];
            response.data.map((o) => {
              newDataList.push({ label: o.data[newModel.primary], id: o._id });
            });
            setDataList(newDataList);
            setModel(newModel);
          } else {
            console.log(response);
          }
        });
      } else {
        console.log(response);
      }
    });

    return () => {
      if (objectsRequest) objectsRequest.stop();
      modelRequest.stop();
    };
  }, [detailId]);

  // UI
  return (
    <context.UI.Layouts.ListDetailLayout
      context={context}
      title={model?.name_plural}
      list={dataList}
      baseUrl={`/publisher/${site.data.id}/data/${model?.key}`}
      detailComponentProps={{ site, context, model }}
      DetailComponent={AppPublisherSiteDataEditor}
      addFunction={() => {
        context.setDialog({
          display: true,
          size: "lg",
          content: (
            <context.UI.Layouts.Object.ObjectLayout
              model={model}
              appId="publisher"
              popup
              layoutId="create"
            />
          ),
        });
      }}
    />
  );
};

export default AppPublisherSiteDataOverview;
