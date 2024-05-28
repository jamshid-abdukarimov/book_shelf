import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { HomePage } from "pages/home";
import { Layout } from "app/layout";
import { Fallback } from "shared/ui/fallback";
import ProfilePage from "pages/profile";
import LoginPage from "pages/login";
import RegisterPage from "pages/register";
import { SearchPage } from "pages/search";

export const AppRouter = () => {
  const routers = createRoutesFromElements(
    <Route>
      <Route path="signin" element={<LoginPage />} />
      <Route path="signup" element={<RegisterPage />} />
      <Route path="/" element={<Layout />} errorElement={<Fallback />}>
        <Route index element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="search/:searchLine" element={<SearchPage />} />
      </Route>
    </Route>
  );

  return <RouterProvider router={createBrowserRouter(routers)} />;
};
