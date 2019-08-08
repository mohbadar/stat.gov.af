/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { map } from 'rxjs/operators';
import { ShareButtonBase } from './base';
var TumblrButton = /** @class */ (function (_super) {
    tslib_1.__extends(TumblrButton, _super);
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
export { TumblrButton };
if (false) {
    /** @type {?} */
    TumblrButton.prototype.supportShareCount;
    /**
     * @type {?}
     * @protected
     */
    TumblrButton.prototype._supportedMetaTags;
    /**
     * @type {?}
     * @protected
     */
    TumblrButton.prototype._props;
    /**
     * @type {?}
     * @protected
     */
    TumblrButton.prototype._url;
    /**
     * @type {?}
     * @protected
     */
    TumblrButton.prototype._http;
    /**
     * @type {?}
     * @protected
     */
    TumblrButton.prototype._platform;
    /**
     * @type {?}
     * @protected
     */
    TumblrButton.prototype._document;
    /**
     * @type {?}
     * @protected
     */
    TumblrButton.prototype._windowSize;
    /**
     * @type {?}
     * @protected
     */
    TumblrButton.prototype._disableButtonClick;
    /**
     * @type {?}
     * @protected
     */
    TumblrButton.prototype._logger;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHVtYmxyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1zaGFyZS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2J1dHRvbnMvdHVtYmxyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFHekM7SUFBa0Msd0NBQWU7SUFjL0Msc0JBQXNCLE1BQW9CLEVBQ3BCLElBQWtCLEVBQ2xCLEtBQWlCLEVBQ2pCLFNBQW1CLEVBQ25CLFNBQW1CLEVBQ25CLFdBQW1CLEVBQ25CLG1CQUErQyxFQUMvQyxPQUErQjtRQVByRCxZQVFFLGtCQUFNLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxTQUM1RjtRQVRxQixZQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ3BCLFVBQUksR0FBSixJQUFJLENBQWM7UUFDbEIsV0FBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixlQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLGVBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsaUJBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIseUJBQW1CLEdBQW5CLG1CQUFtQixDQUE0QjtRQUMvQyxhQUFPLEdBQVAsT0FBTyxDQUF3QjtRQW5CckQsdUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBRWYsd0JBQWtCLEdBQWtCO1lBQzVDLEdBQUcsRUFBRSxjQUFjO1lBQ25CLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQzs7SUFlRixDQUFDO0lBYkQsc0JBQUksaUNBQU87Ozs7UUFBWDtZQUNFLE9BQU8sdUNBQXVDLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7Ozs7O0lBYUQsaUNBQVU7Ozs7SUFBVixVQUFXLEdBQVc7UUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDckIsK0NBQTZDLEdBQUssRUFDbEQsVUFBVSxDQUNYLENBQUMsSUFBSSxDQUNKLEdBQUcsQ0FBQyxVQUFDLEdBQVEsSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQXhCLENBQXdCLENBQUMsQ0FDNUMsQ0FBQztJQUNKLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFqQ0QsQ0FBa0MsZUFBZSxHQWlDaEQ7Ozs7SUEvQkMseUNBQXlCOzs7OztJQUV6QiwwQ0FJRTs7Ozs7SUFNVSw4QkFBOEI7Ozs7O0lBQzlCLDRCQUE0Qjs7Ozs7SUFDNUIsNkJBQTJCOzs7OztJQUMzQixpQ0FBNkI7Ozs7O0lBQzdCLGlDQUE2Qjs7Ozs7SUFDN0IsbUNBQTZCOzs7OztJQUM3QiwyQ0FBeUQ7Ozs7O0lBQ3pELCtCQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFNoYXJlQnV0dG9uQmFzZSB9IGZyb20gJy4vYmFzZSc7XHJcbmltcG9ydCB7IElTaGFyZUJ1dHRvbiwgU2hhcmVNZXRhVGFncyB9IGZyb20gJy4uL3NoYXJlLm1vZGVscyc7XHJcblxyXG5leHBvcnQgY2xhc3MgVHVtYmxyQnV0dG9uIGV4dGVuZHMgU2hhcmVCdXR0b25CYXNlIHtcclxuXHJcbiAgc3VwcG9ydFNoYXJlQ291bnQgPSB0cnVlO1xyXG5cclxuICBwcm90ZWN0ZWQgX3N1cHBvcnRlZE1ldGFUYWdzOiBTaGFyZU1ldGFUYWdzID0ge1xyXG4gICAgdXJsOiAnY2Fub25pY2FsVXJsJyxcclxuICAgIGRlc2NyaXB0aW9uOiAnY2FwdGlvbicsXHJcbiAgICB0YWdzOiAndGFncydcclxuICB9O1xyXG5cclxuICBnZXQgZGVza3RvcCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGBodHRwOi8vdHVtYmxyLmNvbS93aWRnZXRzL3NoYXJlL3Rvb2w/YDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfcHJvcHM6IElTaGFyZUJ1dHRvbixcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3VybDogKCkgPT4gc3RyaW5nLFxyXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBfaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2RvY3VtZW50OiBEb2N1bWVudCxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3dpbmRvd1NpemU6IHN0cmluZyxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2Rpc2FibGVCdXR0b25DbGljazogKGRpc2FibGU6IGJvb2xlYW4pID0+IHZvaWQsXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9sb2dnZXI6ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQpIHtcclxuICAgIHN1cGVyKF9wcm9wcywgX3VybCwgX2h0dHAsIF9wbGF0Zm9ybSwgX2RvY3VtZW50LCBfd2luZG93U2l6ZSwgX2Rpc2FibGVCdXR0b25DbGljaywgX2xvZ2dlcik7XHJcbiAgfVxyXG5cclxuICBzaGFyZUNvdW50KHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcclxuICAgIHJldHVybiB0aGlzLl9odHRwLmpzb25wKFxyXG4gICAgICBgaHR0cHM6Ly9hcGkudHVtYmxyLmNvbS92Mi9zaGFyZS9zdGF0cz91cmw9JHt1cmx9YCxcclxuICAgICAgJ2NhbGxiYWNrJ1xyXG4gICAgKS5waXBlKFxyXG4gICAgICBtYXAoKHJlczogYW55KSA9PiArcmVzLnJlc3BvbnNlLm5vdGVfY291bnQpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=