var globalStyle = function (setting, tpl) {
    return {
        tagName: 'mjml',
        attributes: {},
        children: [{
            tagName: 'mj-head',
            children: [
                {
                    'tagName': 'mj-attributes',
                    "children": [
                        {
                            'tagName': 'mj-text',
                            'attributes': _getMjText(setting)
                        }
                    ],
                    'attributes': {}
                },
                {
                    'tagName': 'mj-style',
                    'content': _makeGlobalStyle(setting.FONT_SETTINGS),
                    'attributes': {}
                }
            ],
            attributes: {}
        },
        {
            tagName: 'mj-body',
            attributes: {},
            children: tpl
        }],
    }
};

var _getMjText = function(setting) {
    var _text = {};
    if (setting.FONT_SETTINGS[3].color) {
        _text.color = setting.FONT_SETTINGS[3].color;
    }
    if (setting.LINE_HEIGHT) {
        _text['line-height'] = setting.LINE_HEIGHT;
    }
    if (setting.FONT_SETTINGS[3].size) {
        _text['font-size'] = setting.FONT_SETTINGS[3].size + 'px';
    }
    if (setting.FONT_SETTINGS[3].font) {
        _text['font-family'] = setting.FONT_SETTINGS[3].font;
    }
    return _text;
};

var _getMjButton = function(setting) {
    var _button = {};
    if (setting.FONT_SETTINGS[4].color) {
        _button.color = setting.FONT_SETTINGS[4].color;
    }
    if (setting.COLOR_SETTINGS[2].backgroundColor) {
        _button['background-color'] = setting.COLOR_SETTINGS[2].backgroundColor;
    }
    if (setting.FONT_SETTINGS[4].size) {
        _button['font-size'] = setting.FONT_SETTINGS[4].size + 'px';
    }
    if (setting.FONT_SETTINGS[4].font) {
        _button['font-family'] = setting.FONT_SETTINGS[4].font;
    }
    return _button;
};

var _makeGlobalStyle = function(setting) {
    var style = '';
    setting.map(function(fontSetting) {
        style += fontSetting.teg + ' {';
        if (fontSetting.color) {
            style += 'color: ' + fontSetting.color + '; ';
        }
        if (fontSetting.font) {
            style += 'font-family: ' + fontSetting.font + '; ';
        }
        if (fontSetting.size) {
            style += 'font-size: ' + fontSetting.size + 'px; ';
        }
        style += '} ';
    });
    return style;
};

var _makeSection = function(row) {
    return {
        tagName: 'mj-section',
        attributes: {
            'background-color': '',
            'full-width': 'full-width'
        },
        children: row,
    }
};

var _makeColumn = function(cell) {
    return {
        tagName: 'mj-column',
        attributes: {
            'background-color': '',
        },
        children: cell,
    }
};

var _getYtImg = function(ytLink) {
    if (!ytLink) {
        return false;
    }
    const ytVideoId = ytLink.match(/v=(.*)$/i);
    if (ytVideoId && ytVideoId[1]) {
        return 'https://img.youtube.com/vi/' + ytVideoId[1] + '/0.jpg';
    }
    return false;
};

var _strToObj = function(socialList) {
    if (socialList && typeof socialList === 'string') {
        return JSON.parse(socialList);
    }
    return socialList;
};

var _makeSocialSection = function(networks) {
    var list = _strToObj(networks);
    var listName = Object.keys(list);
    var _socialList = [];
    var _element = {
        tagName: 'mj-social-element',
        content: '',
    };
    listName.map(function(social) {
        _element.attributes = {
            'background-color': '#FFFFFF',
            href: list[social],
            name: social,
            padding: '10px',
            'icon-size': '30px',
            'border-radius': '10px'
            //src: 'http://localhost:3000/img/facebook.png'
        };
        _socialList.push(Object.assign({}, _element));
    });
    return _socialList;
};

