import React, { useState, useCallback } from 'react';
import { Button, InputItem, WingBlank, Toast } from 'antd-mobile';
import { useHistory } from 'umi';

import S from './index.less';

const Login = () => {
  const history = useHistory();
  const [loginParams, setLoginParams] = useState({
    account: '',
    password: '',
  });
  const isDisabled = !loginParams.account || !loginParams.password;

  const handleLogin = useCallback(() => {
    if (loginParams.account === 'admin' && loginParams.password === 'admin') {
      history.replace('/home');
    } else {
      Toast.fail('账号或密码错误');
    }
  }, [loginParams]);

  return (
    <WingBlank className={S.page}>
      <div className={S.title}>欢 迎</div>
      <div className={S.loginBox}>
        <InputItem
          placeholder="请输入账号 admin"
          value={loginParams.account}
          onInput={({ target }) =>
            setLoginParams(t => ({ ...t, account: target.value }))
          }
        ></InputItem>
        <InputItem
          type="password"
          placeholder="请输入密码 admin"
          value={loginParams.password}
          onInput={({ target }) =>
            setLoginParams(t => ({ ...t, password: target.value }))
          }
        ></InputItem>
      </div>
      <Button type="primary" disabled={isDisabled} onClick={handleLogin}>
        登 录
      </Button>
    </WingBlank>
  );
};
Login.title = '登录';
export default Login;
