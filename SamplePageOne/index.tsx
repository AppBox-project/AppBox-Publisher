import React from "react";
import { AppContextType } from "../../../Utils/Types";

const AppSAMPLEPageOne: React.FC<{
  match: { isExact: boolean };
  context: AppContextType;
  action: string;
}> = ({ context, action, match: { isExact } }) => {
  return <>Page one sample downloaded app</>;
};

export default AppSAMPLEPageOne;
