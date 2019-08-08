import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { __spread, __extends, __read } from 'tslib';
import { InjectionToken, Inject, Injectable, Optional, NgModule, Pipe, Directive, Input, Output, HostBinding, HostListener, EventEmitter, ElementRef, Renderer2, ChangeDetectorRef, defineInjectable, inject } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var SHARE_BUTTONS_CONFIG = new InjectionToken('shareButtonsConfig');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ShareButtonBase = /** @class */ (function () {
    function ShareButtonBase(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        this._props = _props;
        this._url = _url;
        this._http = _http;
        this._platform = _platform;
        this._document = _document;
        this._windowSize = _windowSize;
        this._disableButtonClick = _disableButtonClick;
        this._logger = _logger;
        this._self = this;
        /**
         * If share button supports share count
         */
        this.supportShareCount = false;
    }
    Object.defineProperty(ShareButtonBase.prototype, "text", {
        /** Share button label */
        get: /**
         * Share button label
         * @return {?}
         */
        function () {
            return this._props.text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareButtonBase.prototype, "ariaLabel", {
        /** Share button aria-label attribute */
        get: /**
         * Share button aria-label attribute
         * @return {?}
         */
        function () {
            return this._props.ariaLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareButtonBase.prototype, "color", {
        /** Share button color */
        get: /**
         * Share button color
         * @return {?}
         */
        function () {
            return this._props.color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareButtonBase.prototype, "icon", {
        /** Share button icon (FontAwesome) */
        get: /**
         * Share button icon (FontAwesome)
         * @return {?}
         */
        function () {
            return this._props.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareButtonBase.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareButtonBase.prototype, "android", {
        get: /**
         * @return {?}
         */
        function () {
            return this.desktop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareButtonBase.prototype, "ios", {
        get: /**
         * @return {?}
         */
        function () {
            return this.desktop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareButtonBase.prototype, "sharerUrl", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._platform.IOS)
                return this.ios;
            if (this._platform.ANDROID)
                return this.android;
            return this.desktop;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens share window
     */
    /**
     * Opens share window
     * @param {?} metaTags
     * @return {?}
     */
    ShareButtonBase.prototype.click = /**
     * Opens share window
     * @param {?} metaTags
     * @return {?}
     */
    function (metaTags) {
        return this._open(this._serializeMetaTags(metaTags));
    };
    /** Get share count of a URL */
    /**
     * Get share count of a URL
     * @param {?} url
     * @return {?}
     */
    ShareButtonBase.prototype.shareCount = /**
     * Get share count of a URL
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return undefined;
    };
    /**
     * @protected
     * @param {?} metaTags
     * @return {?}
     */
    ShareButtonBase.prototype._serializeMetaTags = /**
     * @protected
     * @param {?} metaTags
     * @return {?}
     */
    function (metaTags) {
        return Object.entries(this._supportedMetaTags)
            .map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return metaTags[key] ? value + "=" + encodeURIComponent(metaTags[key]) : '';
        })
            .join('&');
    };
    /**
     * @protected
     * @param {?} serializedMetaTags
     * @return {?}
     */
    ShareButtonBase.prototype._open = /**
     * @protected
     * @param {?} serializedMetaTags
     * @return {?}
     */
    function (serializedMetaTags) {
        var _this = this;
        return new Promise(function (resolve) {
            // Avoid SSR error
            if (_this.sharerUrl && _this._platform.isBrowser) {
                /** @type {?} */
                var finalUrl = _this.sharerUrl + serializedMetaTags;
                // Debug mode, log sharer link
                _this._logger(finalUrl);
                /** @type {?} */
                var popUp_1 = _this._document.defaultView.open(finalUrl, 'newwindow', _this._windowSize);
                // Resolve when share dialog is closed
                if (popUp_1) {
                    /** @type {?} */
                    var pollTimer_1 = _this._document.defaultView.setInterval(function () {
                        if (popUp_1.closed) {
                            _this._document.defaultView.clearInterval(pollTimer_1);
                            resolve();
                        }
                    }, 200);
                }
            }
            else {
                console.warn(_this.text + " button is not compatible on this Platform");
            }
        });
    };
    return ShareButtonBase;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FacebookButton = /** @class */ (function (_super) {
    __extends(FacebookButton, _super);
    function FacebookButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this.supportShareCount = true;
        _this._supportedMetaTags = {
            url: 'u'
        };
        return _this;
    }
    Object.defineProperty(FacebookButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "https://www.facebook.com/sharer/sharer.php?";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} url
     * @return {?}
     */
    FacebookButton.prototype.shareCount = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this._http.get("https://graph.facebook.com?id=" + url).pipe(map(function (res) { return +res.share.share_count; }));
    };
    return FacebookButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TwitterButton = /** @class */ (function (_super) {
    __extends(TwitterButton, _super);
    function TwitterButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this._supportedMetaTags = {
            url: 'url',
            description: 'text',
            tags: 'hashtags',
            via: 'via'
        };
        return _this;
    }
    Object.defineProperty(TwitterButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "https://twitter.com/intent/tweet?";
        },
        enumerable: true,
        configurable: true
    });
    return TwitterButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LinkedinButton = /** @class */ (function (_super) {
    __extends(LinkedinButton, _super);
    function LinkedinButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this._supportedMetaTags = {
            url: 'url',
            title: 'title',
            description: 'summary'
        };
        return _this;
    }
    Object.defineProperty(LinkedinButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "http://www.linkedin.com/shareArticle?";
        },
        enumerable: true,
        configurable: true
    });
    return LinkedinButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GooglePlusButton = /** @class */ (function (_super) {
    __extends(GooglePlusButton, _super);
    function GooglePlusButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this._supportedMetaTags = {
            url: 'url'
        };
        return _this;
    }
    Object.defineProperty(GooglePlusButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "https://plus.google.com/share?";
        },
        enumerable: true,
        configurable: true
    });
    return GooglePlusButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TumblrButton = /** @class */ (function (_super) {
    __extends(TumblrButton, _super);
    function TumblrButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this.supportShareCount = true;
        _this._supportedMetaTags = {
            url: 'canonicalUrl',
            description: 'caption',
            tags: 'tags'
        };
        return _this;
    }
    Object.defineProperty(TumblrButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "http://tumblr.com/widgets/share/tool?";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} url
     * @return {?}
     */
    TumblrButton.prototype.shareCount = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this._http.jsonp("https://api.tumblr.com/v2/share/stats?url=" + url, 'callback').pipe(map(function (res) { return +res.response.note_count; }));
    };
    return TumblrButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PinterestButton = /** @class */ (function (_super) {
    __extends(PinterestButton, _super);
    function PinterestButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this.supportShareCount = true;
        _this._supportedMetaTags = {
            url: 'url',
            description: 'description',
            image: 'media'
        };
        return _this;
    }
    Object.defineProperty(PinterestButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "https://in.pinterest.com/pin/create/button/?";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} metaTags
     * @return {?}
     */
    PinterestButton.prototype.click = /**
     * @param {?} metaTags
     * @return {?}
     */
    function (metaTags) {
        // Check if image parameter is defined
        if (metaTags.image) {
            return this._open(this._serializeMetaTags(metaTags));
        }
        console.warn('Pinterest button: image parameter is required!');
    };
    /**
     * @param {?} url
     * @return {?}
     */
    PinterestButton.prototype.shareCount = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this._http.get("https://api.pinterest.com/v1/urls/count.json?url=" + url, { responseType: 'text' }).pipe(map(function (text) { return JSON.parse(text.replace(/^receiveCount\((.*)\)/, '$1')); }), map(function (res) { return +res.count; }));
    };
    return PinterestButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RedditButton = /** @class */ (function (_super) {
    __extends(RedditButton, _super);
    function RedditButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this._supportedMetaTags = {
            url: 'url',
            title: 'title'
        };
        return _this;
    }
    Object.defineProperty(RedditButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "http://www.reddit.com/submit?";
        },
        enumerable: true,
        configurable: true
    });
    return RedditButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var VkButton = /** @class */ (function (_super) {
    __extends(VkButton, _super);
    function VkButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this._supportedMetaTags = {
            url: 'url'
        };
        return _this;
    }
    Object.defineProperty(VkButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "http://vk.com/share.php?";
        },
        enumerable: true,
        configurable: true
    });
    return VkButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TelegramButton = /** @class */ (function (_super) {
    __extends(TelegramButton, _super);
    function TelegramButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this._supportedMetaTags = {
            url: 'url',
            description: 'text'
        };
        return _this;
    }
    Object.defineProperty(TelegramButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return 'https://t.me/share/url?';
        },
        enumerable: true,
        configurable: true
    });
    return TelegramButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MessengerButton = /** @class */ (function (_super) {
    __extends(MessengerButton, _super);
    function MessengerButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this._supportedMetaTags = {
            url: 'link'
        };
        return _this;
    }
    Object.defineProperty(MessengerButton.prototype, "android", {
        get: /**
         * @return {?}
         */
        function () {
            return 'fb-messenger://share/?';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessengerButton.prototype, "ios", {
        get: /**
         * @return {?}
         */
        function () {
            return 'fb-messenger://share/?';
        },
        enumerable: true,
        configurable: true
    });
    return MessengerButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhatsappButton = /** @class */ (function (_super) {
    __extends(WhatsappButton, _super);
    function WhatsappButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this._supportedMetaTags = {
            description: 'text'
        };
        return _this;
    }
    Object.defineProperty(WhatsappButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "https://wa.me/?";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WhatsappButton.prototype, "android", {
        get: /**
         * @return {?}
         */
        function () {
            return "whatsapp://send?";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} metaTags
     * @return {?}
     */
    WhatsappButton.prototype.click = /**
     * @param {?} metaTags
     * @return {?}
     */
    function (metaTags) {
        // Add the URL to message body
        metaTags.description = metaTags.description ? metaTags.description + "\r\n" + this._url() : this._url();
        /** @type {?} */
        var serializedMetaTags = this._serializeMetaTags(metaTags);
        return this._open(serializedMetaTags);
    };
    return WhatsappButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var XingButton = /** @class */ (function (_super) {
    __extends(XingButton, _super);
    function XingButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this._supportedMetaTags = {
            url: 'url'
        };
        return _this;
    }
    Object.defineProperty(XingButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "https://www.xing.com/app/user?op=share&";
        },
        enumerable: true,
        configurable: true
    });
    return XingButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SmsButton = /** @class */ (function (_super) {
    __extends(SmsButton, _super);
    function SmsButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this._supportedMetaTags = {
            description: 'body'
        };
        return _this;
    }
    Object.defineProperty(SmsButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "sms:?";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmsButton.prototype, "android", {
        get: /**
         * @return {?}
         */
        function () {
            return "sms:?";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmsButton.prototype, "ios", {
        get: /**
         * @return {?}
         */
        function () {
            return 'sms:&';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} metaTags
     * @return {?}
     */
    SmsButton.prototype.click = /**
     * @param {?} metaTags
     * @return {?}
     */
    function (metaTags) {
        // Add the URL to message body
        metaTags.description = metaTags.description ? metaTags.description + "\r\n" + this._url() : this._url();
        /** @type {?} */
        var serializedMetaTags = this._serializeMetaTags(metaTags);
        return this._open(serializedMetaTags);
    };
    return SmsButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var EmailButton = /** @class */ (function (_super) {
    __extends(EmailButton, _super);
    function EmailButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this._supportedMetaTags = {
            title: 'subject',
            description: 'body'
        };
        return _this;
    }
    Object.defineProperty(EmailButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "mailto:?";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} metaTags
     * @return {?}
     */
    EmailButton.prototype.click = /**
     * @param {?} metaTags
     * @return {?}
     */
    function (metaTags) {
        // Add URL to message body
        metaTags.description = metaTags.description ? metaTags.description + "\r\n" + this._url() : this._url();
        /** @type {?} */
        var serializedMetaTags = this._serializeMetaTags(metaTags);
        return this._open(serializedMetaTags);
    };
    return EmailButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PrintButton = /** @class */ (function (_super) {
    __extends(PrintButton, _super);
    function PrintButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        return _this;
    }
    /**
     * @return {?}
     */
    PrintButton.prototype.click = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._document.defaultView.print();
            resolve();
        });
    };
    return PrintButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CopyButton = /** @class */ (function (_super) {
    __extends(CopyButton, _super);
    function CopyButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        return _this;
    }
    Object.defineProperty(CopyButton.prototype, "text", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disable ? this._props.extra.successLabel : this._props.text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyButton.prototype, "icon", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disable ? this._props.extra.successIcon : this._props.icon;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    CopyButton.prototype._disableButton = /**
     * @private
     * @return {?}
     */
    function () {
        // Disable pointer for tiny delay
        this._disable = true;
        this._disableButtonClick(true);
    };
    /**
     * @private
     * @return {?}
     */
    CopyButton.prototype._resetButton = /**
     * @private
     * @return {?}
     */
    function () {
        this._disable = false;
        this._disableButtonClick(false);
    };
    /**
     * @return {?}
     */
    CopyButton.prototype.click = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve) {
            try {
                /** @type {?} */
                var textArea = (/** @type {?} */ (_this._document.createElement('textarea')));
                textArea.value = decodeURIComponent(_this._url());
                _this._document.body.appendChild(textArea);
                // highlight TextArea to copy the sharing link
                if (_this._platform.IOS) {
                    /** @type {?} */
                    var range = _this._document.createRange();
                    range.selectNodeContents(textArea);
                    /** @type {?} */
                    var selection = _this._document.defaultView.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                    textArea.readOnly = true;
                    textArea.setSelectionRange(0, 999999);
                }
                else {
                    textArea.select();
                }
                _this._document.execCommand('copy');
                _this._document.body.removeChild(textArea);
                _this._disableButton();
            }
            catch (e) {
                console.warn('Copy link failed!', e.message);
            }
            finally {
                setTimeout(function () { return _this._resetButton(); }, 2000);
                resolve();
            }
        });
    };
    return CopyButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MixButton = /** @class */ (function (_super) {
    __extends(MixButton, _super);
    function MixButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this._supportedMetaTags = {
            url: 'url'
        };
        return _this;
    }
    Object.defineProperty(MixButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "https://mix.com/add?";
        },
        enumerable: true,
        configurable: true
    });
    return MixButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LineButton = /** @class */ (function (_super) {
    __extends(LineButton, _super);
    function LineButton(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
        var _this = _super.call(this, _props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) || this;
        _this._props = _props;
        _this._url = _url;
        _this._http = _http;
        _this._platform = _platform;
        _this._document = _document;
        _this._windowSize = _windowSize;
        _this._disableButtonClick = _disableButtonClick;
        _this._logger = _logger;
        _this._supportedMetaTags = {
            url: 'url'
        };
        return _this;
    }
    Object.defineProperty(LineButton.prototype, "desktop", {
        get: /**
         * @return {?}
         */
        function () {
            return "https://social-plugins.line.me/lineit/share?";
        },
        enumerable: true,
        configurable: true
    });
    return LineButton;
}(ShareButtonBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Default share buttons properties
 * @type {?}
 */
var SHARE_BUTTONS = {
    facebook: {
        create: function (a, b, c, d, e, f, g, h) { return new FacebookButton(a, b, c, d, e, f, g, h); },
        text: 'Facebook',
        icon: ['fab', 'facebook-f'],
        color: '#4267B2',
        ariaLabel: 'Share on Facebook'
    },
    twitter: {
        create: function (a, b, c, d, e, f, g, h) { return new TwitterButton(a, b, c, d, e, f, g, h); },
        text: 'Twitter',
        icon: ['fab', 'twitter'],
        color: '#00acee',
        ariaLabel: 'Share on Twitter'
    },
    linkedin: {
        create: function (a, b, c, d, e, f, g, h) { return new LinkedinButton(a, b, c, d, e, f, g, h); },
        text: 'LinkedIn',
        icon: ['fab', 'linkedin-in'],
        color: '#006fa6',
        ariaLabel: 'Share on LinkedIn'
    },
    google: {
        create: function (a, b, c, d, e, f, g, h) { return new GooglePlusButton(a, b, c, d, e, f, g, h); },
        text: 'Google+',
        icon: ['fab', 'google-plus-g'],
        color: '#DB4437',
        ariaLabel: 'Share on Google plus'
    },
    pinterest: {
        create: function (a, b, c, d, e, f, g, h) { return new PinterestButton(a, b, c, d, e, f, g, h); },
        text: 'Pinterest',
        icon: ['fab', 'pinterest-p'],
        color: '#BD091D',
        ariaLabel: 'Share on Pinterest'
    },
    reddit: {
        create: function (a, b, c, d, e, f, g, h) { return new RedditButton(a, b, c, d, e, f, g, h); },
        text: 'Reddit',
        icon: ['fab', 'reddit-alien'],
        color: '#FF4006',
        ariaLabel: 'Share on Reddit'
    },
    tumblr: {
        create: function (a, b, c, d, e, f, g, h) { return new TumblrButton(a, b, c, d, e, f, g, h); },
        text: 'Tumblr',
        icon: ['fab', 'tumblr'],
        color: '#36465D',
        ariaLabel: 'Share on Tumblr'
    },
    mix: {
        create: function (a, b, c, d, e, f, g, h) { return new MixButton(a, b, c, d, e, f, g, h); },
        text: 'Mix',
        icon: ['fab', 'mix'],
        color: '#ff8226',
        ariaLabel: 'Share on Mix'
    },
    vk: {
        create: function (a, b, c, d, e, f, g, h) { return new VkButton(a, b, c, d, e, f, g, h); },
        text: 'VKontakte',
        icon: ['fab', 'vk'],
        color: '#4C75A3',
        ariaLabel: 'Share on VKontakte'
    },
    telegram: {
        create: function (a, b, c, d, e, f, g, h) { return new TelegramButton(a, b, c, d, e, f, g, h); },
        text: 'Telegram',
        icon: ['fab', 'telegram-plane'],
        color: '#0088cc',
        ariaLabel: 'Share on Telegram'
    },
    messenger: {
        create: function (a, b, c, d, e, f, g, h) { return new MessengerButton(a, b, c, d, e, f, g, h); },
        text: 'Messenger',
        icon: ['fab', 'facebook-messenger'],
        color: '#0080FF',
        ariaLabel: 'Share on Messenger'
    },
    whatsapp: {
        create: function (a, b, c, d, e, f, g, h) { return new WhatsappButton(a, b, c, d, e, f, g, h); },
        text: 'WhatsApp',
        icon: ['fab', 'whatsapp'],
        color: '#25D366',
        ariaLabel: 'Share on WhatsApp'
    },
    xing: {
        create: function (a, b, c, d, e, f, g, h) { return new XingButton(a, b, c, d, e, f, g, h); },
        text: 'Xing',
        icon: ['fab', 'xing'],
        color: '#006567',
        ariaLabel: 'Share on Xing'
    },
    line: {
        create: function (a, b, c, d, e, f, g, h) { return new LineButton(a, b, c, d, e, f, g, h); },
        text: 'Line',
        icon: ['fab', 'line'],
        color: '#00b900',
        ariaLabel: 'Share on Line'
    },
    sms: {
        create: function (a, b, c, d, e, f, g, h) { return new SmsButton(a, b, c, d, e, f, g, h); },
        text: 'SMS',
        icon: 'comment-alt',
        color: '#20c16c',
        ariaLabel: 'Share link via SMS'
    },
    email: {
        create: function (a, b, c, d, e, f, g, h) { return new EmailButton(a, b, c, d, e, f, g, h); },
        text: 'Email',
        icon: 'envelope',
        color: '#FF961C',
        ariaLabel: 'Share link via email'
    },
    print: {
        create: function (a, b, c, d, e, f, g, h) { return new PrintButton(a, b, c, d, e, f, g, h); },
        text: 'Print',
        icon: 'print',
        color: '#765AA2',
        ariaLabel: 'Print page'
    },
    copy: {
        create: function (a, b, c, d, e, f, g, h) { return new CopyButton(a, b, c, d, e, f, g, h); },
        text: 'Copy link',
        icon: 'link',
        color: '#607D8B',
        ariaLabel: 'Copy link',
        extra: {
            successLabel: 'Copied',
            successIcon: 'check'
        }
    },
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Simple object check.
 * @param {?} item
 * @return {?}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
/**
 * Deep merge two objects.
 * @param {?} target
 * @param {...?} sources
 * @return {?}
 */
function mergeDeep(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    var _a, _b;
    if (!sources.length) {
        return target;
    }
    /** @type {?} */
    var source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (var key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, (_a = {}, _a[key] = {}, _a));
                }
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, (_b = {}, _b[key] = source[key], _b));
            }
        }
    }
    return mergeDeep.apply(void 0, __spread([target], sources));
}
/**
 * Returns a readable number from share count
 * @param {?} num
 * @param {?} digits
 * @return {?}
 */
function shareCountFormatter(num, digits) {
    /** @type {?} */
    var si = [
        { value: 1E9, symbol: 'B' },
        { value: 1E6, symbol: 'M' },
        { value: 1E3, symbol: 'K' }
    ];
    /** @type {?} */
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    for (var i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
        }
    }
    return num.toFixed(digits).replace(rx, '$1');
}
/**
 * Returns a valid URL or falls back to current URL
 * @param {?} url
 * @param {?} fallbackUrl
 * @return {?}
 */
function getValidUrl(url, fallbackUrl) {
    if (url) {
        /** @type {?} */
        var r = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (r.test(url))
            return url;
        console.warn("[ShareButtons]: Sharing link '" + url + "' is invalid!");
    }
    return fallbackUrl;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ShareService = /** @class */ (function () {
    function ShareService(config) {
        /**
         * Global config that applies on all share buttons in the app
         */
        this.config = {
            prop: SHARE_BUTTONS,
            theme: 'default',
            include: [],
            exclude: [],
            size: 0,
            autoSetMeta: true,
            windowWidth: 800,
            windowHeight: 500,
            moreButtonIcon: 'ellipsis-h',
            lessButtonIcon: 'minus'
        };
        /**
         * Stream that emits when config changes
         */
        this.config$ = new BehaviorSubject(this.config);
        if (config) {
            this.setConfig(config);
        }
    }
    Object.defineProperty(ShareService.prototype, "prop", {
        /**
         * Share buttons properties, used to get the text, color and icon of each button.
         */
        get: /**
         * Share buttons properties, used to get the text, color and icon of each button.
         * @return {?}
         */
        function () {
            return this.config.prop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareService.prototype, "windowSize", {
        get: /**
         * @return {?}
         */
        function () {
            return "width=" + this.config.windowWidth + ", height=" + this.config.windowHeight;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} config
     * @return {?}
     */
    ShareService.prototype.setConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this.config = mergeDeep(this.config, config);
        this.config$.next(this.config);
    };
    ShareService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ShareService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [SHARE_BUTTONS_CONFIG,] }] }
    ]; };
    /** @nocollapse */ ShareService.ngInjectableDef = defineInjectable({ factory: function ShareService_Factory() { return new ShareService(inject(SHARE_BUTTONS_CONFIG, 8)); }, token: ShareService, providedIn: "root" });
    return ShareService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ShareDirective = /** @class */ (function () {
    function ShareDirective(_meta, _el, _http, _platform, _renderer, _cd, _share, _document) {
        this._meta = _meta;
        this._el = _el;
        this._http = _http;
        this._platform = _platform;
        this._renderer = _renderer;
        this._cd = _cd;
        this._share = _share;
        this._document = _document;
        /**
         * Share window closed event subscription
         */
        this._shareWindowClosed = Subscription.EMPTY;
        /**
         * Get share count
         */
        this.getCount = false;
        /**
         * Set meta tags from document head, useful when SEO is supported
         */
        this.autoSetMeta = this._share.config.autoSetMeta;
        /**
         * Sharing link
         */
        this.url = this._share.config.url;
        /**
         * Sets the title parameter
         */
        this.title = this._share.config.title;
        /**
         * Sets the description parameter
         */
        this.description = this._share.config.description;
        /**
         * Sets the image parameter for sharing on Pinterest
         */
        this.image = this._share.config.image;
        /**
         * Sets the tags parameter for sharing on Twitter and Tumblr
         */
        this.tags = this._share.config.tags;
        /**
         * Stream that emits when share count is fetched
         */
        this.count = new EventEmitter();
        /**
         * Stream that emits when share dialog is opened
         */
        this.opened = new EventEmitter();
        /**
         * Stream that emits when share dialog is closed
         */
        this.closed = new EventEmitter();
    }
    /** Share the link */
    /**
     * Share the link
     * @return {?}
     */
    ShareDirective.prototype.share = /**
     * Share the link
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var metaTags = this.autoSetMeta ? {
            url: this.url,
            title: this.title || this._getMetaTagContent('og:title'),
            description: this.description || this._getMetaTagContent('og:description'),
            image: this.image || this._getMetaTagContent('og:image'),
            via: this._share.config.twitterAccount,
            tags: this.tags,
        } : {
            url: this.url,
            title: this.title,
            description: this.description,
            image: this.image,
            tags: this.tags,
            via: this._share.config.twitterAccount,
        };
        // Emit when share dialog is opened
        this.opened.emit(this.shareButtonName);
        // Share the link
        this.shareButton.click(metaTags).then(function () {
            // Emit when share dialog is closed
            return _this.closed.emit(_this.shareButtonName);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ShareDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        // Avoid SSR error
        if (this._platform.isBrowser) {
            if (this._shareButtonChanged(changes['shareButtonName'])) {
                this._createShareButton();
            }
            if (this._urlChanged(changes['url'])) {
                this.url = getValidUrl(this.autoSetMeta
                    ? this.url || this._getMetaTagContent('og:url')
                    : this.url, this._document.defaultView.location.href);
                if (this.getCount && this.shareButton.supportShareCount) {
                    this.shareButton.shareCount(this.url).subscribe(function (count) { return _this.count.emit(count); });
                }
            }
        }
    };
    /**
     * @return {?}
     */
    ShareDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._shareWindowClosed.unsubscribe();
    };
    /**
     * @private
     * @return {?}
     */
    ShareDirective.prototype._createShareButton = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var shareButtonFactory = this._share.config.prop[this.shareButtonName];
        /** @type {?} */
        var button = shareButtonFactory.create(shareButtonFactory, 
        // Pass the url property as a function, so the button class always gets the recent url value.
        function () { return _this.url; }, this._http, this._platform, this._document, this._share.windowSize, 
        // This function is meant for the copy button
        function (disabled) {
            _this.pointerEvents = disabled ? 'none' : 'auto';
            _this._cd.markForCheck();
        }, 
        // Logger used for debugging
        function (text) { return _this._share.config.debug ? console.log(text) : null; });
        if (button) {
            // Set share button properties
            this.shareButton = button;
            // Remove previous button class
            this._renderer.removeClass(this._el.nativeElement, "sb-" + this._buttonClass);
            // Add new button class
            this._renderer.addClass(this._el.nativeElement, "sb-" + this.shareButtonName);
            // Set button css color variable
            this._el.nativeElement.style.setProperty('--button-color', this.shareButton.color);
            // Keep a copy of the class for future replacement
            this._buttonClass = this.shareButtonName;
            // Set aria-label attribute
            this._renderer.setAttribute(this._el.nativeElement, 'aria-label', button.ariaLabel);
        }
        else {
            console.error("[ShareButtons]: The share button '" + this.shareButtonName + "' does not exist!");
        }
    };
    /** Get meta tag content */
    /**
     * Get meta tag content
     * @private
     * @param {?} key
     * @return {?}
     */
    ShareDirective.prototype._getMetaTagContent = /**
     * Get meta tag content
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var metaUsingProperty = this._meta.getTag("property=\"" + key + "\"");
        if (metaUsingProperty)
            return metaUsingProperty.getAttribute('content');
        /** @type {?} */
        var metaUsingName = this._meta.getTag("name=\"" + key + "\"");
        if (metaUsingName)
            return metaUsingName.getAttribute('content');
    };
    /**
     * @private
     * @param {?} change
     * @return {?}
     */
    ShareDirective.prototype._shareButtonChanged = /**
     * @private
     * @param {?} change
     * @return {?}
     */
    function (change) {
        return change && (change.firstChange || change.previousValue !== change.currentValue);
    };
    /**
     * @private
     * @param {?} change
     * @return {?}
     */
    ShareDirective.prototype._urlChanged = /**
     * @private
     * @param {?} change
     * @return {?}
     */
    function (change) {
        return !this.url || (change && change.previousValue !== change.currentValue);
    };
    ShareDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[shareButton], [share-button]'
                },] }
    ];
    /** @nocollapse */
    ShareDirective.ctorParameters = function () { return [
        { type: Meta },
        { type: ElementRef },
        { type: HttpClient },
        { type: Platform },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: ShareService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    ShareDirective.propDecorators = {
        shareButtonName: [{ type: Input, args: ['shareButton',] }],
        getCount: [{ type: Input }],
        autoSetMeta: [{ type: Input }],
        url: [{ type: Input }],
        title: [{ type: Input }],
        description: [{ type: Input }],
        image: [{ type: Input }],
        tags: [{ type: Input }],
        count: [{ type: Output }],
        opened: [{ type: Output }],
        closed: [{ type: Output }],
        pointerEvents: [{ type: HostBinding, args: ['style.pointerEvents',] }],
        share: [{ type: HostListener, args: ['click',] }]
    };
    return ShareDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ShareCountPipe = /** @class */ (function () {
    function ShareCountPipe() {
    }
    /**
     * @param {?} num
     * @param {?=} digits
     * @return {?}
     */
    ShareCountPipe.prototype.transform = /**
     * @param {?} num
     * @param {?=} digits
     * @return {?}
     */
    function (num, digits) {
        return shareCountFormatter(num, digits);
    };
    ShareCountPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'shareCount'
                },] }
    ];
    return ShareCountPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ShareModule = /** @class */ (function () {
    function ShareModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    ShareModule.withConfig = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: ShareModule,
            providers: [
                { provide: SHARE_BUTTONS_CONFIG, useValue: config }
            ]
        };
    };
    ShareModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        PlatformModule
                    ],
                    declarations: [
                        ShareDirective,
                        ShareCountPipe
                    ],
                    exports: [
                        ShareDirective,
                        ShareCountPipe
                    ]
                },] }
    ];
    return ShareModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ShareModule, ShareService, ShareDirective, SHARE_BUTTONS_CONFIG, SHARE_BUTTONS, ShareCountPipe };

//# sourceMappingURL=ngx-share-core.js.map