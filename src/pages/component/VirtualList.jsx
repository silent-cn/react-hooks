import React, { Component } from 'react';
import { Button, Card, Message, Radio, Space } from '@arco-design/web-react';
import styles from './VirtualList.module.less';

/**
 * 虚拟列表组件 - 类组件实现
 * 用于高效渲染大量数据，只渲染可视区域的数据
 * 支持网格布局，每行显示4个项目
 */
class VirtualList extends Component {
    constructor(props) {
        super(props);
        
        // 初始化状态
        this.state = {
            data: [], // 数据源
            visibleData: [], // 当前可视区域的数据
            scrollTop: 0, // 滚动位置
            isLoading: false // 加载状态
        };

        // 配置参数
        this.itemHeight = 200; // 每个项目的高度
        this.itemWidth = 'calc(25% - 16px)'; // 每个项目的宽度（4列布局）
        this.itemsPerRow = 4; // 每行显示的项目数
        this.rowHeight = this.itemHeight + 16; // 行高（包含间距）
        this.visibleRows = 5; // 可视区域显示的行数
        this.bufferSize = 2; // 上下缓冲区行数

        // 绑定方法
        this.handleScroll = this.handleScroll.bind(this);
        this.addData = this.addData.bind(this);
        this.addSingleData = this.addSingleData.bind(this);
    }

    /**
     * 组件挂载后添加滚动监听
     */
    componentDidMount() {
        const container = this.containerRef.current;
        if (container) {
            container.addEventListener('scroll', this.handleScroll);
        }
    }

    /**
     * 组件卸载前移除滚动监听
     */
    componentWillUnmount() {
        const container = this.containerRef.current;
        if (container) {
            container.removeEventListener('scroll', this.handleScroll);
        }
    }

    /**
     * 滚动事件处理
     */
    handleScroll = () => {
        const container = this.containerRef.current;
        if (!container) return;

        const newScrollTop = container.scrollTop;
        this.setState({ scrollTop: newScrollTop }, this.updateVisibleData);
    }

    /**
     * 更新可视区域数据
     */
    updateVisibleData = () => {
        const { data, scrollTop } = this.state;
        const startRow = Math.max(0, Math.floor(scrollTop / this.rowHeight) - this.bufferSize);
        const endRow = Math.min(
            Math.ceil(data.length / this.itemsPerRow),
            Math.floor(scrollTop / this.rowHeight) + this.visibleRows + this.bufferSize
        );
        
        const startIndex = startRow * this.itemsPerRow;
        const endIndex = Math.min(data.length, endRow * this.itemsPerRow);
        const newVisibleData = data.slice(startIndex, endIndex);
        
        this.setState({ visibleData: newVisibleData });
    }

    /**
     * 生成唯一ID
     */
    generateUniqueId = () => {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 添加多条数据
     */
    addData = (count) => {
        this.setState({ isLoading: true });
        const currentCount = this.state.data.length;
        const newData = Array.from({ length: count }, (_, index) => ({
            id: this.generateUniqueId(),
            content: `Item ${currentCount + index + 1}`,
            height: Math.floor(Math.random() * 50) + 150
        }));
        
        this.setState(prevState => ({
            data: [...prevState.data, ...newData],
            isLoading: false
        }), this.updateVisibleData);
    }

    /**
     * 添加单条数据
     */
    addSingleData = () => {
        this.setState(prevState => ({
            data: [...prevState.data, {
                id: this.generateUniqueId(),
                content: `Item ${prevState.data.length + 1}`,
                height: Math.floor(Math.random() * 50) + 150
            }]
        }), this.updateVisibleData);
    }

    // 创建容器引用
    containerRef = React.createRef();

    render() {
        const { data, visibleData, isLoading } = this.state;

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>网格虚拟列表</h1>
                    <Space>
                        <Button
                            type="primary"
                            onClick={this.addSingleData}
                            loading={isLoading}
                        >
                            添加1条数据
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => this.addData(200)}
                            loading={isLoading}
                        >
                            添加200条数据
                        </Button>
                        <span>当前数据量: {data.length}</span>
                    </Space>
                </div>
                <div className={styles.virtualListContainer} ref={this.containerRef}>
                    <div 
                        className={styles.virtualList}
                        style={{ 
                            height: `${Math.ceil(data.length / this.itemsPerRow) * this.rowHeight}px`,
                            padding: '8px'
                        }}
                    >
                        {visibleData.map((item, index) => {
                            const startRow = Math.max(0, Math.floor(this.state.scrollTop / this.rowHeight) - this.bufferSize);
                            const row = Math.floor((startRow * this.itemsPerRow + index) / this.itemsPerRow);
                            const col = (startRow * this.itemsPerRow + index) % this.itemsPerRow;
                            
                            return (
                                <div
                                    key={item.id}
                                    className={styles.virtualListItem}
                                    style={{
                                        position: 'absolute',
                                        top: `${row * this.rowHeight}px`,
                                        left: `calc(${col * 25}% + ${col * 8}px)`,
                                        width: this.itemWidth,
                                        height: `${this.itemHeight}px`
                                    }}
                                >
                                    <Card className={styles.itemCard}>
                                        <div className={styles.itemContent}>
                                            <div className={styles.itemTitle}>{item.content}</div>
                                            <div className={styles.itemDescription}>
                                                这是一个示例描述文本，可以包含更多内容。
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default VirtualList;
