import React, { useEffect, useState } from 'react';
import { Button, Input, Message } from '@arco-design/web-react';

const BroadcastChannelDemo = () => {
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        // 创建一个新的 BroadcastChannel
        const broadcastChannel = new BroadcastChannel('app_channel');

        // 监听消息
        broadcastChannel.onmessage = (event) => {
            setReceivedMessages(prev => [...prev, event.data]);
            Message.info(`收到新消息: ${event.data}`);
        };

        setChannel(broadcastChannel);

        // 组件卸载时关闭连接
        return () => {
            broadcastChannel.close();
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() && channel) {
            channel.postMessage(message);
            setMessage('');
            setReceivedMessages(prev => [...prev, `[本窗口] ${message}`]);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>BroadcastChannel 示例</h2>
            <p>打开多个浏览器窗口，它们之间可以互相通信</p>
            
            <div style={{ marginBottom: 20 }}>
                <Input 
                    value={message}
                    onChange={setMessage}
                    placeholder="输入要发送的消息"
                    style={{ width: 300, marginRight: 10 }}
                    onPressEnter={sendMessage}
                />
                <Button type="primary" onClick={sendMessage}>
                    发送消息
                </Button>
            </div>

            <div>
                <h3>消息记录：</h3>
                <div style={{ 
                    border: '1px solid #e5e5e5', 
                    padding: 10,
                    borderRadius: 4,
                    minHeight: 200,
                    maxHeight: 400,
                    overflowY: 'auto'
                }}>
                    {receivedMessages.map((msg, index) => (
                        <div key={index} style={{ marginBottom: 8 }}>
                            {msg}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: 20 }}>
                <h3>使用说明：</h3>
                <ol>
                    <li>复制当前页面 URL，在新窗口中打开</li>
                    <li>在任意窗口中输入消息并发送</li>
                    <li>所有打开的窗口都能收到消息</li>
                </ol>
            </div>
        </div>
    );
};

export default BroadcastChannelDemo; 