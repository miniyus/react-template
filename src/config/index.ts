import layouts from './layouts';
import permissions from './permissions';

export default () => ({
  app: {
    name: 'Test',
  },
  api: {
    host: process.env.REACT_APP_API_SERVER,
  },
  auth: {
    tokenKey: '_token',
    userKey: '_user',
    userTypes: [
      {
        name: '최고 관리자',
        value: '0',
      },
      {
        name: '관리자',
        value: '1',
      },
      {
        name: '크라우드 워커',
        value: '2',
      },
    ],
    permissions: permissions,
  },
  layouts: layouts,
});
