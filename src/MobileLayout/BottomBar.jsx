import { Link } from 'react-router-dom'
import './BottomBar.css'
import HomeComponent from '../Components/RootComponents/HomeComponent'
import { DashBoardLink } from '../Helper/config'

const BottomBar = () => {
    return (
        <div style={{marginTop:"60px"}} className='bottombar-component'>

            {/* <HomeComponent/> */}
            <nav className="navbar navbar-expand fixed-bottom navbar-light bg-light bottom-nav">
                <div className="container">
                    <ul className="navbar-nav w-100 justify-content-between">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="fa fa-home"></i> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/AllRecipe">
                                <i class="fa fa-fire"></i>Recipe
                                {/* <i className="fa fa-search"></i> Recipe */}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/search">
                                <i className="fa fa-search"></i> search
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`${DashBoardLink}`}>
                                <i className="fa fa-user"></i> Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default BottomBar