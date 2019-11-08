'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var level = {
    small: 1,
    default: 2,
    large: 3
};

var style = {

    getSize: function getSize(props) {
        return props.size || 'default';
    },

    getLevel: function getLevel(props) {
        var size = style.getSize(props);
        return level[size] || level['default'];
    },

    textField: function textField(props) {
        var l = style.getLevel(props);
        var textStyle = {
            style: {
                height: props.label ? 36 + l * 12 : (36 + l * 12) * 2 / 3,
                fontSize: 10 + l * 2,
                lineHeight: 1.414
            },
            floatingLabelStyle: {
                top: 14 + l * 8
            },
            floatingLabelFocusStyle: {
                top: 24 + l * 4
            },
            floatingLabelShrinkStyle: {
                top: 24 + l * 4
            },
            errorStyle: {
                bottom: props.label ? 6 + l * 2 : l
            },
            hintStyle: {
                bottom: 5 + l * 2
            },
            underlineStyle: {
                bottom: 2 + l * 2
            },
            inputStyle: {
                marginTop: props.label ? 8 + l * 2 : 0
            },
            textareaStyle: {
                marginTop: props.label ? 8 + l * 6 : l * 6,
                marginBottom: props.label ? -(8 + l * 6) : -l * 6,
                lineHeight: 1.41
            }
        };
        return textStyle;
    },

    selectField: function selectField(props) {
        var textField = style.textField(props);
        var l = style.getLevel(props);
        var selectProps = _lodash2.default.merge({}, textField, {
            style: {},
            labelStyle: {
                paddingRight: 16 + l * 8,
                height: (props.label ? 20 : 16) + l * 12,
                lineHeight: (props.label ? 36 : 16) + l * 12 + 'px',
                top: 0
            },
            iconStyle: {
                height: 20 + l * 4,
                width: 20 + l * 4,
                top: props.label ? 8 + l * 4 : l * 2 + 2,
                padding: 0,
                right: -6
            },
            dropDownMenuProps: {
                maxHeight: 200 + l * 20
            },
            listStyle: {
                paddingTop: 6 + l * 3,
                paddingBottom: 6 + l * 3
            },
            menuItemStyle: {
                fontSize: 10 + l * 2,
                lineHeight: 2,
                minHeight: 20 + l * 4,
                innerDivStyle: {
                    paddingLeft: l * 6 + 6,
                    paddingRight: l * 6 + 6
                }
            }
        });
        if (props.scene == 'table') {
            selectProps.labelStyle.height = 24 + l * 8;
            selectProps.labelStyle.lineHeight = 24 + l * 8 + 'px';
            selectProps.iconStyle.top = l * 2 + 2;
        }
        return selectProps;
    },

    dropdown: function dropdown(props) {
        var l = style.getLevel(props);
        return {
            menuStyle: {
                listStyle: {
                    display: 'block',
                    paddingTop: 6 + l * 3,
                    paddingBottom: 6 + l * 3,
                    maxHeight: 440,
                    overflowY: 'auto'
                },
                menuItemStyle: {
                    fontSize: 10 + l * 2,
                    lineHeight: 24 + l * 4 + 'px',
                    minHeight: 24 + l * 4
                }
            }
        };
    },

    contextMenu: function contextMenu(props) {
        var l = style.getLevel(props);
        return {
            menuStyle: {
                listStyle: {
                    display: 'block',
                    paddingTop: 6 + l * 3,
                    paddingBottom: 6 + l * 3,
                    maxHeight: 440,
                    overflowY: 'auto'
                },
                menuItemStyle: {
                    fontSize: 10 + l * 2,
                    lineHeight: 24 + l * 4 + 'px',
                    minHeight: 24 + l * 4
                }
            }
        };
    },

    dateField: function dateField(props) {
        var textField = style.textField(props);
        var l = style.getLevel(props);
        return _lodash2.default.merge({}, textField, {
            iconStyle: {
                style: {
                    top: props.label ? 20 + l * 4 : 3 + l * 2,
                    width: 20 + l * 4,
                    height: 20 + l * 4,
                    padding: 0,
                    right: -6
                },
                iconStyle: {
                    fontSize: 12 + l * 2
                }
            }
        });
    },

    autoField: function autoField(props) {
        var textField = style.textField(props);
        var l = style.getLevel(props);
        var autoStyle = _lodash2.default.merge({}, textField, {
            rootStyle: {
                position: 'relative',
                width: '100%'
            },
            menuStyle: {},
            menuProps: {
                listStyle: {
                    paddingTop: 6 + l * 3,
                    paddingBottom: 6 + l * 3,
                    display: 'block',
                    maxHeight: 240 + l * 20,
                    overflowY: 'auto'

                },
                menuItemStyle: {
                    fontSize: 10 + l * 2,
                    lineHeight: 1.5,
                    minHeight: 20 + l * 4,
                    paddingTop: 4 + l * 2,
                    paddingBottom: 4 + l * 2,
                    whiteSpace: 'normal'
                }
            },
            iconStyle: {
                style: {
                    top: props.label ? 20 + l * 4 : 3 + l * 2,
                    width: 20 + l * 4,
                    height: 20 + l * 4,
                    padding: 0,
                    right: -6,
                    fontSize: 12 + l * 2
                },
                iconStyle: {
                    fontSize: 12 + l * 2
                }
            },
            popoverProps: {
                style: {
                    left: -10000,
                    boxShadow: '0 1px 10px #888'
                }
            },
            inputStyle: {
                marginTop: props.label ? 8 + l * 2 : 0,
                width: props.hasClear ? 'calc(100% - 24px)' : '100%'
            },
            style: {
                width: '100%'
            }
        });
        return autoStyle;
    },

    calendar: function calendar(props) {
        var textField = style.textField(props);
        var l = style.getLevel(props);
        var calendarStyle = _lodash2.default.merge({}, textField, {
            rootStyle: {
                position: 'relative',
                width: '100%'
            },
            iconStyle: {
                style: {
                    top: props.label ? 20 + l * 4 : 3 + l * 2,
                    width: 20 + l * 4,
                    height: 20 + l * 4,
                    padding: 0,
                    right: -6,
                    fontSize: 12 + l * 2
                },
                iconStyle: {
                    fontSize: 12 + l * 2
                }
            },
            popoverStyle: {
                left: -10000,
                boxShadow: '0 1px 10px #888'
            },
            inputStyle: {
                marginTop: props.label ? 8 + l * 2 : 0,
                width: props.hasClear ? 'calc(100% - 24px)' : '100%'
            },
            style: {
                width: '100%'
            }
        });
        return calendarStyle;
    },

    button: function button(props) {
        var l = style.getLevel(props);
        var height = 16 + l * 6;
        return {
            style: {
                boxShadow: 'none',
                border: props.type == 'default' ? '1px solid rgb(217, 227, 239)' : 'none',
                borderRadius: 3
            },
            buttonStyle: {
                height: height,
                lineHeight: height + 'px'
            },
            overlayStyle: {
                height: height
            },
            labelStyle: (0, _extends3.default)({
                fontSize: 10 + l * 2
            }, function () {
                if (!props.icon) {
                    return {
                        paddingLeft: 8 + l * 2,
                        paddingRight: 8 + l * 2
                    };
                }
                if (props.labelPosition == 'after') {
                    return {
                        paddingLeft: 4 + l,
                        paddingRight: 8 + l * 2
                    };
                } else {
                    return {
                        paddingLeft: 8 + l * 2,
                        paddingRight: 4 + l
                    };
                }
            }()),
            iconStyle: (0, _extends3.default)({
                fontSize: 12 + l * 2
            }, function () {
                if (props.labelPosition == 'after') {
                    return {
                        marginTop: -(l * 2),
                        marginLeft: 8 + l * 2
                    };
                } else {
                    return {
                        marginTop: -(l * 2),
                        marginRight: 8 + l * 2
                    };
                }
            }())
        };
    },

    checkbox: function checkbox(props) {
        var l = style.getLevel(props);
        return {
            iconStyle: {
                width: 16 + l * 2,
                height: 16 + l * 2,
                marginRight: 2 + l * 2
            },
            labelStyle: {
                lineHeight: 16 + l * 2 + 'px',
                fontSize: 10 + l * 2
            },
            style: {
                marginTop: 8 + l * 2
            }
        };
    },

    radio: function radio(props) {
        var l = style.getLevel(props);
        return {
            rootStyle: {
                width: '100%'
            },
            labelStyle: {
                color: "rgba(0, 0, 0, 0.3)",
                lineHeight: 16 + l * 2 + 'px',
                fontSize: 10 + l * 2,
                marginTop: 6 + l * 2,
                marginBottom: 2 + l * 2
            },
            groupStyle: {
                display: 'flex'
            },
            radioStyle: {
                display: 'inline-block',
                width: 'auto',
                marginLeft: 12,
                whiteSpace: 'nowrap'
            }
        };
    },

    editor: function editor(props) {
        var l = style.getLevel(props);
        return {
            labelStyle: {
                color: "rgba(0, 0, 0, 0.3)",
                lineHeight: 16 + l * 2 + 'px',
                fontSize: 10 + l * 2,
                marginTop: 6 + l * 2
            }
        };
    },

    tab: {
        style: {
            backgroundColor: 'transparent',
            color: '#222'
        }
    },

    getStyle: function getStyle(type, props) {
        var styleProps = void 0;
        var size = props.size || 'default';
        switch (type) {
            case 'text':
                styleProps = style.textField(props);
                break;
            case 'select':
                styleProps = style.selectField(props);
                break;
            case 'date':
                styleProps = style.dateField(props);
                break;
            case 'auto':
                styleProps = style.autoField(props);
                break;
            case 'checkbox':
                styleProps = style.checkbox(props);
                break;
            case 'radio':
                styleProps = style.radio(props);
                break;
            case 'tab':
                styleProps = style.tab;
                break;
            case 'button':
                styleProps = style.button(props);
                break;
            case 'dropdown':
                styleProps = style.dropdown(props);
                break;
            case 'contextMenu':
                styleProps = style.dropdown(props);
                break;
            case 'calender':
                styleProps = style.calendar(props);
                break;
        }
        return styleProps;
    }
};
exports.default = style;