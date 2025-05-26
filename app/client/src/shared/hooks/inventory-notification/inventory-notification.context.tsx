import React from "react";

export type InventoryNotificationState = {
  count: number;
  increment: (amount?: number) => void;
  reset: () => void;
};

export const InventoryNotificationContext = React.createContext<InventoryNotificationState>(undefined);
