import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import "./app.less";
import { routes } from "../../router/routes";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

@inject("store")
@withRouter
@observer
export default class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  renderRoute = ({ path, component }) => (
    <Route key={path} path={path} component={component} exact />
  );

  render() {
    return (
      <Layout id="app">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="fe-logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="fe-header" />
          <Content className="fe-content">
            <Breadcrumb className="fe-breadcrumb">
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="fe-content-dev">
              Bill is a cat.
              <DevTools />
              {routes.map(this.renderRoute)}
            </div>
          </Content>
          <Footer className="fe-footer">
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
