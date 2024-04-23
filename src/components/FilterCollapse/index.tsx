import React from "react";
import { Collapse } from "antd";

import { CollapseContainer } from "./styles";

const { Panel } = Collapse;

interface FilterCollapseProps {
  disabled?: boolean;
  children: React.ReactNode;
  hasSearchParams?: boolean;
}

export function FilterCollapse({
  children,
  disabled = false,
  hasSearchParams = true,
}: Readonly<FilterCollapseProps>) {
  return (
    <CollapseContainer
      collapsible={disabled ? "disabled" : "header"}
      defaultActiveKey={hasSearchParams ? "1" : "0"}
    >
      <Panel key="1" header="Filter">
        {children}
      </Panel>
    </CollapseContainer>
  );
}
