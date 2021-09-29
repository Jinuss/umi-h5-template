import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'umi';
import { TabBar, ActivityIndicator } from 'antd-mobile';

import S from './index.less';
import { useState } from 'react';

const TABBARS = [
  {
    title: '首页',
    icon: (
      <div
        style={{
          width: '22px',
          height: '22px',
          background:
            'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
        }}
      />
    ),
    selectedIcon: (
      <div
        style={{
          width: '22px',
          height: '22px',
          background:
            'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
        }}
      />
    ),
    path: '/home',
  },
  {
    title: '我的',
    icon: (
      <div
        style={{
          width: '22px',
          height: '22px',
          background:
            'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
        }}
      />
    ),
    selectedIcon: (
      <div
        style={{
          width: '22px',
          height: '22px',
          background:
            'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
        }}
      />
    ),
    path: '/mine',
  },
];

// 包裹全局的布局，可以统一处理全局逻辑
export default props => {
  const location = useLocation();
  const history = useHistory();

  const [showPageLoading, setShowPageLoading] = useState(false);

  const showTabbar = TABBARS.find(item => item.path === location.pathname);
  useEffect(() => {
    if (location.pathname) {
      setShowPageLoading(true);
      setTimeout(() => setShowPageLoading(false), 500);
    }
    return () => {};
  }, [location]);
  return (
    <div className={S.layout}>
      {/* 路由切换时的整页 loading ，若不需要直接删除 */}
      {showPageLoading && (
        <div className={S.fullLoading}>
          <ActivityIndicator size="large" />
        </div>
      )}

      {/* 不展示tabbar */}
      {!showTabbar && props.children}
      {/* 展示tabbar */}
      {showTabbar && (
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={!TABBARS.find(item => item.path === location.pathname)}
        >
          {TABBARS.map(item => (
            <TabBar.Item
              title={item.title}
              key={item.path}
              icon={item.icon}
              selectedIcon={item.selectedIcon}
              selected={location.pathname === item.path}
              onPress={() => history.replace(item.path)}
            >
              <div className={S.tabbarItem}>{props.children}</div>
            </TabBar.Item>
          ))}
        </TabBar>
      )}
    </div>
  );
};
