import React from "react";
import { BlockType, PublisherLDBlockDisplay } from "..";
import { AppContextType } from "../../../../../Utils/Types";
import { Grid } from "@material-ui/core";

const PublisherLDTypeGrid: React.FC<{
  block: BlockType;
  blocks: { [blockId: string]: BlockType };
  context: AppContextType;
  onChange: (value: String) => void;
  addButton;
  newData;
  setNewData;
}> = ({ block, context, onChange, addButton, blocks, newData, setNewData }) => {
  return (
    <Grid container>
      {(block?.children || []).map((child) => {
        const block = blocks[child.id];
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
    </Grid>
  );
};

export default PublisherLDTypeGrid;
