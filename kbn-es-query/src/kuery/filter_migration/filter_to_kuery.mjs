/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { nodeTypes } from '@cybernetex/kbn-es-query/src/kuery/node_types/index.mjs';
import { convertPhraseFilter } from '@cybernetex/kbn-es-query/src/kuery/filter_migration/phrase.mjs';
import { convertRangeFilter } from '@cybernetex/kbn-es-query/src/kuery/filter_migration/range.mjs';
import { convertExistsFilter } from '@cybernetex/kbn-es-query/src/kuery/filter_migration/exists.mjs';
import { convertGeoBoundingBox } from '@cybernetex/kbn-es-query/src/kuery/filter_migration/geo_bounding_box.mjs';
import { convertGeoPolygon } from '@cybernetex/kbn-es-query/src/kuery/filter_migration/geo_polygon.mjs';

const conversionChain = [
  convertPhraseFilter,
  convertRangeFilter,
  convertExistsFilter,
  convertGeoBoundingBox,
  convertGeoPolygon,
];

export function filterToKueryAST(filter) {
  const { negate } = filter.meta;

  const node = conversionChain.reduce((acc, converter) => {
    if (acc !== null) return acc;

    try {
      return converter(filter);
    }
    catch (ex) {
      return null;
    }
  }, null);

  if (!node) {
    throw new Error(`Couldn't convert that filter to a kuery`);
  }

  return negate ? nodeTypes.function.buildNode('not', node) : node;
}
