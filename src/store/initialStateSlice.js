import { VOYAGER } from '@carto/react-basemaps';
import { API_VERSIONS } from '@deck.gl/carto';

export const initialState = {
  viewState: {
    latitude: 42.279042852502485,
    longitude: -74.31252686854945,
    zoom: 6,
    pitch: 0,
    bearing: 0,
    dragRotate: false,
  },
  basemap: VOYAGER,
  credentials: {
    apiVersion: API_VERSIONS.V3,
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
    accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfa2hpdnRreGkiLCJqdGkiOiIyNmZkMzNiNSJ9.OoXufaTjPXrifu6gvP2NBAWh0_TBsa5jFRRAG_au2YA'
  },
  googleApiKey: '', // only required when using a Google Basemap
  googleMapId: '', // only required when using a Google Custom Basemap
};
