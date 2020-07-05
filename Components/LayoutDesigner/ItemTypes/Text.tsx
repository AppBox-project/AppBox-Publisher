import React from "react";
import { BlockType } from "..";
import { AppContextType } from "../../../../../Utils/Types";

const PublisherLDTypeText: React.FC<{
  block: BlockType;
  context: AppContextType;
}> = ({ block, context }) => {
  return <>{block.content}</>;
};

export default PublisherLDTypeText;
