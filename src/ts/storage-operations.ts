function setToLocalStorage(
  key: string,
  data: { sex: string; weight: number | string },
) {
  try {
    const JSONdata = JSON.stringify(data);
    localStorage.setItem(key, JSONdata);
  } catch (error) {
    console.error(error);
  }
}

function getFromLocalStorage(key: string) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { setToLocalStorage, getFromLocalStorage };
