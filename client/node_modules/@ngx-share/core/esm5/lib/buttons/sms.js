/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ShareButtonBase } from './base';
var SmsButton = /** @class */ (function (_super) {
    tslib_1.__extends(SmsButton, _super);
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
export { SmsButton };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    SmsButton.prototype._supportedMetaTags;
    /**
     * @type {?}
     * @protected
     */
    SmsButton.prototype._props;
    /**
     * @type {?}
     * @protected
     */
    SmsButton.prototype._url;
    /**
     * @type {?}
     * @protected
     */
    SmsButton.prototype._http;
    /**
     * @type {?}
     * @protected
     */
    SmsButton.prototype._platform;
    /**
     * @type {?}
     * @protected
     */
    SmsButton.prototype._document;
    /**
     * @type {?}
     * @protected
     */
    SmsButton.prototype._windowSize;
    /**
     * @type {?}
     * @protected
     */
    SmsButton.prototype._disableButtonClick;
    /**
     * @type {?}
     * @protected
     */
    SmsButton.prototype._logger;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1zaGFyZS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2J1dHRvbnMvc21zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUd6QztJQUErQixxQ0FBZTtJQWtCNUMsbUJBQXNCLE1BQW9CLEVBQ3BCLElBQWtCLEVBQ2xCLEtBQWlCLEVBQ2pCLFNBQW1CLEVBQ25CLFNBQW1CLEVBQ25CLFdBQW1CLEVBQ25CLG1CQUErQyxFQUMvQyxPQUErQjtRQVByRCxZQVFFLGtCQUFNLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxTQUM1RjtRQVRxQixZQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ3BCLFVBQUksR0FBSixJQUFJLENBQWM7UUFDbEIsV0FBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixlQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLGVBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsaUJBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIseUJBQW1CLEdBQW5CLG1CQUFtQixDQUE0QjtRQUMvQyxhQUFPLEdBQVAsT0FBTyxDQUF3QjtRQXZCM0Msd0JBQWtCLEdBQWtCO1lBQzVDLFdBQVcsRUFBRSxNQUFNO1NBQ3BCLENBQUM7O0lBdUJGLENBQUM7SUFyQkQsc0JBQUksOEJBQU87Ozs7UUFBWDtZQUNFLE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksOEJBQU87Ozs7UUFBWDtZQUNFLE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMEJBQUc7Ozs7UUFBUDtZQUNFLE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBOzs7OztJQWFELHlCQUFLOzs7O0lBQUwsVUFBTSxRQUF1QjtRQUMzQiw4QkFBOEI7UUFDOUIsUUFBUSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBSSxRQUFRLENBQUMsV0FBVyxZQUFPLElBQUksQ0FBQyxJQUFJLEVBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOztZQUNsRyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDO1FBQzVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUFuQ0QsQ0FBK0IsZUFBZSxHQW1DN0M7Ozs7Ozs7SUFqQ0MsdUNBRUU7Ozs7O0lBY1UsMkJBQThCOzs7OztJQUM5Qix5QkFBNEI7Ozs7O0lBQzVCLDBCQUEyQjs7Ozs7SUFDM0IsOEJBQTZCOzs7OztJQUM3Qiw4QkFBNkI7Ozs7O0lBQzdCLGdDQUE2Qjs7Ozs7SUFDN0Isd0NBQXlEOzs7OztJQUN6RCw0QkFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IFNoYXJlQnV0dG9uQmFzZSB9IGZyb20gJy4vYmFzZSc7XHJcbmltcG9ydCB7IElTaGFyZUJ1dHRvbiwgU2hhcmVNZXRhVGFncyB9IGZyb20gJy4uL3NoYXJlLm1vZGVscyc7XHJcblxyXG5leHBvcnQgY2xhc3MgU21zQnV0dG9uIGV4dGVuZHMgU2hhcmVCdXR0b25CYXNlIHtcclxuXHJcbiAgcHJvdGVjdGVkIF9zdXBwb3J0ZWRNZXRhVGFnczogU2hhcmVNZXRhVGFncyA9IHtcclxuICAgIGRlc2NyaXB0aW9uOiAnYm9keSdcclxuICB9O1xyXG5cclxuICBnZXQgZGVza3RvcCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGBzbXM6P2A7XHJcbiAgfVxyXG5cclxuICBnZXQgYW5kcm9pZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGBzbXM6P2A7XHJcbiAgfVxyXG5cclxuICBnZXQgaW9zKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gJ3NtczomJztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfcHJvcHM6IElTaGFyZUJ1dHRvbixcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3VybDogKCkgPT4gc3RyaW5nLFxyXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBfaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2RvY3VtZW50OiBEb2N1bWVudCxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3dpbmRvd1NpemU6IHN0cmluZyxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2Rpc2FibGVCdXR0b25DbGljazogKGRpc2FibGU6IGJvb2xlYW4pID0+IHZvaWQsXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9sb2dnZXI6ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQpIHtcclxuICAgIHN1cGVyKF9wcm9wcywgX3VybCwgX2h0dHAsIF9wbGF0Zm9ybSwgX2RvY3VtZW50LCBfd2luZG93U2l6ZSwgX2Rpc2FibGVCdXR0b25DbGljaywgX2xvZ2dlcik7XHJcbiAgfVxyXG5cclxuICBjbGljayhtZXRhVGFnczogU2hhcmVNZXRhVGFncyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAvLyBBZGQgdGhlIFVSTCB0byBtZXNzYWdlIGJvZHlcclxuICAgIG1ldGFUYWdzLmRlc2NyaXB0aW9uID0gbWV0YVRhZ3MuZGVzY3JpcHRpb24gPyBgJHttZXRhVGFncy5kZXNjcmlwdGlvbn1cXHJcXG4ke3RoaXMuX3VybCgpfWAgOiB0aGlzLl91cmwoKTtcclxuICAgIGNvbnN0IHNlcmlhbGl6ZWRNZXRhVGFncyA9IHRoaXMuX3NlcmlhbGl6ZU1ldGFUYWdzKG1ldGFUYWdzKTtcclxuICAgIHJldHVybiB0aGlzLl9vcGVuKHNlcmlhbGl6ZWRNZXRhVGFncyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==