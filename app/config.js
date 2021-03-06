export default (() => {
    window.$GLOBALCONFIG = {}; +
    function (global) {
        // ////本地开发打开的路径以及端口
        global.$ctx = 'http://172.16.20.2:8765/api';
        global.$file = 'http://172.16.20.2:8765/zuul/api';
        global.$img = 'http://172.16.20.2:8765/zuul/api';
        global.$websocket = 'ws://172.16.20.34:9998/';

        //  市局使用
        // global.$ctx = 'http://10.95.18.116:8765/api';
        // global.$file = 'http://10.95.18.116:8765/zuul/api';
        // global.$img = 'http://10.95.18.116:8765/zuul/api';
        // global.$websocket = 'ws://10.95.18.127:9998/';

        // global.$keyIsRight = `http://10.95.18.116:5555/Demo?url=http://10.95.18.119:8082/freeLogin`
        // global.$keyIsRight = `http://172.16.20.2:5555/Demo?url=http://172.16.20.2:8082/freeLogin`

        global.$systemId = `synthesisSystem`;
        // 用户登录信息
        global.STAFF = {
            code: 'admin',
            name: '警员',
        };

        // 系统一二级菜单
        global.NAVIGATION = [{
                id: 600110230,
                name: '功能列表',
                icon: 'book',
                url: '',
                children: [{
                        id: 600110232,
                        name: '表格',
                        url: 'table',
                        icon: 'user'
                    },
                    {
                        id: 600110242,
                        name: '表格1',
                        url: 'table1',
                        icon: 'user'
                    },
                    {
                        id: 600110242,
                        name: '表格2',
                        url: 'table2',
                        icon: 'user'
                    },
                    {
                        id: 600110242,
                        name: '表格3',
                        url: 'table3',
                        icon: 'user'
                    },
                    {
                        id: 600110233,
                        name: '图表',
                        url: 'echarts',
                        icon: 'area-chart'
                    },
                    {
                        id: 600110234,
                        name: '编辑器',
                        url: 'editor',
                        icon: 'area-chart'
                    },
                    {
                        id: 600110235,
                        name: 'kindEditor',
                        url: 'kindEditor',
                        icon: 'area-chart'
                    },
                ],
            },
            {
                id: 600110430,
                name: '其他',
                icon: 'calculator',
                url: '',
                children: [{
                    id: 600110431,
                    name: '聊天室',
                    url: 'chat',
                    icon: 'book'
                }, ],
            },
        ];
    }(window.$GLOBALCONFIG);
})()