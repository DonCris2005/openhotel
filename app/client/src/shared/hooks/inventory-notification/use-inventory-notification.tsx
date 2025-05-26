import { useContext } from "react";
import { InventoryNotificationContext, InventoryNotificationState } from "./inventory-notification.context";

export const useInventoryNotification = (): InventoryNotificationState =>
  useContext(InventoryNotificationContext);
