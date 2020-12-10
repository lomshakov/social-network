import style from './Header.module.css';

const Header = (props) => {
    return (
        <header className={style.header}>
            <div className={style.logo}>
                <img src="https://bumper-stickers.ru/30075-thickbox_default/smaylik-s-hitroy-ulybkoy.jpg"/>
                {/*<img src="./../../Images/logo.png"/>*/}
            </div>
            <div className={style.mainTitle}>
                <h1>The Social Network</h1>
            </div>
        </header>
    )
};

export default Header;