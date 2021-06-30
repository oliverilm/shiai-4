import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { Box } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useState } from 'react';

import api from '../../../auth';
import {
  Category,
  CategoryInCompetition,
  Competition,
} from '../../../utils/interfaces';
import AddCategoryModal from './AddCategoryModal';

interface Props {
  weightClasses: CategoryInCompetition[] | null;
  competition: Competition;
  onAdd: any;
}

export const CategoriesTable = ({
  weightClasses,
  competition,
  onAdd,
}: Props) => {
  const [categories, setCategories] = useState<Category[]>();
  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      api.utils.categoryList().then(res => {
        setCategories(res.data);
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  // smaller first
  const sort = (a: CategoryInCompetition, b: CategoryInCompetition) =>
    parseInt(a.categoryObj.underValue, 10) -
    parseInt(b.categoryObj.underValue, 10);

  const renderClasses = () => {
    if (categories && weightClasses && weightClasses.length > 0) {
      return weightClasses.sort(sort).map(cl => {
        const { menWeights, womenWeights, unisexWeights, id } = cl;

        const isValidArr = (str: string): boolean => {
          try {
            const arr = JSON.parse(str).join('; ');
            return arr.length > 0;
          } catch (e) {
            return false;
          }
        };

        return (
          <TableBody key={id}>
            <RulesAccordion
              categories={categories}
              edit={cl}
              competition={competition}
              onAdd={onAdd}
            />

            {menWeights && isValidArr(menWeights) ? (
              <TableRow>
                <TableCell>M</TableCell>
                <TableCell colSpan={1} align="right">
                  {JSON.parse(menWeights).join('; ')}
                </TableCell>
              </TableRow>
            ) : (
              <></>
            )}
            {womenWeights && isValidArr(womenWeights) ? (
              <TableRow>
                <TableCell>W</TableCell>
                <TableCell colSpan={1} align="right">
                  {JSON.parse(womenWeights).join('; ')}
                </TableCell>
              </TableRow>
            ) : (
              <></>
            )}
            {unisexWeights && isValidArr(unisexWeights) ? (
              <TableRow>
                <TableCell>U</TableCell>
                <TableCell colSpan={1} align="right">
                  {JSON.parse(unisexWeights).join('; ')}
                </TableCell>
              </TableRow>
            ) : (
              <></>
            )}
          </TableBody>
        );
      });
    } else {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>No Categories to show</TableCell>
          </TableRow>
        </TableBody>
      );
    }
  };

  return (
    <Table aria-label="simple table">
      {renderClasses()}
      {categories && competition.isOwner ? (
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>
              <AddCategoryModal
                categories={categories}
                competition={competition}
                onAdd={onAdd}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <></>
      )}
    </Table>
  );
};

interface AccordionProps {
  categories: Category[];
  edit: CategoryInCompetition;
  competition: Competition;
  onAdd: () => void;
}

function RulesAccordion({
  categories,
  edit,
  competition,
  onAdd,
}: AccordionProps) {
  const [open, setOpen] = React.useState(false);
  const {
    startingYear,
    endingYear,
    amountOverAllowed,
    rules,
    categoryObj: { value },
  } = edit;

  return (
    <React.Fragment>
      <TableRow style={{ backgroundColor: '#3f51b5', color: '#fff' }}>
        <TableCell component="th" scope="row" style={{ color: '#fff' }}>
          {' '}
          {value} {startingYear} - {endingYear}
        </TableCell>
        <TableCell
          scope="row"
          style={{
            color: '#fff',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
          align="right"
        >
          <IconButton
            aria-label="expand row"
            color="inherit"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {competition.isOwner && (
            <AddCategoryModal
              categories={categories}
              edit={edit}
              competition={competition}
              onAdd={onAdd}
            />
          )}
        </TableCell>
      </TableRow>
      <TableRow style={{ backgroundColor: '#f2f2f2' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Rules</TableCell>
                    <TableCell>
                      {JSON.parse(rules)
                        .map((rule: string) => rule)
                        .join(', ')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Overweight</TableCell>
                    <TableCell>{amountOverAllowed}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
