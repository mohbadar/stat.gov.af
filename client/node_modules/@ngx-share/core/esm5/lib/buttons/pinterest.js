/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { map } from 'rxjs/operators';
import { ShareButtonBase } from './base';
var PinterestButton = /** @class */ (function (_super) {
    tslib_1.__extends(PinterestButton, _super);
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
export { PinterestButton };
if (false) {
    /** @type {?} */
    PinterestButton.prototype.supportShareCount;
    /**
     * @type {?}
     * @protected
     */
    PinterestButton.prototype._supportedMetaTags;
    /**
     * @type {?}
     * @protected
     */
    PinterestButton.prototype._props;
    /**
     * @type {?}
     * @protected
     */
    PinterestButton.prototype._url;
    /**
     * @type {?}
     * @protected
     */
    PinterestButton.prototype._http;
    /**
     * @type {?}
     * @protected
     */
    PinterestButton.prototype._platform;
    /**
     * @type {?}
     * @protected
     */
    PinterestButton.prototype._document;
    /**
     * @type {?}
     * @protected
     */
    PinterestButton.prototype._windowSize;
    /**
     * @type {?}
     * @protected
     */
    PinterestButton.prototype._disableButtonClick;
    /**
     * @type {?}
     * @protected
     */
    PinterestButton.prototype._logger;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGludGVyZXN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1zaGFyZS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2J1dHRvbnMvcGludGVyZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFHekM7SUFBcUMsMkNBQWU7SUFjbEQseUJBQXNCLE1BQW9CLEVBQ3BCLElBQWtCLEVBQ2xCLEtBQWlCLEVBQ2pCLFNBQW1CLEVBQ25CLFNBQW1CLEVBQ25CLFdBQW1CLEVBQ25CLG1CQUErQyxFQUMvQyxPQUErQjtRQVByRCxZQVFFLGtCQUFNLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxTQUM1RjtRQVRxQixZQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ3BCLFVBQUksR0FBSixJQUFJLENBQWM7UUFDbEIsV0FBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixlQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLGVBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsaUJBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIseUJBQW1CLEdBQW5CLG1CQUFtQixDQUE0QjtRQUMvQyxhQUFPLEdBQVAsT0FBTyxDQUF3QjtRQW5CckQsdUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBRWYsd0JBQWtCLEdBQWtCO1lBQzVDLEdBQUcsRUFBRSxLQUFLO1lBQ1YsV0FBVyxFQUFFLGFBQWE7WUFDMUIsS0FBSyxFQUFFLE9BQU87U0FDZixDQUFDOztJQWVGLENBQUM7SUFiRCxzQkFBSSxvQ0FBTzs7OztRQUFYO1lBQ0UsT0FBTyw4Q0FBOEMsQ0FBQztRQUN4RCxDQUFDOzs7T0FBQTs7Ozs7SUFhRCwrQkFBSzs7OztJQUFMLFVBQU0sUUFBdUI7UUFDM0Isc0NBQXNDO1FBQ3RDLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDdEQ7UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7SUFFRCxvQ0FBVTs7OztJQUFWLFVBQVcsR0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixzREFBb0QsR0FBSyxFQUN6RCxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsQ0FDdkIsQ0FBQyxJQUFJLENBQ0osR0FBRyxDQUFDLFVBQUMsSUFBWSxJQUFLLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxDQUFDLEVBQXZELENBQXVELENBQUMsRUFDOUUsR0FBRyxDQUFDLFVBQUMsR0FBUSxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFWLENBQVUsQ0FBQyxDQUM5QixDQUFDO0lBQ0osQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQTFDRCxDQUFxQyxlQUFlLEdBMENuRDs7OztJQXhDQyw0Q0FBeUI7Ozs7O0lBRXpCLDZDQUlFOzs7OztJQU1VLGlDQUE4Qjs7Ozs7SUFDOUIsK0JBQTRCOzs7OztJQUM1QixnQ0FBMkI7Ozs7O0lBQzNCLG9DQUE2Qjs7Ozs7SUFDN0Isb0NBQTZCOzs7OztJQUM3QixzQ0FBNkI7Ozs7O0lBQzdCLDhDQUF5RDs7Ozs7SUFDekQsa0NBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU2hhcmVCdXR0b25CYXNlIH0gZnJvbSAnLi9iYXNlJztcclxuaW1wb3J0IHsgSVNoYXJlQnV0dG9uLCBTaGFyZU1ldGFUYWdzIH0gZnJvbSAnLi4vc2hhcmUubW9kZWxzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQaW50ZXJlc3RCdXR0b24gZXh0ZW5kcyBTaGFyZUJ1dHRvbkJhc2Uge1xyXG5cclxuICBzdXBwb3J0U2hhcmVDb3VudCA9IHRydWU7XHJcblxyXG4gIHByb3RlY3RlZCBfc3VwcG9ydGVkTWV0YVRhZ3M6IFNoYXJlTWV0YVRhZ3MgPSB7XHJcbiAgICB1cmw6ICd1cmwnLFxyXG4gICAgZGVzY3JpcHRpb246ICdkZXNjcmlwdGlvbicsXHJcbiAgICBpbWFnZTogJ21lZGlhJ1xyXG4gIH07XHJcblxyXG4gIGdldCBkZXNrdG9wKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYGh0dHBzOi8vaW4ucGludGVyZXN0LmNvbS9waW4vY3JlYXRlL2J1dHRvbi8/YDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfcHJvcHM6IElTaGFyZUJ1dHRvbixcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3VybDogKCkgPT4gc3RyaW5nLFxyXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBfaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2RvY3VtZW50OiBEb2N1bWVudCxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3dpbmRvd1NpemU6IHN0cmluZyxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2Rpc2FibGVCdXR0b25DbGljazogKGRpc2FibGU6IGJvb2xlYW4pID0+IHZvaWQsXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9sb2dnZXI6ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQpIHtcclxuICAgIHN1cGVyKF9wcm9wcywgX3VybCwgX2h0dHAsIF9wbGF0Zm9ybSwgX2RvY3VtZW50LCBfd2luZG93U2l6ZSwgX2Rpc2FibGVCdXR0b25DbGljaywgX2xvZ2dlcik7XHJcbiAgfVxyXG5cclxuICBjbGljayhtZXRhVGFnczogU2hhcmVNZXRhVGFncyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAvLyBDaGVjayBpZiBpbWFnZSBwYXJhbWV0ZXIgaXMgZGVmaW5lZFxyXG4gICAgaWYgKG1ldGFUYWdzLmltYWdlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9vcGVuKHRoaXMuX3NlcmlhbGl6ZU1ldGFUYWdzKG1ldGFUYWdzKSk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLndhcm4oJ1BpbnRlcmVzdCBidXR0b246IGltYWdlIHBhcmFtZXRlciBpcyByZXF1aXJlZCEnKTtcclxuICB9XHJcblxyXG4gIHNoYXJlQ291bnQodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KFxyXG4gICAgICBgaHR0cHM6Ly9hcGkucGludGVyZXN0LmNvbS92MS91cmxzL2NvdW50Lmpzb24/dXJsPSR7dXJsfWAsXHJcbiAgICAgIHtyZXNwb25zZVR5cGU6ICd0ZXh0J31cclxuICAgICkucGlwZShcclxuICAgICAgbWFwKCh0ZXh0OiBzdHJpbmcpID0+IEpTT04ucGFyc2UodGV4dC5yZXBsYWNlKC9ecmVjZWl2ZUNvdW50XFwoKC4qKVxcKS8sICckMScpKSksXHJcbiAgICAgIG1hcCgocmVzOiBhbnkpID0+ICtyZXMuY291bnQpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=