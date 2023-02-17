import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "../components/App";
import NavigationBar from "../components/NavigationBar";

import About from "../pages/About";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import Contact from "../pages/Contact";
import Error404 from "../pages/Error404";

export default function Layout() {
    const routes = [
        { path: "/", name: "Home", Component: App, exact: true },
        { path: "/about", name: "About", Component: About, exact: false },
        { path: "/contact", name: "Contact", Component: Contact, exact: false },
        { path: "/blog", name: "Blogs", Component: Blog, exact: false },
        { path: "/blog/:id", name: "Post", Component: BlogPost, exact: false },
        { path: "*", name: "No Match", Component: Error404, exact: false },
    ];

    return (
        <Router>
            <div className="todo-app-container">
                <NavigationBar />

                <div className="content">
                    <Routes>
                        {routes.map(({ path, Component, exact }) => (
                            <Route
                                key={path}
                                path={path}
                                exact={exact}
                                element={<Component />}
                            />
                        ))}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
