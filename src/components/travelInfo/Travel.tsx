import { Typography } from '@mui/material';
import { ShipLocation } from '../../types/Enums';
import { minutesAndSeconds } from '../../util/timeHelpers';

interface Props {
  location: ShipLocation;
  timeLeft: number;
}

const Travel = ({ location, timeLeft }: Props) => {
  const time = minutesAndSeconds(timeLeft);
  return (
    <>
      <Typography variant="h1" color="primary">
        {`Travelling to: ${location}`}
      </Typography>
      <Typography variant="h2" color="primary">
        {`Arriving in ${time.minutes} minutes and ${time.seconds} seconds`}
      </Typography>
    </>
  );
};

export default Travel;
