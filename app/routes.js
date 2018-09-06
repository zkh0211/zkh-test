import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./containers/App";
import Master from "./pages/master/master";
import Login from "./containers/App/login/login";
import Portal from "./pages/portal/portal";
import Cookies from "js-cookie";
import traceOfSource from "./pages/traceOfSource/traceOfSource";
import CommanderScreen from './pages/commanderScreen/commanderScreen'
import FreeLogin from './pages/freeLogin/freeLogin'
import TestLogin from './containers/App/testLogin'
import OffLine from './containers/App/offLine'

// // 登录
// const login = (location, cb) => {
//   require.ensure([], require => {
//     cb(null, require('./containers/App/login').default)
//   }, 'login')
// }
// 登录
// const loginMine = (location, cb) => {
//   require.ensure([], require => {
//     cb(null, require('./containers/App/login/login').default)
//   }, 'loginMine')
// }

// 门户页
const home = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/home/home").default);
    },
    "home"
  );
};

// 重定向
const redirect = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./containers/App/redirect").default);
    },
    "redirect"
  );
};

// 重定向
const goToolbox = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./containers/App/goToolbox").default);
    },
    "goToolbox"
  );
};

// 重定向
const goHecheng = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./containers/App/goHecheng").default);
    },
    "goHecheng"
  );
};
// 门户
// const Portal = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('./pages/portal/portal').default)
//     }, 'portal')
// }

// Master
// const syntheticInfo = (location, cb) => {
//   require.ensure(
//     [],
//     require => {
//       cb(null, require("./pages/syntheticInfo/syntheticInfo").default);
//     },
//     "syntheticInfo"
//   );
// };

/* 进入路由的判断*/
function isLogin(nextState, replaceState) {
  const token = Cookies.get("token");
  if (!token) {
    replaceState("/login");
    // hashHistory.push('/login')
  }
}



//master
const master = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/master/master").default);
    },
    "master"
  );
};

//averagePolice
const averagePolice = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/averagePolice/averagePolice").default);
    },
    "averagePolice"
  );
};

//reportWord

const reportWord = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/reportWord/reportWord").default);
    },
    "reportWord"
  );
};

// //TraceOfSource
// const traceOfSource = (location, cb) => {
//   require.ensure([], require => {
//     cb(null, require('./pages/traceOfSource/traceOfSource').default)
//   }, 'traceOfSource')
// }
//TraceOfSource
const recordList = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/recordList/recordList").default);
    },
    "recordList"
  );
};


const directionList = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/directionList/directionList").default);
    },
    "directionList"
  );
};
// PcszhzFankui{

  const pcszhzFankui = (location, cb) => {
    require.ensure(
      [],
      require => {
        cb(null, require("./pages/pcszhzFankui/pcszhzFankui").default);
      },
      "pcszhzFankui"
    );
  };

//analysisForPolice
const analysisForPolice = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/analysisForPolice/analysisForPolice").default);
    },
    "analysisForPolice"
  );
};

//AnalysisForSeat
const analysisForSeat = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/analysisForSeat/analysisForSeat").default);
    },
    "analysisForSeat"
  );
};

// downAnalysisForSeat
const downAnalysisForSeat = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/downPoliceForSeat/downAnalysisForSeat").default);
    },
    "downAnalysisForSeat"
  );
};

//指挥长审批
const approve = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/approve/approve").default);
    },
    "approve"
  );
};

//指挥长已审批
const approveed = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/approveed/approveed").default);
    },
    "approveed"
  );
};

//指派页面
const assign = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/assign/assign").default);
    },
    "assign"
  );
};
//指派页面从上到下
const assignTTT = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/assignTopToDown/assignTopToDown").default);
    },
    "assignTTT"
  );
};

//指派页面从上到下
const newsAssign = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/assignNews/newsAssign").default);
    },
    "newsAssign"
  );
};


//坐席已指派页面
const assigned = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/assigned/assigned").default);
    },
    "assigned"
  );
};

//已上报详情页面
const submitted = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/submitted/submitted").default);
    },
    "submitted"
  );
};

//信息详情页面
const newsDetail = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/newsDetail/newsDetail").default);
    },
    "newsDetail"
  );
};

//社会综合
const social = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/social/social").default);
    },
    "social"
  );
};
//每日简报
const dailyBriefing = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/dailyBriefing/dailyBriefing").default);
    },
    "dailyBriefing"
  );
};

