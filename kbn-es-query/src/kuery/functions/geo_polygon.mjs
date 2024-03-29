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

import pkg from 'lodash';
const { get } = pkg;
import { nodeTypes } from '../node_types/index.mjs';
import * as ast from '@cybernetex/kbn-es-query/src/kuery/ast/index.mjs';

export function buildNodeParams(fieldName, points) {
  const fieldNameArg = nodeTypes.literal.buildNode(fieldName);
  const args = points.map((point) => {
    const latLon = `${point.lat}, ${point.lon}`;
    return nodeTypes.literal.buildNode(latLon);
  });

  return {
    arguments: [fieldNameArg, ...args],
  };
}

export function toElasticsearchQuery(node, indexPattern) {
  const [ fieldNameArg, ...points ] = node.arguments;
  const fieldName = nodeTypes.literal.toElasticsearchQuery(fieldNameArg);
  const field = get(indexPattern, 'fields', []).find(field => field.name === fieldName);
  const queryParams = {
    points: points.map(ast.toElasticsearchQuery)
  };

  if (field && field.scripted) {
    throw new Error(`Geo polygon query does not support scripted fields`);
  }

  return {
    geo_polygon: {
      [fieldName]: queryParams,
      ignore_unmapped: true,
    },
  };
}
