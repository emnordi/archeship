import { Typography } from '@mui/material';
import { ShipLocation } from '../../types/Enums';
import { minutesAndSeconds } from '../../util/timeHelpers';

interface Props {
  location: ShipLocation;
  timeLeft: number;
}

const Docked = ({ location, timeLeft }: Props) => {
  const time = minutesAndSeconds(timeLeft);
  return (
    <>
      <Typography variant="h1" color="primary">
        {`Docked at: ${location}`}
      </Typography>
      <Typography variant="h2" color="primary">
        {`Departing in ${time.minutes} minutes and ${time.seconds} seconds`}
      </Typography>
    </>
  );
};

export default Docked;
