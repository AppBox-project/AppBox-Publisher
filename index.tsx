import FourOhFour from "../../Components/FourOhFour";
import { FaPlusSquare, FaTh } from "react-icons/fa";
import AppSAMPLEPageOne from "./SamplePageOne";
import { AppContextType } from "../../Utils/Types";

export default class App {
  context: AppContextType;

  constructor(context) {
    this.context = context;
  }

  getActions = () => {
    return new Promise((resolve) => {
      this.context.getObjects("publish-sites", {}, (response) => {
        console.log(response);
      });

      resolve([
        {
          key: "dashboard",
          label: "Dashboard",
          component: FourOhFour,
          icon: FaTh,
        },
        {
          key: "add",
          label: "Create website",
          component: AppSAMPLEPageOne,
          icon: FaPlusSquare,
        },
      ]);
    });
  };
}
