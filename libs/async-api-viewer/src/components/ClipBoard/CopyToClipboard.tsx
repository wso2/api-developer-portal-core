/*
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses.
 * For specific language governing the permissions and limitations under
 * this license, please see the license as well as any agreement you’ve
 * entered into with WSO2 governing the purchase of this software and any
 * associated services.
 */

import { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import copy from 'clipboard-copy';

interface ChildProps {
  copy: (content: any) => void;
}
interface IProps {
  title: string;
  onKeyCopy: (copy: ChildProps) => React.ReactElement<any>;
}

export default function CopyToClipboard(props: IProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { title, onKeyCopy } = props;

  const onCopy = (content: any) => {
    copy(content);
    setShowTooltip(true);
  };

  const handleOnTooltipClose = () => {
    setShowTooltip(false);
  };

  return (
    <Tooltip
      open={showTooltip}
      title={title}
      leaveDelay={1000}
      onClose={handleOnTooltipClose}
      tabIndex={-1}
    >
      {onKeyCopy({ copy: onCopy }) as React.ReactElement<any>}
    </Tooltip>
  );
}
