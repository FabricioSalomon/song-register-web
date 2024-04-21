import React from "react";
import { Root, createRoot } from "react-dom/client";

import { App } from "./App";

const container = document.getElementById("root") as HTMLElement;
const root: Root = createRoot(container);

root.render(<App />);
