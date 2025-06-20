import React, { useMemo } from "react";
import {
  ContainerComponent,
  ContainerProps,
  Cursor,
  EventMode,
  FLEX_ALIGN,
  FLEX_JUSTIFY,
  FlexContainerComponent,
  NineSliceSpriteComponent,
  Size,
  SpriteComponent,
} from "@openhotel/pixi-components";
import { SpriteSheetEnum } from "shared/enums";
import { TextComponent } from "shared/components/text";

type Props = {
  title: string;
  favorite: boolean;
  users: number;
  maxUsers: number;
  size: Size;

  locked?: boolean;

  onClickFavorite: () => void;
  onClickGo: () => void;
} & ContainerProps;

const usersWidth = 40;

export const NavigatorRoomButtonComponent: React.FC<Props> = ({
  title,
  favorite,
  users,
  maxUsers,
  locked,
  size,

  onClickFavorite,
  onClickGo,
  ...containerProps
}) => {
  const usersColor = useMemo(() => {
    if (users >= maxUsers) return 0xb73d22;
    if (users >= maxUsers - 5) return 0xffd826;
    if (users > 0) return 0x87c053;

    return 0xe0e0e0;
  }, [users, maxUsers]);

  return useMemo(
    () => (
      <ContainerComponent
        {...containerProps}
        eventMode={EventMode.STATIC}
        cursor={Cursor.POINTER}
      >
        <NineSliceSpriteComponent
          spriteSheet={SpriteSheetEnum.UI}
          texture="ui-button-left-slice"
          leftWidth={3}
          rightWidth={0}
          topHeight={3}
          bottomHeight={3}
          width={size.width - usersWidth}
          height={size.height}
        />
        <ContainerComponent
          position={{
            x: 8,
            y: size.height / 2 - 4,
          }}
        >
          <SpriteComponent
            spriteSheet={SpriteSheetEnum.UI}
            texture={favorite ? "heart-full" : "heart-empty"}
            eventMode={EventMode.STATIC}
            cursor={Cursor.POINTER}
            onPointerDown={onClickFavorite}
          />
          {locked ? (
            <TextComponent text="🔒" color={0xb73d22} position={{ x: 15, y: 1 }} />
          ) : null}
          <TextComponent
            text={title}
            color={0x1}
            maxWidth={size.width - usersWidth - 28 - (locked ? 11 : 0)}
            wrap={false}
            position={{
              x: locked ? 26 : 15,
              y: 1,
            }}
          />
        </ContainerComponent>
        <ContainerComponent
          position={{
            x: size.width - usersWidth,
          }}
          eventMode={EventMode.STATIC}
          cursor={Cursor.POINTER}
          onPointerDown={onClickGo}
        >
          <NineSliceSpriteComponent
            spriteSheet={SpriteSheetEnum.UI}
            texture="ui-button-right-slice"
            leftWidth={0}
            rightWidth={3}
            topHeight={2}
            bottomHeight={3}
            width={usersWidth}
            height={size.height}
            tint={usersColor}
          />
          <FlexContainerComponent
            size={{ width: usersWidth - 8, height: size.height }}
            justify={FLEX_JUSTIFY.CENTER}
            align={FLEX_ALIGN.CENTER}
          >
            <TextComponent
              text={users + ""}
              pivot={{
                x: -2,
              }}
              bold
            />
          </FlexContainerComponent>
          <FlexContainerComponent
            size={{ width: usersWidth - 8, height: size.height }}
            align={FLEX_ALIGN.CENTER}
            position={{
              x: usersWidth - 7,
            }}
          >
            <SpriteComponent
              spriteSheet={SpriteSheetEnum.UI}
              texture="arrow"
              pivot={{
                y: 1,
              }}
            />
          </FlexContainerComponent>
        </ContainerComponent>
      </ContainerComponent>
    ),
    [
      title,
      favorite,
      users,
      size,

      onClickFavorite,
      onClickGo,
      containerProps,

      usersColor,
      locked,
    ],
  );
};
