import React, { useCallback, useMemo } from "react";
import {
  ContainerComponent,
  FLEX_ALIGN,
  FLEX_JUSTIFY,
  FlexContainerComponent,
  Cursor,
  EventMode,
  SpriteComponent,
} from "@openhotel/pixi-components";
import { Modal, SpriteSheetEnum } from "shared/enums";
import { useModal, useInventoryNotification } from "shared/hooks";
import { SoftBadgeComponent, TextComponent } from "shared/components";
import { MODAL_HOT_BAR_ITEMS } from "shared/consts";

type Props = {};

export const HotBarItemsComponent: React.FC<Props> = ({}) => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const { count } = useInventoryNotification();

  const onPointerDown = useCallback(
    (modal: Modal) => () => {
      isModalOpen(modal) ? closeModal(modal) : openModal(modal);
    },
    [openModal, isModalOpen, closeModal],
  );

  return useMemo(
    () =>
      Object.keys(MODAL_HOT_BAR_ITEMS)
        .filter((modal) => !isNaN(modal as any))
        .map((modal) => {
          const modalId = Number(modal) as Modal;
          const { icon } = MODAL_HOT_BAR_ITEMS[modalId];
          const showBubble = modalId === Modal.INVENTORY && count > 0;
          return (
            <ContainerComponent key={modal}>
              <SpriteComponent
                spriteSheet={SpriteSheetEnum.HOT_BAR_ICONS}
                texture={icon}
                eventMode={EventMode.STATIC}
                cursor={Cursor.POINTER}
                onPointerDown={onPointerDown(modalId)}
              />
              {showBubble ? (
                <ContainerComponent position={{ x: 12, y: -2 }}>
                  <SoftBadgeComponent size={{ width: 9, height: 8 }} />
                  <FlexContainerComponent
                    size={{ width: 9, height: 8 }}
                    justify={FLEX_JUSTIFY.CENTER}
                    align={FLEX_ALIGN.CENTER}
                  >
                    <TextComponent text={count.toString()} color={0x000} />
                  </FlexContainerComponent>
                </ContainerComponent>
              ) : null}
            </ContainerComponent>
          );
        }),
    [onPointerDown, count],
  );
};
