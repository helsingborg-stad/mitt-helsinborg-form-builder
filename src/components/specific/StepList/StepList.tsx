import React, { useEffect } from 'react';
import { Step, ListItem } from '../../../types/FormTypes';
// import Nestable, { Item } from 'react-nestable';
import { Item } from 'react-nestable';
import Nestable from '../../../nestable/Nestable';
import { Button, createStyles, IconButton, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { ExpandMore, ExpandLess, Clear, FileCopy } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(2),
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    selected: {
      backgroundColor: 'white',
      color: 'black',
    },
    floatRight: {
      float: 'right',
    },
    iconButtons: {
      width: '100px',
    },
    row: {
      display: 'table',
    },
    col: {
      display: 'table-cell',
    },
    colCenter: {
      display: 'table-cell',
      width: '100%',
    },
  }),
);
interface Props {
  steps: Step[];
  count?: number;
  deleteStep: (id: string) => void;
  copyStep: (id: string) => Step;
  addStep: () => Step;
  selectedStepId: string;
  selectStep: (id: string) => void;
  stepStructure: ListItem[];
  setStepStructure: (
    steps: Step[],
    items: ListItem[] | ((prevState: ListItem[]) => ListItem[]),
    updateMatrix?: boolean,
  ) => void;
}

const StepList: React.FC<Props> = ({
  steps,
  deleteStep,
  copyStep: cpStep,
  addStep: aStep,
  selectedStepId,
  selectStep,
  stepStructure,
  setStepStructure,
}: Props) => {
  const classes = useStyles();

  useEffect(() => {
    const recursiveReplace = (titles: Record<string, string>, item: ListItem): ListItem => {
      return {
        id: item.id,
        text: titles[item.id] || 'Unnamed',
        children: item?.children ? item.children.map((i) => recursiveReplace(titles, i)) : [],
        group: item.group,
      };
    };

    if (steps && stepStructure.length === 0) {
      setStepStructure(
        steps,
        steps.map((step) => {
          return { id: step.id || '', text: step.title !== '' ? step.title : 'Unnamed', group: uuidv4() };
        }),
        true,
      );
    } else {
      const titles = steps.reduce((acc: Record<string, string>, curr: Step) => {
        acc[curr.id] = curr.title === '' ? 'Unnamed' : curr.title;
        return acc;
      }, {});
      const newStepStruct = stepStructure.map((s) => recursiveReplace(titles, s));
      setStepStructure(steps, newStepStruct);
    }
  }, [steps]);

  const delStep = (item: Item) => (e: React.MouseEvent) => {
    e.stopPropagation();
    selectStep('');

    const recursiveDelete = (i: ListItem): ListItem[] => {
      if (item.id === i.id) {
        return i?.children || [];
      }
      if (i.children) {
        return [{ id: i.id, group: i.group, text: i.text, children: i.children.flatMap((e) => recursiveDelete(e)) }];
      }
      return [];
    };
    const newStepStruct = stepStructure.flatMap((i) => recursiveDelete(i));
    setStepStructure(steps, newStepStruct, true);
    deleteStep(item.id);
  };

  const copyStep = (item: Item) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStep = cpStep(item.id);
    const newSteps = [...stepStructure, { id: newStep?.id || '', text: newStep.title, group: uuidv4() }];
    setStepStructure([...steps, newStep], newSteps, true);
  };
  const addStep = () => {
    const newStep = aStep();
    const newSteps = [
      ...stepStructure,
      { id: newStep?.id || '', text: newStep.title === '' ? 'Unnamed' : newStep.title, group: uuidv4() },
    ];
    setStepStructure([...steps, newStep], newSteps, true);
  };
  const toggleSelection = (item: Item) => () => {
    selectStep(item.id);
  };
  const renderItem = ({ item, collapseIcon }: { item: Item; collapseIcon: React.ReactNode }) => {
    return (
      <div>
        <Paper
          style={{ minHeight: '40px', padding: '8px' }}
          className={selectedStepId === item.id ? classes.selected : ''}
        >
          <div className="row">
            <span className={classes.col}>{collapseIcon}</span>
            <span onClick={toggleSelection(item)} className={classes.colCenter}>
              {item.text}
            </span>
            <div className={`${classes.col}`} style={{ width: 30 }}>
              <IconButton color="primary" onClick={copyStep(item)}>
                <FileCopy />
              </IconButton>
            </div>
            <div className={`${classes.col}`} style={{ width: 30 }}>
              <IconButton color="secondary" onClick={delStep(item)}>
                <Clear />
              </IconButton>
            </div>
          </div>
        </Paper>
      </div>
    );
  };
  const renderCollapseIcon = ({ isCollapsed }: { isCollapsed: boolean }) =>
    isCollapsed ? <ExpandMore /> : <ExpandLess />;

  return (
    <div>
      <Paper
        className={selectedStepId === '' ? classes.selected : ''}
        style={{ minHeight: '40px' }}
        onClick={() => selectStep('')}
      >
        <Typography style={{ paddingTop: '8px', paddingLeft: '5px' }}>Form data</Typography>
      </Paper>
      <Typography variant="h6">Steps</Typography>
      <Nestable
        items={stepStructure}
        renderItem={renderItem}
        maxDepth={3}
        renderCollapseIcon={renderCollapseIcon}
        onChange={(items: ListItem[]) => {
          setStepStructure(steps || [], items, true);
        }}
      />
      <Button className={classes.button} variant="contained" color="primary" onClick={addStep}>
        Add step
      </Button>
    </div>
  );
};

export default StepList;