//合成作战研判工具集（市局）
const toolBox = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/toolBox/toolBox").default);
    },
    "toolBox"
  );
};

//综合分析
const multiDetermine = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/multiDetermine/multiDetermine").default);
    },
    "multiDetermine"
  );
};

//合成作战研判工具集（分局）
// const toolBoxWhite = (location, cb) => {
//   require.ensure(
//     [],
//     require => {
//       cb(null, require("./pages/toolBox/toolBoxWhite").default);
//     },
//     "toolBoxWhite"
//   );
// };

//订阅中心
const subScription = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/subScription/SubScription").default);
    },
    "subScription"
  );
};

//订阅中心
const information = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/information/information").default);
    },
    "information"
  );
};

//订阅中心
const warningStatistic = (location, cb) => {
  require.ensure(
    [],
    require => {
      cb(null, require("./pages/warningStatistic/warningStatistic").default);
    },
    "warningStatistic"
  );
};

// 态势分析
const stateAnalysis = (location, cb) => {
    require.ensure(
        [],
        require => {
            cb(null, require("./pages/stateAnalysis/stateAnalysis").default);
        },
        "stateAnalysis"
    );
};


const routes = (
  <Route>
    <Route path="/" component={App} onEnter={isLogin}>
      <IndexRoute getComponent={redirect} />
      <Route path="/goHecheng" getComponent={goHecheng} />
      <Route path="/goToolbox" getComponent={goToolbox} />
      <Route path="/home" getComponent={home} />
      <Route path="/master/:tab/:fromHomePage/:subType" getComponent={master} />
      <Route path="/averagePolice/:tab" getComponent={averagePolice} />
      <Route path="/recordList" getComponent={recordList} />
      <Route path="/directionList" getComponent={directionList} />
      <Route path="/newsDetail" getComponent={newsDetail} />
      <Route path="/stateAnalysis" getComponent={stateAnalysis} />
      <Route path="/reportWord/:id/:state" getComponent={reportWord} />
      {/*<Route path='/syntheticInfo/:id/:state/:isApprove' getComponent={syntheticInfo} />*/}
      <Route path="/approve/:id/:state/:isApprove/:taskType" getComponent={approve} />
      <Route path="/approveed/:id/:state/:isApprove/:taskType" getComponent={approveed} />
      <Route path="/assign/:id/:state/:isApprove/:taskType" getComponent={assign} />
      <Route path="/assignTTT/:id/:state/:isApprove/:taskType" getComponent={assignTTT} />
      <Route path="/newsAssign/:caseId/:source/:taskType" getComponent={newsAssign} />
      <Route path="/assigned/:id/:state/:isApprove" getComponent={assigned} />
      <Route path="/pcszhzFankui/:id/:state/:taskType" getComponent={pcszhzFankui}/>
      <Route path="/analysisForPolice/:id/:state" getComponent={analysisForPolice}/>
      <Route path="/analysisForSeat/:id/:state" getComponent={analysisForSeat}/>

      <Route path="/downAnalysisForSeat/:id/:state" getComponent={downAnalysisForSeat}/>
      <Route path="/submitted/:id/:state/:isBohui/:taskType" getComponent={submitted} />
      <Route path="/toolBox" getComponent={toolBox} />
      <Route path="/subscription" getComponent={subScription} />
      <Route path="/social" getComponent={social} />
      <Route path="/dailyBriefing" getComponent={dailyBriefing} />
      <Route path="/information" getComponent={information} />
      {/*<Route path="/multiDetermine" getComponent={multiDetermine} />*/}
      <Route path="/warning" getComponent={warningStatistic} />
      <Route path="/multiDetermine" getComponent={multiDetermine} />
    </Route>

    <Route path="/login" component={Login} />
    <Route path="/testLogin" component={TestLogin} />
    {/*<Route path="/login" component={TestLogin} />
    <Route path="/testLogin" component={Login} />*/}
    <Route path="/freeLogin" component={FreeLogin} />
    <Route path="/offline" component={OffLine} />
    <Route path="/portal" component={Portal} />
    <Route path="/traceOfSource/:id/:state/:deptNo" component={traceOfSource} />
    <Route path="/commanderScreen" component={CommanderScreen} />

  </Route>
);

export default routes;
