import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, ThemeConfig } from "antd";
import { BrowserRouter } from "react-router-dom";
import React from "react";

import { GlobalHeader } from "./components/GlobalHeader";
import { useThemeContext } from "./context/Theme";
import { ProjectContainer } from "./styles";
import { AppRoutes } from "./routes";
import { Theme } from "./theme";

const queryClient = new QueryClient();

interface AppProps {
  onSelectTheme: (theme: Theme) => void;
}

export function App({ onSelectTheme }: Readonly<AppProps>) {
  const { colors, fontColor } = useThemeContext();

  const themeConfig: ThemeConfig = {
    token: {
      colorPrimary: colors.monochromatic.primary,
    },
    components: {
      Button: {
        primaryColor: fontColor,
        colorBgBase: colors.monochromatic.primary,
      },
      Collapse: {
        headerBg: colors.monochromatic.primary,
        colorBorder: colors.monochromatic.tertiary,
      },
      Form: {
        labelColor: fontColor,
      },
      Menu: {
        itemColor: fontColor,
        colorPrimary: fontColor,
        itemHoverColor: fontColor,
        itemSelectedColor: fontColor,
      },
      Modal: {
        contentBg: colors.shadow.secondary,
      },
      Pagination: {
        colorText: fontColor,
        colorTextDisabled: `${fontColor}55`,
      },
      Table: {
        headerBg: colors.monochromatic.primary,
        headerSortHoverBg: colors.shadow.tertiary,
        bodySortBg: colors.monochromatic.tertiary,
        headerSortActiveBg: colors.shadow.quaternary,
      },
      Typography: {
        colorText: fontColor,
      },
    },
  };

  return (
    <ProjectContainer xs={24}>
      <ConfigProvider theme={themeConfig}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <GlobalHeader onSelectTheme={onSelectTheme} />
            <AppRoutes />
          </QueryClientProvider>
        </BrowserRouter>
      </ConfigProvider>
    </ProjectContainer>
  );
}
