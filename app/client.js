import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import './config'
import routes from './routes'
import configure from './store/configureStore'
import myhistory from './history'
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

const store = configure({ config: global.$GLOBALCONFIG })
const history = syncHistoryWithStore(myhistory, store)
// history.listen(location => console.log('location:', location))
// history.listen(function (location) { return location })


ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Provider store={store}>
      <Router history={history}>
          { routes }
      </Router>
    </Provider>
  </LocaleProvider>,
 
  document.getElementById('root')
);
