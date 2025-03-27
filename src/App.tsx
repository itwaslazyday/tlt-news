import { Route, Routes } from "react-router-dom";
import { AppRoute } from './const';
import { JSX } from "react";
import MainPage from "pages/main/MainPage";
import ArticlePage from "pages/article/ArticlePage";
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from "redux-persist/integration/react";

export default function App(): JSX.Element {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
            <Route
              path={AppRoute.Article}
              element={<ArticlePage />}
            />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
}

