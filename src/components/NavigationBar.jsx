import { NavLink } from "react-router-dom";

export default function NavigationBar() {
    
    let activeClassName = "active-nav-link";

    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? activeClassName : undefined)}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => (isActive ? activeClassName : undefined)}
                    >
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) => (isActive ? activeClassName : undefined)}
                    >
                        Contact
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/blog"
                        className={({ isActive }) => (isActive ? activeClassName : undefined)}
                    >
                        Blogs
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
