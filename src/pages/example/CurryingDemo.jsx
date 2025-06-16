import React from 'react';
import { Card, Typography, Space, Button } from '@arco-design/web-react';

const CurryingDemo = () => {
    // 基础柯里化函数
    const curry = (fn) => {
        return function curried(...args) {
            if (args.length >= fn.length) {
                return fn.apply(this, args);
            }
            return function(...moreArgs) {
                return curried.apply(this, args.concat(moreArgs));
            };
        };
    };

    // 示例1：简单的加法函数
    const add = (a, b, c) => a + b + c;
    const curriedAdd = curry(add);

    // 示例2：带参数的问候函数
    const greet = (greeting, name) => `${greeting}, ${name}!`;
    const curriedGreet = curry(greet);

    // 示例3：带多个参数的格式化函数
    const format = (prefix, value, suffix) => `${prefix}${value}${suffix}`;
    const curriedFormat = curry(format);

    // 使用示例
    const addResult = curriedAdd(1)(2)(3);
    const greetResult = curriedGreet('Hello')('World');
    const formatResult = curriedFormat('$')(100)('.00');

    return (
        <Card title="函数柯里化示例" style={{ maxWidth: 800, margin: '20px auto' }}>
            <Space direction="vertical" size="large">
                <Typography.Title heading={5}>1. 基础柯里化函数实现</Typography.Title>
                <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                    {`const curry = (fn) => {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
};`}
                </pre>

                <Typography.Title heading={5}>2. 使用示例</Typography.Title>
                <Space direction="vertical">
                    <div>
                        <Typography.Text type="strong">加法函数：</Typography.Text>
                        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                            {`const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
const result = curriedAdd(1)(2)(3); // 结果: ${addResult}`}
                        </pre>
                    </div>

                    <div>
                        <Typography.Text type="strong">问候函数：</Typography.Text>
                        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                            {`const greet = (greeting, name) => \`\${greeting}, \${name}!\`;
const curriedGreet = curry(greet);
const result = curriedGreet('Hello')('World'); // 结果: ${greetResult}`}
                        </pre>
                    </div>

                    <div>
                        <Typography.Text type="strong">格式化函数：</Typography.Text>
                        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                            {`const format = (prefix, value, suffix) => \`\${prefix}\${value}\${suffix}\`;
const curriedFormat = curry(format);
const result = curriedFormat('$')(100)('.00'); // 结果: ${formatResult}`}
                        </pre>
                    </div>
                </Space>

                <Typography.Title heading={5}>3. 柯里化的优势</Typography.Title>
                <Typography.Paragraph>
                    <ul>
                        <li>参数复用：可以固定部分参数，创建新的函数</li>
                        <li>延迟执行：可以等到所有参数都准备好再执行</li>
                        <li>提高代码复用性：可以创建更灵活的函数</li>
                        <li>函数式编程：支持函数组合和管道操作</li>
                    </ul>
                </Typography.Paragraph>
            </Space>
        </Card>
    );
};

export default CurryingDemo; 