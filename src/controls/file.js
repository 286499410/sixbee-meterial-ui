/**
 * Created by zhengzhaowei on 2018/5/21.
 */

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

/**
 * props:
 * label 标题
 * defaultValue 默认值
 * icon 图标类
 * errorText 错误信息
 * fullWidth 宽度是否100%显示
 * options 选项
 * onChange 事件
 */
export default class File extends Component {

    static defaultProps = {
        label: '选择上传文件'
    };

    state = {
        file: {},
        progress: undefined
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {
        if (props.hasOwnProperty('value')) {
            this.state.value = props.value;
        }
    }

    setValue(value) {
        if (this.props.onChange) {
            this.props.onChange(value, this);
        }
    }

    /**
     * 获取文件扩展名
     * @param name
     * @returns {string}
     */
    getFileExtName(name = this.state.file.name) {
        return name.substring(name.lastIndexOf(".") + 1, name.length);
    }

    handleChange = (event) => {
        let file = this.refs.file.files[0];
        let extName = this.getFileExtName(file.name);
        if (this.props.accept && this.props.accept.indexOf('.' + extName) == -1) {
            alert('请选择正确的文件类型：' + this.props.accept);
            return false;
        }
        this.setState({file: file, progress: undefined});
        if (this.props.uploader) {
            let xhr = new XMLHttpRequest();
            let fd = new FormData();
            fd.append(this.props.uploader.key || 'file', file);
            if(this.props.uploader.append) {
                this.props.uploader.append(fd);
            }
            xhr.open(this.props.uploader.method || 'POST', this.props.uploader.url);
            if (this.props.uploader.header) {
                for (let [key, value] of Object.entries(this.props.uploader.header)) {
                    xhr.setRequestHeader(key, value);
                }
            }
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    this.setState({
                        progress: {
                            loaded: event.loaded,
                            total: event.total
                        }
                    });
                }
            };
            xhr.onload = (event) => {
                if (event.target.status == 200) {
                    if (this.props.uploader.success) {
                        this.props.uploader.success(event.target.responseText, this);
                    }
                } else {
                    if (this.props.uploader.error) {
                        this.props.uploader.error(event);
                    }
                }
            };
            xhr.onerror = (event) => {
                if (this.props.uploader.error) {
                    this.props.uploader.error(event);
                }
            };
            xhr.send(fd);
        } else {
            this.setValue(file);
        }
    };

    render() {
        return <div style={{padding: '8px 0', ...this.props.rootStyle}}>
            <div className="flex middle">
                <RaisedButton
                    label={this.props.label}
                    labelPosition="before"
                    containerElement="label"
                    style={{position: 'relative'}} buttonStyle={this.props.buttonStyle}
                    labelStyle={this.props.labelStyle}
                >
                    <input key="file"
                           ref="file"
                           type="file"
                           style={{
                               position: 'absolute',
                               left: 0,
                               right: 0,
                               top: 0,
                               bottom: 0,
                               opacity: 0,
                               zIndex: 1,
                               cursor: 'pointer'
                           }}
                           accept={this.props.accept}
                           onChange={this.handleChange}/>
                </RaisedButton>
                <div style={{paddingLeft: 12}}>{this.state.file.name}</div>
            </div>
            {
                this.props.uploader && this.state.progress !== undefined ?
                    <div style={{marginTop: 8}}>
                        <LinearProgress mode="determinate" value={this.state.progress.loaded}
                                        max={this.state.progress.total}/>
                    </div> : null
            }
            <div className="text-danger">{this.props.errorText}</div>
        </div>
    }

}
