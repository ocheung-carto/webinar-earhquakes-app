// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const EARTHQUAKES_SOURCE_ID = 'earthquakesSource';

const source = {
  id: EARTHQUAKES_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw' /*use your connection name here*/,
  data: `carto-demo-data.demo_tables.spain_earthquakes` /*use your connection name here*/,
};

export default source;
