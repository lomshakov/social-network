import style from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import FriendsList from "./FriendsList/FriendsList";

const Navbar = (props) => {
    //debugger;
    return (
        <nav className={style.nav}>
            <div className={style.item}>
                <NavLink to='/profile' activeClassName={style.activeLink}>Profile</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to='/dialogs' activeClassName={style.activeLink}>Messages</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to='/news' activeClassName={style.activeLink}>News</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to='/music' activeClassName={style.activeLink}>Music</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to='/settings' activeClassName={style.activeLink}>Settings</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to='/users' activeClassName={style.activeLink}>Users</NavLink>
            </div>
            <div >
                <h3>My Friends</h3>
{/*                <div>
                    <FriendsList friends={props.store.getState().sidebar.friends} />
                </div>*/}
            </div>
        </nav>
    )
}

export default Navbar;