import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import React from 'react';

import { Competition } from '../../../utils/interfaces';

interface Props {
  competition: Competition;
}
export const MainDetailTable = ({ competition }: Props) => {
  const { dateRange, location, registrationEndDate } = competition;
  const regDate = new Date(registrationEndDate);
  const regHours = regDate.getHours().toString().padStart(2, '0');
  const regMinutes = regDate.getMinutes().toString().padStart(2, '0');
  const regTime = `${regHours}:${regMinutes}`;
  const regEndDateString = `${regDate.toDateString()} ${regTime}`;
  const competititonDates = new Date(
    JSON.parse(dateRange).lower,
  ).toDateString();

  return (
    <Table aria-label="simple table">
      <TableBody>
        <TableRow>
          <TableCell>Start date</TableCell>
          <TableCell align="right">{competititonDates}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Location</TableCell>
          <TableCell align="right">{location}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Registration ends</TableCell>
          <TableCell align="right">{regEndDateString}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Location</TableCell>
          <TableCell align="right">{location}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
