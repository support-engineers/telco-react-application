import { useSelector } from 'react-redux';
import { CartoLayer,colorContinuous } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const LOCATION_SIGNALS_LAYER_ID = 'testLayer';

export default function TestLayer() {
  const { testLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, testLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (testLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: LOCATION_SIGNALS_LAYER_ID,
      geoColumn: 'h3',
      aggregationExp: 'AVG(avg_dbm) as avg_dbm',
      getFillColor: colorContinuous({
        attr: 'avg_dbm',
        domain: [-40, -50, -60, -70, -80, -90 ,-100],
        colors: 'Temps'
      }),
      extruded: false,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
    });
  }
}
