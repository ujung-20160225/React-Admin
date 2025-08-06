import stytles from "./index.module.less";

const Footer: React.FC = () => {
  return (
    <footer className={stytles.footer}>
      <div>
        <a
          href="https://github.com/ujung-20160225/React-Admin"
          target="_blank"
          rel="noreferrer"
        >
          React19+TS开发通用后台
        </a>
      </div>
      <div>
        Copyright JMOON©2025 企业级互联网大厂React18通用后台 All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
