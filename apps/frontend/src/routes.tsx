import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all page components dynamically and cast to the correct type
const modules = import.meta.glob("./pages/**/*.tsx", { eager: true }) as Record<
  string,
  { default: React.ComponentType<any> }
>;

interface RouteObject {
  path: string;
  element: React.ReactNode;
}

// Generate routes from file structure
const generateRoutes = (
  modules: Record<string, { default: React.ComponentType<any> }>
): RouteObject[] => {
  const routes: RouteObject[] = [];

  Object.keys(modules).forEach((filePath) => {
    const Component = modules[filePath].default;
    let routePath = filePath
      .replace("./pages", "")
      .replace(/\/index|\.tsx/g, "")
      .replace(/\[([^\]]+)]/g, ":$1");

    // Special handling for the 'home' directory to be the root route
    if (routePath === "/Home") {
      routePath = "/";
    }

    routes.push({
      path: routePath || "/",
      element: <Component />,
    });
  });

  return routes;
};

const routes = generateRoutes(modules);

export default function AppRoute() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}
