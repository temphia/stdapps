export const formatValue = (data: any) => {
  try {
    return JSON.parse(data.value);
  } catch (error) {
    console.log("VALUE_PARSE_ERR", data, error);
  }
  return {};
};
