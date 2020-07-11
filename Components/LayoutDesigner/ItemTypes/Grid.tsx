import React from "react";
import { BlockType, PublisherLDBlockDisplay } from "..";
import { AppContextType } from "../../../../../Utils/Types";

const PublisherLDTypeGrid: React.FC<{
  block: BlockType;
  blocks: { [blockId: string]: BlockType };
  context: AppContextType;
  onChange: (value: String) => void;
  addButton;
  newData;
  setNewData;
}> = ({ block, context, onChange, addButton, blocks, newData, setNewData }) => {
  console.log(block?.children);

  return (
    <>
      {(block?.children || []).map((child) => {
        const block = blocks[child.id];
        console.log(block);
        return (
          <PublisherLDBlockDisplay
            block={block}
            context={context}
            newData={newData}
            setNewData={setNewData}
            id={child.id}
          />
        );
      })}
      {addButton}
    </>
  );
};

export default PublisherLDTypeGrid;
