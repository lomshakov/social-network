import style from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={style.header}>
            <div className={style.logo}>
                <img src="https://bumper-stickers.ru/30075-thickbox_default/smaylik-s-hitroy-ulybkoy.jpg"/>
            </div>
            <div className={style.mainTitle}>
                <h2>The Social Network</h2>
                
                <div>
                    {/*<img src="" alt=""/>*/}
                </div>

                <div className={style.login}>
                { !props.isAuth ? <NavLink to='/login'>Login</NavLink>
                                : <div>{props.login}<button onClick={props.logout}>Logout</button></div> }
                </div>

            </div>
        </header>
    )
};

export default Header;