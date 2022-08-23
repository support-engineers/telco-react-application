import { MAP_TYPES } from '@deck.gl/carto';

const TEST_SOURCE_ID = 'testSource';

const source = {
  id: TEST_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'abachiller-bq',
  data: `cartodb-on-gcp-strategic-sol.ghidalgo.political_legislative_districts_usa_congress_2022`,
};

export default source;
