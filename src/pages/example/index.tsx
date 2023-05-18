import React, { useEffect, useState } from 'react';
import { Typography, Card, Button } from '@arco-design/web-react';
import { flushSync } from "react-dom"

function Example() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  return (
    <Card style={{ height: '80vh' }}>
      <div>
        <Button onClick={() => {
          // 第一次更新
          flushSync(() => {
            setCount(count => count + 1)
          })
          // 第二次更新
          flushSync(() => {
            setCount2(count2 => count2 + 1)
          })
        }}>点击</Button>
        <span>count:{count}</span>
        <span>count2:{count2}</span>
      </div>
    </Card>
  );
}

export default Example;
