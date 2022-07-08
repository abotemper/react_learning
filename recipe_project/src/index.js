import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider >
      <App />
    </ThemeProvider>
  </React.StrictMode>
);


//如果想要组件之间共享状态就要用usecontext，而无需手动一个一个在多个父孙之间传递prop。
//必须要创建一个对象先xxxxxContext= createContext
//然后用.Provider方法把app包裹起来， 比如themeContext.Provider value ={}传递一个共享的state
//里面可以包括改变state的函数

