import FourOhFour from "../../Components/FourOhFour";
import { FaPlusSquare, FaTh, FaGlobeEurope } from "react-icons/fa";
import { AppContextType } from "../../Utils/Types";
import AppPublisherSite from "./Site";
import PublisherNewSite from "./NewSite";
import OnNoAction from "./OnNoAction";

export default class App {
  context: AppContextType;

  constructor(context) {
    this.context = context;
  }

  appConfig = {
    actions: { mobile: { displayAs: "bottom-navigation" } },
  };

  getActions = () => {
    return new Promise((resolve) => {
      this.context.getObjects("publish-sites", {}, (response) => {
        if (response.success) {
          // Dashboard
          const pages = [
            {
              key: "dashboard",
              label: "Dashboard",
              component: FourOhFour,
              icon: FaTh,
            },
          ];

          // List all sites
          response.data.map((site) => {
            pages.push({
              key: site.data.id,
              label: site.data.name,
              component: AppPublisherSite,
              icon: FaGlobeEurope,
            });
          });

          // Add new page
          pages.push({
            key: "add",
            label: "Create website",
            component: PublisherNewSite,
            icon: FaPlusSquare,
          });
          resolve(pages);
        } else {
          console.log("Could not load sites", response.reason);
        }
      });
    });
  };

  // If no action was found
  onNoAction = OnNoAction;
}
