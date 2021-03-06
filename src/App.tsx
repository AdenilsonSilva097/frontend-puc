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
import Sector from "./organisms/Sector";
import Collaborator from "./organisms/Collaborator";
import GenerateReceipts from "./organisms/GenerateReceipts";

import Dashboard from "./pages/Dashboard";
import Issue from "./pages/Issue";
import Messenger from "./pages/Messenger";
import Permissions from "./pages/Permissions";
import Registers from "./pages/Registers";
import Reports from "./pages/Reports";

import GlobalStyle from "./styles/global";
import { themeAtom } from "./styles/themes";
import { useWindowSize } from "./hooks/useWindowSize";
import ReceiptsIssued from "./organisms/ReceiptsIssued";
import MessengerReceipts from "./organisms/MessengerReceipts";
import Itinerary from "./molecules/Itinerary";
import MessengerReport from "./molecules/MessengerReport";
import ReceiptsPerStatus from "./atoms/ReceiptsPerStatus";
import DonorsPerMostFavorableDate from "./atoms/DonorsPerMostFavorableDate";
import CollaboratorsPerPosition from "./atoms/CollaboratorsPerPosition";

interface PrivateRouteProps {
  redirectTo: string;
  children: JSX.Element;
}

const PrivateRoute = ({ redirectTo, children }: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem("@user") !== null;

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

function App() {

  const size = useWindowSize();
  const [theme] = useAtom(themeAtom);
  const [isMobile, setIsMobile] = React.useState(false);

  const loggedUser = JSON.parse(localStorage.getItem("@user")!);

  React.useEffect(() => {
    setIsMobile(size.width < 768);
  }, [size]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={!loggedUser ? <Login /> : <Navigate to="/office/dashboard" />} />
          <Route path="register" element={<SignUp />} />
          <Route path="office" element={<PrivateRoute redirectTo="/">{isMobile ? <OfficeMobile /> : <Office />}</PrivateRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="registers" element={<Registers />}>
              <Route path="donor" element={<Donor />} />
              <Route path="collaborator" element={<Collaborator />} />
              <Route path="sector" element={<Sector />} />
            </Route>
            <Route path="issue" element={<Issue />}>
              <Route path="newIssue" element={<GenerateReceipts />} />
              <Route path="issued" element={<ReceiptsIssued />} />
            </Route>
            <Route path="reports" element={<Reports />}>
              <Route path="receiptsReport" element={<ReceiptsPerStatus />} />
              <Route path="donorsPerMostFavorableDate" element={<DonorsPerMostFavorableDate />} />
              <Route path="collaboratorsPerPosition" element={<CollaboratorsPerPosition />} />
            </Route>
            <Route path="messenger" element={<Messenger />}>
              <Route path="messengerReceipts" element={<MessengerReceipts />} />
              <Route path="messengerReport" element={<MessengerReport />} />
              <Route path="messengerIntinerary" element={<Itinerary />} />
            </Route>
            <Route path="permissions" element={<Permissions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
