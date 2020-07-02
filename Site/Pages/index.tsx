import React, { useState, useEffect } from "react";
import { AppContextType } from "../../../../Utils/Types";
import styles from "./styles.module.scss";
import AppPublisherSitePagesDetail from "./Detail";
import { FaFileAlt } from "react-icons/fa";

const AppPublisherSitePages: React.FC<{
  context: AppContextType;
  site;
}> = ({ context, site }) => {
  // Vars
  const [navigation, setNavigation] = useState<any>(); // Menu items
  const [pages, setPages] = useState<any>(); // Full page data

  // Lifecycle
  useEffect(() => {
    context.getObjects("publisher-pages", {}, (response) => {
      if (response.success) {
        setPages(response.data);
        const pageNav = [];
        response.data.map((page) => {
          pageNav.push({ label: page.data.name, id: page.data.slug });
        });
        setNavigation(pageNav);
      }
    });
  }, [site.data.pageObject]);

  // UI
  if (!navigation) return <context.UI.Loading />;
  return (
    <context.UI.Layouts.ListDetailLayout
      context={context}
      baseUrl={`/publisher/${site.data.id}/pages`}
      DetailComponent={AppPublisherSitePagesDetail}
      detailComponentProps={{ site, pages }}
      navFixedIcon={<FaFileAlt />}
      navWidth={2}
      list={navigation}
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
