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

import * as literal from '../../node_types/literal.mjs';
import * as wildcard from '../../node_types/wildcard.mjs';

export function getFields(node, indexPattern) {
  if (node.type === 'literal') {
    const fieldName = literal.toElasticsearchQuery(node);
    const field = indexPattern.fields.find(field => field.name === fieldName);
    if (!field) {
      return [];
    }
    return [field];
  } else if (node.type === 'wildcard') {
    const fields = indexPattern.fields.filter(field => wildcard.test(node, field.name));
    return fields;
  }
}
