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
export class ShareDirective {
    /**
     * @param {?} _meta
     * @param {?} _el
     * @param {?} _http
     * @param {?} _platform
     * @param {?} _renderer
     * @param {?} _cd
     * @param {?} _share
     * @param {?} _document
     */
    constructor(_meta, _el, _http, _platform, _renderer, _cd, _share, _document) {
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
    /**
     * Share the link
     * @return {?}
     */
    share() {
        /** @type {?} */
        const metaTags = this.autoSetMeta ? {
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
        this.shareButton.click(metaTags).then(() => 
        // Emit when share dialog is closed
        this.closed.emit(this.shareButtonName));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
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
                    this.shareButton.shareCount(this.url).subscribe((count) => this.count.emit(count));
                }
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._shareWindowClosed.unsubscribe();
    }
    /**
     * @private
     * @return {?}
     */
    _createShareButton() {
        /** @type {?} */
        const shareButtonFactory = this._share.config.prop[this.shareButtonName];
        /** @type {?} */
        const button = shareButtonFactory.create(shareButtonFactory, 
        // Pass the url property as a function, so the button class always gets the recent url value.
        () => this.url, this._http, this._platform, this._document, this._share.windowSize, 
        // This function is meant for the copy button
        (disabled) => {
            this.pointerEvents = disabled ? 'none' : 'auto';
            this._cd.markForCheck();
        }, 
        // Logger used for debugging
        (text) => this._share.config.debug ? console.log(text) : null);
        if (button) {
            // Set share button properties
            this.shareButton = button;
            // Remove previous button class
            this._renderer.removeClass(this._el.nativeElement, `sb-${this._buttonClass}`);
            // Add new button class
            this._renderer.addClass(this._el.nativeElement, `sb-${this.shareButtonName}`);
            // Set button css color variable
            this._el.nativeElement.style.setProperty('--button-color', this.shareButton.color);
            // Keep a copy of the class for future replacement
            this._buttonClass = this.shareButtonName;
            // Set aria-label attribute
            this._renderer.setAttribute(this._el.nativeElement, 'aria-label', button.ariaLabel);
        }
        else {
            console.error(`[ShareButtons]: The share button '${this.shareButtonName}' does not exist!`);
        }
    }
    /**
     * Get meta tag content
     * @private
     * @param {?} key
     * @return {?}
     */
    _getMetaTagContent(key) {
        /** @type {?} */
        const metaUsingProperty = this._meta.getTag(`property="${key}"`);
        if (metaUsingProperty)
            return metaUsingProperty.getAttribute('content');
        /** @type {?} */
        const metaUsingName = this._meta.getTag(`name="${key}"`);
        if (metaUsingName)
            return metaUsingName.getAttribute('content');
    }
    /**
     * @private
     * @param {?} change
     * @return {?}
     */
    _shareButtonChanged(change) {
        return change && (change.firstChange || change.previousValue !== change.currentValue);
    }
    /**
     * @private
     * @param {?} change
     * @return {?}
     */
    _urlChanged(change) {
        return !this.url || (change && change.previousValue !== change.currentValue);
    }
}
ShareDirective.decorators = [
    { type: Directive, args: [{
                selector: '[shareButton], [share-button]'
            },] }
];
/** @nocollapse */
ShareDirective.ctorParameters = () => [
    { type: Meta },
    { type: ElementRef },
    { type: HttpClient },
    { type: Platform },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: ShareService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtYnV0dG9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtc2hhcmUvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZS1idXR0b24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBS04sWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBTXRDLE1BQU0sT0FBTyxjQUFjOzs7Ozs7Ozs7OztJQTRDekIsWUFBb0IsS0FBVyxFQUNYLEdBQWUsRUFDZixLQUFpQixFQUNqQixTQUFtQixFQUNuQixTQUFvQixFQUNwQixHQUFzQixFQUN0QixNQUFvQixFQUNGLFNBQWM7UUFQaEMsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ0Ys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Ozs7O0lBR2xELHFDQUE4RDs7Ozs7SUFHOUQsK0JBQWtEOzs7OztJQUdsRCw4QkFBZ0Q7Ozs7O0lBR2hELCtCQUE2Qzs7Ozs7SUFHN0MsZ0NBQThDOzs7OztJQUc5QyxnQ0FBOEM7O0lBWTlDLHVDQUEwRDs7Ozs7SUFWOUMsK0JBQW1COzs7OztJQUNuQiw2QkFBdUI7Ozs7O0lBQ3ZCLCtCQUF5Qjs7Ozs7SUFDekIsbUNBQTJCOzs7OztJQUMzQixtQ0FBNEI7Ozs7O0lBQzVCLDZCQUE4Qjs7Ozs7SUFDOUIsZ0NBQTRCOzs7OztJQUM1QixtQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEluamVjdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBFbGVtZW50UmVmLFxyXG4gIFJlbmRlcmVyMixcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE1ldGEgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFNoYXJlU2VydmljZSB9IGZyb20gJy4vc2hhcmUuc2VydmljZSc7XHJcbmltcG9ydCB7IElTaGFyZUJ1dHRvbiwgU2hhcmVNZXRhVGFncyB9IGZyb20gJy4vc2hhcmUubW9kZWxzJztcclxuaW1wb3J0IHsgZ2V0VmFsaWRVcmwgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgU2hhcmVCdXR0b25CYXNlIH0gZnJvbSAnLi9idXR0b25zJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3NoYXJlQnV0dG9uXSwgW3NoYXJlLWJ1dHRvbl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHJcbiAgLyoqIEEgcmVmIHRvIGJ1dHRvbiBjbGFzcyAtIHVzZWQgdG8gcmVtb3ZlIHByZXZpb3VzIGNsYXNzIHdoZW4gdGhlIGJ1dHRvbiB0eXBlIGlzIGNoYW5nZWQgKi9cclxuICBwcml2YXRlIF9idXR0b25DbGFzczogc3RyaW5nO1xyXG5cclxuICAvKiogU2hhcmUgd2luZG93IGNsb3NlZCBldmVudCBzdWJzY3JpcHRpb24gKi9cclxuICBwcml2YXRlIF9zaGFyZVdpbmRvd0Nsb3NlZCA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuXHJcbiAgLyoqIEJ1dHRvbiBwcm9wZXJ0aWVzICovXHJcbiAgc2hhcmVCdXR0b246IFNoYXJlQnV0dG9uQmFzZTtcclxuXHJcbiAgLyoqIFNoYXJlIGJ1dHRvbiB0eXBlICovXHJcbiAgQElucHV0KCdzaGFyZUJ1dHRvbicpIHNoYXJlQnV0dG9uTmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogR2V0IHNoYXJlIGNvdW50ICovXHJcbiAgQElucHV0KCkgZ2V0Q291bnQgPSBmYWxzZTtcclxuXHJcbiAgLyoqIFNldCBtZXRhIHRhZ3MgZnJvbSBkb2N1bWVudCBoZWFkLCB1c2VmdWwgd2hlbiBTRU8gaXMgc3VwcG9ydGVkICovXHJcbiAgQElucHV0KCkgYXV0b1NldE1ldGE6IGJvb2xlYW4gPSB0aGlzLl9zaGFyZS5jb25maWcuYXV0b1NldE1ldGE7XHJcblxyXG4gIC8qKiBTaGFyaW5nIGxpbmsgKi9cclxuICBASW5wdXQoKSB1cmw6IHN0cmluZyA9IHRoaXMuX3NoYXJlLmNvbmZpZy51cmw7XHJcblxyXG4gIC8qKiBTZXRzIHRoZSB0aXRsZSBwYXJhbWV0ZXIgKi9cclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nID0gdGhpcy5fc2hhcmUuY29uZmlnLnRpdGxlO1xyXG5cclxuICAvKiogU2V0cyB0aGUgZGVzY3JpcHRpb24gcGFyYW1ldGVyICovXHJcbiAgQElucHV0KCkgZGVzY3JpcHRpb246IHN0cmluZyA9IHRoaXMuX3NoYXJlLmNvbmZpZy5kZXNjcmlwdGlvbjtcclxuXHJcbiAgLyoqIFNldHMgdGhlIGltYWdlIHBhcmFtZXRlciBmb3Igc2hhcmluZyBvbiBQaW50ZXJlc3QgKi9cclxuICBASW5wdXQoKSBpbWFnZTogc3RyaW5nID0gdGhpcy5fc2hhcmUuY29uZmlnLmltYWdlO1xyXG5cclxuICAvKiogU2V0cyB0aGUgdGFncyBwYXJhbWV0ZXIgZm9yIHNoYXJpbmcgb24gVHdpdHRlciBhbmQgVHVtYmxyICovXHJcbiAgQElucHV0KCkgdGFnczogc3RyaW5nID0gdGhpcy5fc2hhcmUuY29uZmlnLnRhZ3M7XHJcblxyXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIHNoYXJlIGNvdW50IGlzIGZldGNoZWQgKi9cclxuICBAT3V0cHV0KCkgY291bnQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gc2hhcmUgZGlhbG9nIGlzIG9wZW5lZCAqL1xyXG4gIEBPdXRwdXQoKSBvcGVuZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gc2hhcmUgZGlhbG9nIGlzIGNsb3NlZCAqL1xyXG4gIEBPdXRwdXQoKSBjbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWV0YTogTWV0YSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIF9zaGFyZTogU2hhcmVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnkpIHtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUucG9pbnRlckV2ZW50cycpIHBvaW50ZXJFdmVudHM6IHN0cmluZztcclxuXHJcbiAgLyoqIFNoYXJlIHRoZSBsaW5rICovXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIHNoYXJlKCkge1xyXG4gICAgY29uc3QgbWV0YVRhZ3M6IFNoYXJlTWV0YVRhZ3MgPSB0aGlzLmF1dG9TZXRNZXRhID8ge1xyXG4gICAgICB1cmw6IHRoaXMudXJsLFxyXG4gICAgICB0aXRsZTogdGhpcy50aXRsZSB8fCB0aGlzLl9nZXRNZXRhVGFnQ29udGVudCgnb2c6dGl0bGUnKSxcclxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24gfHwgdGhpcy5fZ2V0TWV0YVRhZ0NvbnRlbnQoJ29nOmRlc2NyaXB0aW9uJyksXHJcbiAgICAgIGltYWdlOiB0aGlzLmltYWdlIHx8IHRoaXMuX2dldE1ldGFUYWdDb250ZW50KCdvZzppbWFnZScpLFxyXG4gICAgICB2aWE6IHRoaXMuX3NoYXJlLmNvbmZpZy50d2l0dGVyQWNjb3VudCxcclxuICAgICAgdGFnczogdGhpcy50YWdzLFxyXG4gICAgfSA6IHtcclxuICAgICAgdXJsOiB0aGlzLnVybCxcclxuICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxyXG4gICAgICBpbWFnZTogdGhpcy5pbWFnZSxcclxuICAgICAgdGFnczogdGhpcy50YWdzLFxyXG4gICAgICB2aWE6IHRoaXMuX3NoYXJlLmNvbmZpZy50d2l0dGVyQWNjb3VudCxcclxuICAgIH07XHJcblxyXG4gICAgLy8gRW1pdCB3aGVuIHNoYXJlIGRpYWxvZyBpcyBvcGVuZWRcclxuICAgIHRoaXMub3BlbmVkLmVtaXQodGhpcy5zaGFyZUJ1dHRvbk5hbWUpO1xyXG4gICAgLy8gU2hhcmUgdGhlIGxpbmtcclxuICAgIHRoaXMuc2hhcmVCdXR0b24uY2xpY2sobWV0YVRhZ3MpLnRoZW4oKCkgPT5cclxuICAgIC8vIEVtaXQgd2hlbiBzaGFyZSBkaWFsb2cgaXMgY2xvc2VkXHJcbiAgICAgIHRoaXMuY2xvc2VkLmVtaXQodGhpcy5zaGFyZUJ1dHRvbk5hbWUpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgLy8gQXZvaWQgU1NSIGVycm9yXHJcbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XHJcblxyXG4gICAgICBpZiAodGhpcy5fc2hhcmVCdXR0b25DaGFuZ2VkKGNoYW5nZXNbJ3NoYXJlQnV0dG9uTmFtZSddKSkge1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZVNoYXJlQnV0dG9uKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLl91cmxDaGFuZ2VkKGNoYW5nZXNbJ3VybCddKSkge1xyXG4gICAgICAgIHRoaXMudXJsID0gZ2V0VmFsaWRVcmwoXHJcbiAgICAgICAgICB0aGlzLmF1dG9TZXRNZXRhXHJcbiAgICAgICAgICAgID8gdGhpcy51cmwgfHwgdGhpcy5fZ2V0TWV0YVRhZ0NvbnRlbnQoJ29nOnVybCcpXHJcbiAgICAgICAgICAgIDogdGhpcy51cmwsXHJcbiAgICAgICAgICB0aGlzLl9kb2N1bWVudC5kZWZhdWx0Vmlldy5sb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0Q291bnQgJiYgdGhpcy5zaGFyZUJ1dHRvbi5zdXBwb3J0U2hhcmVDb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5zaGFyZUJ1dHRvbi5zaGFyZUNvdW50KHRoaXMudXJsKS5zdWJzY3JpYmUoKGNvdW50OiBudW1iZXIpID0+IHRoaXMuY291bnQuZW1pdChjb3VudCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9zaGFyZVdpbmRvd0Nsb3NlZC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY3JlYXRlU2hhcmVCdXR0b24oKSB7XHJcbiAgICBjb25zdCBzaGFyZUJ1dHRvbkZhY3Rvcnk6IElTaGFyZUJ1dHRvbiA9IHRoaXMuX3NoYXJlLmNvbmZpZy5wcm9wW3RoaXMuc2hhcmVCdXR0b25OYW1lXTtcclxuICAgIGNvbnN0IGJ1dHRvbjogU2hhcmVCdXR0b25CYXNlID0gc2hhcmVCdXR0b25GYWN0b3J5LmNyZWF0ZShcclxuICAgICAgc2hhcmVCdXR0b25GYWN0b3J5LFxyXG4gICAgICAvLyBQYXNzIHRoZSB1cmwgcHJvcGVydHkgYXMgYSBmdW5jdGlvbiwgc28gdGhlIGJ1dHRvbiBjbGFzcyBhbHdheXMgZ2V0cyB0aGUgcmVjZW50IHVybCB2YWx1ZS5cclxuICAgICAgKCkgPT4gdGhpcy51cmwsXHJcbiAgICAgIHRoaXMuX2h0dHAsXHJcbiAgICAgIHRoaXMuX3BsYXRmb3JtLFxyXG4gICAgICB0aGlzLl9kb2N1bWVudCxcclxuICAgICAgdGhpcy5fc2hhcmUud2luZG93U2l6ZSxcclxuICAgICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBtZWFudCBmb3IgdGhlIGNvcHkgYnV0dG9uXHJcbiAgICAgIChkaXNhYmxlZDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIHRoaXMucG9pbnRlckV2ZW50cyA9IGRpc2FibGVkID8gJ25vbmUnIDogJ2F1dG8nO1xyXG4gICAgICAgIHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICB9LFxyXG4gICAgICAvLyBMb2dnZXIgdXNlZCBmb3IgZGVidWdnaW5nXHJcbiAgICAgICh0ZXh0OiBzdHJpbmcpID0+IHRoaXMuX3NoYXJlLmNvbmZpZy5kZWJ1ZyA/IGNvbnNvbGUubG9nKHRleHQpIDogbnVsbFxyXG4gICAgKTtcclxuICAgIGlmIChidXR0b24pIHtcclxuICAgICAgLy8gU2V0IHNoYXJlIGJ1dHRvbiBwcm9wZXJ0aWVzXHJcbiAgICAgIHRoaXMuc2hhcmVCdXR0b24gPSBidXR0b247XHJcblxyXG4gICAgICAvLyBSZW1vdmUgcHJldmlvdXMgYnV0dG9uIGNsYXNzXHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIGBzYi0ke3RoaXMuX2J1dHRvbkNsYXNzfWApO1xyXG5cclxuICAgICAgLy8gQWRkIG5ldyBidXR0b24gY2xhc3NcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgYHNiLSR7dGhpcy5zaGFyZUJ1dHRvbk5hbWV9YCk7XHJcblxyXG4gICAgICAvLyBTZXQgYnV0dG9uIGNzcyBjb2xvciB2YXJpYWJsZVxyXG4gICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWJ1dHRvbi1jb2xvcicsIHRoaXMuc2hhcmVCdXR0b24uY29sb3IpO1xyXG5cclxuICAgICAgLy8gS2VlcCBhIGNvcHkgb2YgdGhlIGNsYXNzIGZvciBmdXR1cmUgcmVwbGFjZW1lbnRcclxuICAgICAgdGhpcy5fYnV0dG9uQ2xhc3MgPSB0aGlzLnNoYXJlQnV0dG9uTmFtZTtcclxuXHJcbiAgICAgIC8vIFNldCBhcmlhLWxhYmVsIGF0dHJpYnV0ZVxyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2FyaWEtbGFiZWwnLCBidXR0b24uYXJpYUxhYmVsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFtTaGFyZUJ1dHRvbnNdOiBUaGUgc2hhcmUgYnV0dG9uICcke3RoaXMuc2hhcmVCdXR0b25OYW1lfScgZG9lcyBub3QgZXhpc3QhYCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IG1ldGEgdGFnIGNvbnRlbnQgKi9cclxuICBwcml2YXRlIF9nZXRNZXRhVGFnQ29udGVudChrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBtZXRhVXNpbmdQcm9wZXJ0eTogSFRNTE1ldGFFbGVtZW50ID0gdGhpcy5fbWV0YS5nZXRUYWcoYHByb3BlcnR5PVwiJHtrZXl9XCJgKTtcclxuICAgIGlmIChtZXRhVXNpbmdQcm9wZXJ0eSkgcmV0dXJuIG1ldGFVc2luZ1Byb3BlcnR5LmdldEF0dHJpYnV0ZSgnY29udGVudCcpO1xyXG4gICAgY29uc3QgbWV0YVVzaW5nTmFtZTogSFRNTE1ldGFFbGVtZW50ID0gdGhpcy5fbWV0YS5nZXRUYWcoYG5hbWU9XCIke2tleX1cImApO1xyXG4gICAgaWYgKG1ldGFVc2luZ05hbWUpIHJldHVybiBtZXRhVXNpbmdOYW1lLmdldEF0dHJpYnV0ZSgnY29udGVudCcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hhcmVCdXR0b25DaGFuZ2VkKGNoYW5nZTogU2ltcGxlQ2hhbmdlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gY2hhbmdlICYmIChjaGFuZ2UuZmlyc3RDaGFuZ2UgfHwgY2hhbmdlLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZS5jdXJyZW50VmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXJsQ2hhbmdlZChjaGFuZ2U6IFNpbXBsZUNoYW5nZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICF0aGlzLnVybCB8fCAoY2hhbmdlICYmIGNoYW5nZS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2UuY3VycmVudFZhbHVlKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==