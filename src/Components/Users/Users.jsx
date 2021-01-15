import style from "./Users.module.css";
import 'antd/dist/antd.css';
import { Pagination } from 'antd';
import User from "./User";

let Users = ({ totalUsersCount, pageSize, onPageChanged, users, followingInProgress, follow, unfollow, setPageSize }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    return (

        <div className={style.usersPage}>

            <Pagination defaultCurrent={1}
                        total={pagesCount}
                        pageSize={pageSize}
                        onChange={onPageChanged}
                        onShowSizeChange={setPageSize}/>

            { users.map(user => <User followingInProgress={followingInProgress}
                                      follow={follow}
                                      unfollow={unfollow}
                                      user={user}
                                      key={user.id}/>) }
        </div>
    )
}

export default Users;