import React, {Suspense, lazy} from "react";
import 'antd/dist/antd.css';
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import News from "./Components/News/News";
import {BrowserRouter, Link, Route} from "react-router-dom";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {Layout, Menu} from 'antd';
import {withRouter, Switch} from "react-router-dom";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import Preloader from "./Components/common/Preloader/Preloader";
import './App.css';
import AntLoginForm from "./Components/Login/AntLoginForm";
import store from "./Redux/redux-store";

const DialogsContainer = lazy(() => import("./Components/Dialogs/DialogsContainer"));
const UsersContainer = lazy(() => import("./Components/Users/UsersContainer"));
const {Header, Content, Sider, Footer} = Layout;

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialized)
            return <Preloader/>

        return (
            <Layout className="container">
                <Header>
                    <HeaderContainer/>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            style={{height: '100%', borderRight: 0}}>

                            <Menu.Item key="1">
                                <Link to='/profile'>My profile</Link>
                            </Menu.Item>

                            <Menu.Item key="2">
                                <Link to='/dialogs'>Messages</Link>
                            </Menu.Item>

                            <Menu.Item key="3">
                                <Link to='/news'>News</Link>
                            </Menu.Item>

                            <Menu.Item key="4">
                                <Link to='/music'>Music</Link>
                            </Menu.Item>

                            <Menu.Item key="5">
                                <Link to='/settings'>Settings</Link>
                            </Menu.Item>

                            <Menu.Item key="6">
                                <Link to='/users'>Developers</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >

                            <div>
                                <Suspense fallback={<div>Загрузка...</div>}>
                                    <Switch>
                                        <Route path='/profile/:userId?' component={ProfileContainer}/>
                                        <Route path='/dialogs' component={DialogsContainer}/>
                                        <Route path='/news' component={News}/>
                                        <Route path='/music' component={Music}/>
                                        <Route path='/settings' component={Settings}/>
                                        <Route path='/users' component={UsersContainer}/>
                                        <Route path='/login' component={AntLoginForm}/>
                                    </Switch>
                                </Suspense>
                            </div>

                        </Content>
                    </Layout>
                </Layout>

                <Footer style={{textAlign: 'center'}}>2021 Created by Alexey Lomshakov</Footer>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppContainer = compose(
    connect(mapStateToProps, {initializeApp}),
    withRouter
)(App)

const MainApp = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppContainer/>
            </BrowserRouter>
        </Provider>
    )
}

export default MainApp;
