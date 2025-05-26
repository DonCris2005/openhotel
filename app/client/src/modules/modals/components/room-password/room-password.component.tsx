import React, { useCallback, useEffect, useRef } from "react";
import {
  ContainerComponent,
  Cursor,
  EventMode,
  FLEX_JUSTIFY,
  FlexContainerComponent,
  GraphicsComponent,
  GraphicType,
  NineSliceSpriteComponent,
  TilingSpriteComponent,
  useDragContainer,
} from "@openhotel/pixi-components";
import { ButtonComponent, InputComponent, TextComponent } from "shared/components";
import { MODAL_SIZE_MAP } from "shared/consts";
import { Event, Modal, SpriteSheetEnum } from "shared/enums";
import { useModal, useProxy, useRoomPasswordModalStore } from "shared/hooks";
import { useTranslation } from "react-i18next";

const MODAL_SIZE = MODAL_SIZE_MAP[Modal.ROOM_PASSWORD];

export const RoomPasswordComponent: React.FC = () => {
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const { emit } = useProxy();
  const { roomId, setRoomId } = useRoomPasswordModalStore();
  const { setDragPolygon } = useDragContainer();

  const passwordRef = useRef<string>("");

  useEffect(() => {
    setDragPolygon?.([0, 0, MODAL_SIZE.width, 0, MODAL_SIZE.width, 20, 0, 20]);
  }, [setDragPolygon]);

  const onCloseModal = useCallback(() => {
    closeModal(Modal.ROOM_PASSWORD);
    setRoomId(null);
  }, [closeModal, setRoomId]);

  const onChangePassword = useCallback((e) => {
    passwordRef.current = e.target.value;
  }, []);

  const onJoinRoom = useCallback(() => {
    if (!roomId) return;
    emit(Event.JOIN_ROOM, { roomId, password: passwordRef.current });
    onCloseModal();
  }, [emit, roomId, onCloseModal]);

  const inputWidth = MODAL_SIZE.width - 24;

  return (
    <>
      <GraphicsComponent
        type={GraphicType.CIRCLE}
        radius={6.5}
        alpha={0}
        cursor={Cursor.POINTER}
        eventMode={EventMode.STATIC}
        position={{ x: MODAL_SIZE.width - 23, y: 1.5 }}
        onPointerDown={onCloseModal}
        zIndex={20}
        pivot={{ x: 0, y: -5 }}
      />
      <ContainerComponent>
        <NineSliceSpriteComponent
          spriteSheet={SpriteSheetEnum.UI}
          texture="ui-base-modal"
          leftWidth={14}
          rightWidth={21}
          topHeight={22}
          bottomHeight={11}
          height={MODAL_SIZE.height}
          width={MODAL_SIZE.width}
        />
        <TilingSpriteComponent
          texture="ui-base-modal-bar-tile"
          spriteSheet={SpriteSheetEnum.UI}
          position={{ x: 11, y: 4 }}
          width={MODAL_SIZE.width - 35}
        />
        <FlexContainerComponent
          justify={FLEX_JUSTIFY.CENTER}
          size={{ width: MODAL_SIZE.width }}
          position={{ y: 4 }}
        >
          <TextComponent
            text={t("room_password.title")}
            backgroundColor={0xacc1ed}
            backgroundAlpha={1}
            padding={{ left: 4, right: 3, bottom: 0, top: 2 }}
          />
        </FlexContainerComponent>
        <ContainerComponent position={{ x: 12, y: 22 }}>
          <InputComponent
            size={{ width: inputWidth }}
            placeholder={t("room_creator.form.password")}
            onChange={onChangePassword}
          />
          <FlexContainerComponent
            position={{ y: 20, x: 0 }}
            size={{ width: inputWidth }}
            justify={FLEX_JUSTIFY.END}
          >
            <ButtonComponent
              text={t("room_password.join")}
              autoWidth
              size={{ height: 14 }}
              onPointerDown={onJoinRoom}
            />
          </FlexContainerComponent>
        </ContainerComponent>
      </ContainerComponent>
    </>
  );
};
