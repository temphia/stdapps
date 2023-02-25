export const formatBoard = (data) => {
  let value = {};
  try {
    let value = JSON.parse(data.value);
  } catch (error) {
    console.log("@format_paring_error", data);
  }

  return { ...value, key: data.key };
};
