import React, { useRef, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { Button, Card, Message, Space } from '@arco-design/web-react';
import styles from './ParentChildDemo.module.less';

// 子组件
const ChildComponent = forwardRef((props, ref) => {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState('');

    // 定义方法
    const increment = useCallback(() => {
        setCount(prev => prev + 1);
        setMessage('计数已增加');
    }, []);

    const decrement = useCallback(() => {
        setCount(prev => prev - 1);
        setMessage('计数已减少');
    }, []);

    const reset = useCallback(() => {
        setCount(0);
        setMessage('计数已重置');
    }, []);

    const setCustomMessage = useCallback((msg) => {
        setMessage(msg);
    }, []);

    // 使用 useImperativeHandle 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        increment,
        decrement,
        reset,
        setCustomMessage
    }));

    return (
        <div className={styles.childComponent}>
            <h3>子组件</h3>
            <div className={styles.counter}>
                当前计数: {count}
            </div>
            {message && (
                <div className={styles.message}>
                    消息: {message}
                </div>
            )}
            <div className={styles.childControls}>
                <h4>子组件内部控制</h4>
                <Space>
                    <Button type="primary" onClick={increment}>
                        增加计数
                    </Button>
                    <Button type="primary" onClick={decrement}>
                        减少计数
                    </Button>
                    <Button onClick={reset}>
                        重置计数
                    </Button>
                    <Button onClick={() => setCustomMessage('这是子组件内部发送的消息')}>
                        发送内部消息
                    </Button>
                </Space>
            </div>
        </div>
    );
});

// 父组件
const ParentComponent = () => {
    const childRef = useRef(null);
    const [lastAction, setLastAction] = useState('');

    const handleIncrement = () => {
        childRef.current?.increment();
        setLastAction('父组件：增加计数');
    };

    const handleDecrement = () => {
        childRef.current?.decrement();
        setLastAction('父组件：减少计数');
    };

    const handleReset = () => {
        childRef.current?.reset();
        setLastAction('父组件：重置计数');
    };

    const handleCustomMessage = () => {
        childRef.current?.setCustomMessage('这是一条来自父组件的自定义消息');
        setLastAction('父组件：设置自定义消息');
    };

    return (
        <div className={styles.container}>
            <Card title="父组件调用子组件事件示例" className={styles.card}>
                <div className={styles.parentSection}>
                    <h3>父组件控制面板</h3>
                    <Space>
                        <Button type="primary" onClick={handleIncrement}>
                            增加计数
                        </Button>
                        <Button type="primary" onClick={handleDecrement}>
                            减少计数
                        </Button>
                        <Button onClick={handleReset}>
                            重置计数
                        </Button>
                        <Button onClick={handleCustomMessage}>
                            发送自定义消息
                        </Button>
                    </Space>
                    {lastAction && (
                        <div className={styles.lastAction}>
                            最后操作: {lastAction}
                        </div>
                    )}
                </div>

                <ChildComponent ref={childRef} />

                <div className={styles.instructions}>
                    <h3>实现说明：</h3>
                    <ol>
                        <li>在子组件中先定义方法（使用 useCallback 优化性能）</li>
                        <li>通过 useImperativeHandle 将方法暴露给父组件</li>
                        <li>子组件可以直接调用这些方法</li>
                        <li>父组件通过 ref 调用这些方法</li>
                    </ol>
                    <div className={styles.codeExample}>
                        <h4>关键代码：</h4>
                        <pre>
{`// 子组件中定义方法
const increment = useCallback(() => {
    setCount(prev => prev + 1);
    setMessage('计数已增加');
}, []);

// 暴露方法给父组件
useImperativeHandle(ref, () => ({
    increment,
    decrement,
    reset,
    setCustomMessage
}));

// 子组件内部调用
<Button onClick={increment}>增加计数</Button>

// 父组件调用
const handleIncrement = () => {
    childRef.current?.increment();
};`}
                        </pre>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ParentComponent; 