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
//
export const removeRequiredConstraint = (_: any, value: any): any => {
  if (
    typeof value === 'object' &&
    value.type === 'object' &&
    value.hasOwnProperty('required')
  ) {
    delete value.required;
  }
  return value;
};
