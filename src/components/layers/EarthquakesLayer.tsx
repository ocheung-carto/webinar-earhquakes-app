import { useSelector } from 'react-redux';
// @ts-ignore
import { CartoLayer, colorContinuous } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { RootState } from 'store/store';
import GL from '@luma.gl/constants';

export const EARTHQUAKES_LAYER_ID = 'earthquakesLayer';

export default function EarthquakesLayer() {
  const { earthquakesLayer } = useSelector((state: RootState) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, earthquakesLayer?.source),
  );
  const cartoLayerProps = useCartoLayerProps({ source });

  if (earthquakesLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: EARTHQUAKES_LAYER_ID,
      getFillColor: colorContinuous({
        attr: 'depth',
        domain: [10, 20, 30, 40, 50, 60, 999],
        colors: 'Temps'
      }),
      pointRadiusUnits: 'pixels',
      getPointRadius: (d: any) => {return d.properties.magnitude},
      parameters: {
        blendFunc: [GL.SRC_ALPHA, GL.DST_ALPHA],
        blendEquation: GL.FUNC_ADD
      },
      pickable: true,
 
      onHover: (info: any) => {
        if (info?.object) {
          info.object = {
            // @ts-ignore
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
    });
  }
}
