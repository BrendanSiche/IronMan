import { styled } from "@stitches/react";
import { Dispatch, SetStateAction, useRef } from "react";
import { Radio } from "./Radio";
import LeProtocole from "../assets/images/Banner/LeProtocole.png";
import { theme } from "../styles/theme";

type GameSettingsProps = {
  setPlayer1: Dispatch<SetStateAction<string>>;
  setPlayer2: Dispatch<SetStateAction<string>>;
  startGame: (teamSize: number, seed: string, isMirro?: boolean, kebab?: boolean) => void;
};

export const GameSettings = ({ setPlayer1, setPlayer2, startGame }: GameSettingsProps) => {
  const teamSize = useRef(19);
  const isMirror = useRef(false);
  const seed = useRef("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startGame(teamSize.current, seed.current, isMirror.current);
      }}
    >
      <SettingsWrapper>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", justifySelf: "start" }}>
          <img src={LeProtocole} width="60" height="60" />
          <h1>Le Protocole</h1>
        </div>
        <Subsection>
          <Label>Player 1</Label>
          <input onChange={(e) => setPlayer1(e.target.value)} type="text" />
        </Subsection>
        <Subsection>
          <Label>Player 2</Label>
          <input onChange={(e) => setPlayer2(e.target.value)} type="text" />
        </Subsection>
        <Subsection>
          <Label>Seed</Label>
          <input defaultValue={""} onChange={(e) => (seed.current = String(e.target.value))} />
        </Subsection>
        <Subsection>
          <Label>Team size</Label>
          <select defaultValue={18} onChange={(e) => (teamSize.current = Number(e.target.value) + 1)}>
            {new Array(19).fill(".").map((_, i) => {
              const indexForMuggles = i + 1;
              return (
                <option key={i} value={i}>
                  {indexForMuggles}
                </option>
              );
            })}
          </select>
        </Subsection>
        <Subsection>
          <Label>Pool selection</Label>
          <Radio
            label="Random"
            id="random-radio"
            groupName="pool-selection"
            onChange={() => {
              isMirror.current = false;
            }}
          />
          <Radio
            label="Mirror"
            id="mirror-radio"
            groupName="pool-selection"
            onChange={() => {
              isMirror.current = true;
            }}
          />
        </Subsection>
        {/* <Subsection>
          <Label>ça joue pour un Kebab ?</Label>
          <Radio
            label="Oui"
            id="random-radio"
            groupName="pool-selection"
            onChange={() => {
              kebab.current = true;
            }}
          />
          <Radio
            label="Non"
            id="mirror-radio"
            groupName="pool-selection"
            onChange={() => {
              kebab.current = false;
            }}
          />
        </Subsection> */}
        <StartButton>FIGHT !</StartButton>
      </SettingsWrapper>
    </form>
  );
};

const SettingsWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "32px",
  backgroundColor: "black",
  padding: "8px 0px",
  height: "100px",
  borderBottom: `4px solid ${theme.colors.text}`,
});

const Subsection = styled("div", {});

const StartButton = styled("button", {
  padding: "8px 40px",
  fontWeight: "bold",
});

const Label = styled("h3", {
  marginBottom: "4px",
});
