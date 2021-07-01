import { Chip } from '@material-ui/core';
import TextField from '@material-ui/core/TextField/TextField';
import React from 'react';

interface Props {
  onChange?: (chips: string[]) => void;
  value?: string[];
  label: string;
  splitters?: string[];
  emptyLabel?: string;
}

export const ChipInput = ({
  onChange,
  value = [],
  label,
  splitters,
  emptyLabel,
}: Props) => {
  // const [chips, setChips] = React.useState<string[]>(value)
  const [val, setVal] = React.useState<string>('');
  const split = splitters ?? [' ', ',', ';'];

  const addChip = () => {
    if (val.length === 0) return;
    let tempVal = val;
    if (!val.includes('kg')) {
      tempVal += 'kg';
    }

    if (!val.includes('+') && !val.includes('-')) {
      tempVal = '-' + tempVal;
    }
    const newChips = [...value, tempVal];
    onChange && onChange(newChips);
    setVal('');
  };

  const handleDelete = (index: number) => {
    const newChips = value.filter((_, i) => i !== index);
    onChange && onChange(newChips);
  };

  const change = (e: any) => {
    // TODO: rewrite to onkeypressed function with deletion working.
    // if letter is space or semicolon or comma, add a new chip of this content
    if (split.includes(e.target.value.slice(-1))) {
      addChip();
    } else {
      setVal(e.target.value);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <div>
        <TextField
          style={{ width: 100 }}
          value={val}
          label={label}
          onChange={change}
        />
      </div>

      <div style={{ marginLeft: '1em' }}>
        {value && value.length > 0
          ? value.map((chip, i) => (
              <Chip
                key={i}
                style={{ marginTop: 5 }}
                size="small"
                label={chip}
                onDelete={() => {
                  handleDelete(i);
                }}
              />
            ))
          : emptyLabel ?? ''}
      </div>
    </div>
  );
};
