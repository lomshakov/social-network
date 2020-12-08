import style from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import FriendsList from "./FriendsList/FriendsList";

const Navbar = (props) => {

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
            <div >
                <h4>My Friends</h4>
                <div>
                    <FriendsList friends={props.state.friends} />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;