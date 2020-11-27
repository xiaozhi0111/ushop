
//引入路由文件。
import Index from './pages/index';
import List from './pages/list';
import Play from './pages/play';
// 引入路由的相关插件
import { Switch, Route, Redirect } from 'react-router-dom'

function App() {
    return (
        <div>
            {/* <h3>我是App</h3> */}
            <Switch>
                <Route path="/index" component={Index}></Route>
                <Route path="/list" component={List}></Route>
                <Route path="/play" component={Play}></Route>
                <Redirect to="/index"></Redirect>
            </Switch>
        </div>
    );
}

export default App;