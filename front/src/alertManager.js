let addAlertCallback = null;

export const registerAddAlert = (callback) => {
  addAlertCallback = callback;
};

export const addGlobalAlert = (type, message) => {
  if (addAlertCallback) {
    addAlertCallback(type, message);
  }
};
