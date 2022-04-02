import React from "react";
import { useAtom } from "jotai";
import {
  BrowserRouter, Routes, Route, Navigate
} from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Login from "./pages/Login";
import Office from "./pages/Office";
import SignUp from "./pages/SignUp";
import OfficeMobile from "./pages/OfficeMobile";

import Donor from "./organisms/Donor";

import Dashboard from "./pages/Dashboard";
import Issue from "./pages/Issue";
import Messenger from "./pages/Messenger";
import Permissions from "./pages/Permissions";
import Registers from "./pages/Registers";
import Reports from "./pages/Reports";

import isMoblie from "./helpers/IsMobile";

import GlobalStyle from "./styles/global";
import { themeAtom } from "./styles/themes";

interface PrivateRouteProps {
  redirectTo: string;
  children: JSX.Element;
}

const PrivateRoute = ({ redirectTo, children }: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem("@user") !== null;

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

function App() {

  const [theme] = useAtom(themeAtom);

  const loggedUser = JSON.parse(localStorage.getItem("@user")!);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={!loggedUser ? <Login /> : <Navigate to="/office/dashboard" />} />
          <Route path="register" element={<SignUp />} />
          <Route path="office" element={<PrivateRoute redirectTo="/">{isMoblie() ? <OfficeMobile /> : <Office />}</PrivateRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="registers" element={<Registers />}>
              <Route path="donor" element={<Donor />} />
              <Route path="colaborator" element={<div>Cadastro de colaborador</div>} />
              <Route path="sector" element={<div>Cadastro de setor</div>} />
            </Route>
            <Route path="issue" element={<Issue />}>
              <Route path="newIssue" element={<div>Emissão de novos recibos</div>} />
              <Route path="issued" element={<div>Visualizar recibos emitidos</div>} />
            </Route>
            <Route path="reports" element={<Reports />} />
            <Route path="messenger" element={<Messenger />} />
            <Route path="permissions" element={<Permissions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
