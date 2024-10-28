import SActionsContainer from './styled';
import AddFavourite from './AddFavourite';
import Download from './Download';
import { ExtendedSongProps } from '@interfaces';

export default function Actions({ song }: ExtendedSongProps) {
  return (
    <SActionsContainer>
      <Download song={song} />
      <AddFavourite song={song} />
    </SActionsContainer>
  );
}
