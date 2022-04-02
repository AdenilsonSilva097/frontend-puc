import React from "react";

import { Outlet } from "react-router-dom";

import {
  PageContentContainer,
  PageContentTitle,
  PageContentMenus,
  PageContentMenu,
  PageContentChildrens,
  PageContentMenusIdentifier
} from "./styles";

interface PageContentProps {
  title: string,
  menus?: {
    id: string,
    name: string,
    link: string
  }[]
}

const PageContent: React.FC<PageContentProps> = ({ title, menus, children }) => (
  <PageContentContainer>
    <PageContentTitle>{title}</PageContentTitle>
    <PageContentMenus>
      {menus ? menus.map(({ id, name, link }) => (
        <PageContentMenu
          key={`${id}_${name}`}
          id={id}
          to={link}
        >
          <span>{name}</span>
          <PageContentMenusIdentifier />
        </PageContentMenu>
      )) : null}
    </PageContentMenus>
    <PageContentChildrens>
      {!children ? <Outlet /> : children}
    </PageContentChildrens>
  </PageContentContainer>
);

PageContent.defaultProps = {
  menus: []
};

export default PageContent;
