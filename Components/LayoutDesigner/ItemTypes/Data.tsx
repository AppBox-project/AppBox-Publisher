import React from "react";
import { BlockType } from "..";
import { AppContextType } from "../../../../../Utils/Types";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { Tooltip } from "@material-ui/core";

const PublisherLDTypeData: React.FC<{
  block: BlockType;
  context: AppContextType;
  onChange: (value: BlockType) => void;
}> = ({ block, context, onChange }) => {
  return (
    <>
      <context.UI.Inputs.TextInput
        label="Data source"
        value={block.dataType}
        onChange={(value) => {
          block.dataType = value;
          onChange(block);
        }}
      />
      <Tooltip placement="top" title="Display as list or grid?">
        <ToggleButtonGroup
          value={block.dataDisplay || "grid"}
          exclusive
          onChange={(event, value) => {
            block.dataDisplay = value;
            onChange(block);
          }}
          color="primary"
          aria-label="Display as"
        >
          <ToggleButton value="grid" aria-label="Grid">
            <BsFillGrid1X2Fill />
          </ToggleButton>

          <ToggleButton value="list" aria-label="List">
            <FaThList />
          </ToggleButton>
        </ToggleButtonGroup>
      </Tooltip>
    </>
  );
};

export default PublisherLDTypeData;
