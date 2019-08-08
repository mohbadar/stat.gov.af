import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
var TreeNodeExpanderComponent = /** @class */ (function () {
    function TreeNodeExpanderComponent() {
    }
    TreeNodeExpanderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tree-node-expander',
                    encapsulation: ViewEncapsulation.None,
                    styles: [],
                    template: "\n    <ng-container *mobxAutorun=\"{dontDetach: true}\">\n      <span\n        *ngIf=\"node.hasChildren\"\n        [class.toggle-children-wrapper-expanded]=\"node.isExpanded\"\n        [class.toggle-children-wrapper-collapsed]=\"node.isCollapsed\"\n        class=\"toggle-children-wrapper\"\n        (click)=\"node.mouseAction('expanderClick', $event)\">\n\n        <span class=\"toggle-children\"></span>\n      </span>\n      <span\n        *ngIf=\"!node.hasChildren\"\n        class=\"toggle-children-placeholder\">\n      </span>\n    </ng-container>\n  "
                },] },
    ];
    TreeNodeExpanderComponent.propDecorators = {
        node: [{ type: Input }]
    };
    return TreeNodeExpanderComponent;
}());
export { TreeNodeExpanderComponent };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWV4cGFuZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1leHBhbmRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEO0lBQUE7SUF3QkEsQ0FBQzs7Z0JBeEJBLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLGdqQkFnQlQ7aUJBQ0Y7Ozt1QkFFRSxLQUFLOztJQUNSLGdDQUFDO0NBQUEsQUF4QkQsSUF3QkM7U0FGWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHJlZS1ub2RlLWV4cGFuZGVyJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVzOiBbXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICptb2J4QXV0b3J1bj1cIntkb250RGV0YWNoOiB0cnVlfVwiPlxuICAgICAgPHNwYW5cbiAgICAgICAgKm5nSWY9XCJub2RlLmhhc0NoaWxkcmVuXCJcbiAgICAgICAgW2NsYXNzLnRvZ2dsZS1jaGlsZHJlbi13cmFwcGVyLWV4cGFuZGVkXT1cIm5vZGUuaXNFeHBhbmRlZFwiXG4gICAgICAgIFtjbGFzcy50b2dnbGUtY2hpbGRyZW4td3JhcHBlci1jb2xsYXBzZWRdPVwibm9kZS5pc0NvbGxhcHNlZFwiXG4gICAgICAgIGNsYXNzPVwidG9nZ2xlLWNoaWxkcmVuLXdyYXBwZXJcIlxuICAgICAgICAoY2xpY2spPVwibm9kZS5tb3VzZUFjdGlvbignZXhwYW5kZXJDbGljaycsICRldmVudClcIj5cblxuICAgICAgICA8c3BhbiBjbGFzcz1cInRvZ2dsZS1jaGlsZHJlblwiPjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuXG4gICAgICAgICpuZ0lmPVwiIW5vZGUuaGFzQ2hpbGRyZW5cIlxuICAgICAgICBjbGFzcz1cInRvZ2dsZS1jaGlsZHJlbi1wbGFjZWhvbGRlclwiPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlRXhwYW5kZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcbn1cbiJdfQ==