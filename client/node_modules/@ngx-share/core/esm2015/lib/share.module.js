/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { ShareDirective } from './share-button.directive';
import { ShareCountPipe } from './share-count.pipe';
import { SHARE_BUTTONS_CONFIG } from './share.models';
export class ShareModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static withConfig(config) {
        return {
            ngModule: ShareModule,
            providers: [
                { provide: SHARE_BUTTONS_CONFIG, useValue: config }
            ]
        };
    }
}
ShareModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    PlatformModule
                ],
                declarations: [
                    ShareDirective,
                    ShareCountPipe
                ],
                exports: [
                    ShareDirective,
                    ShareCountPipe
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1zaGFyZS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NoYXJlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9CQUFvQixFQUFzQixNQUFNLGdCQUFnQixDQUFDO0FBZTFFLE1BQU0sT0FBTyxXQUFXOzs7OztJQUN0QixNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTJCO1FBQzNDLE9BQU87WUFDTCxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQzthQUNsRDtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFyQkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxjQUFjO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDWixjQUFjO29CQUNkLGNBQWM7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGNBQWM7b0JBQ2QsY0FBYztpQkFDZjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xyXG5cclxuaW1wb3J0IHsgU2hhcmVEaXJlY3RpdmUgfSBmcm9tICcuL3NoYXJlLWJ1dHRvbi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBTaGFyZUNvdW50UGlwZSB9IGZyb20gJy4vc2hhcmUtY291bnQucGlwZSc7XHJcbmltcG9ydCB7IFNIQVJFX0JVVFRPTlNfQ09ORklHLCBTaGFyZUJ1dHRvbnNDb25maWcgfSBmcm9tICcuL3NoYXJlLm1vZGVscyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFBsYXRmb3JtTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFNoYXJlRGlyZWN0aXZlLFxyXG4gICAgU2hhcmVDb3VudFBpcGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFNoYXJlRGlyZWN0aXZlLFxyXG4gICAgU2hhcmVDb3VudFBpcGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZU1vZHVsZSB7XHJcbiAgc3RhdGljIHdpdGhDb25maWcoY29uZmlnPzogU2hhcmVCdXR0b25zQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogU2hhcmVNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtwcm92aWRlOiBTSEFSRV9CVVRUT05TX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZ31cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19