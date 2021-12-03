// @ts-ignore
import { MAP_TYPES } from '@deck.gl/carto';

const EARTHQUAKES_SOURCE_ID = 'earthquakesSource';

const source = {
  id: EARTHQUAKES_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: '' /*use your connection name here*/,
  data: '' //use your table name here,
};

export default source;
