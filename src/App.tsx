import React, {lazy, Suspense, useEffect} from 'react'
import 'antd/dist/antd.css'
import './App.css'
import {Layout} from 'antd'
import {compose} from 'redux'
import {Provider, useDispatch, useSelector} from 'react-redux'
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import Music from './Components/Music/Music'
import Settings from './Components/Settings/Settings'
import News from './Components/News/News'
import {MainHeader} from './Components/Header/MainHeader'
import {initializeApp} from './Redux/app-reducer'
import Preloader from './Components/common/Preloader/Preloader'
import {LoginPage} from './Components/Login/LoginPage'
import store from './Redux/redux-store'
import ProfileContainer from './Components/Profile/ProfileContainer'
import Error404 from './Components/common/Errors/404'
import {SiderMenu} from './Components/SiderMenu/SiderMenu'
import {getInitialized} from './Redux/app-selectors'

const DialogsContainer = lazy(() => import("./Components/Dialogs/DialogsContainer"))
const UsersPage: any = lazy(() => import("./Components/Users/UsersPage"))
const ChatPage2 = lazy(() => import("./Components/Pages/Chat/ChatPage2"))

const {Header, Content, Footer} = Layout

const App: React.FC = () => {

    /*catchAllUnhandledErrors = (e: any) => {
        alert('Some error occurred')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unHandledRejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unHandledRejection', this.catchAllUnhandledErrors)
    }*/

    const initialized = useSelector(getInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized)
        return <Preloader/>
    else
        return (
            <Layout className="container">
                <Header>
                    <MainHeader/>
                </Header>
                <Layout>
                    <SiderMenu/>
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
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Switch>
                                        <Route exact path='/' children={() => <Redirect to="/profile"/>}/>
                                        <Route path='/profile/:userId?' component={ProfileContainer as React.FC}/>
                                        <Route path='/dialogs' component={DialogsContainer}/>
                                        <Route path='/news' component={News}/>
                                        <Route path='/music' component={Music}/>
                                        <Route path='/settings' component={Settings}/>
                                        <Route path='/users' component={UsersPage}/>
                                        <Route path='/login' component={LoginPage}/>
                                        <Route path='/chat' component={ChatPage2}/>
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

const AppContainer = compose<React.ComponentType>(withRouter)(App)

export const MainApp: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppContainer/>
            </BrowserRouter>
        </Provider>
    )
}