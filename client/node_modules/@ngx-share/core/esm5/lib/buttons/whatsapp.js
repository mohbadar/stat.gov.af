/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ShareButtonBase } from './base';
var WhatsappButton = /** @class */ (function (_super) {
    tslib_1.__extends(WhatsappButton, _super);
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
export { WhatsappButton };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    WhatsappButton.prototype._supportedMetaTags;
    /**
     * @type {?}
     * @protected
     */
    WhatsappButton.prototype._props;
    /**
     * @type {?}
     * @protected
     */
    WhatsappButton.prototype._url;
    /**
     * @type {?}
     * @protected
     */
    WhatsappButton.prototype._http;
    /**
     * @type {?}
     * @protected
     */
    WhatsappButton.prototype._platform;
    /**
     * @type {?}
     * @protected
     */
    WhatsappButton.prototype._document;
    /**
     * @type {?}
     * @protected
     */
    WhatsappButton.prototype._windowSize;
    /**
     * @type {?}
     * @protected
     */
    WhatsappButton.prototype._disableButtonClick;
    /**
     * @type {?}
     * @protected
     */
    WhatsappButton.prototype._logger;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hhdHNhcHAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LXNoYXJlL2NvcmUvIiwic291cmNlcyI6WyJsaWIvYnV0dG9ucy93aGF0c2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFHekM7SUFBb0MsMENBQWU7SUFjakQsd0JBQXNCLE1BQW9CLEVBQ3BCLElBQWtCLEVBQ2xCLEtBQWlCLEVBQ2pCLFNBQW1CLEVBQ25CLFNBQW1CLEVBQ25CLFdBQW1CLEVBQ25CLG1CQUErQyxFQUMvQyxPQUErQjtRQVByRCxZQVFFLGtCQUFNLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxTQUM1RjtRQVRxQixZQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ3BCLFVBQUksR0FBSixJQUFJLENBQWM7UUFDbEIsV0FBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixlQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLGVBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsaUJBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIseUJBQW1CLEdBQW5CLG1CQUFtQixDQUE0QjtRQUMvQyxhQUFPLEdBQVAsT0FBTyxDQUF3QjtRQW5CM0Msd0JBQWtCLEdBQWtCO1lBQzVDLFdBQVcsRUFBRSxNQUFNO1NBQ3BCLENBQUM7O0lBbUJGLENBQUM7SUFqQkQsc0JBQUksbUNBQU87Ozs7UUFBWDtZQUNFLE9BQU8saUJBQWlCLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxtQ0FBTzs7OztRQUFYO1lBQ0UsT0FBTyxrQkFBa0IsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTs7Ozs7SUFhRCw4QkFBSzs7OztJQUFMLFVBQU0sUUFBdUI7UUFDM0IsOEJBQThCO1FBQzlCLFFBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUksUUFBUSxDQUFDLFdBQVcsWUFBTyxJQUFJLENBQUMsSUFBSSxFQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7WUFDbEcsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztRQUM1RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBL0JELENBQW9DLGVBQWUsR0ErQmxEOzs7Ozs7O0lBN0JDLDRDQUVFOzs7OztJQVVVLGdDQUE4Qjs7Ozs7SUFDOUIsOEJBQTRCOzs7OztJQUM1QiwrQkFBMkI7Ozs7O0lBQzNCLG1DQUE2Qjs7Ozs7SUFDN0IsbUNBQTZCOzs7OztJQUM3QixxQ0FBNkI7Ozs7O0lBQzdCLDZDQUF5RDs7Ozs7SUFDekQsaUNBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBTaGFyZUJ1dHRvbkJhc2UgfSBmcm9tICcuL2Jhc2UnO1xyXG5pbXBvcnQgeyBJU2hhcmVCdXR0b24sIFNoYXJlTWV0YVRhZ3MgfSBmcm9tICcuLi9zaGFyZS5tb2RlbHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdoYXRzYXBwQnV0dG9uIGV4dGVuZHMgU2hhcmVCdXR0b25CYXNlIHtcclxuXHJcbiAgcHJvdGVjdGVkIF9zdXBwb3J0ZWRNZXRhVGFnczogU2hhcmVNZXRhVGFncyA9IHtcclxuICAgIGRlc2NyaXB0aW9uOiAndGV4dCdcclxuICB9O1xyXG5cclxuICBnZXQgZGVza3RvcCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGBodHRwczovL3dhLm1lLz9gO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFuZHJvaWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgd2hhdHNhcHA6Ly9zZW5kP2A7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX3Byb3BzOiBJU2hhcmVCdXR0b24sXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF91cmw6ICgpID0+IHN0cmluZyxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2h0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9wbGF0Zm9ybTogUGxhdGZvcm0sXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9kb2N1bWVudDogRG9jdW1lbnQsXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF93aW5kb3dTaXplOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9kaXNhYmxlQnV0dG9uQ2xpY2s6IChkaXNhYmxlOiBib29sZWFuKSA9PiB2b2lkLFxyXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBfbG9nZ2VyOiAodGV4dDogc3RyaW5nKSA9PiB2b2lkKSB7XHJcbiAgICBzdXBlcihfcHJvcHMsIF91cmwsIF9odHRwLCBfcGxhdGZvcm0sIF9kb2N1bWVudCwgX3dpbmRvd1NpemUsIF9kaXNhYmxlQnV0dG9uQ2xpY2ssIF9sb2dnZXIpO1xyXG4gIH1cclxuXHJcbiAgY2xpY2sobWV0YVRhZ3M6IFNoYXJlTWV0YVRhZ3MpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgLy8gQWRkIHRoZSBVUkwgdG8gbWVzc2FnZSBib2R5XHJcbiAgICBtZXRhVGFncy5kZXNjcmlwdGlvbiA9IG1ldGFUYWdzLmRlc2NyaXB0aW9uID8gYCR7bWV0YVRhZ3MuZGVzY3JpcHRpb259XFxyXFxuJHt0aGlzLl91cmwoKX1gIDogdGhpcy5fdXJsKCk7XHJcbiAgICBjb25zdCBzZXJpYWxpemVkTWV0YVRhZ3MgPSB0aGlzLl9zZXJpYWxpemVNZXRhVGFncyhtZXRhVGFncyk7XHJcbiAgICByZXR1cm4gdGhpcy5fb3BlbihzZXJpYWxpemVkTWV0YVRhZ3MpO1xyXG4gIH1cclxufVxyXG4iXX0=