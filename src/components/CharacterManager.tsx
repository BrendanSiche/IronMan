import { styled } from "@stitches/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import images from "../assets/images";
import { theme } from "../styles/theme";

type CharacterManagerProps = {
  playerName: string;
  list: string[];
  setCharacterIndex: Dispatch<SetStateAction<number>>;
  setWinner: Dispatch<SetStateAction<string | null>>;
};

export const CharacterManager = ({ playerName, list, setCharacterIndex, setWinner }: CharacterManagerProps) => {
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  useEffect(() => {
    setCurrentCharacterIndex(0);
  }, [list]);

  function changeCharacterIndex(newValue: number) {
    if (newValue < 0) return;
    if (newValue === list.length) return setWinner(playerName);
    setCurrentCharacterIndex(newValue);
  }

  useEffect(() => {
    setCharacterIndex(currentCharacterIndex);
  }, [currentCharacterIndex, setCharacterIndex]);

  return (
    <Container>
      <PlayerName>{playerName}</PlayerName>
      <AvatarWrapper>
        <Button onClick={() => changeCharacterIndex(currentCharacterIndex - 1)}>&lsaquo;</Button>
        <CurrentCharacterAvatar src={images[list[currentCharacterIndex]]} />
        <Button onClick={() => changeCharacterIndex(currentCharacterIndex + 1)}>&rsaquo;</Button>
      </AvatarWrapper>
      <CurrentCharacterName>{list[currentCharacterIndex]}</CurrentCharacterName>
    </Container>
  );
};

const PlayerName = styled("h1", { margin: "20px 20px" });

const Container = styled("div", {
  flex: 1,
  marginTop: "auto",
  marginBottom: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const AvatarWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
});

const CurrentCharacterAvatar = styled("img", {
  width: "200px",
  height: "200px",
  border: "8px solid black",
  borderRadius: "200px",
});

const CurrentCharacterName = styled("div", {
  fontWeight: "bold",
  textTransform: "uppercase",
  marginTop: "8px",
  fontSize: "24px",
});

const Button = styled("button", {
  backgroundColor: "black",
  border: "none",
  width: "40px",
  height: "40px",
  color: theme.colors.text,
  fontSize: "32px",
  display: "flex",
  borderRadius: "40px",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: "1.1",
  cursor: "pointer",
  transition: "all .5s ease",
  "&:hover": {
    transition: "all .5s ease",
    backgroundColor: "grey",
  },
});