var _makeElement = function(element) {
    var _content;
    var _type = function(type) {
        switch (type) {
            case 'text':
                return 'mj-text';
            case 'image':
                return 'mj-image';
            case 'gif':
                return 'mj-image';
            case 'button':
                return 'mj-button';
            case 'divider':
                return 'mj-divider';
            case 'spacer':
                return 'mj-spacer';
            case 'code':
                return 'mj-raw';
            case 'social':
                return 'mj-social';
            case 'video':
                return 'mj-image';
            default:
                break;
        }
    };
    var _attributes = function(element) {
        var _props = {};
        var _propsName = Object.keys(element.attribute);
        _propsName.map(function(prop) {
            if (/^_/.test(prop)) {
                return false;
            }
            switch (prop) {
            case 'textAlign':
                _props.align = element.attribute[prop];
                break;
            case 'textFont':
                _props['font-family'] = element.attribute[prop];
                break;
            case 'topBottomMargin':
                _props.padding = element.attribute[prop] + 'px ' + element.attribute.leftRightMargin + 'px';
                break;
            case 'leftRightMargin':
                _props.padding = element.attribute.topBottomMargin + 'px ' + element.attribute[prop] + 'px';
                break;
            case 'imgWithLink':
                _props.src = element.attribute[prop];
                break;
            case 'margin':
                _props.padding = element.attribute[prop] + 'px';
                break;
            case 'imageSize':
                _props.width = element.attribute[prop];
                break;
            case 'buttonText':
                _content = element.attribute[prop];
                break;
            case 'link':
                _props.href = element.attribute[prop];
                break;
            case 'border':
                _props['border-radius'] = element.attribute[prop] === 'radius' ? '24px' : '0';
                break;
            case 'buttonColor':
                _props['background-color'] = element.attribute[prop];
                break;
            case 'textColor':
                _props.color = element.attribute[prop];
                break;
            case 'textSize':
                _props['font-size'] = element.attribute[prop] + 'px';
                break;
            case 'borderHeight':
                _props['border-width'] = element.attribute[prop] + 'px';
                break;
            case 'borderColor':
                _props['border-color'] = element.attribute[prop];
                break;
            case 'borderStyle':
                _props['border-style'] = element.attribute[prop];
                break;
            case 'height':
                _props['padding-top'] = element.attribute[prop] + 'px';
                _props['padding-bottom'] = element.attribute[prop] + 'px';
                break;
            case 'width':
                _props['padding-left'] = element.attribute[prop] + 'px';
                _props['padding-right'] = element.attribute[prop] + 'px';
                break;
            case 'spaceHeight':
                _props.height = element.attribute[prop] + 'px';
                break;
            case 'code':
                _content = element.attribute[prop];
                break;
            case 'content':
                _content = element.attribute[prop];
                break;
            case 'iconStyle':
                _content = element.attribute[prop];
                break;
            case 'networkSetting':
                _content = element.attribute[prop];
                break;
            case 'videoLink':
                _props.href = element.attribute[prop];
                _props.src = _getYtImg(element.attribute[prop]);
                break;
            default:
                _props[prop] = element.attribute[prop];
                break;
            }
        });
        return _props;
    };

    var _element = {
        tagName: _type(element.type),
        attributes: _attributes(element)
    };

    if (['mj-raw', 'mj-button', 'mj-text'].indexOf(_element.tagName) !== -1) {
        _element.content = _content;
    }

    if ('mj-social' === _element.tagName) {
        _element.children = _makeSocialSection(element.attribute.networkSetting);
    }

    return [_element];
};

var Converter = function(data) {
    var _section = [];
    data.mails.map(function(row) {
        var _column = [];
        row.value.map(function(cell) {
            if (Object.keys(cell).length > 0) {
                _column.push(_makeColumn(_makeElement(cell)));
            }
        });
        _section.push(_makeSection(_column));
    });
    return globalStyle(data.settings, _section);
};

module.exports = Converter;