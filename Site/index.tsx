import React, { useState, useEffect } from "react";
import { AppContextType } from "../../../Utils/Types";
import { useHistory } from "react-router-dom";
import { Typography, Tabs, Tab } from "@material-ui/core";
import AppPublisherSiteDashboard from "./Dashboard";
import AppPublisherSiteDesign from "./Design";

const AppPublisherSite: React.FC<{
  match: { isExact: boolean };
  context: AppContextType;
  action: string;
}> = ({ context, action, match: { isExact } }) => {
  // Var
  const [site, setSite] = useState();
  const currentTab = isExact
    ? "dashboard"
    : window.location.href.split(`publisher/${action}/`)[1].match("/")
    ? window.location.href.split(`publisher/${action}/`)[1].split("/")[0]
    : window.location.href.split(`publisher/${action}/`)[1];
  const history = useHistory();

  // Lifecycle
  useEffect(() => {
    context.getObjects("publish-sites", { "data.id": action }, (response) => {
      setSite(response.data[0]);
    });
  }, [action]);

  // UI
  if (!site) return <context.UI.Loading />;
  return (
    <>
      <Tabs
        value={currentTab}
        onChange={(event, value) => {
          history.push(`/publisher/${action}/${value}`);
        }}
        indicatorColor="primary"
        textColor="primary"
        aria-label="Site aspects navigation"
        variant="scrollable"
      >
        <Tab label="Dashboard" value="dashboard" />
        <Tab label="Design" value="design" />
        <Tab label="Pages" value="pages" />
        <Tab label="Scheduled refresh" value="schedule" />
      </Tabs>
      {currentTab === "dashboard" && (
        <AppPublisherSiteDashboard context={context} site={site} />
      )}
      {currentTab === "design" && (
        <AppPublisherSiteDesign context={context} site={site} />
      )}
    </>
  );
};

export default AppPublisherSite;
