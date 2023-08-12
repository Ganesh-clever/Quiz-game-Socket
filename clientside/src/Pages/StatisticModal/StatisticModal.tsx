import Modal from 'antd/es/modal/Modal'
import React from 'react'
import { IModal } from '../../interfaces/interface'
import { useDispatch } from 'react-redux'
import { ModalHandler } from '../../Redux/Reducers/UtilsReducers'
import { Card, Col, Row, Statistic } from 'antd'
import { DollarOutlined,CodeSandboxOutlined ,ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import PieChart from '../../Components/Charts/PieChart'
import { GameAnalytics, GameSlot, RevenueDetails } from '../../Constants/Constant'

const StatisticModal: React.FC<IModal> = ({ isOpen, onFinish, className }) => {
    const dispatch = useDispatch();
    return (
        <Modal footer={null} className={className} title="Analytic Statistics" open={isOpen} onCancel={() => dispatch(ModalHandler(''))}>
            <Row className='statistic-row'>
                <Col className='statistic-col' xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Card bordered={false} className='statistic-card'>
                        <Statistic
                            title="Deposit"
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<DollarOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col className='statistic-col' xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Card bordered={false} className='statistic-card'>
                        <Statistic
                            title="Withdraw"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<DollarOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col className='statistic-col' xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Card bordered={false} className='statistic-card'>
                        <Statistic
                            title="Play Games"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<CodeSandboxOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col className='statistic-col' xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Card bordered={false} className='statistic-card'>
                        <Statistic
                            title="Won Games"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<CodeSandboxOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col className='statistic-col'  xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Card bordered={false} className="piechart-containe">
                        <div className="piechart-title">Play Details</div>
                        <PieChart className={'statistic-piechart'} data={GameAnalytics} />
                    </Card>
                </Col>
                <Col className='statistic-col' xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Card bordered={false} className="piechart-containe">
                        <div className="piechart-title">Revenue Details</div>
                        <PieChart className={'statistic-piechart'} data={RevenueDetails} />
                    </Card>
                </Col>
                <Col className='statistic-col' xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Card bordered={false} className="piechart-containe">
                        <div className="piechart-title">Game Details</div>
                        <PieChart className={'statistic-piechart'} data={GameSlot} />
                    </Card>
                </Col>
            </Row>
        </Modal>
    )
}

export default StatisticModal;
