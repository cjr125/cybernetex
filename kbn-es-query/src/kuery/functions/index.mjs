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

import * as is from '@cybernetex/kbn-es-query/src/kuery/functions/is.mjs';
import * as and from '@cybernetex/kbn-es-query/src/kuery/functions/and.mjs';
import * as or from '@cybernetex/kbn-es-query/src/kuery/functions/or.mjs';
import * as not from '@cybernetex/kbn-es-query/src/kuery/functions/not.mjs';
import * as range from '@cybernetex/kbn-es-query/src/kuery/functions/range.mjs';
import * as exists from '@cybernetex/kbn-es-query/src/kuery/functions/exists.mjs';
import * as geoBoundingBox from '@cybernetex/kbn-es-query/src/kuery/functions/geo_bounding_box.mjs';
import * as geoPolygon from '@cybernetex/kbn-es-query/src/kuery/functions/geo_polygon.mjs';

export const functions = {
  is,
  and,
  or,
  not,
  range,
  exists,
  geoBoundingBox,
  geoPolygon,
};
