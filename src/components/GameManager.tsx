import { styled } from "@stitches/react";
import { stringify } from "querystring";
import { useEffect, useState } from "react";
import { setSourceMapRange } from "typescript";
import images from "../assets/images";
import { CharacterList } from "./CharacterList";
import { CharacterManager } from "./CharacterManager";
import { CheckBox } from "./CheckBox";
import { GameSettings } from "./GameSettings";

// Bad performance but fills our needs

function generateRandomTeam(array: string[], seed: number, teamsize: number) {
  let m = array.length;
  let t;
  let i;

  while (m) {
    i = Math.floor(random(seed) * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed;
  }
  const ret = array.slice(0, teamsize);
  return ret;
}

function random(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function getRandomInt() {
  const min = Math.ceil(0);
  const max = Math.floor(999);
  return Math.floor(Math.random() * (max - min) + min);
}

const GameManager = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const [teamPlayer1, setTeamPlayer1] = useState<string[]>([]);
  const [teamPlayer2, setTeamPlayer2] = useState<string[]>([]);

  const [showP1List, setShowP1List] = useState(false);
  const [showP2List, setShowP2List] = useState(false);

  const [p1CurrentCharIndex, setP1CurrentCharIndex] = useState(0);
  const [p2CurrentCharIndex, setP2CurrentCharIndex] = useState(0);

  const [winner, setWinner] = useState<string | null>(null);

  const [msg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const [printSeed, setSeed] = useState("");

  const startGame = (teamSize: number, seed: string, isMirror?: boolean, kebab?: boolean) => {
    if (kebab === true) {
      setMsg(" gagne un Kebab");
      setImg("https://i.giphy.com/media/sE0nAnZU4xsgYVfkbB/giphy.webp");
    }
    if (kebab === false) {
      setMsg("n'est pas carry par son perso");
      setImg("");
    }

    if (seed === "") {
      const SeedP1 = getRandomInt();
      const SeedP2 = getRandomInt();
      const teamP1 = generateRandomTeam(Object.keys(images), SeedP1, teamSize);
      setSeed(String(SeedP1) + "." + String(SeedP2) + "." + Number(isMirror));
      console.log(printSeed);
      const tmpP1 = Array.from(teamP1);
      const teamP2 = isMirror
        ? generateRandomTeam(tmpP1, Number(SeedP2), teamSize)
        : generateRandomTeam(Object.keys(images), SeedP2, teamSize);
      setTeamPlayer1(teamP1);
      setTeamPlayer2(teamP2);
    } else {
      const SeedP1 = seed.split(".")[0];
      const SeedP2 = seed.split(".")[1];
      isMirror = Boolean(Number(seed.split(".")[2]));
      setSeed(String(SeedP1) + "." + String(SeedP2) + "." + Number(isMirror));
      const teamP1 = generateRandomTeam(Object.keys(images), Number(SeedP1), teamSize);
      const tmpP1 = Array.from(teamP1);
      const teamP2 = isMirror
        ? generateRandomTeam(tmpP1, Number(SeedP2), teamSize)
        : generateRandomTeam(Object.keys(images), Number(SeedP2), teamSize);
      setTeamPlayer1(teamP1);
      setTeamPlayer2(teamP2);
    }
  };

  useEffect(() => {
    setWinner(null);
  }, [teamPlayer1, teamPlayer2]);

  return (
    <PageWrapper>
      <GameSettings setPlayer1={setPlayer1} setPlayer2={setPlayer2} startGame={startGame} />
      {teamPlayer1.length && teamPlayer2.length ? (
        <BottomPageWrapper>
          <LayoutCharacterList>
            <CheckBox
              id={`p1-view-full-list`}
              label={"Show the list"}
              onChange={(e) => setShowP1List(e.target.checked)}
            />
            {showP1List ? (
              <CharacterList list={teamPlayer1} id="p1" currentCharacterIndex={p1CurrentCharIndex} />
            ) : null}
          </LayoutCharacterList>
          <FixedContainer>
            <CharacterManager
              playerName={player1}
              list={teamPlayer1}
              setCharacterIndex={setP1CurrentCharIndex}
              setWinner={setWinner}
            />
            <CharacterManager
              playerName={player2}
              list={teamPlayer2}
              setCharacterIndex={setP2CurrentCharIndex}
              setWinner={setWinner}
            />
          </FixedContainer>
          <Seed>{printSeed} </Seed>
          <LayoutCharacterList css={{ alignItems: "end" }}>
            <CheckBox
              id={`p2-view-full-list`}
              label={"Show the list"}
              onChange={(e) => setShowP2List(e.target.checked)}
            />
            {showP2List ? (
              <CharacterList list={teamPlayer2} id="p2" currentCharacterIndex={p2CurrentCharIndex} />
            ) : null}
          </LayoutCharacterList>
          {winner !== null ? (
            <WinningScreen>
              <WinningMessage>
                {winner} {msg}
              </WinningMessage>
              {/* Message de victoire hors kebab : "{winner} n'est pas carry par son perso" */}
              <img src={img} />
            </WinningScreen>
          ) : null}
        </BottomPageWrapper>
      ) : null}
    </PageWrapper>
  );
};

export default GameManager;

const Seed = styled("div", {
  fontWeight: "bold",
  textTransform: "uppercase",
  marginTop: "8px",
  fontSize: "24px",
  userSelect: "all",
});

const LayoutCharacterList = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const FixedContainer = styled("div", {
  display: "flex",
  gap: "40px",
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translateX(-50%) translateY(-50%)",
});

const PageWrapper = styled("div", {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});
const BottomPageWrapper = styled("div", {
  flex: 1,
  overflowY: "auto",
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 20px",
});

const WinningScreen = styled("div", {
  top: 80,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,.9)",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  zIndex: 1000,
});

const WinningMessage = styled("h1", {
  fontSize: "60px",
  color: "yellow",
});
