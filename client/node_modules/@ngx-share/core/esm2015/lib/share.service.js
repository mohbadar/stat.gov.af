/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SHARE_BUTTONS_CONFIG } from './share.models';
import { SHARE_BUTTONS } from './share.defaults';
import { mergeDeep } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "./share.models";
export class ShareService {
    /**
     * @param {?} config
     */
    constructor(config) {
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
    /**
     * Share buttons properties, used to get the text, color and icon of each button.
     * @return {?}
     */
    get prop() {
        return this.config.prop;
    }
    /**
     * @return {?}
     */
    get windowSize() {
        return `width=${this.config.windowWidth}, height=${this.config.windowHeight}`;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    setConfig(config) {
        this.config = mergeDeep(this.config, config);
        this.config$.next(this.config);
    }
}
ShareService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ShareService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [SHARE_BUTTONS_CONFIG,] }] }
];
/** @nocollapse */ ShareService.ngInjectableDef = i0.defineInjectable({ factory: function ShareService_Factory() { return new ShareService(i0.inject(i1.SHARE_BUTTONS_CONFIG, 8)); }, token: ShareService, providedIn: "root" });
if (false) {
    /**
     * Global config that applies on all share buttons in the app
     * @type {?}
     */
    ShareService.prototype.config;
    /**
     * Stream that emits when config changes
     * @type {?}
     */
    ShareService.prototype.config$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtc2hhcmUvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQXNCLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7OztBQUtwQyxNQUFNLE9BQU8sWUFBWTs7OztJQW1CdkIsWUFBc0QsTUFBMEI7Ozs7UUFoQmhGLFdBQU0sR0FBdUI7WUFDM0IsSUFBSSxFQUFFLGFBQWE7WUFDbkIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksRUFBRSxDQUFDO1lBQ1AsV0FBVyxFQUFFLElBQUk7WUFDakIsV0FBVyxFQUFFLEdBQUc7WUFDaEIsWUFBWSxFQUFFLEdBQUc7WUFDakIsY0FBYyxFQUFFLFlBQVk7WUFDNUIsY0FBYyxFQUFFLE9BQU87U0FDeEIsQ0FBQzs7OztRQUdGLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFHekMsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLFNBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNoRixDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxNQUEwQjtRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7WUExQ0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7OzRDQW9CYyxRQUFRLFlBQUksTUFBTSxTQUFDLG9CQUFvQjs7Ozs7Ozs7SUFoQnBELDhCQVdFOzs7OztJQUdGLCtCQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNoYXJlQnV0dG9uc0NvbmZpZywgU0hBUkVfQlVUVE9OU19DT05GSUcgfSBmcm9tICcuL3NoYXJlLm1vZGVscyc7XHJcbmltcG9ydCB7IFNIQVJFX0JVVFRPTlMgfSBmcm9tICcuL3NoYXJlLmRlZmF1bHRzJztcclxuaW1wb3J0IHsgbWVyZ2VEZWVwIH0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZVNlcnZpY2Uge1xyXG5cclxuICAvKiogR2xvYmFsIGNvbmZpZyB0aGF0IGFwcGxpZXMgb24gYWxsIHNoYXJlIGJ1dHRvbnMgaW4gdGhlIGFwcCAqL1xyXG4gIGNvbmZpZzogU2hhcmVCdXR0b25zQ29uZmlnID0ge1xyXG4gICAgcHJvcDogU0hBUkVfQlVUVE9OUyxcclxuICAgIHRoZW1lOiAnZGVmYXVsdCcsXHJcbiAgICBpbmNsdWRlOiBbXSxcclxuICAgIGV4Y2x1ZGU6IFtdLFxyXG4gICAgc2l6ZTogMCxcclxuICAgIGF1dG9TZXRNZXRhOiB0cnVlLFxyXG4gICAgd2luZG93V2lkdGg6IDgwMCxcclxuICAgIHdpbmRvd0hlaWdodDogNTAwLFxyXG4gICAgbW9yZUJ1dHRvbkljb246ICdlbGxpcHNpcy1oJyxcclxuICAgIGxlc3NCdXR0b25JY29uOiAnbWludXMnXHJcbiAgfTtcclxuXHJcbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gY29uZmlnIGNoYW5nZXMgKi9cclxuICBjb25maWckID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0aGlzLmNvbmZpZyk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoU0hBUkVfQlVUVE9OU19DT05GSUcpIGNvbmZpZzogU2hhcmVCdXR0b25zQ29uZmlnKSB7XHJcbiAgICBpZiAoY29uZmlnKSB7XHJcbiAgICAgIHRoaXMuc2V0Q29uZmlnKGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaGFyZSBidXR0b25zIHByb3BlcnRpZXMsIHVzZWQgdG8gZ2V0IHRoZSB0ZXh0LCBjb2xvciBhbmQgaWNvbiBvZiBlYWNoIGJ1dHRvbi5cclxuICAgKi9cclxuICBnZXQgcHJvcCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5wcm9wO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHdpbmRvd1NpemUoKSB7XHJcbiAgICByZXR1cm4gYHdpZHRoPSR7dGhpcy5jb25maWcud2luZG93V2lkdGh9LCBoZWlnaHQ9JHt0aGlzLmNvbmZpZy53aW5kb3dIZWlnaHR9YDtcclxuICB9XHJcblxyXG4gIHNldENvbmZpZyhjb25maWc6IFNoYXJlQnV0dG9uc0NvbmZpZykge1xyXG4gICAgdGhpcy5jb25maWcgPSBtZXJnZURlZXAodGhpcy5jb25maWcsIGNvbmZpZyk7XHJcbiAgICB0aGlzLmNvbmZpZyQubmV4dCh0aGlzLmNvbmZpZyk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=