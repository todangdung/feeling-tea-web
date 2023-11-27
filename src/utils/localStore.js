const setItemLS = (key, data) => {
  if (data === null || data === undefined) {
    localStorage.removeItem(key);
  } else {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
    } catch (error) {
      console.error("Error setting localStorage item:", error);
    }
  }
};

const getItemLS = (key) => {
  try {
    const storedData = localStorage.getItem(key);
    if (storedData !== null) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error("Error getting localStorage item:", error);
  }
  return null;
};

const removeItemLS = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing localStorage item:", error);
    return false;
  }
};

export { setItemLS, getItemLS, removeItemLS };
