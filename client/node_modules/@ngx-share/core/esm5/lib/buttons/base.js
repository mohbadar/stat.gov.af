/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
            var _b = tslib_1.__read(_a, 2), key = _b[0], value = _b[1];
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
export { ShareButtonBase };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    ShareButtonBase.prototype._self;
    /**
     * Share button supported meta tags
     * @type {?}
     * @protected
     */
    ShareButtonBase.prototype._supportedMetaTags;
    /**
     * If share button supports share count
     * @type {?}
     */
    ShareButtonBase.prototype.supportShareCount;
    /**
     * @type {?}
     * @protected
     */
    ShareButtonBase.prototype._props;
    /**
     * @type {?}
     * @protected
     */
    ShareButtonBase.prototype._url;
    /**
     * @type {?}
     * @protected
     */
    ShareButtonBase.prototype._http;
    /**
     * @type {?}
     * @protected
     */
    ShareButtonBase.prototype._platform;
    /**
     * @type {?}
     * @protected
     */
    ShareButtonBase.prototype._document;
    /**
     * @type {?}
     * @protected
     */
    ShareButtonBase.prototype._windowSize;
    /**
     * @type {?}
     * @protected
     */
    ShareButtonBase.prototype._disableButtonClick;
    /**
     * @type {?}
     * @protected
     */
    ShareButtonBase.prototype._logger;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtc2hhcmUvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9idXR0b25zL2Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQTtJQWdERSx5QkFBc0IsTUFBb0IsRUFDcEIsSUFBa0IsRUFDbEIsS0FBaUIsRUFDakIsU0FBbUIsRUFDbkIsU0FBbUIsRUFDbkIsV0FBbUIsRUFFbkIsbUJBQStDLEVBRS9DLE9BQStCO1FBVC9CLFdBQU0sR0FBTixNQUFNLENBQWM7UUFDcEIsU0FBSSxHQUFKLElBQUksQ0FBYztRQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUVuQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQTRCO1FBRS9DLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBdkRsQyxVQUFLLEdBQW9CLElBQUksQ0FBQzs7OztRQTRDakQsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO0lBWTFCLENBQUM7SUFsREQsc0JBQUksaUNBQUk7UUFEUix5QkFBeUI7Ozs7O1FBQ3pCO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUdELHNCQUFJLHNDQUFTO1FBRGIsd0NBQXdDOzs7OztRQUN4QztZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxrQ0FBSztRQURULHlCQUF5Qjs7Ozs7UUFDekI7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksaUNBQUk7UUFEUixzQ0FBc0M7Ozs7O1FBQ3RDO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUMx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SUFDNUIsZ0NBQTJCOzs7OztJQUMzQixvQ0FBNkI7Ozs7O0lBQzdCLG9DQUE2Qjs7Ozs7SUFDN0Isc0NBQTZCOzs7OztJQUU3Qiw4Q0FBeUQ7Ozs7O0lBRXpELGtDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJU2hhcmVCdXR0b24sIFNoYXJlTWV0YVRhZ3MgfSBmcm9tICcuLi9zaGFyZS5tb2RlbHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNoYXJlQnV0dG9uQmFzZSB7XHJcblxyXG4gIHByb3RlY3RlZCByZWFkb25seSBfc2VsZjogU2hhcmVCdXR0b25CYXNlID0gdGhpcztcclxuXHJcbiAgLyoqIFNoYXJlIGJ1dHRvbiBzdXBwb3J0ZWQgbWV0YSB0YWdzICovXHJcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdXBwb3J0ZWRNZXRhVGFnczogU2hhcmVNZXRhVGFncztcclxuXHJcbiAgLyoqIFNoYXJlIGJ1dHRvbiBsYWJlbCAqL1xyXG4gIGdldCB0ZXh0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHJvcHMudGV4dDtcclxuICB9XHJcblxyXG4gIC8qKiBTaGFyZSBidXR0b24gYXJpYS1sYWJlbCBhdHRyaWJ1dGUgKi9cclxuICBnZXQgYXJpYUxhYmVsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHJvcHMuYXJpYUxhYmVsO1xyXG4gIH1cclxuXHJcbiAgLyoqIFNoYXJlIGJ1dHRvbiBjb2xvciAqL1xyXG4gIGdldCBjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Byb3BzLmNvbG9yO1xyXG4gIH1cclxuXHJcbiAgLyoqIFNoYXJlIGJ1dHRvbiBpY29uIChGb250QXdlc29tZSkgKi9cclxuICBnZXQgaWNvbigpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHJvcHMuaWNvbjtcclxuICB9XHJcblxyXG4gIGdldCBkZXNrdG9wKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFuZHJvaWQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLmRlc2t0b3A7XHJcbiAgfVxyXG5cclxuICBnZXQgaW9zKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXNrdG9wO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNoYXJlclVybCgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLklPUykgcmV0dXJuIHRoaXMuaW9zO1xyXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLkFORFJPSUQpIHJldHVybiB0aGlzLmFuZHJvaWQ7XHJcbiAgICByZXR1cm4gdGhpcy5kZXNrdG9wO1xyXG4gIH1cclxuXHJcbiAgLyoqIElmIHNoYXJlIGJ1dHRvbiBzdXBwb3J0cyBzaGFyZSBjb3VudCAqL1xyXG4gIHN1cHBvcnRTaGFyZUNvdW50ID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfcHJvcHM6IElTaGFyZUJ1dHRvbixcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3VybDogKCkgPT4gc3RyaW5nLFxyXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBfaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2RvY3VtZW50OiBEb2N1bWVudCxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3dpbmRvd1NpemU6IHN0cmluZyxcclxuICAgICAgICAgICAgICAvLyBkaXNhYmxlIGJ1dHRvbiBjbGljayAodXNlZCBpbiBjb3B5IGJ1dHRvbilcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2Rpc2FibGVCdXR0b25DbGljazogKGRpc2FibGU6IGJvb2xlYW4pID0+IHZvaWQsXHJcbiAgICAgICAgICAgICAgLy8gTG9nZ2VyIGZ1bmN0aW9uIChkZWJ1ZyBtb2RlKVxyXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBfbG9nZ2VyOiAodGV4dDogc3RyaW5nKSA9PiB2b2lkKSB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVucyBzaGFyZSB3aW5kb3dcclxuICAgKi9cclxuICBjbGljayhtZXRhVGFnczogU2hhcmVNZXRhVGFncyk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3Blbih0aGlzLl9zZXJpYWxpemVNZXRhVGFncyhtZXRhVGFncykpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBzaGFyZSBjb3VudCBvZiBhIFVSTCAqL1xyXG4gIHNoYXJlQ291bnQodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPG51bWJlcj4gfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfc2VyaWFsaXplTWV0YVRhZ3MobWV0YVRhZ3M6IFNoYXJlTWV0YVRhZ3MpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMuX3N1cHBvcnRlZE1ldGFUYWdzKVxyXG4gICAgICAubWFwKChba2V5LCB2YWx1ZV0pID0+XHJcbiAgICAgICAgbWV0YVRhZ3Nba2V5XSA/IGAke3ZhbHVlfT0ke2VuY29kZVVSSUNvbXBvbmVudChtZXRhVGFnc1trZXldKX1gIDogJydcclxuICAgICAgKVxyXG4gICAgICAuam9pbignJicpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9vcGVuKHNlcmlhbGl6ZWRNZXRhVGFnczogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAvLyBBdm9pZCBTU1IgZXJyb3JcclxuICAgICAgaWYgKHRoaXMuc2hhcmVyVXJsICYmIHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xyXG5cclxuICAgICAgICBjb25zdCBmaW5hbFVybCA9IHRoaXMuc2hhcmVyVXJsICsgc2VyaWFsaXplZE1ldGFUYWdzO1xyXG5cclxuICAgICAgICAvLyBEZWJ1ZyBtb2RlLCBsb2cgc2hhcmVyIGxpbmtcclxuICAgICAgICB0aGlzLl9sb2dnZXIoZmluYWxVcmwpO1xyXG5cclxuICAgICAgICBjb25zdCBwb3BVcCA9IHRoaXMuX2RvY3VtZW50LmRlZmF1bHRWaWV3Lm9wZW4oXHJcbiAgICAgICAgICBmaW5hbFVybCxcclxuICAgICAgICAgICduZXd3aW5kb3cnLFxyXG4gICAgICAgICAgdGhpcy5fd2luZG93U2l6ZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIFJlc29sdmUgd2hlbiBzaGFyZSBkaWFsb2cgaXMgY2xvc2VkXHJcbiAgICAgICAgaWYgKHBvcFVwKSB7XHJcbiAgICAgICAgICBjb25zdCBwb2xsVGltZXIgPSB0aGlzLl9kb2N1bWVudC5kZWZhdWx0Vmlldy5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwb3BVcC5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICB0aGlzLl9kb2N1bWVudC5kZWZhdWx0Vmlldy5jbGVhckludGVydmFsKHBvbGxUaW1lcik7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYCR7dGhpcy50ZXh0fSBidXR0b24gaXMgbm90IGNvbXBhdGlibGUgb24gdGhpcyBQbGF0Zm9ybWApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19