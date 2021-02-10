import React, {Suspense, lazy} from 'react'
import 'antd/dist/antd.css'
import './App.css'
import {Layout, Menu} from 'antd'
import {compose} from 'redux'
import {connect, Provider} from 'react-redux'
import {BrowserRouter, Link, Redirect, Route, withRouter, Switch} from 'react-router-dom'
import Music from './Components/Music/Music'
import Settings from './Components/Settings/Settings'
import News from './Components/News/News'
import HeaderContainer from './Components/Header/HeaderContainer'
import {initializeApp} from './Redux/app-reducer'
import Preloader from './Components/common/Preloader/Preloader'
import {LoginPage} from './Components/Login/LoginPage'
import store, {AppStateType} from './Redux/redux-store'
import ProfileContainer from './Components/Profile/ProfileContainer'
import Error404 from './Components/common/Errors/404'

const DialogsContainer = lazy(() => import("./Components/Dialogs/DialogsContainer"))
const UsersPage = lazy(() => import("./Components/Users/UsersPage"))
const {Header, Content, Sider, Footer} = Layout

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {

    catchAllUnhandledErrors = (e: any) => {
        alert('Some error occurred')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unHandledRejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unHandledRejection', this.catchAllUnhandledErrors)
    }

    render() {

        if (!this.props.initialized)
            return <Preloader/>

        return (
            <Layout className="container">
                <Header>
                    <HeaderContainer />
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
                                        {/*<Route path='/profile/:userId?' component={ProfileContainer}/>*/}
                                        <Route exact path='/' children={ () => <Redirect to="/profile" /> }/>
                                        <Route path='/profile/:userId?' component={ProfileContainer as React.FC}/>
                                        <Route path='/dialogs' component={DialogsContainer}/>
                                        <Route path='/news' component={News}/>
                                        <Route path='/music' component={Music}/>
                                        <Route path='/settings' component={Settings}/>
                                        <Route path='/users' component={UsersPage}/>
                                        <Route path='/login' component={LoginPage}/>
                                        <Route path='*' component={Error404}/>
                                    </Switch>
                                </Suspense>
                            </div>

                        </Content>
                    </Layout>
                </Layout>

                <Footer style={{textAlign: 'center'}}>2021 Created by Alexey Lomshakov</Footer>
            </Layout>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {initializeApp}),
    withRouter
)(App)

const MainApp: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppContainer />
            </BrowserRouter>
        </Provider>
    )
}

export default MainApp
