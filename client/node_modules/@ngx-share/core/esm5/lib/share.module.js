/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { ShareDirective } from './share-button.directive';
import { ShareCountPipe } from './share-count.pipe';
import { SHARE_BUTTONS_CONFIG } from './share.models';
var ShareModule = /** @class */ (function () {
    function ShareModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    ShareModule.withConfig = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: ShareModule,
            providers: [
                { provide: SHARE_BUTTONS_CONFIG, useValue: config }
            ]
        };
    };
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
    return ShareModule;
}());
export { ShareModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1zaGFyZS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NoYXJlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9CQUFvQixFQUFzQixNQUFNLGdCQUFnQixDQUFDO0FBRTFFO0lBQUE7SUFzQkEsQ0FBQzs7Ozs7SUFSUSxzQkFBVTs7OztJQUFqQixVQUFrQixNQUEyQjtRQUMzQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFdBQVc7WUFDckIsU0FBUyxFQUFFO2dCQUNULEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUM7YUFDbEQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBckJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsY0FBYztxQkFDZjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osY0FBYzt3QkFDZCxjQUFjO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDUCxjQUFjO3dCQUNkLGNBQWM7cUJBQ2Y7aUJBQ0Y7O0lBVUQsa0JBQUM7Q0FBQSxBQXRCRCxJQXNCQztTQVRZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XHJcblxyXG5pbXBvcnQgeyBTaGFyZURpcmVjdGl2ZSB9IGZyb20gJy4vc2hhcmUtYnV0dG9uLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFNoYXJlQ291bnRQaXBlIH0gZnJvbSAnLi9zaGFyZS1jb3VudC5waXBlJztcclxuaW1wb3J0IHsgU0hBUkVfQlVUVE9OU19DT05GSUcsIFNoYXJlQnV0dG9uc0NvbmZpZyB9IGZyb20gJy4vc2hhcmUubW9kZWxzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgUGxhdGZvcm1Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgU2hhcmVEaXJlY3RpdmUsXHJcbiAgICBTaGFyZUNvdW50UGlwZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgU2hhcmVEaXJlY3RpdmUsXHJcbiAgICBTaGFyZUNvdW50UGlwZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNoYXJlTW9kdWxlIHtcclxuICBzdGF0aWMgd2l0aENvbmZpZyhjb25maWc/OiBTaGFyZUJ1dHRvbnNDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBTaGFyZU1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge3Byb3ZpZGU6IFNIQVJFX0JVVFRPTlNfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=