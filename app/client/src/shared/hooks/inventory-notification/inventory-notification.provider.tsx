import React, { ReactNode, useCallback } from "react";
import { InventoryNotificationContext } from "./inventory-notification.context";
import { useInventoryNotificationStore } from "./inventory-notification.store";

type Props = { children: ReactNode };

export const InventoryNotificationProvider: React.FC<Props> = ({ children }) => {
  const { count, increment: $increment, reset: $reset } =
    useInventoryNotificationStore();

  const increment = useCallback(
    (amount?: number) => $increment(amount),
    [$increment],
  );
  const reset = useCallback(() => $reset(), [$reset]);

  return (
    <InventoryNotificationContext.Provider
      value={{ count, increment, reset }}
      children={children}
    />
  );
};
