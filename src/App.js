
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import routes from "./routes";

function App() {
    return (
        <Routes>
            {routes &&
                routes.map((route, index) => {
                    const {
                      layout: Layout,
                      path: Path,
                      element: Component,

                    } = route
                    return (
                        <Route
                            key={index}
                            path={Path}
                            element={
                                <Layout>
                                    <Component/>
                                </Layout>
                            }
                        />
                    );
                })}
        </Routes>
    );
}

export default App;
