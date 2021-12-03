import { useEffect } from 'react';
import earthquakesSource from 'data/sources/earthquakesSource';
import { EARTHQUAKES_LAYER_ID } from 'components/layers/EarthquakesLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { GroupDateTypes } from "@carto/react-core";

import { Divider } from '@material-ui/core';
import { AggregationTypes } from '@carto/react-core';
import { FormulaWidget, CategoryWidget, HistogramWidget, TimeSeriesWidget } from '@carto/react-widgets';
import { numberFormatter } from 'utils/formatter';

const useStyles = makeStyles(() => ({
  earthquakes: {},
}));

export default function Earthquakes() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(earthquakesSource));

    dispatch(
      addLayer({
        id: EARTHQUAKES_LAYER_ID,
        source: earthquakesSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(EARTHQUAKES_LAYER_ID));
      dispatch(removeSource(earthquakesSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.earthquakes}>
      <Grid item>
      <FormulaWidget
          id='totalEarthquakes'
          title='Total number of earthquakes'
          dataSource={earthquakesSource.id}
          column='event'
          operation={AggregationTypes.COUNT}
          formatter={numberFormatter}
        />
      <FormulaWidget
          id='avgMagnitude'
          title='Average magnitude'
          dataSource={earthquakesSource.id}
          column='magnitude'
          operation={AggregationTypes.AVG}
          formatter={numberFormatter}
        />
      <FormulaWidget
        id='avgDepth'
        title='Average depth'
        dataSource={earthquakesSource.id}
        column='depth'
        operation={AggregationTypes.AVG}
        formatter={numberFormatter}
      />
        <CategoryWidget
          id='earthquakesLocation'
          title='Location'
          dataSource={earthquakesSource.id}
          column='location'
          operationColumn='event'
          operation={AggregationTypes.COUNT}
          formatter={numberFormatter}
        />

      <HistogramWidget
          id='histogramEarthquakes'
          title='Magnitude histogram'
          ticks={[0,1,2,3,4,5,6]}
          dataSource={earthquakesSource.id}
          column='magnitude'
          operation={AggregationTypes.COUNT}
          formatter={numberFormatter}
          />

      <TimeSeriesWidget
          id="events"
          title="Events timeseries"
          dataSource={earthquakesSource.id}
          column="time"
          stepSize={GroupDateTypes.MONTHS}
          stepSizeOptions={[GroupDateTypes.YEARS,GroupDateTypes.MONTHS,GroupDateTypes.WEEKS, GroupDateTypes.DAYS]}
        />


      </Grid>
    </Grid>
  );
}
