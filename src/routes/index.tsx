import React from "react";
import { Route, Routes } from "react-router-dom";

import * as Pages from "@/pages";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route path="authors" element={<Pages.Authors />} />
      <Route path="keywords" element={<Pages.Keywords />} />
      <Route path="song-register" element={<Pages.SongRegister />} />
    </Routes>
  );
}
