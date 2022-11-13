import { styled } from "@stitches/react";

type CharacterListItemProps = {
  imageSrc: string;
  name: string;
  hasBeenPlayed?: boolean;
};

export const CharacterListItem = ({ imageSrc, name, hasBeenPlayed = false }: CharacterListItemProps) => {
  return (
    <ItemWrapper css={{ filter: hasBeenPlayed ? "grayscale(1) brightness(.3)" : "none" }}>
      <Avatar src={imageSrc} />
      <Name>{name}</Name>
    </ItemWrapper>
  );
};

const ItemWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const Avatar = styled("img", {
  width: "50px",
  height: "50px",
  border: "2px solid black",
  borderRadius: "200px",
});

const Name = styled("div", {
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: "16px",
});
