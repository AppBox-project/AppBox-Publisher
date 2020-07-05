import React, { useState, useEffect } from "react";
import { AppContextType } from "../../Utils/Types";
import { useHistory } from "react-router-dom";

// On error we should check if this is an ID and redirect to the appropriate page.
// Reason: link handlers cannot follow relationships and therefore the site ID needs to be replaced by the site name.
// Alternative way would be using a formula, but this seems more light weight.
const OnNoAction: React.FC<{
  location: { pathname };
  context: AppContextType;
}> = ({ location: { pathname }, context }) => {
  // Vars
  const [failure, setFailure] = useState<boolean>(false);
  const id = pathname.split("/")[2];
  const history = useHistory();

  // Lifecycle
  useEffect(() => {
    const request = context.getObjects(
      "publish-sites",
      { _id: id },
      (response) => {
        if (response.success) {
          if (response.data[0]) {
            // Redirect to site name
            history.push(pathname.replace(id, response.data[0].data.id));
          } else {
            setFailure(true);
          }
        } else {
          console.log(response);
        }
      }
    );
    return () => {
      request.stop();
    };
  }, [id]);

  // UI
  return failure ? <>Not found</> : <context.UI.Loading label="Searching" />;
};

export default OnNoAction;
