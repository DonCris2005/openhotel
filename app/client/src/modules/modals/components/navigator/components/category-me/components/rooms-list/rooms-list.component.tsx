import React, { useMemo, useRef, useCallback } from "react";
import {
  NavigatorRoomButtonComponent,
  ScrollComponent,
  TextComponent,
} from "shared/components";
import {
  FLEX_JUSTIFY,
  FlexContainerComponent,
  Size,
} from "@openhotel/pixi-components";
import { NavigatorRoom } from "shared/types";
import { useTranslation } from "react-i18next";

type Props = {
  size: Size;

  rooms: NavigatorRoom[];

  onClickFavorite: (roomId: string) => void;
  onClickGo: (roomId: string) => void;
  onClick: (roomId: string) => void;
};

export const RoomsListComponent: React.FC<Props> = ({
  size,
  rooms,
  onClickGo,
  onClickFavorite,
  onClick,
}) => {
  const { t } = useTranslation();

  const lastClick = useRef<{ id: string; time: number }>({ id: null, time: 0 });

  const $onPointerDown = useCallback(
    (roomId: string) => () => {
      const now = Date.now();

      if (
        lastClick.current.id === roomId &&
        now - lastClick.current.time < 500
      ) {
        onClickGo(roomId);
      }

      lastClick.current = { id: roomId, time: now };
      onClick(roomId);
    },
    [onClick, onClickGo],
  );

  const content = useMemo(
    () => (
      <FlexContainerComponent
        justify={FLEX_JUSTIFY.START}
        direction="y"
        gap={3}
      >
        {rooms.map(({ id, title, users, maxUsers, favorite }, index) => (
          <NavigatorRoomButtonComponent
            key={id}
            size={{
              width: size.width - 11 - 6,
              height: 11 + 5,
            }}
            title={title}
            users={users}
            maxUsers={maxUsers}
            favorite={favorite}
            onPointerDown={$onPointerDown(id)}
            onClickFavorite={() => onClickFavorite(id)}
            onClickGo={() => onClickGo(id)}
          />
        ))}
      </FlexContainerComponent>
    ),
    [rooms, size, onClickGo, onClickFavorite, $onPointerDown],
  );

  if (!rooms.length)
    return <TextComponent tint={0} text={t("navigator.no_results")} />;

  return (
    <ScrollComponent
      size={{
        width: size.width - 14,
        height: size.height,
      }}
      children={content}
    />
  );
};
