import React, { useState, useEffect, memo, useCallback } from 'react'
import { Button } from '@arco-design/web-react';
import styles from './index.module.less'

export default () => {
    const [count, setCount] = useState(0)

    return (<div className={styles.wrapper}>
        <div className={styles.countWrapper}>
            <div className={styles.count}>{count}</div>
        </div>
        <div>
            <Button type='primary' onClick={() => setCount((count) => count + 1)}>count+1</Button>
        </div>
        <div className={styles.twoChild}>
            <div className={styles.item}>
                <h1>未使用useCallback的子组件</h1>
                <div><Children setParentCount={(val) => setCount(val)} /></div>
            </div>
            <div className={styles.item}>
                <h1>使用useCallback的子组件</h1>
                <div><Children1 setParentCount={useCallback((val) => setCount(val), [])} /></div>
            </div>
        </div>
        <hr />
        <hr />
        <div>
            <h1>依赖项中包含函数：</h1>
            <div><Children2 /></div>
        </div>
        <hr />
        <hr />
        <div>
            <h1>回调函数中访问 state 或 props</h1>
            <div className={styles.twoChild}>
                <div className={styles.item}>
                    <h1>未使用useCallback的子组件</h1>
                    <div><Children3 /></div>
                </div>
                <div className={styles.item}>
                    <h1>使用useCallback的子组件</h1>
                    <div><Children4 /></div>
                </div>
            </div>
        </div>

        <div>
            <div>
                使用场景：
                <ul>
                    <li>将函数作为 props 传递给子组件时，可以使用useCallback缓存函数，以避免在父组件重新渲染时不必要地重新创建该函数</li>
                    <li>在useEffect的依赖项中使用useCallback缓存函数，以确保在依赖项发生变化时不会重新创建函数.memo避免不必要的重新渲染</li>
                    <li>当需要在回调函数中访问 state 或 props 时，可以使用useCallback缓存函数，以确保访问的是最新的 state 或 props</li>
                </ul>
            </div>
        </div>
    </div>)
}

const Children = memo((props) => {
    console.log('Children-----')
    return (
        <div>
            <Button type='primary' onClick={() => props.setParentCount(100)}>count=100</Button>
        </div>
    )
})
const Children1 = memo((props) => {
    console.log('Children1---')
    return (
        <div>
            <Button type='primary' onClick={() => props.setParentCount(100)}>count=100</Button>
        </div>
    )
})

const Children2 = memo(() => {
    const [count, setCount] = useState(0);

    const handleIncrement = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    useEffect(() => {
        // 模拟一个异步操作
        const timeoutId = setTimeout(() => {
            console.log('count:', count);
        }, 1000);

        // 返回清除函数
        return () => clearTimeout(timeoutId);
    }, [handleIncrement]);

    return (
        <div>
            <p>count: {count}</p>
            <Button type='primary' onClick={handleIncrement}>Increment</Button>
        </div>
    );
})

const Children3 = memo(() => {
    const [count, setCount] = useState(0);
    const handleClick = () => {
        console.log('3当前count:', count);
    }

    return (
        <div>
            <p>count: {count}</p>
            <Button type='primary' onClick={() => setCount(count + 1)}>count+1</Button>
            <Button type='primary' onClick={handleClick}>使用count</Button>
        </div>
    );
})
const Children4 = memo(() => {
    const [count, setCount] = useState(0);
    const handleClick = useCallback(() => {
        console.log('4当前count:', count);
    }, [count]);

    return (
        <div>
            <p>count: {count}</p>
            <Button type='primary' onClick={() => setCount(count + 1)}>count+1</Button>
            <Button type='primary' onClick={handleClick}>使用count</Button>
        </div>
    );
})