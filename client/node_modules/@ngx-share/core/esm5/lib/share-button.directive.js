/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, HostBinding, HostListener, Inject, EventEmitter, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { Subscription } from 'rxjs';
import { ShareService } from './share.service';
import { getValidUrl } from './utils';
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
export { ShareDirective };
if (false) {
    /**
     * A ref to button class - used to remove previous class when the button type is changed
     * @type {?}
     * @private
     */
    ShareDirective.prototype._buttonClass;
    /**
     * Share window closed event subscription
     * @type {?}
     * @private
     */
    ShareDirective.prototype._shareWindowClosed;
    /**
     * Button properties
     * @type {?}
     */
    ShareDirective.prototype.shareButton;
    /**
     * Share button type
     * @type {?}
     */
    ShareDirective.prototype.shareButtonName;
    /**
     * Get share count
     * @type {?}
     */
    ShareDirective.prototype.getCount;
    /**
     * Set meta tags from document head, useful when SEO is supported
     * @type {?}
     */
    ShareDirective.prototype.autoSetMeta;
    /**
     * Sharing link
     * @type {?}
     */
    ShareDirective.prototype.url;
    /**
     * Sets the title parameter
     * @type {?}
     */
    ShareDirective.prototype.title;
    /**
     * Sets the description parameter
     * @type {?}
     */
    ShareDirective.prototype.description;
    /**
     * Sets the image parameter for sharing on Pinterest
     * @type {?}
     */
    ShareDirective.prototype.image;
    /**
     * Sets the tags parameter for sharing on Twitter and Tumblr
     * @type {?}
     */
    ShareDirective.prototype.tags;
    /**
     * Stream that emits when share count is fetched
     * @type {?}
     */
    ShareDirective.prototype.count;
    /**
     * Stream that emits when share dialog is opened
     * @type {?}
     */
    ShareDirective.prototype.opened;
    /**
     * Stream that emits when share dialog is closed
     * @type {?}
     */
    ShareDirective.prototype.closed;
    /** @type {?} */
    ShareDirective.prototype.pointerEvents;
    /**
     * @type {?}
     * @private
     */
    ShareDirective.prototype._meta;
    /**
     * @type {?}
     * @private
     */
    ShareDirective.prototype._el;
    /**
     * @type {?}
     * @private
     */
    ShareDirective.prototype._http;
    /**
     * @type {?}
     * @private
     */
    ShareDirective.prototype._platform;
    /**
     * @type {?}
     * @private
     */
    ShareDirective.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    ShareDirective.prototype._cd;
    /**
     * @type {?}
     * @private
     */
    ShareDirective.prototype._share;
    /**
     * @type {?}
     * @private
     */
    ShareDirective.prototype._document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtYnV0dG9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtc2hhcmUvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZS1idXR0b24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBS04sWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBR3RDO0lBK0NFLHdCQUFvQixLQUFXLEVBQ1gsR0FBZSxFQUNmLEtBQWlCLEVBQ2pCLFNBQW1CLEVBQ25CLFNBQW9CLEVBQ3BCLEdBQXNCLEVBQ3RCLE1BQW9CLEVBQ0YsU0FBYztRQVBoQyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQWM7UUFDRixjQUFTLEdBQVQsU0FBUyxDQUFLOzs7O1FB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QUEsQUEzS0QsSUEyS0M7U0F4S1ksY0FBYzs7Ozs7OztJQUd6QixzQ0FBNkI7Ozs7OztJQUc3Qiw0Q0FBZ0Q7Ozs7O0lBR2hELHFDQUE2Qjs7Ozs7SUFHN0IseUNBQThDOzs7OztJQUc5QyxrQ0FBMEI7Ozs7O0lBRzFCLHFDQUErRDs7Ozs7SUFHL0QsNkJBQThDOzs7OztJQUc5QywrQkFBa0Q7Ozs7O0lBR2xELHFDQUE4RDs7Ozs7SUFHOUQsK0JBQWtEOzs7OztJQUdsRCw4QkFBZ0Q7Ozs7O0lBR2hELCtCQUE2Qzs7Ozs7SUFHN0MsZ0NBQThDOzs7OztJQUc5QyxnQ0FBOEM7O0lBWTlDLHVDQUEwRDs7Ozs7SUFWOUMsK0JBQW1COzs7OztJQUNuQiw2QkFBdUI7Ozs7O0lBQ3ZCLCtCQUF5Qjs7Ozs7SUFDekIsbUNBQTJCOzs7OztJQUMzQixtQ0FBNEI7Ozs7O0lBQzVCLDZCQUE4Qjs7Ozs7SUFDOUIsZ0NBQTRCOzs7OztJQUM1QixtQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEluamVjdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBFbGVtZW50UmVmLFxyXG4gIFJlbmRlcmVyMixcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE1ldGEgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFNoYXJlU2VydmljZSB9IGZyb20gJy4vc2hhcmUuc2VydmljZSc7XHJcbmltcG9ydCB7IElTaGFyZUJ1dHRvbiwgU2hhcmVNZXRhVGFncyB9IGZyb20gJy4vc2hhcmUubW9kZWxzJztcclxuaW1wb3J0IHsgZ2V0VmFsaWRVcmwgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgU2hhcmVCdXR0b25CYXNlIH0gZnJvbSAnLi9idXR0b25zJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3NoYXJlQnV0dG9uXSwgW3NoYXJlLWJ1dHRvbl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHJcbiAgLyoqIEEgcmVmIHRvIGJ1dHRvbiBjbGFzcyAtIHVzZWQgdG8gcmVtb3ZlIHByZXZpb3VzIGNsYXNzIHdoZW4gdGhlIGJ1dHRvbiB0eXBlIGlzIGNoYW5nZWQgKi9cclxuICBwcml2YXRlIF9idXR0b25DbGFzczogc3RyaW5nO1xyXG5cclxuICAvKiogU2hhcmUgd2luZG93IGNsb3NlZCBldmVudCBzdWJzY3JpcHRpb24gKi9cclxuICBwcml2YXRlIF9zaGFyZVdpbmRvd0Nsb3NlZCA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuXHJcbiAgLyoqIEJ1dHRvbiBwcm9wZXJ0aWVzICovXHJcbiAgc2hhcmVCdXR0b246IFNoYXJlQnV0dG9uQmFzZTtcclxuXHJcbiAgLyoqIFNoYXJlIGJ1dHRvbiB0eXBlICovXHJcbiAgQElucHV0KCdzaGFyZUJ1dHRvbicpIHNoYXJlQnV0dG9uTmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogR2V0IHNoYXJlIGNvdW50ICovXHJcbiAgQElucHV0KCkgZ2V0Q291bnQgPSBmYWxzZTtcclxuXHJcbiAgLyoqIFNldCBtZXRhIHRhZ3MgZnJvbSBkb2N1bWVudCBoZWFkLCB1c2VmdWwgd2hlbiBTRU8gaXMgc3VwcG9ydGVkICovXHJcbiAgQElucHV0KCkgYXV0b1NldE1ldGE6IGJvb2xlYW4gPSB0aGlzLl9zaGFyZS5jb25maWcuYXV0b1NldE1ldGE7XHJcblxyXG4gIC8qKiBTaGFyaW5nIGxpbmsgKi9cclxuICBASW5wdXQoKSB1cmw6IHN0cmluZyA9IHRoaXMuX3NoYXJlLmNvbmZpZy51cmw7XHJcblxyXG4gIC8qKiBTZXRzIHRoZSB0aXRsZSBwYXJhbWV0ZXIgKi9cclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nID0gdGhpcy5fc2hhcmUuY29uZmlnLnRpdGxlO1xyXG5cclxuICAvKiogU2V0cyB0aGUgZGVzY3JpcHRpb24gcGFyYW1ldGVyICovXHJcbiAgQElucHV0KCkgZGVzY3JpcHRpb246IHN0cmluZyA9IHRoaXMuX3NoYXJlLmNvbmZpZy5kZXNjcmlwdGlvbjtcclxuXHJcbiAgLyoqIFNldHMgdGhlIGltYWdlIHBhcmFtZXRlciBmb3Igc2hhcmluZyBvbiBQaW50ZXJlc3QgKi9cclxuICBASW5wdXQoKSBpbWFnZTogc3RyaW5nID0gdGhpcy5fc2hhcmUuY29uZmlnLmltYWdlO1xyXG5cclxuICAvKiogU2V0cyB0aGUgdGFncyBwYXJhbWV0ZXIgZm9yIHNoYXJpbmcgb24gVHdpdHRlciBhbmQgVHVtYmxyICovXHJcbiAgQElucHV0KCkgdGFnczogc3RyaW5nID0gdGhpcy5fc2hhcmUuY29uZmlnLnRhZ3M7XHJcblxyXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIHNoYXJlIGNvdW50IGlzIGZldGNoZWQgKi9cclxuICBAT3V0cHV0KCkgY291bnQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gc2hhcmUgZGlhbG9nIGlzIG9wZW5lZCAqL1xyXG4gIEBPdXRwdXQoKSBvcGVuZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gc2hhcmUgZGlhbG9nIGlzIGNsb3NlZCAqL1xyXG4gIEBPdXRwdXQoKSBjbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWV0YTogTWV0YSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIF9zaGFyZTogU2hhcmVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnkpIHtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUucG9pbnRlckV2ZW50cycpIHBvaW50ZXJFdmVudHM6IHN0cmluZztcclxuXHJcbiAgLyoqIFNoYXJlIHRoZSBsaW5rICovXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIHNoYXJlKCkge1xyXG4gICAgY29uc3QgbWV0YVRhZ3M6IFNoYXJlTWV0YVRhZ3MgPSB0aGlzLmF1dG9TZXRNZXRhID8ge1xyXG4gICAgICB1cmw6IHRoaXMudXJsLFxyXG4gICAgICB0aXRsZTogdGhpcy50aXRsZSB8fCB0aGlzLl9nZXRNZXRhVGFnQ29udGVudCgnb2c6dGl0bGUnKSxcclxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24gfHwgdGhpcy5fZ2V0TWV0YVRhZ0NvbnRlbnQoJ29nOmRlc2NyaXB0aW9uJyksXHJcbiAgICAgIGltYWdlOiB0aGlzLmltYWdlIHx8IHRoaXMuX2dldE1ldGFUYWdDb250ZW50KCdvZzppbWFnZScpLFxyXG4gICAgICB2aWE6IHRoaXMuX3NoYXJlLmNvbmZpZy50d2l0dGVyQWNjb3VudCxcclxuICAgICAgdGFnczogdGhpcy50YWdzLFxyXG4gICAgfSA6IHtcclxuICAgICAgdXJsOiB0aGlzLnVybCxcclxuICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxyXG4gICAgICBpbWFnZTogdGhpcy5pbWFnZSxcclxuICAgICAgdGFnczogdGhpcy50YWdzLFxyXG4gICAgICB2aWE6IHRoaXMuX3NoYXJlLmNvbmZpZy50d2l0dGVyQWNjb3VudCxcclxuICAgIH07XHJcblxyXG4gICAgLy8gRW1pdCB3aGVuIHNoYXJlIGRpYWxvZyBpcyBvcGVuZWRcclxuICAgIHRoaXMub3BlbmVkLmVtaXQodGhpcy5zaGFyZUJ1dHRvbk5hbWUpO1xyXG4gICAgLy8gU2hhcmUgdGhlIGxpbmtcclxuICAgIHRoaXMuc2hhcmVCdXR0b24uY2xpY2sobWV0YVRhZ3MpLnRoZW4oKCkgPT5cclxuICAgIC8vIEVtaXQgd2hlbiBzaGFyZSBkaWFsb2cgaXMgY2xvc2VkXHJcbiAgICAgIHRoaXMuY2xvc2VkLmVtaXQodGhpcy5zaGFyZUJ1dHRvbk5hbWUpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgLy8gQXZvaWQgU1NSIGVycm9yXHJcbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XHJcblxyXG4gICAgICBpZiAodGhpcy5fc2hhcmVCdXR0b25DaGFuZ2VkKGNoYW5nZXNbJ3NoYXJlQnV0dG9uTmFtZSddKSkge1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVNoYXJlQnV0dG9uKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLl91cmxDaGFuZ2VkKGNoYW5nZXNbJ3VybCddKSkge1xyXG4gICAgICAgIHRoaXMudXJsID0gZ2V0VmFsaWRVcmwoXHJcbiAgICAgICAgICB0aGlzLmF1dG9TZXRNZXRhXHJcbiAgICAgICAgICAgID8gdGhpcy51cmwgfHwgdGhpcy5fZ2V0TWV0YVRhZ0NvbnRlbnQoJ29nOnVybCcpXHJcbiAgICAgICAgICAgIDogdGhpcy51cmwsXHJcbiAgICAgICAgICB0aGlzLl9kb2N1bWVudC5kZWZhdWx0Vmlldy5sb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0Q291bnQgJiYgdGhpcy5zaGFyZUJ1dHRvbi5zdXBwb3J0U2hhcmVDb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5zaGFyZUJ1dHRvbi5zaGFyZUNvdW50KHRoaXMudXJsKS5zdWJzY3JpYmUoKGNvdW50OiBudW1iZXIpID0+IHRoaXMuY291bnQuZW1pdChjb3VudCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9zaGFyZVdpbmRvd0Nsb3NlZC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY3JlYXRlU2hhcmVCdXR0b24oKSB7XHJcbiAgICBjb25zdCBzaGFyZUJ1dHRvbkZhY3Rvcnk6IElTaGFyZUJ1dHRvbiA9IHRoaXMuX3NoYXJlLmNvbmZpZy5wcm9wW3RoaXMuc2hhcmVCdXR0b25OYW1lXTtcclxuICAgIGNvbnN0IGJ1dHRvbjogU2hhcmVCdXR0b25CYXNlID0gc2hhcmVCdXR0b25GYWN0b3J5LmNyZWF0ZShcclxuICAgICAgc2hhcmVCdXR0b25GYWN0b3J5LFxyXG4gICAgICAvLyBQYXNzIHRoZSB1cmwgcHJvcGVydHkgYXMgYSBmdW5jdGlvbiwgc28gdGhlIGJ1dHRvbiBjbGFzcyBhbHdheXMgZ2V0cyB0aGUgcmVjZW50IHVybCB2YWx1ZS5cclxuICAgICAgKCkgPT4gdGhpcy51cmwsXHJcbiAgICAgIHRoaXMuX2h0dHAsXHJcbiAgICAgIHRoaXMuX3BsYXRmb3JtLFxyXG4gICAgICB0aGlzLl9kb2N1bWVudCxcclxuICAgICAgdGhpcy5fc2hhcmUud2luZG93U2l6ZSxcclxuICAgICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBtZWFudCBmb3IgdGhlIGNvcHkgYnV0dG9uXHJcbiAgICAgIChkaXNhYmxlZDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIHRoaXMucG9pbnRlckV2ZW50cyA9IGRpc2FibGVkID8gJ25vbmUnIDogJ2F1dG8nO1xyXG4gICAgICAgIHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICB9LFxyXG4gICAgICAvLyBMb2dnZXIgdXNlZCBmb3IgZGVidWdnaW5nXHJcbiAgICAgICh0ZXh0OiBzdHJpbmcpID0+IHRoaXMuX3NoYXJlLmNvbmZpZy5kZWJ1ZyA/IGNvbnNvbGUubG9nKHRleHQpIDogbnVsbFxyXG4gICAgKTtcclxuICAgIGlmIChidXR0b24pIHtcclxuICAgICAgLy8gU2V0IHNoYXJlIGJ1dHRvbiBwcm9wZXJ0aWVzXHJcbiAgICAgIHRoaXMuc2hhcmVCdXR0b24gPSBidXR0b247XHJcblxyXG4gICAgICAvLyBSZW1vdmUgcHJldmlvdXMgYnV0dG9uIGNsYXNzXHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIGBzYi0ke3RoaXMuX2J1dHRvbkNsYXNzfWApO1xyXG5cclxuICAgICAgLy8gQWRkIG5ldyBidXR0b24gY2xhc3NcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgYHNiLSR7dGhpcy5zaGFyZUJ1dHRvbk5hbWV9YCk7XHJcblxyXG4gICAgICAvLyBTZXQgYnV0dG9uIGNzcyBjb2xvciB2YXJpYWJsZVxyXG4gICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWJ1dHRvbi1jb2xvcicsIHRoaXMuc2hhcmVCdXR0b24uY29sb3IpO1xyXG5cclxuICAgICAgLy8gS2VlcCBhIGNvcHkgb2YgdGhlIGNsYXNzIGZvciBmdXR1cmUgcmVwbGFjZW1lbnRcclxuICAgICAgdGhpcy5fYnV0dG9uQ2xhc3MgPSB0aGlzLnNoYXJlQnV0dG9uTmFtZTtcclxuXHJcbiAgICAgIC8vIFNldCBhcmlhLWxhYmVsIGF0dHJpYnV0ZVxyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2FyaWEtbGFiZWwnLCBidXR0b24uYXJpYUxhYmVsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFtTaGFyZUJ1dHRvbnNdOiBUaGUgc2hhcmUgYnV0dG9uICcke3RoaXMuc2hhcmVCdXR0b25OYW1lfScgZG9lcyBub3QgZXhpc3QhYCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IG1ldGEgdGFnIGNvbnRlbnQgKi9cclxuICBwcml2YXRlIF9nZXRNZXRhVGFnQ29udGVudChrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBtZXRhVXNpbmdQcm9wZXJ0eTogSFRNTE1ldGFFbGVtZW50ID0gdGhpcy5fbWV0YS5nZXRUYWcoYHByb3BlcnR5PVwiJHtrZXl9XCJgKTtcclxuICAgIGlmIChtZXRhVXNpbmdQcm9wZXJ0eSkgcmV0dXJuIG1ldGFVc2luZ1Byb3BlcnR5LmdldEF0dHJpYnV0ZSgnY29udGVudCcpO1xyXG4gICAgY29uc3QgbWV0YVVzaW5nTmFtZTogSFRNTE1ldGFFbGVtZW50ID0gdGhpcy5fbWV0YS5nZXRUYWcoYG5hbWU9XCIke2tleX1cImApO1xyXG4gICAgaWYgKG1ldGFVc2luZ05hbWUpIHJldHVybiBtZXRhVXNpbmdOYW1lLmdldEF0dHJpYnV0ZSgnY29udGVudCcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hhcmVCdXR0b25DaGFuZ2VkKGNoYW5nZTogU2ltcGxlQ2hhbmdlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gY2hhbmdlICYmIChjaGFuZ2UuZmlyc3RDaGFuZ2UgfHwgY2hhbmdlLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZS5jdXJyZW50VmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXJsQ2hhbmdlZChjaGFuZ2U6IFNpbXBsZUNoYW5nZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICF0aGlzLnVybCB8fCAoY2hhbmdlICYmIGNoYW5nZS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2UuY3VycmVudFZhbHVlKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==