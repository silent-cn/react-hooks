import React, { useEffect, useState, useRef } from 'react';
import { Button, Input, Message, Card, Avatar } from '@arco-design/web-react';
import styles from './WebSocketDemo.module.less';

const WebSocketDemo = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState(`用户${Math.floor(Math.random() * 1000)}`);
    const wsRef = useRef(null);

    useEffect(() => {
        // 创建 WebSocket 连接
        const ws = new WebSocket('wss://echo.websocket.org');
        wsRef.current = ws;

        ws.onopen = () => {
            setConnected(true);
            Message.success('WebSocket 连接成功！');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prev => [...prev, data]);
        };

        ws.onclose = () => {
            setConnected(false);
            Message.error('WebSocket 连接已关闭');
        };

        ws.onerror = (error) => {
            console.error('WebSocket 错误:', error);
            Message.error('WebSocket 连接错误');
        };

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() && wsRef.current && connected) {
            const messageData = {
                type: 'message',
                username,
                content: message,
                timestamp: new Date().toLocaleTimeString()
            };

            wsRef.current.send(JSON.stringify(messageData));
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className={styles.container}>
            <Card title="WebSocket 聊天室" className={styles.card}>
                <div className={styles.status}>
                    状态: {connected ? '已连接' : '未连接'}
                </div>

                <div className={styles.messages}>
                    {messages.map((msg, index) => (
                        <div key={index} className={styles.message}>
                            <Avatar style={{ backgroundColor: '#165DFF' }}>
                                {msg.username.charAt(0)}
                            </Avatar>
                            <div className={styles.messageContent}>
                                <div className={styles.messageHeader}>
                                    <span className={styles.username}>{msg.username}</span>
                                    <span className={styles.timestamp}>{msg.timestamp}</span>
                                </div>
                                <div className={styles.messageText}>{msg.content}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.inputArea}>
                    <Input
                        value={message}
                        onChange={setMessage}
                        onKeyPress={handleKeyPress}
                        placeholder="输入消息..."
                        disabled={!connected}
                    />
                    <Button
                        type="primary"
                        onClick={sendMessage}
                        disabled={!connected}
                    >
                        发送
                    </Button>
                </div>
            </Card>

            <div className={styles.instructions}>
                <h3>使用说明：</h3>
                <ol>
                    <li>页面加载后会自动连接到 WebSocket 服务器</li>
                    <li>在输入框中输入消息并发送</li>
                    <li>所有消息都会显示在聊天记录中</li>
                    <li>每条消息都包含发送者、内容和时间戳</li>
                </ol>
            </div>
        </div>
    );
};

export default WebSocketDemo; 