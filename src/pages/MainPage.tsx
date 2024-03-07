import { Box, LinearProgress, Theme, Typography } from '@mui/material';
import { isMobile } from 'react-device-detect';
import SailingIcon from '@mui/icons-material/Sailing';
import { useState } from 'react';
import { ShipLocation, ShipStatus } from '../types/Enums';
import { getTimeInseconds, getTravelTime, minutesAndSeconds, oppositeLocation } from '../util/timeHelpers';
import Travel from '../components/travelInfo/Travel';
import Docked from '../components/travelInfo/Docked';

interface Props {
  theme: Theme;
}

const MainPage = ({ theme }: Props) => {
  //Settings to generate correct time and place
  const startingLocation: ShipLocation = ShipLocation.AUSTERA;
  const otherLocation: ShipLocation = ShipLocation.TWO_CROWNS;
  const reportedTimeFromString = new Date('2024-03-07T16:06');
  const reportedBuffTimer = getTimeInseconds(7, 38);

  const [shipStatus, setShipStatus] = useState<ShipStatus>(ShipStatus.DOCKED);
  const [shipLocation, setShipLocation] = useState<ShipLocation>(startingLocation);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const runEverySecond = () => {
    const currentTimeCET = new Date(
      new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Stockholm',
      })
    );

    //Difference between current time and reported time
    const timeDifference = Math.floor((currentTimeCET.getTime() - reportedTimeFromString.getTime()) / 1000);
    const timeDifferenceRemainder =
      timeDifference % (getTimeInseconds(40, 0) + getTravelTime(startingLocation) + getTravelTime(otherLocation));

    if (timeDifferenceRemainder < reportedBuffTimer) {
      //Ship at starting location and has not left
      setShipStatus(ShipStatus.DOCKED);
      setShipLocation(startingLocation);
      const time = reportedBuffTimer - timeDifferenceRemainder;
      setTimeLeft(time);
    } else if (timeDifferenceRemainder < reportedBuffTimer + getTravelTime(startingLocation)) {
      // Travelling to next location
      setShipStatus(ShipStatus.TRAVELLING);
      setShipLocation(oppositeLocation(startingLocation));
      //Arriving in
      const arrivalInSeconds = reportedBuffTimer + getTravelTime(startingLocation) - timeDifferenceRemainder;
      setTimeLeft(arrivalInSeconds);
    } else if (
      timeDifferenceRemainder <
      reportedBuffTimer + getTimeInseconds(20, 0) + getTravelTime(startingLocation)
    ) {
      //Ship in other location
      setShipStatus(ShipStatus.DOCKED);
      setShipLocation(otherLocation);
      const time =
        reportedBuffTimer + getTimeInseconds(20, 0) + getTravelTime(startingLocation) - timeDifferenceRemainder;
      setTimeLeft(time);
    } else if (
      timeDifferenceRemainder <
      reportedBuffTimer + getTimeInseconds(20, 0) + getTravelTime(startingLocation) + getTravelTime(otherLocation)
    ) {
      // Travelling back again
      setShipStatus(ShipStatus.TRAVELLING);
      setShipLocation(startingLocation);
      const time =
        reportedBuffTimer +
        getTimeInseconds(20, 0) +
        getTravelTime(startingLocation) +
        getTravelTime(otherLocation) -
        timeDifferenceRemainder;
      setTimeLeft(time);
    } else {
      setShipStatus(ShipStatus.DOCKED);
      setShipLocation(startingLocation);
      const time =
        reportedBuffTimer +
        getTimeInseconds(40, 0) +
        getTravelTime(startingLocation) +
        getTravelTime(otherLocation) -
        timeDifferenceRemainder;
      setTimeLeft(time);
    }
  };

  // Run every
  setInterval(runEverySecond, 1000);

  const percentage = ((getTravelTime(shipLocation) - timeLeft) / getTravelTime(shipLocation)) * 100;
  const shipPeretage =
    shipStatus === ShipStatus.TRAVELLING
      ? shipLocation === ShipLocation.AUSTERA
        ? percentage
        : 100 - percentage
      : shipLocation === ShipLocation.AUSTERA
      ? 100
      : 0;

  return (
    <>
      <Box
        sx={{
          paddingTop: `${isMobile ? 20 : 10}%`,
        }}
      >
        {shipStatus === ShipStatus.TRAVELLING && <Travel location={shipLocation} timeLeft={timeLeft} />}
        {shipStatus === ShipStatus.DOCKED && <Docked location={shipLocation} timeLeft={timeLeft} />}
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h4">{ShipLocation.TWO_CROWNS}</Typography>
          <Typography variant="h4" sx={{ marginLeft: 'auto' }}>
            {ShipLocation.AUSTERA}
          </Typography>
        </Box>
        <Box sx={{ width: `${shipPeretage}%`, display: 'flex' }}>
          <SailingIcon
            sx={{
              fontSize: `${isMobile ? 100 : 200}`,
              marginLeft: 'auto',
            }}
          />
        </Box>
        <Box>
          {shipStatus === ShipStatus.TRAVELLING && <LinearProgress variant="determinate" value={shipPeretage} />}
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
