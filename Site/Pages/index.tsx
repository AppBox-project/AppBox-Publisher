import React, { useState, useEffect } from "react";
import { AppContextType } from "../../../../Utils/Types";
import styles from "./styles.module.scss";
import AppPublisherSitePagesNoObject from "./NoObject";
import AppPublisherSitePagesDetail from "./Detail";
import { FaFileAlt } from "react-icons/fa";

const AppPublisherSitePages: React.FC<{
  context: AppContextType;
  site;
}> = ({ context, site }) => {
  // Vars
  const [pages, setPages] = useState<any>();

  // Lifecycle
  useEffect(() => {
    if (site.data.pageObject) {
      context.getObjects(site.data.pageObject, {}, (response) => {
        if (response.success) {
          const pageNav = [];
          response.data.map((page) => {
            pageNav.push({ label: page.data.title, id: page.data.slug });
          });
          setPages(pageNav);
        }
      });
    }
  }, [site.data.pageObject]);

  // UI
  if (!site.data.pageObject)
    return <AppPublisherSitePagesNoObject context={context} site={site} />;
  if (!pages) return <context.UI.Loading />;
  return (
    <context.UI.Layouts.ListDetailLayout
      context={context}
      baseUrl={`/publisher/${site.data.id}/pages`}
      DetailComponent={AppPublisherSitePagesDetail}
      navFixedIcon={<FaFileAlt />}
      navWidth={2}
      list={pages}
      addFunction={() => {
        context.setDialog({
          display: true,
          title: "New page",
          form: [
            { key: "title", label: "Page title" },
            { key: "slug", label: "Page slug" },
          ],
          buttons: [
            {
              label: "Add",
              onClick: (newObject) => {
                context.addObject(
                  site.data.pageObject,
                  newObject,
                  (response) => {
                    console.log(response);
                  }
                );
              },
            },
          ],
        });
      }}
    />
  );
};

export default AppPublisherSitePages;
