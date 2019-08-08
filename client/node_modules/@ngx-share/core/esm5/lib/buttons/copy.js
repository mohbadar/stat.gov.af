/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ShareButtonBase } from './base';
var CopyButton = /** @class */ (function (_super) {
    tslib_1.__extends(CopyButton, _super);
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
export { CopyButton };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CopyButton.prototype._disable;
    /**
     * @type {?}
     * @protected
     */
    CopyButton.prototype._props;
    /**
     * @type {?}
     * @protected
     */
    CopyButton.prototype._url;
    /**
     * @type {?}
     * @protected
     */
    CopyButton.prototype._http;
    /**
     * @type {?}
     * @protected
     */
    CopyButton.prototype._platform;
    /**
     * @type {?}
     * @protected
     */
    CopyButton.prototype._document;
    /**
     * @type {?}
     * @protected
     */
    CopyButton.prototype._windowSize;
    /**
     * @type {?}
     * @protected
     */
    CopyButton.prototype._disableButtonClick;
    /**
     * @type {?}
     * @protected
     */
    CopyButton.prototype._logger;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtc2hhcmUvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9idXR0b25zL2NvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBR3pDO0lBQWdDLHNDQUFlO0lBWTdDLG9CQUFzQixNQUFvQixFQUNwQixJQUFrQixFQUNsQixLQUFpQixFQUNqQixTQUFtQixFQUNuQixTQUFtQixFQUNuQixXQUFtQixFQUNuQixtQkFBK0MsRUFDL0MsT0FBK0I7UUFQckQsWUFRRSxrQkFBTSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLENBQUMsU0FDNUY7UUFUcUIsWUFBTSxHQUFOLE1BQU0sQ0FBYztRQUNwQixVQUFJLEdBQUosSUFBSSxDQUFjO1FBQ2xCLFdBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsZUFBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixlQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLGlCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ25CLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBNEI7UUFDL0MsYUFBTyxHQUFQLE9BQU8sQ0FBd0I7O0lBRXJELENBQUM7SUFqQkQsc0JBQUksNEJBQUk7Ozs7UUFBUjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUMzRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDRCQUFJOzs7O1FBQVI7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDMUUsQ0FBQzs7O09BQUE7Ozs7O0lBYU8sbUNBQWM7Ozs7SUFBdEI7UUFDRSxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRU8saUNBQVk7Ozs7SUFBcEI7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELDBCQUFLOzs7SUFBTDtRQUFBLGlCQThCQztRQTdCQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztZQUN6QixJQUFJOztvQkFDSSxRQUFRLEdBQXdCLG1CQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxFQUF1QjtnQkFFckcsUUFBUSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDakQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUUxQyw4Q0FBOEM7Z0JBQzlDLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7O3dCQUNoQixLQUFLLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7b0JBQzFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7d0JBQzdCLFNBQVMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUU7b0JBQzNELFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDNUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUIsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3pCLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQ3ZDO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDbkI7Z0JBQ0QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDMUMsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3ZCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDOUM7b0JBQVM7Z0JBQ1IsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsWUFBWSxFQUFFLEVBQW5CLENBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzVDLE9BQU8sRUFBRSxDQUFDO2FBQ1g7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUFqRUQsQ0FBZ0MsZUFBZSxHQWlFOUM7Ozs7Ozs7SUEvREMsOEJBQTBCOzs7OztJQVVkLDRCQUE4Qjs7Ozs7SUFDOUIsMEJBQTRCOzs7OztJQUM1QiwyQkFBMkI7Ozs7O0lBQzNCLCtCQUE2Qjs7Ozs7SUFDN0IsK0JBQTZCOzs7OztJQUM3QixpQ0FBNkI7Ozs7O0lBQzdCLHlDQUF5RDs7Ozs7SUFDekQsNkJBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBTaGFyZUJ1dHRvbkJhc2UgfSBmcm9tICcuL2Jhc2UnO1xyXG5pbXBvcnQgeyBJU2hhcmVCdXR0b24gfSBmcm9tICcuLi9zaGFyZS5tb2RlbHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvcHlCdXR0b24gZXh0ZW5kcyBTaGFyZUJ1dHRvbkJhc2Uge1xyXG5cclxuICBwcml2YXRlIF9kaXNhYmxlOiBib29sZWFuO1xyXG5cclxuICBnZXQgdGV4dCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlID8gdGhpcy5fcHJvcHMuZXh0cmEuc3VjY2Vzc0xhYmVsIDogdGhpcy5fcHJvcHMudGV4dDtcclxuICB9XHJcblxyXG4gIGdldCBpY29uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGUgPyB0aGlzLl9wcm9wcy5leHRyYS5zdWNjZXNzSWNvbiA6IHRoaXMuX3Byb3BzLmljb247XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX3Byb3BzOiBJU2hhcmVCdXR0b24sXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF91cmw6ICgpID0+IHN0cmluZyxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2h0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9wbGF0Zm9ybTogUGxhdGZvcm0sXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9kb2N1bWVudDogRG9jdW1lbnQsXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF93aW5kb3dTaXplOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9kaXNhYmxlQnV0dG9uQ2xpY2s6IChkaXNhYmxlOiBib29sZWFuKSA9PiB2b2lkLFxyXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBfbG9nZ2VyOiAodGV4dDogc3RyaW5nKSA9PiB2b2lkKSB7XHJcbiAgICBzdXBlcihfcHJvcHMsIF91cmwsIF9odHRwLCBfcGxhdGZvcm0sIF9kb2N1bWVudCwgX3dpbmRvd1NpemUsIF9kaXNhYmxlQnV0dG9uQ2xpY2ssIF9sb2dnZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGlzYWJsZUJ1dHRvbigpIHtcclxuICAgIC8vIERpc2FibGUgcG9pbnRlciBmb3IgdGlueSBkZWxheVxyXG4gICAgdGhpcy5fZGlzYWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLl9kaXNhYmxlQnV0dG9uQ2xpY2sodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZXNldEJ1dHRvbigpIHtcclxuICAgIHRoaXMuX2Rpc2FibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2Rpc2FibGVCdXR0b25DbGljayhmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBjbGljaygpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdGV4dEFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHRleHRBcmVhLnZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KHRoaXMuX3VybCgpKTtcclxuICAgICAgICB0aGlzLl9kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRBcmVhKTtcclxuXHJcbiAgICAgICAgLy8gaGlnaGxpZ2h0IFRleHRBcmVhIHRvIGNvcHkgdGhlIHNoYXJpbmcgbGlua1xyXG4gICAgICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5JT1MpIHtcclxuICAgICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0ZXh0QXJlYSk7XHJcbiAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLl9kb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcclxuICAgICAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XHJcbiAgICAgICAgICB0ZXh0QXJlYS5yZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgICB0ZXh0QXJlYS5zZXRTZWxlY3Rpb25SYW5nZSgwLCA5OTk5OTkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0ZXh0QXJlYS5zZWxlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcclxuICAgICAgICB0aGlzLl9kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRleHRBcmVhKTtcclxuICAgICAgICB0aGlzLl9kaXNhYmxlQnV0dG9uKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ0NvcHkgbGluayBmYWlsZWQhJywgZS5tZXNzYWdlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3Jlc2V0QnV0dG9uKCksIDIwMDApO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4iXX0=