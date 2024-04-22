import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Root, createRoot } from "react-dom/client";

import { App } from "./App";
import { Theme, theme } from "./theme";

const container = document.getElementById("root") as HTMLElement;
const root: Root = createRoot(container);

const CustomApp = (): React.JSX.Element => {
  const storageTheme = localStorage.getItem("theme");

  const [selectedTheme, setSelectedTheme] = useState<Theme>(
    storageTheme === Theme.LIGHT ? Theme.LIGHT : Theme.DARK
  );

  function handleSelectTheme(selected: Theme) {
    setSelectedTheme(selected);
    localStorage.setItem("theme", selected);
  }

  return (
    <ThemeProvider theme={theme[selectedTheme]}>
      <App onSelectTheme={handleSelectTheme} />
    </ThemeProvider>
  );
};

root.render(<CustomApp />);
