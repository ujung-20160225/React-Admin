import { Layout, Watermark } from "antd";
import {
  Navigate,
  Outlet,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";
const { Sider } = Layout;
import api from "../api/index";
import styles from "./index.module.less";
import NavHeader from "./header";
import Footer from "./footer";
import SideMenu from "./menu";
import { useStore } from "../store";
import { router } from "../router";
import { searchRoute } from "../utils";
import { useEffect } from "react";
export default function LayoutCon() {
  const { collapsed, updateUserInfo } = useStore();
  const { pathname } = useLocation();
  useEffect(() => {
    getUserInfoData();
  }, []);
  const getUserInfoData = async () => {
    const data = await api.getUserInfo();
    updateUserInfo(data);
  };
  const data = useRouteLoaderData("layout");
  const staticPathList = ["/welcome", "/403", "/404"];

  const route = searchRoute(pathname, router);
  console.log(route, "-----");
  // pathname
  if (route && route.meta?.auth) {
    // 需要鉴权 处理自己的逻辑
  }
  if (
    !data.menuPathList.includes(pathname) &&
    !staticPathList.includes(pathname)
  ) {
    return <Navigate to="/403" />;
  }
  return (
    <Watermark content="JMOON">
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <SideMenu />
        </Sider>
        <Layout>
          <NavHeader />
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet />
            </div>
            <Footer></Footer>
          </div>
        </Layout>
      </Layout>
    </Watermark>
  );
}
