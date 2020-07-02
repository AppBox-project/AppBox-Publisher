import React, { useState } from "react";
import { AppContextType } from "../../../Utils/Types";
import { Typography } from "@material-ui/core";

const PublisherNewSite: React.FC<{ context: AppContextType }> = ({
  context,
}) => {
  // Vars
  const [isInstalling, setIsInstalling] = useState<boolean>(false);

  // Lifecycle
  // UI
  return (
    <>
      {isInstalling ? (
        <context.UI.Loading label="Building..." />
      ) : (
        <context.UI.Layouts.GridItemLayout
          remoteList="https://appbox.vicvancooten.nl/api/publisher-designs/read"
          title="Pick a design"
          dataMap={{
            title: "data.name",
            image: "data.image.url",
            description: "data.description",
            id: "data.key",
          }}
          onClick={(item) => {
            context.setDialog({
              display: true,
              title: "New website",
              content: (
                <>
                  <Typography variant="body1">
                    Based on {item.data.name}
                  </Typography>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.data.description }}
                  />
                </>
              ),
              size: "md",
              form: [
                { label: "Site name", key: "name" },
                { label: "Key", key: "key" },
                { label: "URL", key: "url" },
              ],
              buttons: [
                {
                  label: "Create",
                  onClick: (form) => {
                    setIsInstalling(true);
                    context.callBackendAction("installSite", {
                      name: form.name,
                      key: form.key,
                      design: item.data.source,
                      url: form.url,
                      onDone: () => {
                        window.location.reload();
                      },
                    });
                  },
                },
              ],
            });
          }}
          descriptionIsHtml
        />
      )}
    </>
  );
};

export default PublisherNewSite;
