import images from "../assets/images";
import { CharacterListItem } from "./CharacterListItem";

type CharacterListProps = {
  list: string[];
  id: string;
  currentCharacterIndex: number;
};

export const CharacterList = ({ list, id, currentCharacterIndex }: CharacterListProps) => {
  return (
    <div>
      {list.map((character, i) => (
        <CharacterListItem
          key={`list-${id}-${character}`}
          name={character}
          imageSrc={images[character]}
          hasBeenPlayed={i < currentCharacterIndex}
        />
      ))}
    </div>
  );
};
