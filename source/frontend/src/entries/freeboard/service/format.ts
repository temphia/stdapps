import type { Block } from "./boardtypes";

export const formatBoard = (data) => {
  let value = {};
  try {
    value = JSON.parse(data.value);
  } catch (error) {
    console.log("@format_paring_error", data);
  }

  return { ...value, key: data.key };
};

export const formatBlock = (data) => {
  let value = {};
  try {
    value = JSON.parse(data.value);
  } catch (error) {
    console.log("@format_paring_error", data);
  }

  return value;
};

export const extractLinks = (blocks: Block[]) => {
  return blocks.reduce((prev, curr) => {
    (curr.links || []).forEach((val) => {
      prev.push({
        from: curr.slug,
        to: val.to,
        name: val.name,
      });
    });

    return prev;
  }, []);
};
