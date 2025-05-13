import React, { useState } from 'react';
import { Button, Card, Message, Radio, Space } from '@arco-design/web-react';
import styles from './HOCDemo.module.less';

// 高阶组件：权限控制
const withPermission = (WrappedComponent, requiredRole) => {
    return function WithPermissionComponent(props) {
        const [userRole, setUserRole] = useState('guest');
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        const handleLogin = (role) => {
            setUserRole(role);
            setIsAuthenticated(true);
            Message.success(`已登录为 ${role} 角色`);
        };

        const handleLogout = () => {
            setUserRole('guest');
            setIsAuthenticated(false);
            Message.info('已退出登录');
        };

        // 检查权限
        const hasPermission = () => {
            if (!isAuthenticated) return false;
            if (requiredRole === 'admin') return userRole === 'admin';
            if (requiredRole === 'user') return userRole === 'user' || userRole === 'admin';
            return true;
        };

        return (
            <div className={styles.container}>
                <Card title="权限控制演示" className={styles.card}>
                    <div className={styles.authSection}>
                        <h3>当前状态</h3>
                        <p>登录状态: {isAuthenticated ? '已登录' : '未登录'}</p>
                        <p>当前角色: {userRole}</p>
                        <p>所需角色: {requiredRole}</p>
                    </div>

                    {!isAuthenticated ? (
                        <div className={styles.loginSection}>
                            <h3>请选择角色登录</h3>
                            <Space>
                                <Button type="primary" onClick={() => handleLogin('admin')}>
                                    以管理员身份登录
                                </Button>
                                <Button type="primary" onClick={() => handleLogin('user')}>
                                    以普通用户身份登录
                                </Button>
                            </Space>
                        </div>
                    ) : (
                        <div className={styles.contentSection}>
                            <Button onClick={handleLogout}>退出登录</Button>
                            {hasPermission() ? (
                                <WrappedComponent {...props} userRole={userRole} />
                            ) : (
                                <div className={styles.noPermission}>
                                    <h3>权限不足</h3>
                                    <p>您需要 {requiredRole} 权限才能访问此内容</p>
                                </div>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        );
    };
};

// 被包装的组件
const AdminPanel = ({ userRole }) => (
    <div className={styles.adminPanel}>
        <h3>管理员面板</h3>
        <p>欢迎，{userRole}！</p>
        <p>这里是管理员专属内容</p>
        <ul>
            <li>用户管理</li>
            <li>系统设置</li>
            <li>数据统计</li>
        </ul>
    </div>
);

const UserPanel = ({ userRole }) => (
    <div className={styles.userPanel}>
        <h3>用户面板</h3>
        <p>欢迎，{userRole}！</p>
        <p>这里是用户可访问的内容</p>
        <ul>
            <li>个人信息</li>
            <li>消息中心</li>
            <li>使用记录</li>
        </ul>
    </div>
);

// 使用高阶组件包装组件
const AdminPanelWithPermission = withPermission(AdminPanel, 'admin');
const UserPanelWithPermission = withPermission(UserPanel, 'user');

// 主组件
const HOCDemo = () => {
    const [activePanel, setActivePanel] = useState('admin');

    return (
        <div className={styles.container}>
            <Card title="高阶组件示例" className={styles.card}>
                <div className={styles.panelSelector}>
                    <Radio.Group
                        type="button"
                        value={activePanel}
                        onChange={setActivePanel}
                    >
                        <Radio value="admin">管理员面板</Radio>
                        <Radio value="user">用户面板</Radio>
                    </Radio.Group>
                </div>

                {activePanel === 'admin' ? (
                    <AdminPanelWithPermission />
                ) : (
                    <UserPanelWithPermission />
                )}

                <div className={styles.instructions}>
                    <h3>使用说明：</h3>
                    <ol>
                        <li>选择要查看的面板（管理员/用户）</li>
                        <li>使用不同的角色登录（管理员/普通用户）</li>
                        <li>观察不同角色访问不同面板的权限控制效果</li>
                        <li>尝试切换角色和面板，体验权限控制</li>
                    </ol>
                </div>
            </Card>
        </div>
    );
};

export default HOCDemo; 