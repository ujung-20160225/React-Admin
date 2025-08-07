import { createRoot } from "react-dom/client";
import "./styles/theme.less";
import "./index.css";
import App from "./App";
// i18n
import "./locales/i18n";

const charAt = `
      ** ****     ****   *******     *******   ****     **
     /**/**/**   **/**  **/////**   **/////** /**/**   /**
     /**/**//** ** /** **     //** **     //**/**//**  /**
     /**/** //***  /**/**      /**/**      /**/** //** /**
     /**/**  //*   /**/**      /**/**      /**/**  //**/**
 **  /**/**   /    /**//**     ** //**     ** /**   //****
//***** /**        /** //*******   //*******  /**    //***
 /////  //         //   ///////     ///////   //      ///                                                                                                                                                     
`;
console.info(`%c${charAt}`, "color: #5BE49B");

createRoot(document.getElementById("root")!).render(<App />);
