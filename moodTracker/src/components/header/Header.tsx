import {Link} from 'react-router-dom'
import style from './header.module.css'

export function Header() {

    return (
            <header className={style.header}>
                <nav className={style.header_nav}>
                    <Link to='/' className={style.header_nav__link}>Трекер</Link>
                    <Link to='/calendar' className={style.header_nav__link}>Календарь настроения</Link>
                </nav>
                <article className={style.header_article}>
                    <h2 className={style.header_article__headline}>Поймай Волну Эмоций</h2>
                    <p className={style.header_article__text}>Забудь о серых буднях! Наше приложение поможет тебе отслеживать свои чувства и видеть, как меняется твой
                        внутренний мир. Это проще, чем утренний кофе!</p>
                </article>
            </header>
    )
}
