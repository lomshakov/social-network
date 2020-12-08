import style from './../Profile.module.css'

const ProfileInfo = (props) => {
    return (
        <div className={style.profileInfo}>
            <div>
                <img src='https://proprikol.ru/wp-content/uploads/2020/02/kartinki-na-avatarku-dlya-parnej-i-muzhchin-1-1-650x583.jpg'/>
            </div>
            <div className={style.profileDescription}>
                <h4>Leonid Brezhnev</h4>
                <h4>друзей: 25</h4>
                <h4>фотографий: 25</h4>
            </div>
        </div>
    )
}

export default ProfileInfo;