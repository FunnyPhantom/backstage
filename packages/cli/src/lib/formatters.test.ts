/*
 * Copyright 2021 The Backstage Authors
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

import { standardJsonSchemaReplacer } from './formatters';

describe('removeRequiredConstraint', () => {
  // provided to function match function signature.
  const sampleKey = 'field1';

  it('The value remain intact if it is not object', () => {
    const numberValue = 42;
    const booleanValue = true;
    const stringValue = 'foo';

    expect(standardJsonSchemaReplacer(sampleKey, numberValue)).toBe(
      numberValue,
    );
    expect(standardJsonSchemaReplacer(sampleKey, booleanValue)).toBe(
      booleanValue,
    );
    expect(standardJsonSchemaReplacer(sampleKey, stringValue)).toBe(
      stringValue,
    );
  });

  it('The object stays intact if it does not have `type` field.', () => {
    const sampleObj = {
      foo1: 'bar',
      properties: {
        a: 'b',
        x: 'y',
      },
    };

    expect(standardJsonSchemaReplacer(sampleKey, sampleObj)).toEqual(sampleObj);
  });

  it('The object should be the same if there is field named `type` with value `object` but no `required` field', () => {
    const jsonSchema = {
      type: 'object',
      properties: {
        baseUrl: {
          type: 'string',
          visibility: 'frontend',
          description: 'The public absolute root URL that the frontend.',
        },
        title: {
          type: 'string',
          visibility: 'frontend',
          description:
            'The title of the app, as shown in the Backstage web interface.',
        },
      },
    };

    expect(standardJsonSchemaReplacer(sampleKey, jsonSchema)).toEqual(
      jsonSchema,
    );
  });

  it('The object should not have required field after being passed to replacer', () => {
    const jsonSchemaWithRequired = {
      type: 'object',
      required: ['baseUrl'],
      properties: {
        baseUrl: {
          type: 'string',
          description: 'The public absolute root URL that the frontend.',
        },
        title: {
          type: 'string',
          description:
            'The title of the app, as shown in the Backstage web interface.',
        },
      },
    };
    const jsonSchemaWithoutRequiredField = {
      type: 'object',
      properties: {
        baseUrl: {
          type: 'string',
          description: 'The public absolute root URL that the frontend.',
        },
        title: {
          type: 'string',
          description:
            'The title of the app, as shown in the Backstage web interface.',
        },
      },
    };

    expect(
      standardJsonSchemaReplacer(sampleKey, jsonSchemaWithRequired),
    ).toEqual(jsonSchemaWithoutRequiredField);
  });

  it('The value should be undefined if the key is visibility or deepVisibility', () => {
    const someValue = 42;
    const visibilityKey = 'visibility';
    const deepVisibilityKey = 'deepVisibility';

    expect(standardJsonSchemaReplacer(visibilityKey, someValue)).toBe(
      undefined,
    );
    expect(standardJsonSchemaReplacer(deepVisibilityKey, someValue)).toBe(
      undefined,
    );
  });

  it('For $schema field, it will output the jsonv7 schema', () => {
    const schemaValue = 'https://backstage.io/schema/config-v1';
    const schemaKey = '$schema';

    expect(standardJsonSchemaReplacer(schemaKey, schemaValue)).toBe(
      'http://json-schema.org/draft-07/schema#',
    );
  });

  it('In usage with JSON.stringify, it should remove all the required, visibility, and deepVisibility fields from the schema', () => {
    const spotifyConfigSchema = {
      $schema: 'https://backstage.io/schema/config-v1',
      title: 'Application Configuration Schema',
      type: 'object',
      required: [
        'apacheAirflow',
        'app',
        'azureDevOps',
        'backend',
        'costInsights',
        'gocd',
        'scorecards',
        'sentry',
        'techdocs',
      ],
      description:
        'This is the schema describing the structure of the app-config.yaml configuration file.',
      properties: {
        app: {
          deepVisibility: 'frontend',
          type: 'object',
          required: ['baseUrl'],
          description: 'Generic frontend configuration.',
          properties: {
            baseUrl: {
              type: 'string',
              visibility: 'frontend',
              description: 'The public absolute root URL that the frontend.',
            },
            title: {
              type: 'string',
              visibility: 'frontend',
              description:
                'The title of the app, as shown in the Backstage web interface.',
            },
            datadogRum: {
              type: 'object',
              description: 'Datadog RUM events configuration',
              required: ['clientToken', 'applicationId'],
              properties: {
                env: {
                  type: 'string',
                  visibility: 'frontend',
                  description: 'Environment for Datadog RUM events',
                },
                clientToken: {
                  type: 'string',
                  visibility: 'frontend',
                  description: 'clientToken for Datadog RUM events',
                },
                applicationId: {
                  type: 'string',
                  visibility: 'frontend',
                  description: 'applicationId for Datadog RUM events',
                },
                site: {
                  type: 'string',
                  visibility: 'frontend',
                  description: 'site for Datadog RUM events',
                },
              },
            },
          },
        },
      },
    };
    const jsonSchemaV7ConfigSchema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: 'Application Configuration Schema',
      type: 'object',
      description:
        'This is the schema describing the structure of the app-config.yaml configuration file.',
      properties: {
        app: {
          type: 'object',
          description: 'Generic frontend configuration.',
          properties: {
            baseUrl: {
              type: 'string',
              description: 'The public absolute root URL that the frontend.',
            },
            title: {
              type: 'string',
              description:
                'The title of the app, as shown in the Backstage web interface.',
            },
            datadogRum: {
              type: 'object',
              description: 'Datadog RUM events configuration',
              properties: {
                env: {
                  type: 'string',
                  description: 'Environment for Datadog RUM events',
                },
                clientToken: {
                  type: 'string',
                  description: 'clientToken for Datadog RUM events',
                },
                applicationId: {
                  type: 'string',
                  description: 'applicationId for Datadog RUM events',
                },
                site: {
                  type: 'string',
                  description: 'site for Datadog RUM events',
                },
              },
            },
          },
        },
      },
    };

    expect(
      JSON.parse(
        JSON.stringify(spotifyConfigSchema, standardJsonSchemaReplacer),
      ),
    ).toEqual(jsonSchemaV7ConfigSchema);
  });
});
