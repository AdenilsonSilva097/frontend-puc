import React from "react";

import Modal from "../../atoms/Modal";
import Sidebar from "../Sidebar";

interface SidebarMobileProps {
  onClose: () => void
}

const SidebarMobile: React.FC<SidebarMobileProps> = ({ onClose }) => (
  <Modal id="sidebarMobile" overlay onClose={onClose}>
    <Sidebar />
  </Modal>
);

export default SidebarMobile;
