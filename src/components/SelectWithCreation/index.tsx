import React from "react";
import { Col, Row, Select, SelectProps } from "antd";

import { OptionType } from "./types";
import { OptionsMenuWithCreation } from "./OptionsMenuWithCreation";

interface BaseInterface {
  id: string;
  name: string;
}

interface SelectWihCreationProps<T extends BaseInterface> extends SelectProps {
  selectOptions?: T[];
  creatingData?: boolean;
  allowCreation?: boolean;
  onCreate?: (name: string) => void;
}

export function SelectWithCreation<T extends BaseInterface>({
  loading,
  disabled,
  onCreate,
  creatingData,
  selectOptions,
  allowCreation = false,
  ...props
}: Readonly<SelectWihCreationProps<T>>) {
  function handleCreate(name: string) {
    if (onCreate) {
      onCreate(name);
    }
  }

  function filterOption(
    input: string,
    option: OptionType | undefined
  ): boolean {
    if (!option?.label) {
      return false;
    }
    return (option.label.toLowerCase() ?? "").includes(input.toLowerCase());
  }

  function showDropdownRender(optionsMenu: React.ReactNode): JSX.Element {
    if (!allowCreation) {
      return (
        <Row>
          <Col xs={24}>{optionsMenu}</Col>
        </Row>
      );
    }
    return (
      <OptionsMenuWithCreation
        optionsMenu={optionsMenu}
        creatingData={creatingData}
        onCreate={handleCreate}
      />
    );
  }

  if (loading || disabled) {
    return <Select {...props} disabled value={undefined} />;
  }

  return (
    <Select
      {...props}
      filterOption={filterOption}
      dropdownRender={(optionsMenu) => showDropdownRender(optionsMenu)}
      options={selectOptions?.map(({ id, name }) => ({
        label: name,
        value: id,
      }))}
    />
  );
}
