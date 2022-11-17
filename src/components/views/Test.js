import { useEffect, useState } from 'react';
import { LOCATION_SIGNALS_LAYER_ID } from 'components/layers/TestLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';
import { Grid, Slider, Box } from '@material-ui/core';
import { MAP_TYPES } from '@deck.gl/carto';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  test: {},
}));

function getYears() {
  let marks = [];
  for (let i = 1; i < 5; i++) {
    marks.push({
      value: 2017+i,
      label: `Year ${2017+i}`,
    });
  }
  return marks;
}

function getMonths() {
  let marks = [];
  for (let i = 1; i < 31; i++) {
    marks.push({
      value: i,
      label: `Month ${i}`,
    });
  }
  return marks;
}

export default function Test() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2018);
  const markerYears = getYears();
  const markerMonths = getMonths();

  let parameter_source = {
    id: 'locationSignalsSource',
    type: MAP_TYPES.QUERY,
    connection: 'carto_dw',
    data: `SELECT * from \`carto-academy.developers.h3_signal_data\` WHERE month = @month AND year = @year`,
    queryParameters: {'month': month, 'year': year}
  };
  
  function changeYear(event, newValue) {
    if (year !== newValue) {
      parameter_source.queryParameters = {'year': newValue, 'month': month}
      dispatch(addSource(parameter_source));
      setYear(newValue);
    }
  }


  useEffect(() => {
    dispatch(addSource(parameter_source));

    dispatch(
      addLayer({
        id: LOCATION_SIGNALS_LAYER_ID,
        source: parameter_source.id,
      }),
    );

    return () => {
      dispatch(removeLayer(LOCATION_SIGNALS_LAYER_ID));
      dispatch(removeSource(parameter_source.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.importData}>
      <Grid style={{ height: '15%' }}>
        <h3 className={classes.title} variant='caption'>
          Legend
        </h3>
        <Box sx={{ width: '75%', height: '25%', margin: '5%' }} style={{background: 'linear-gradient(45deg, #9ccb86 30%, #e88471 90%)'}}> 
        </Box>
        <Grid container spacing={2} style={{ margin: '0.25%' }}>
          <Grid item xs={8}>
            -30
          </Grid>
          <Grid item xs={1}>
            -100
          </Grid>
        </Grid>
      </Grid>
      <Grid style={{ height: '25%' }}>
        <Slider
          style={{ height: '50%', marginLeft: '10%', marginTop: '30%' }}
          track={false}
          orientation='vertical'
          value={year}
          step={1}
          min={2018}
          onChange={changeYear}
          max={2021}
          valueLabelDisplay='auto'
          marks={markerYears}
        />
      </Grid>
    </Grid>
  );
}
