import React from "react";
import { BlockType } from "..";
import { AppContextType } from "../../../../../Utils/Types";

const PublisherLDTypeText: React.FC<{
  block: BlockType;
  context: AppContextType;
  onChange: (value: String) => void;
}> = ({ block, context, onChange }) => {
  return (
    <context.UI.Inputs.RichText value={block.content} onChange={onChange} />
  );
};

export default PublisherLDTypeText;
