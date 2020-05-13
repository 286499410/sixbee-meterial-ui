import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import * as rdrLocales from 'react-date-range/dist/locale';
import Popover from 'material-ui/Popover';
import utils from "../utils";

export default class DateRange extends Component {

    static defaultProps = {
        label: undefined,           //标签
        borderShow: true,           //是否显示下划线
        hasClear: true,             //最右边是否显示清除按钮
        disabled: false,            //是否禁止输入
        immutable: false,           //是否不可更改
        fullWidth: true,            //宽度100%
        hintText: undefined,        //输入提示
        errorText: undefined,       //错误提示
        defaultValue: undefined,    //默认值
        activeStartDate: utils.date('Y-m-d', new Date().getTime() / 1000), //开始日期
        minDate: undefined,         //最小日期
        maxDate: undefined,         //最大日期
        timestamp: false,           //value是否为时间戳
    };

    state = {
        startDate: undefined,
        endDate: undefined,
        anchorEl: {},
        open: false,
        clickNum: 0
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        if (_.isArray(props.value) && props.value.length == 2) {
            let value = props.value;
            [this.state.startDate, this.state.endDate] = this.convertValue(value);
        } else if (props.hasOwnProperty('value') && (props.value === undefined || props.value === null)) {
            this.state.startDate = undefined;
            this.state.endDate = undefined;
        }
    }

    convertValue(value) {
        let [startDate, endDate] = value;
        if (this.props.timestamp) {
            if (!this.isEmpty(startDate)) {
                startDate = utils.date('Y-m-d', startDate);
            }
            if (!this.isEmpty(endDate)) {
                endDate = utils.date('Y-m-d', endDate);
            }
        }
        return [startDate, endDate];
    }

    isEmpty(value) {
        return value === undefined || value === '' || value === null;
    }

    /**
     * 设置值
     * @param value
     */
    setValue(value) {
        let [startDate, endDate] = value === undefined ? [undefined, undefined] : this.convertValue(value);
        this.state.startDate = startDate;
        this.state.endDate = endDate;
        if (this.props.onChange) {
            if (this.isEmpty(startDate) && this.isEmpty(endDate)) {
                this.props.onChange(undefined, this);
            } else if (this.props.timestamp) {
                this.props.onChange([
                    !this.isEmpty(startDate) ? utils.strToTime(startDate) : undefined,
                    !this.isEmpty(endDate) ? utils.strToTime(endDate) + 86400 - 1 : undefined
                ], this);
            } else {
                this.props.onChange([startDate, endDate], this);
            }
        }
        this.forceUpdate();
    }

    /**
     * 获取当前值
     * @returns {any}
     */
    getValue() {
        if (this.state.startDate === undefined &&
            this.state.endDate === undefined &&
            this.props.defaultValue !== undefined &&
            _.isArray(this.props.defaultValue) &&
            this.props.defaultValue.length == 2
        ) {
            return this.convertValue(this.props.defaultValue);
        } else {
            return [this.state.startDate, this.state.endDate];
        }
    }

    handleChange = (ranges) => {
        this.state.clickNum++;
        let startDate = ranges.selection.startDate ? utils.dateToStr(ranges.selection.startDate) : undefined;
        let endDate = ranges.selection.endDate ? utils.dateToStr(ranges.selection.endDate) : undefined;
        let originValue = this.getValue();
        originValue[0] = startDate;
        originValue[1] = endDate;
        if (this.props.timestamp) {
            this.setValue([
                !this.isEmpty(originValue[0]) ? utils.strToTime(originValue[0]) : undefined,
                !this.isEmpty(originValue[1]) ? utils.strToTime(originValue[1]) : undefined
            ]);
        } else {
            this.setValue(originValue);
        }
        if (this.state.clickNum % 2 == 0) {
            setTimeout(() => {
                this.handleRequestClose();
            }, 300);
        }
    };

    /**
     * 打开日历控件
     */
    openCalendar = (event) => {
        this.setState({
            open: true,
            anchorEl: this.refs.container
        });
    };

    /**
     * 关闭日历控件
     * @param event
     */
    handleRequestClose = (event) => {
        this.setState({open: false});
    };

    /**
     * 清除
     * @param event
     */
    handleClear = (event) => {
        event.stopPropagation();
        this.setValue([null, null]);
    };

    render() {
        let label = this.props.label;
        let [startDate, endDate] = this.getValue();
        let borderStyle = this.props.borderStyle || this.context.muiTheme.controlBorderStyle || 'underline';
        let content = <div ref="container" className="flex middle relative full-width cursor-pointer hover"
                           onClick={this.openCalendar}>
            <div className="flex middle relative" style={{width: 'calc(100% - 16px)', height: 40, fontSize: 13}}>
                <div style={{
                    width: 'calc(50% - 10px)',
                    minWidth: 'calc(50% - 10px)',
                    textAlign: 'center'
                }}>{startDate}</div>
                <div className="text-center" style={{color: '#ccc', width: 20, minWidth: 20}}>-</div>
                <div style={{
                    width: 'calc(50% - 10px)',
                    minWidth: 'calc(50% - 10px)',
                    textAlign: 'center'
                }}>{endDate}</div>
            </div>
            {
                borderStyle === 'underline' && this.props.borderShow ?
                    <hr aria-hidden="true"
                        style={{
                            borderTop: "none rgb(224, 224, 224)",
                            borderLeft: "none rgb(224, 224, 224)",
                            borderRight: "none rgb(224, 224, 224)",
                            borderBottom: "1px solid rgb(224, 224, 224)",
                            bottom: 6,
                            boxSizing: "content-box",
                            margin: 0,
                            position: "absolute",
                            width: "100%"
                        }}/> : null
            }
            {
                startDate ? <div className="relative" style={{width: 16}}>
                    <div className="hover-hide"><i className="iconfont icon-calendar"/></div>
                    <div className="hover-show" onClick={this.handleClear}><i
                        className="iconfont icon-close-circle-fill" style={{color: 'rgba(0,0,0,0.3)'}}/></div>
                </div> : <div className="relative" style={{width: 16}}>
                    <i className="iconfont icon-calendar"/>
                </div>
            }
            <Popover
                ref="popover"
                style={{
                    left: -10000,
                    boxShadow: '0 1px 10px #888',
                    marginTop: 10,
                    marginLeft: -6
                }}
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                onRequestClose={this.handleRequestClose}>
                <DateRangePicker
                    ranges={[
                        {
                            startDate: startDate ? utils.strToDate(startDate) : new Date(),
                            endDate: endDate ? utils.strToDate(endDate) : new Date(),
                            key: 'selection'
                        }
                    ]}
                    showSelectionPreview={false}
                    showMonthAndYearPickers={true}
                    showDateDisplay={false}
                    staticRanges={[]}
                    inputRanges={[]}
                    locale={rdrLocales['zhCN']}
                    months={2}
                    direction="horizontal"
                    onChange={this.handleChange}
                />
            </Popover>
        </div>;
        return <div style={this.props.rootStyle}>
            {
                label === false ? null : <div>
                    <span style={{
                        transform: "scale(0.75)",
                        transformOrigin: 'left top 0px',
                        color: 'rgba(0,0,0,0.3)',
                        fontSize: 15,
                        display: 'inline-block'
                    }}>{label}</span>
                </div>
            }
            {
                borderStyle === 'border' && this.props.borderShow ?
                    <div className="control-border">{content}</div> : content
            }
        </div>
    }

}