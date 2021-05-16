/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { useTextField } from "@react-aria/textfield";
import { useProviderProps } from "@react-spectrum/provider";
import { TextFieldBase } from "@react-spectrum/textfield";
import React, { forwardRef, useRef } from "react";

function TextField(props, ref) {
  // eslint-disable-next-line no-param-reassign
  props = useProviderProps(props);

  const inputRef = useRef();
  const { labelProps, inputProps } = useTextField(props, inputRef);
  return (
    <TextFieldBase
      {...props}
      labelProps={labelProps}
      inputProps={inputProps}
      ref={ref}
      inputRef={inputRef}
    />
  );
}

/**
 * TextFields are text inputs that allow users to input custom text entries
 * with a keyboard. Various decorations can be displayed around the field to
 * communicate the entry requirements.
 */
const _TextField = forwardRef(TextField);
export { _TextField as TextField };
