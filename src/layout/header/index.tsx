import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Dropdown, Button, Switch } from "antd";
import storage from "../../utils/storage";
import type { MenuProps } from "antd";
import styles from "./index.module.less";
import { useStore } from "../../store";
import Breadcrumb from "./Breadcrumb";
import i18n from "../../locales/i18n";
import { useEffect, useState } from "react";

export default function NavHeader() {
  const [currentLanguage, setCurrentLanguage] = useState<string>("zh-CN");
  useEffect(() => {
    const localLanguage = localStorage.getItem("i18nextLng") as string;
    setCurrentLanguage(localLanguage);
  }, []);
  const handleChangeLanguage = () => {
    const nowLanguage = localStorage.getItem("i18nextLng") as string;
    let val = "";
    if (nowLanguage == "zh") {
      val = "en";
      setCurrentLanguage(val);
    } else {
      val = "zh";
      setCurrentLanguage(val);
    }
    i18n.changeLanguage(val);
  };
  const { collapsed, updateCollapsed, isDark, updateTheme } = useStore();
  const items: MenuProps["items"] = [
    {
      key: "email",
      label: "邮箱：jiamy1@gmail.com",
    },
    {
      key: "logout",
      label: "退出",
    },
  ];

  const onClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      // 退出登录
      storage.remove("token");
      window.location.href = "/login";
    }
  };
  const toggleCollapsed = () => {
    updateCollapsed();
  };
  const handlerSwitch = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.dataset.theme = "light";
      document.documentElement.classList.remove("dark");
    }
    updateTheme(isDark);
  };
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Breadcrumb />
      </div>
      <div className={styles.right}>
        {currentLanguage == "en" ? (
          <img src="/imgs/lang-en.svg" alt="" onClick={handleChangeLanguage} />
        ) : (
          <img src="/imgs/lang-zh.svg" alt="" onClick={handleChangeLanguage} />
        )}
        <Switch
          checkedChildren="暗黑"
          unCheckedChildren="默认"
          checked={isDark}
          onChange={handlerSwitch}
        />
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          <span className={styles.nickName}>JMOON</span>
        </Dropdown>
      </div>
    </div>
  );
}
