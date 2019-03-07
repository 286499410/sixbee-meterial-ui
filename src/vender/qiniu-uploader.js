/**
 * Created by jason on 2017/9/26.
 */
import React, {Component} from 'react';
import * as Qiniu from 'qiniu-js';

export default class QiniuUploader extends Component {

    static defaultProps = {
        token: "",
        //putExtra
        fname: "",
        params: {},
        mimeType: ["image/png", "image/jpeg", "image/gif"],
        //config
        useCdnDomain: true,
        region: Qiniu.region.z0
    };

    state = {
        putExtra: {
            fname: "",
            params: {},
            mimeType: ["image/png", "image/jpeg", "image/gif"]
        },
        config: {
            useCdnDomain: true,
            region: Qiniu.region.z0
        }
    };

    constructor(props) {
        super(props);
        this.initData(props);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps);
    }

    initData(props) {

    }

    handleClick = (event) => {
        this.refs.file.click();
    };

    handleChange = (event) => {
        let file = event.target.files[0];
        let fileReader = new FileReader();
        let _this = this;
        fileReader.onload = function() {
            var blob = _this.convertBase64UrlToBlob(this.result, file.type);
            _this.handleUpload(blob);
        };
        fileReader.readAsDataURL(file)
    };

    convertBase64UrlToBlob = (urlData, filetype) => {
        //去掉url的头，并转换为byte
        var bytes = window.atob(urlData.split(',')[1]);
        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Int8Array(ab);
        var i;
        for (i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {type: filetype});
    };

    handleUpload = (blob) => {
        let putExtra = {
            fname: this.props.fname,
            params: this.props.params,
            mimeType: this.props.mimeType
        };
        let config = {
            useCdnDomain: this.props.useCdnDomain,
            region: this.props.region
        };
        let observable = Qiniu.upload(blob, null, this.props.token, putExtra, config);
        // 上传开始
        let subscription = observable.subscribe((res) => {
            console.log(res);
        }, (res) => {
            if(this.props.onError) {
                this.props.onError(res);
            }
        }, (res) => {
            if(this.props.onComplete) {
                this.props.onComplete(res);
            }
        });
        //subscription.unsubscribe() // 上传取消
    };

    render() {
        return <div style={{display: 'inline-block'}}>
            <input ref="file" type="file" style={{display: 'none'}} onChange={this.handleChange}/>
            <div style={{display: 'inline-block'}} onClick={this.handleClick}>
                {this.props.children}
            </div>
        </div>
    }
}