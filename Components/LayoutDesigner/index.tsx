import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Divider,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { AppContextType } from "../../../../Utils/Types";
import styles from "./styles.module.scss";
import { FaPlus, FaCogs } from "react-icons/fa";
import uniqid from "uniqid";
import { PublisherLDTypeText, PublisherLDTypeGrid } from "./ItemTypes";

interface DataType {
  blocks: { [blockId: string]: BlockType };
  layout: LayoutType[];
}

interface LayoutType {
  id: string;
}

export interface BlockType {
  type: "html" | "text" | "layoutitem" | "image" | "grid";
  title: string;
  content: string;
  children?: { id: string }[];
  xs?;
  sm?;
  md?;
  lg?;
  xl?;
}

const PublisherLayoutDesigner: React.FC<{
  layout: DataType;
  context: AppContextType;
  onSave: (response: String) => void;
}> = ({ context, layout, onSave }) => {
  // Vars
  const [newData, setNewData] = useState<DataType>({ layout: [], blocks: {} });

  // Lifecycle
  useEffect(() => {
    if (typeof layout === "string") {
      setNewData(JSON.parse(layout));
    } else {
      setNewData(layout || { layout: [], blocks: {} });
    }
  }, [layout]);

  // UI
  return (
    <Grid container>
      <Grid item xs={12} md={9}>
        <div className={styles.designer}>
          <Grid container>
            {newData?.layout.length > 0 ? (
              newData.layout.map((layoutItem) => {
                const block = newData.blocks[layoutItem.id];
                return (
                  <PublisherLDBlockDisplay
                    key={layoutItem.id}
                    block={block}
                    context={context}
                    newData={newData}
                    setNewData={setNewData}
                    id={layoutItem.id}
                  />
                );
              })
            ) : (
              <Typography variant="body1" style={{ textAlign: "center" }}>
                Nothing here.
              </Typography>
            )}
            <Button
              fullWidth
              color="primary"
              startIcon={<FaPlus />}
              onClick={() => {
                const id = uniqid();
                setNewData({
                  layout: [...newData.layout, { id }],
                  blocks: {
                    ...newData.blocks,
                    [id]: {
                      type: "text",
                      title: "New block",
                      content: "<h3>New block</h3><p>Edit this</p>",
                    },
                  },
                });
              }}
            >
              Add
            </Button>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12} md={3}>
        <context.UI.Design.Card title="Page settings">
          Some information about this page
          {JSON.stringify(newData) !==
            JSON.stringify(layout || { layout: [], blocks: {} }) && (
            <>
              <br />
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => {
                  onSave(JSON.stringify(newData));
                }}
              >
                Save
              </Button>
            </>
          )}
        </context.UI.Design.Card>
      </Grid>
    </Grid>
  );
};

const PublisherLDBlockDisplay: React.FC<{
  block: BlockType;
  context: AppContextType;
  newData;
  id;
  setNewData;
}> = ({ context, block, newData, id, setNewData }) => {
  return (
    <Grid
      item
      xs={block.xs}
      sm={block.sm}
      md={block.md}
      lg={block.lg}
      xl={block.xl}
    >
      <context.UI.Design.Card hoverable style={{ margin: 15 }}>
        <Grid container>
          <Grid item xs={2}>
            <Tooltip placement="left" title="Tweak block">
              <IconButton
                onClick={() => {
                  context.setDialog({
                    display: true,
                    title: (
                      <>
                        Configure <em>{block.title}</em>
                      </>
                    ),
                    form: [
                      { label: "Title", value: block.title, key: "title" },
                      {
                        label: "XS",
                        value: block.xs,
                        key: "xs",
                        type: "number",
                      },
                      {
                        label: "SM",
                        value: block.sm,
                        key: "sm",
                        type: "number",
                      },
                      {
                        label: "MD",
                        value: block.md,
                        key: "md",
                        type: "number",
                      },
                      {
                        label: "LG",
                        value: block.lg,
                        key: "lg",
                        type: "number",
                      },
                      {
                        label: "XL",
                        value: block.xl,
                        key: "xl",
                        type: "number",
                      },
                    ],
                    buttons: [
                      {
                        label: "Save",
                        onClick: (form) => {
                          setNewData({
                            ...newData,
                            blocks: {
                              ...newData.blocks,
                              [id]: {
                                ...newData.blocks[id],
                                title: form.title,
                                xs: form.xs,
                                sm: form.sm,
                                md: form.md,
                                lg: form.lg,
                                xl: form.xl,
                              },
                            },
                          });
                        },
                      },
                    ],
                  });
                }}
              >
                <FaCogs />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={8} style={{ textAlign: "center" }}>
            <Typography variant="h6">{block.title}</Typography>
          </Grid>
          <Grid item xs={2}>
            <context.UI.Inputs.SelectInput
              label="Type"
              value={block.type}
              options={[
                { label: "Text", value: "text" },
                { label: "HTML", value: "html" },
                { label: "Item", value: "layoutitem" },
                { label: "Image", value: "image" },
                { label: "Grid", value: "grid" },
              ]}
              onChange={(selected) => {
                const blocks = newData.blocks;
                blocks[id].type = selected;
                setNewData({ ...newData, blocks });
              }}
            />
          </Grid>
        </Grid>
        <Divider style={{ marginTop: 5, marginBottom: 10 }} />
        {block.type === "text" && (
          <PublisherLDTypeText
            block={block}
            context={context}
            onChange={(value) => {
              const blocks = newData.blocks;
              blocks[id].content = value;
              setNewData({ ...newData, blocks });
            }}
          />
        )}
        {block.type === "grid" && (
          <PublisherLDTypeGrid
            block={block}
            blocks={newData.blocks}
            context={context}
            onChange={(value) => {
              const blocks = newData.blocks;
              blocks[id].content = value;
              setNewData({ ...newData, blocks });
            }}
            newData={newData}
            setNewData={setNewData}
            addButton={
              <Button
                fullWidth
                color="primary"
                startIcon={<FaPlus />}
                onClick={() => {
                  const newId = uniqid();
                  const newChildren = newData?.blocks[id]?.children || [];
                  newChildren.push({ id: newId });
                  setNewData({
                    layout: [...newData.layout],
                    blocks: {
                      ...newData.blocks,
                      [id]: {
                        ...newData.blocks[id],
                        children: newChildren,
                      },
                      [newId]: {
                        type: "text",
                        title: "New block",
                        content: "<h3>New block</h3><p>Edit this</p>",
                      },
                    },
                  });
                }}
              >
                Add
              </Button>
            }
          />
        )}
      </context.UI.Design.Card>
    </Grid>
  );
};

export default PublisherLayoutDesigner;
export { PublisherLDBlockDisplay };
