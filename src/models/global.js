import { useState } from 'react';

// 全局的 model ，使用 hooks 规范 https://umijs.org/zh-CN/plugins/plugin-model
export default function useGlobalModel() {
  const [globalData, setGglobalData] = useState(null);
  return {
    globalData,
    setGglobalData,
  };
}
