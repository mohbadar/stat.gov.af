/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class ShareButtonBase {
    /**
     * @param {?} _props
     * @param {?} _url
     * @param {?} _http
     * @param {?} _platform
     * @param {?} _document
     * @param {?} _windowSize
     * @param {?} _disableButtonClick
     * @param {?} _logger
     */
    constructor(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick, _logger) {
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
    /**
     * Share button label
     * @return {?}
     */
    get text() {
        return this._props.text;
    }
    /**
     * Share button aria-label attribute
     * @return {?}
     */
    get ariaLabel() {
        return this._props.ariaLabel;
    }
    /**
     * Share button color
     * @return {?}
     */
    get color() {
        return this._props.color;
    }
    /**
     * Share button icon (FontAwesome)
     * @return {?}
     */
    get icon() {
        return this._props.icon;
    }
    /**
     * @return {?}
     */
    get desktop() {
        return undefined;
    }
    /**
     * @return {?}
     */
    get android() {
        return this.desktop;
    }
    /**
     * @return {?}
     */
    get ios() {
        return this.desktop;
    }
    /**
     * @return {?}
     */
    get sharerUrl() {
        if (this._platform.IOS)
            return this.ios;
        if (this._platform.ANDROID)
            return this.android;
        return this.desktop;
    }
    /**
     * Opens share window
     * @param {?} metaTags
     * @return {?}
     */
    click(metaTags) {
        return this._open(this._serializeMetaTags(metaTags));
    }
    /**
     * Get share count of a URL
     * @param {?} url
     * @return {?}
     */
    shareCount(url) {
        return undefined;
    }
    /**
     * @protected
     * @param {?} metaTags
     * @return {?}
     */
    _serializeMetaTags(metaTags) {
        return Object.entries(this._supportedMetaTags)
            .map(([key, value]) => metaTags[key] ? `${value}=${encodeURIComponent(metaTags[key])}` : '')
            .join('&');
    }
    /**
     * @protected
     * @param {?} serializedMetaTags
     * @return {?}
     */
    _open(serializedMetaTags) {
        return new Promise((resolve) => {
            // Avoid SSR error
            if (this.sharerUrl && this._platform.isBrowser) {
                /** @type {?} */
                const finalUrl = this.sharerUrl + serializedMetaTags;
                // Debug mode, log sharer link
                this._logger(finalUrl);
                /** @type {?} */
                const popUp = this._document.defaultView.open(finalUrl, 'newwindow', this._windowSize);
                // Resolve when share dialog is closed
                if (popUp) {
                    /** @type {?} */
                    const pollTimer = this._document.defaultView.setInterval(() => {
                        if (popUp.closed) {
                            this._document.defaultView.clearInterval(pollTimer);
                            resolve();
                        }
                    }, 200);
                }
            }
            else {
                console.warn(`${this.text} button is not compatible on this Platform`);
            }
        });
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtc2hhcmUvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9idXR0b25zL2Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLE1BQU0sT0FBTyxlQUFlOzs7Ozs7Ozs7OztJQWdEMUIsWUFBc0IsTUFBb0IsRUFDcEIsSUFBa0IsRUFDbEIsS0FBaUIsRUFDakIsU0FBbUIsRUFDbkIsU0FBbUIsRUFDbkIsV0FBbUIsRUFFbkIsbUJBQStDLEVBRS9DLE9BQStCO1FBVC9CLFdBQU0sR0FBTixNQUFNLENBQWM7UUFDcEIsU0FBSSxHQUFKLElBQUksQ0FBYztRQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUVuQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQTRCO1FBRS9DLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBdkRsQyxVQUFLLEdBQW9CLElBQUksQ0FBQzs7OztRQTRDakQsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO0lBWTFCLENBQUM7Ozs7O0lBbERELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFHRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBR0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUMzQixDQUFDOzs7OztJQUdELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELElBQUksT0FBTztRQUNULE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Ozs7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1gsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUc7WUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDeEMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87WUFBRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7Ozs7OztJQW9CRCxLQUFLLENBQUMsUUFBdUI7UUFDM0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7OztJQUdELFVBQVUsQ0FBQyxHQUFXO1FBQ3BCLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Ozs7OztJQUVTLGtCQUFrQixDQUFDLFFBQXVCO1FBQ2xELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7YUFDM0MsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUNwQixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDckU7YUFDQSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDOzs7Ozs7SUFFUyxLQUFLLENBQUMsa0JBQTBCO1FBQ3hDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3QixrQkFBa0I7WUFDbEIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFOztzQkFFeEMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsa0JBQWtCO2dCQUVwRCw4QkFBOEI7Z0JBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O3NCQUVqQixLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUMzQyxRQUFRLEVBQ1IsV0FBVyxFQUNYLElBQUksQ0FBQyxXQUFXLENBQ2pCO2dCQUVELHNDQUFzQztnQkFDdEMsSUFBSSxLQUFLLEVBQUU7OzBCQUNILFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO3dCQUM1RCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7NEJBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDcEQsT0FBTyxFQUFFLENBQUM7eUJBQ1g7b0JBQ0gsQ0FBQyxFQUFFLEdBQUcsQ0FBQztpQkFDUjthQUNGO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSw0Q0FBNEMsQ0FBQyxDQUFDO2FBQ3hFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7Ozs7OztJQTVHQyxnQ0FBaUQ7Ozs7OztJQUdqRCw2Q0FBcUQ7Ozs7O0lBeUNyRCw0Q0FBMEI7Ozs7O0lBRWQsaUNBQThCOzs7OztJQUM5QiwrQkFBNEI7Ozs7O0lBQzVCLGdDQUEyQjs7Ozs7SUFDM0Isb0NBQTZCOzs7OztJQUM3QixvQ0FBNkI7Ozs7O0lBQzdCLHNDQUE2Qjs7Ozs7SUFFN0IsOENBQXlEOzs7OztJQUV6RCxrQ0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSVNoYXJlQnV0dG9uLCBTaGFyZU1ldGFUYWdzIH0gZnJvbSAnLi4vc2hhcmUubW9kZWxzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFyZUJ1dHRvbkJhc2Uge1xyXG5cclxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3NlbGY6IFNoYXJlQnV0dG9uQmFzZSA9IHRoaXM7XHJcblxyXG4gIC8qKiBTaGFyZSBidXR0b24gc3VwcG9ydGVkIG1ldGEgdGFncyAqL1xyXG4gIHByb3RlY3RlZCByZWFkb25seSBfc3VwcG9ydGVkTWV0YVRhZ3M6IFNoYXJlTWV0YVRhZ3M7XHJcblxyXG4gIC8qKiBTaGFyZSBidXR0b24gbGFiZWwgKi9cclxuICBnZXQgdGV4dCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Byb3BzLnRleHQ7XHJcbiAgfVxyXG5cclxuICAvKiogU2hhcmUgYnV0dG9uIGFyaWEtbGFiZWwgYXR0cmlidXRlICovXHJcbiAgZ2V0IGFyaWFMYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Byb3BzLmFyaWFMYWJlbDtcclxuICB9XHJcblxyXG4gIC8qKiBTaGFyZSBidXR0b24gY29sb3IgKi9cclxuICBnZXQgY29sb3IoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9wcm9wcy5jb2xvcjtcclxuICB9XHJcblxyXG4gIC8qKiBTaGFyZSBidXR0b24gaWNvbiAoRm9udEF3ZXNvbWUpICovXHJcbiAgZ2V0IGljb24oKTogc3RyaW5nIHwgc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Byb3BzLmljb247XHJcbiAgfVxyXG5cclxuICBnZXQgZGVza3RvcCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGdldCBhbmRyb2lkKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXNrdG9wO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlvcygpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVza3RvcDtcclxuICB9XHJcblxyXG4gIGdldCBzaGFyZXJVcmwoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5JT1MpIHJldHVybiB0aGlzLmlvcztcclxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5BTkRST0lEKSByZXR1cm4gdGhpcy5hbmRyb2lkO1xyXG4gICAgcmV0dXJuIHRoaXMuZGVza3RvcDtcclxuICB9XHJcblxyXG4gIC8qKiBJZiBzaGFyZSBidXR0b24gc3VwcG9ydHMgc2hhcmUgY291bnQgKi9cclxuICBzdXBwb3J0U2hhcmVDb3VudCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX3Byb3BzOiBJU2hhcmVCdXR0b24sXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF91cmw6ICgpID0+IHN0cmluZyxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2h0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9wbGF0Zm9ybTogUGxhdGZvcm0sXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9kb2N1bWVudDogRG9jdW1lbnQsXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF93aW5kb3dTaXplOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgLy8gZGlzYWJsZSBidXR0b24gY2xpY2sgKHVzZWQgaW4gY29weSBidXR0b24pXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9kaXNhYmxlQnV0dG9uQ2xpY2s6IChkaXNhYmxlOiBib29sZWFuKSA9PiB2b2lkLFxyXG4gICAgICAgICAgICAgIC8vIExvZ2dlciBmdW5jdGlvbiAoZGVidWcgbW9kZSlcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2xvZ2dlcjogKHRleHQ6IHN0cmluZykgPT4gdm9pZCkge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbnMgc2hhcmUgd2luZG93XHJcbiAgICovXHJcbiAgY2xpY2sobWV0YVRhZ3M6IFNoYXJlTWV0YVRhZ3MpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX29wZW4odGhpcy5fc2VyaWFsaXplTWV0YVRhZ3MobWV0YVRhZ3MpKTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgc2hhcmUgY291bnQgb2YgYSBVUkwgKi9cclxuICBzaGFyZUNvdW50KHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxudW1iZXI+IHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZU1ldGFUYWdzKG1ldGFUYWdzOiBTaGFyZU1ldGFUYWdzKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLl9zdXBwb3J0ZWRNZXRhVGFncylcclxuICAgICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PlxyXG4gICAgICAgIG1ldGFUYWdzW2tleV0gPyBgJHt2YWx1ZX09JHtlbmNvZGVVUklDb21wb25lbnQobWV0YVRhZ3Nba2V5XSl9YCA6ICcnXHJcbiAgICAgIClcclxuICAgICAgLmpvaW4oJyYnKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfb3BlbihzZXJpYWxpemVkTWV0YVRhZ3M6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgLy8gQXZvaWQgU1NSIGVycm9yXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlclVybCAmJiB0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcclxuXHJcbiAgICAgICAgY29uc3QgZmluYWxVcmwgPSB0aGlzLnNoYXJlclVybCArIHNlcmlhbGl6ZWRNZXRhVGFncztcclxuXHJcbiAgICAgICAgLy8gRGVidWcgbW9kZSwgbG9nIHNoYXJlciBsaW5rXHJcbiAgICAgICAgdGhpcy5fbG9nZ2VyKGZpbmFsVXJsKTtcclxuXHJcbiAgICAgICAgY29uc3QgcG9wVXAgPSB0aGlzLl9kb2N1bWVudC5kZWZhdWx0Vmlldy5vcGVuKFxyXG4gICAgICAgICAgZmluYWxVcmwsXHJcbiAgICAgICAgICAnbmV3d2luZG93JyxcclxuICAgICAgICAgIHRoaXMuX3dpbmRvd1NpemVcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBSZXNvbHZlIHdoZW4gc2hhcmUgZGlhbG9nIGlzIGNsb3NlZFxyXG4gICAgICAgIGlmIChwb3BVcCkge1xyXG4gICAgICAgICAgY29uc3QgcG9sbFRpbWVyID0gdGhpcy5fZG9jdW1lbnQuZGVmYXVsdFZpZXcuc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocG9wVXAuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fZG9jdW1lbnQuZGVmYXVsdFZpZXcuY2xlYXJJbnRlcnZhbChwb2xsVGltZXIpO1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGAke3RoaXMudGV4dH0gYnV0dG9uIGlzIG5vdCBjb21wYXRpYmxlIG9uIHRoaXMgUGxhdGZvcm1gKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==