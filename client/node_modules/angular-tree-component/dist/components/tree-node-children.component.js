import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
var TreeNodeChildrenComponent = /** @class */ (function () {
    function TreeNodeChildrenComponent() {
    }
    TreeNodeChildrenComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tree-node-children',
                    encapsulation: ViewEncapsulation.None,
                    styles: [],
                    template: "\n    <ng-container *mobxAutorun=\"{dontDetach: true}\">\n      <div [class.tree-children]=\"true\"\n          [class.tree-children-no-padding]=\"node.options.levelPadding\"\n          *treeAnimateOpen=\"\n            node.isExpanded;\n            speed:node.options.animateSpeed;\n            acceleration:node.options.animateAcceleration;\n            enabled:node.options.animateExpand\">\n        <tree-node-collection\n          *ngIf=\"node.children\"\n          [nodes]=\"node.children\"\n          [templates]=\"templates\"\n          [treeModel]=\"node.treeModel\">\n        </tree-node-collection>\n        <tree-loading-component\n          [style.padding-left]=\"node.getNodePadding()\"\n          class=\"tree-node-loading\"\n          *ngIf=\"!node.children\"\n          [template]=\"templates.loadingTemplate\"\n          [node]=\"node\"\n        ></tree-loading-component>\n      </div>\n    </ng-container>\n  "
                },] },
    ];
    TreeNodeChildrenComponent.propDecorators = {
        node: [{ type: Input }],
        templates: [{ type: Input }]
    };
    return TreeNodeChildrenComponent;
}());
export { TreeNodeChildrenComponent };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNoaWxkcmVuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1jaGlsZHJlbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEO0lBQUE7SUFpQ0EsQ0FBQzs7Z0JBakNBLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLGk2QkF3QlQ7aUJBQ0Y7Ozt1QkFFRSxLQUFLOzRCQUNMLEtBQUs7O0lBQ1IsZ0NBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQUhZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0cmVlLW5vZGUtY2hpbGRyZW4nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZXM6IFtdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm1vYnhBdXRvcnVuPVwie2RvbnREZXRhY2g6IHRydWV9XCI+XG4gICAgICA8ZGl2IFtjbGFzcy50cmVlLWNoaWxkcmVuXT1cInRydWVcIlxuICAgICAgICAgIFtjbGFzcy50cmVlLWNoaWxkcmVuLW5vLXBhZGRpbmddPVwibm9kZS5vcHRpb25zLmxldmVsUGFkZGluZ1wiXG4gICAgICAgICAgKnRyZWVBbmltYXRlT3Blbj1cIlxuICAgICAgICAgICAgbm9kZS5pc0V4cGFuZGVkO1xuICAgICAgICAgICAgc3BlZWQ6bm9kZS5vcHRpb25zLmFuaW1hdGVTcGVlZDtcbiAgICAgICAgICAgIGFjY2VsZXJhdGlvbjpub2RlLm9wdGlvbnMuYW5pbWF0ZUFjY2VsZXJhdGlvbjtcbiAgICAgICAgICAgIGVuYWJsZWQ6bm9kZS5vcHRpb25zLmFuaW1hdGVFeHBhbmRcIj5cbiAgICAgICAgPHRyZWUtbm9kZS1jb2xsZWN0aW9uXG4gICAgICAgICAgKm5nSWY9XCJub2RlLmNoaWxkcmVuXCJcbiAgICAgICAgICBbbm9kZXNdPVwibm9kZS5jaGlsZHJlblwiXG4gICAgICAgICAgW3RlbXBsYXRlc109XCJ0ZW1wbGF0ZXNcIlxuICAgICAgICAgIFt0cmVlTW9kZWxdPVwibm9kZS50cmVlTW9kZWxcIj5cbiAgICAgICAgPC90cmVlLW5vZGUtY29sbGVjdGlvbj5cbiAgICAgICAgPHRyZWUtbG9hZGluZy1jb21wb25lbnRcbiAgICAgICAgICBbc3R5bGUucGFkZGluZy1sZWZ0XT1cIm5vZGUuZ2V0Tm9kZVBhZGRpbmcoKVwiXG4gICAgICAgICAgY2xhc3M9XCJ0cmVlLW5vZGUtbG9hZGluZ1wiXG4gICAgICAgICAgKm5nSWY9XCIhbm9kZS5jaGlsZHJlblwiXG4gICAgICAgICAgW3RlbXBsYXRlXT1cInRlbXBsYXRlcy5sb2FkaW5nVGVtcGxhdGVcIlxuICAgICAgICAgIFtub2RlXT1cIm5vZGVcIlxuICAgICAgICA+PC90cmVlLWxvYWRpbmctY29tcG9uZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVDaGlsZHJlbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG5vZGU6IFRyZWVOb2RlO1xuICBASW5wdXQoKSB0ZW1wbGF0ZXM6IGFueTtcbn1cbiJdfQ==