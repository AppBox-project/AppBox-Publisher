import FourOhFour from "../../Components/FourOhFour";
import { FaFootballBall, FaAsterisk } from "react-icons/fa";
import AppSAMPLEPageOne from "./SamplePageOne";

export default class App {
  context: any;

  constructor(context) {
    this.context = context;
  }

  getActions = () => {
    return new Promise((resolve) => {
      resolve([
        {
          key: "desktop",
          label: "Desktop",
          component: FourOhFour,
          icon: FaAsterisk,
        },
        {
          key: "notes",
          label: "Quick notes",
          component: AppSAMPLEPageOne,
          icon: FaFootballBall,
        },
      ]);
    });
  };
}
