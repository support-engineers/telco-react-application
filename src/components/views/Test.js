import { useEffect } from 'react';
import testSource from 'data/sources/testSource';
import { TEST_LAYER_ID } from 'components/layers/TestLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  test: {},
}));

export default function Test() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(testSource));

    dispatch(
      addLayer({
        id: TEST_LAYER_ID,
        source: testSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(TEST_LAYER_ID));
      dispatch(removeSource(testSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.test}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
