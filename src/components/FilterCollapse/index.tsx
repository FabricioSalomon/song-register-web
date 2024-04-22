import React from "react";
import { Collapse } from "antd";

import { CollapseContainer } from "./styles";

const { Panel } = Collapse;

interface FilterCollapseProps {
  children: React.ReactNode;
  hasSearchParams?: boolean;
}

export function FilterCollapse({
  children,
  hasSearchParams = true,
}: Readonly<FilterCollapseProps>) {
  return (
    <CollapseContainer defaultActiveKey={hasSearchParams ? "1" : "0"}>
      <Panel key="1" header="Filter">
        {children}
      </Panel>
    </CollapseContainer>
  );
}
