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

import React from 'react';
import {
  createExtension,
  coreExtensionData,
} from '@backstage/frontend-plugin-api';
import { SidebarPage } from '@backstage/core-components';

export const CoreLayout = createExtension({
  id: 'core.layout',
  at: 'root',
  inputs: {
    nav: {
      extensionData: {
        element: coreExtensionData.reactElement,
      },
    },
    content: {
      extensionData: {
        element: coreExtensionData.reactElement,
      },
    },
  },
  output: {
    element: coreExtensionData.reactElement,
  },
  factory({ bind, inputs }) {
    // TODO: Support this as part of the core system
    if (inputs.nav.length !== 1) {
      throw Error(
        `Extension 'core.layout' did not receive exactly one 'nav' input, got ${inputs.nav.length}`,
      );
    }
    if (inputs.content.length !== 1) {
      throw Error(
        `Extension 'core.layout' did not receive exactly one 'content' input, got ${inputs.content.length}`,
      );
    }

    bind({
      // TODO: set base path using the logic from AppRouter
      element: (
        <SidebarPage>
          {inputs.nav[0].element}
          {inputs.content[0].element}
        </SidebarPage>
      ),
    });
  },
});
