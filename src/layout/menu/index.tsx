import { Menu } from "antd";
import type { MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import { useStore } from "../../store";
import styles from "./index.module.less";
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { IMenu } from "../../types/api";

type MenuItem = Required<MenuProps>["items"][number];

// const items: MenuItem[] = [
//     { key: '/dashboard', icon: <HomeOutlined />, label: 'Dashboard' },
//     {
//         key: '/user',
//         label: '用户模块',
//         icon: <UsergroupDeleteOutlined />,
//         children: [
//             { key: '/userList', label: '用户列表', icon: <UserOutlined /> },
//             { key: '/menuList', label: '菜单管理', icon: <MailOutlined /> },
//             { key: '/roleList', label: '角色管理', icon: <SolutionOutlined /> },
//             { key: '/deptList', label: '部门管理', icon: <LaptopOutlined /> },
//         ],
//     },
// ];

const SideMenu = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [menuList, setMenuList] = useState<MenuItem[]>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { collapsed, isDark } = useStore();
  const data = useRouteLoaderData("layout");
  const menuClick = ({ key }: { key: string }) => {
    navigate(key);
    setSelectedKeys([key]);
  };

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
    } as MenuItem;
  }
  function createIcon(name?: string) {
    if (!name) return <></>;
    const customerIcons: { [key: string]: any } = Icons;
    const icon = customerIcons[name];
    if (!icon) return <></>;
    return React.createElement(icon);
  }

  const getTreeMenu = (menuList: IMenu[], treeList: MenuItem[] = []) => {
    menuList.forEach((item) => {
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons) {
          return treeList.push(
            getItem(item.menuName, item.path, createIcon(item.icon))
          );
        }
        treeList.push(
          getItem(
            item.menuName,
            item.path,
            createIcon(item.icon),
            getTreeMenu(item.children || [])
          )
        );
      }
    });
    return treeList;
  };

  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList);
    setMenuList(treeMenuList);
    setSelectedKeys([pathname]);
    // setMenuList():
  }, []);
  return (
    <div className={styles.navHeader}>
      <div className={styles.logo}>
        <img src="/imgs/vite.svg" className={styles.img} alt="" />
        {collapsed ? "" : <span>企业中台</span>}
      </div>
      <Menu
        mode="inline"
        theme={isDark ? "light" : "dark"}
        onClick={menuClick}
        inlineCollapsed={collapsed}
        selectedKeys={selectedKeys}
        items={menuList}
      />
    </div>
  );
};

export default SideMenu;
