import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import ReactLoadable from "react-loadable";
import { hotRehydrate, rehydrate } from "rfx-core";
import moment from "moment";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import { isProduction } from "../shared/utils/constants";
import "../shared/stores/stores";
import "../shared/styles/main.less";
import Loadable from "../shared/components/common/Loadable/Loadable";

const LoadableApp = Loadable({
  loader: () =>
    import(/* webpackChunkName: "route-app" */ "../shared/components/App/App"),
  modules: ["../shared/components/App"],
  webpack: () => [require.resolveWeak("../shared/components/App")],
});

/**
 * moment时区设置为中国
 */
moment.locale("zh-cn");

const store = rehydrate();

const renderApp = () =>
  hydrate(
    <Provider store={isProduction ? store : hotRehydrate()}>
      <Router>
        <LocaleProvider locale={zhCN}>
          <Route path="/" component={LoadableApp} />
        </LocaleProvider>
      </Router>
    </Provider>,
    document.getElementById("root")
  );

function run() {
  renderApp();
  if (module.hot) {
    module.hot.accept(renderApp);
  }
}

ReactLoadable.preloadReady().then(run);
