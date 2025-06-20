import { Modal, ModalInventoryTab, ModalNavigatorTab } from "shared/enums";
import { Size } from "@openhotel/pixi-components";

export const MODAL_NAVIGATOR_TAB_NAME_MAP: Record<ModalNavigatorTab, string> = {
  [ModalNavigatorTab.HOTEL]: "navigator.tabs.hotel",
  [ModalNavigatorTab.ROOMS]: "navigator.tabs.rooms",
  [ModalNavigatorTab.ME]: "navigator.tabs.me",
  [ModalNavigatorTab.SEARCH]: "navigator.tabs.search",
};

export const MODAL_INVENTORY_TAB_NAME_MAP: Record<ModalInventoryTab, string> = {
  [ModalInventoryTab.FURNITURE]: "inventory.tabs.furniture",
  [ModalInventoryTab.FRAMES]: "inventory.tabs.frames",
  [ModalInventoryTab.PETS]: "inventory.tabs.pets",
  [ModalInventoryTab.RARES]: "inventory.tabs.rares",
};

export const MODAL_HOT_BAR_ITEMS = {
  [Modal.CONSOLE]: {
    icon: "console-off",
  },
  [Modal.NAVIGATOR]: {
    icon: "navigator",
  },
  [Modal.CATALOG]: {
    icon: "catalog",
  },
  [Modal.INVENTORY]: {
    icon: "inventory",
  },
  [Modal.PURSE]: {
    icon: "purse",
  },
  [Modal.CLUB]: {
    icon: "club",
  },
};

export const MODAL_SIZE_MAP: Record<Modal, Size> = {
  [Modal.NAVIGATOR]: {
    width: 349,
    height: 260,
  },
  [Modal.CATALOG]: {
    width: 349,
    height: 271,
  },
  [Modal.INVENTORY]: {
    width: 312,
    height: 209,
  },
  [Modal.PURSE]: {
    width: 306,
    height: 227,
  },
  [Modal.CLUB]: {
    width: 0,
    height: 0,
  },
  [Modal.CONSOLE]: {
    width: 0,
    height: 0,
  },
  [Modal.ROOM_CREATOR]: {
    width: 281,
    height: 228,
  },
  [Modal.ROOM_PASSWORD]: {
    width: 160,
    height: 70,
  },
};
