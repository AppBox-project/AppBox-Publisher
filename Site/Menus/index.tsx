import React, { useState, useEffect } from "react";
import { AppContextType } from "../../../../Utils/Types";
import { Typography, Paper, Grid, Button } from "@material-ui/core";
import styles from "./styles.module.scss";
import { GrUpdate } from "react-icons/gr";
import AppPublisherSiteMenuDetail from "./Detail";

const AppPublisherSiteMenus: React.FC<{
  context: AppContextType;
  site;
}> = ({ context, site }) => {
  // Vars
  const [menuList, setMenuList] = useState<{ label: string; id: string }[]>([]);

  // Lifecycle
  useEffect(() => {
    const ml = [];
    (site?.data?.supported_menus || []).map((sm) => {
      ml.push({ label: sm.id, id: sm.id, menu: sm });
    });
    setMenuList(ml);
  }, [site.supported_menus]);

  // UI
  return (
    <context.UI.Layouts.ListDetailLayout
      list={menuList}
      baseUrl={`/publisher/${site.data.id}/menus`}
      DetailComponent={AppPublisherSiteMenuDetail}
      context={context}
      detailComponentProps={{ context, site }}
    />
  );
};

export default AppPublisherSiteMenus;
