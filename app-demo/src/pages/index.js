
import React from 'react';

import Home from '../views/home';
import Rank from '../views/rank';
import Search from '../views/search';

//引入css
import '../assets/css/home.css';
//引入路由使用插件
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

class Index extends React.Component {
    render() {
        return (
            <div className="index">
                <div className="title">
                    <div className='yy'>
                        <div className="wyybg">
                            <span className="wyybg1"></span>
                        </div>
                        网易云音乐
                    </div>
                    <div className="updown"><span>下载APP</span></div>
                </div>
                {/* 二级路由跳转 */}
                <div className="nav">
                    <div>
                        <NavLink activeClassName="active" to="/index/home">推荐歌单</NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to="/index/rank">排行榜</NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to="/index/search">搜索</NavLink>
                    </div>
                </div>
                {/* 二级路由的出口 */}
                <Switch>
                    <Route path="/index/home" component={Home}></Route>
                    <Route path="/index/rank" component={Rank}></Route>
                    <Route path="/index/search" component={Search}></Route>
                    <Redirect to="/index/home"></Redirect>
                </Switch>
            </div>
        );
    }
}

export default Index;