import {Link} from 'react-router-dom'

function Header() {

    return (
        <>
            <header>
                <div>
                    <Link to='/'>Трекер</Link>
                    <Link to='/calendar'>Календарь настроения</Link>
                </div>
                <div>
                    <h1>Поймай Волну Эмоций</h1>
                    <p>Забудь о серых буднях! Наше приложение поможет тебе отслеживать свои чувства и видеть, как меняется твой
                        внутренний мир. Это проще, чем утренний кофе!</p>
                </div>
            </header>
        </>
    )
}

export default Header
