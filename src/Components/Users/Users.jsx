import style from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import * as axios from "axios";

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];

    if (pagesCount > 10) {

        let min = props.currentPage - 5;
        if (min < 1) min = 1;
        for (let i = min; i <= (min + 9); i++) {
            pages.push(i);
        }
    }

    else {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
    }





    return (
        <div className={style.usersPage}>

            <div>
                {
                    pages.map(p => {
                        return <span className={props.currentPage === p
                                     ? style.selectedPage
                                     : style.pageNumber}
                                     onClick={ () => { props.onPageChanged(p) } }>{p} </span>
                    })
                }
            </div>

            {
                props.users.map(u =>
                    <div className={style.users} key={u.id}>
                        <div className={style.usersAvatar}>
                            <div>
                                <NavLink to={"/profile/" + u.id}>
                                    <img src={u.photos.small != null ? u.photos.small : userPhoto} />
                                </NavLink>
                            </div>
                            <div>
                                { u.followed
                                    ? <button className={style.buttonUnfollow} onClick={ () =>


                                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                                     withCredentials: true,
                                                     headers: {
                                                         "API-KEY": "8d451412-d505-42b4-be18-7644933e3dfb"
                                                     }
                                        })
                                            .then(response => {
                                                if (response.data.resultCode == 0) {
                                                    props.unfollow(u.id);
                                                }
                                            })


                                    }>Unfollow</button>
                                    : <button className={style.buttonFollow} onClick={ () => {

                                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                                   withCredentials: true,
                                                   headers: {
                                                       "API-KEY": "8d451412-d505-42b4-be18-7644933e3dfb"
                                                   }
                                        })
                                            .then(response => {
                                                if (response.data.resultCode == 0) {
                                                    props.follow(u.id);
                                                }
                                            })
                                    }
                                    }>Follow</button>
                                }
                            </div>
                        </div>
                        <div className={style.usersInfo}>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </div>
                    </div>)
            }
        </div> //- /.style.usersPage
    )
}

export default Users;