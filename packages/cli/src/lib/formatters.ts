/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// The any is the signature of the replacer function for JSON.stringify's second argument.

/**
 * This function will make the json serialized version of the schema adhere to jsonSchemaV7 standard
 * in order to be published at [Schema Store](https://www.schemastore.org/json/)
 * @param key the key of the field
 * @param value value of the field being serialized
 * @returns undefined if the value should not be present. Returns the rest of the serializable object.
 */
export const standardJsonSchemaReplacer = (key: any, value: any): any => {
  if (key === 'visibility' || key === 'deepVisibility') {
    return undefined;
  }

  if (key === '$schema') {
    return 'http://json-schema.org/draft-07/schema#';
  }

  if (
    typeof value === 'object' &&
    value.type === 'object' &&
    value.hasOwnProperty('required')
  ) {
    delete value.required;
  }

  return value;
};
