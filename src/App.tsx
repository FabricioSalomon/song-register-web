import { ConfigProvider } from "antd";
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Routes from "./routes";
import { Theme, theme } from "./theme";
import { ProjectContainer } from "./styles";
import { GlobalHeader } from "./components/GlobalHeader";

const queryClient = new QueryClient();

export function App() {
  const storageTheme = localStorage.getItem("theme");
  const initialTheme: Theme =
    storageTheme === Theme.DARK ? Theme.DARK : Theme.LIGHT;
  const [selectedTheme, setSelectedTheme] = useState<Theme>(initialTheme);

  function handleSelectTheme(selected: Theme) {
    setSelectedTheme(selected);
    localStorage.setItem("theme", selected);
  }

  return (
    <ThemeProvider theme={theme[selectedTheme]}>
      <ProjectContainer xs={24}>
        <ConfigProvider>
          <QueryClientProvider client={queryClient}>
            <GlobalHeader onSelectTheme={handleSelectTheme} />
            <Routes />
          </QueryClientProvider>
        </ConfigProvider>
      </ProjectContainer>
    </ThemeProvider>
  );
}
