import React, { createContext, useContext, useState, useCallback } from 'react';
import { registerAddAlert } from '../alertManager'; // Import alert manager

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const alertRef = React.useRef();

  alertRef.current = alerts;

  const addAlert = useCallback((type, message) => {
    const id = Math.random().toString(36).substring(7);
    setAlerts([...alertRef.current, { id, type, message }]);
    setTimeout(() => removeAlert(id), 3000); // Remove after 3 seconds
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts(alertRef.current.filter(alert => alert.id !== id));
  }, []);

  React.useEffect(() => {
    registerAddAlert(addAlert);
  }, [addAlert]);

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <div className="alert-container">
        {alerts.map(alert => (
          <div key={alert.id} className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" aria-label="Close" onClick={() => removeAlert(alert.id)}></button>
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
};
