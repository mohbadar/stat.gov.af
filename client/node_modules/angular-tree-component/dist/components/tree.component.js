import { Component, ContentChild, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeOptions } from '../models/tree-options.model';
import { TreeViewportComponent } from './tree-viewport.component';
import includes from 'lodash/includes';
import pick from 'lodash/pick';
var TreeComponent = /** @class */ (function () {
    function TreeComponent(treeModel, treeDraggedElement) {
        var _this = this;
        this.treeModel = treeModel;
        this.treeDraggedElement = treeDraggedElement;
        treeModel.eventNames.forEach(function (name) { return _this[name] = new EventEmitter(); });
        treeModel.subscribeToState(function (state) { return _this.stateChange.emit(state); });
    }
    Object.defineProperty(TreeComponent.prototype, "nodes", {
        // Will be handled in ngOnChanges
        set: function (nodes) {
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "options", {
        set: function (options) {
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "focused", {
        set: function (value) {
            this.treeModel.setFocus(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeComponent.prototype, "state", {
        set: function (state) {
            this.treeModel.setState(state);
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype.onKeydown = function ($event) {
        if (!this.treeModel.isFocused)
            return;
        if (includes(['input', 'textarea'], document.activeElement.tagName.toLowerCase()))
            return;
        var focusedNode = this.treeModel.getFocusedNode();
        this.treeModel.performKeyAction(focusedNode, $event);
    };
    TreeComponent.prototype.onMousedown = function ($event) {
        function isOutsideClick(startElement, nodeName) {
            return !startElement ? true : startElement.localName === nodeName ? false : isOutsideClick(startElement.parentElement, nodeName);
        }
        if (isOutsideClick($event.target, 'tree-root')) {
            this.treeModel.setFocus(false);
        }
    };
    TreeComponent.prototype.ngOnChanges = function (changes) {
        if (changes.options || changes.nodes) {
            this.treeModel.setData({
                options: changes.options && changes.options.currentValue,
                nodes: changes.nodes && changes.nodes.currentValue,
                events: pick(this, this.treeModel.eventNames)
            });
        }
    };
    TreeComponent.prototype.sizeChanged = function () {
        this.viewportComponent.setViewport();
    };
    TreeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'Tree, tree-root',
                    providers: [TreeModel],
                    styles: [],
                    template: "\n      <tree-viewport #viewport>\n          <div\n                  class=\"angular-tree-component\"\n                  [class.node-dragging]=\"treeDraggedElement.isDragging()\"\n                  [class.angular-tree-component-rtl]=\"treeModel.options.rtl\">\n              <tree-node-collection\n                      *ngIf=\"treeModel.roots\"\n                      [nodes]=\"treeModel.roots\"\n                      [treeModel]=\"treeModel\"\n                      [templates]=\"{\n            loadingTemplate: loadingTemplate,\n            treeNodeTemplate: treeNodeTemplate,\n            treeNodeWrapperTemplate: treeNodeWrapperTemplate,\n            treeNodeFullTemplate: treeNodeFullTemplate\n          }\">\n              </tree-node-collection>\n              <tree-node-drop-slot\n                      class=\"empty-tree-drop-slot\"\n                      *ngIf=\"treeModel.isEmptyTree()\"\n                      [dropIndex]=\"0\"\n                      [node]=\"treeModel.virtualRoot\">\n              </tree-node-drop-slot>\n          </div>\n      </tree-viewport>\n  "
                },] },
    ];
    /** @nocollapse */
    TreeComponent.ctorParameters = function () { return [
        { type: TreeModel },
        { type: TreeDraggedElement }
    ]; };
    TreeComponent.propDecorators = {
        loadingTemplate: [{ type: ContentChild, args: ['loadingTemplate',] }],
        treeNodeTemplate: [{ type: ContentChild, args: ['treeNodeTemplate',] }],
        treeNodeWrapperTemplate: [{ type: ContentChild, args: ['treeNodeWrapperTemplate',] }],
        treeNodeFullTemplate: [{ type: ContentChild, args: ['treeNodeFullTemplate',] }],
        viewportComponent: [{ type: ViewChild, args: ['viewport',] }],
        nodes: [{ type: Input }],
        options: [{ type: Input }],
        focused: [{ type: Input }],
        state: [{ type: Input }],
        toggleExpanded: [{ type: Output }],
        activate: [{ type: Output }],
        deactivate: [{ type: Output }],
        nodeActivate: [{ type: Output }],
        nodeDeactivate: [{ type: Output }],
        select: [{ type: Output }],
        deselect: [{ type: Output }],
        focus: [{ type: Output }],
        blur: [{ type: Output }],
        updateData: [{ type: Output }],
        initialized: [{ type: Output }],
        moveNode: [{ type: Output }],
        copyNode: [{ type: Output }],
        loadNodeChildren: [{ type: Output }],
        changeFilter: [{ type: Output }],
        event: [{ type: Output }],
        stateChange: [{ type: Output }],
        onKeydown: [{ type: HostListener, args: ['body: keydown', ['$event'],] }],
        onMousedown: [{ type: HostListener, args: ['body: mousedown', ['$event'],] }]
    };
    return TreeComponent;
}());
export { TreeComponent };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0SSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWxFLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sSUFBSSxNQUFNLGFBQWEsQ0FBQztBQUUvQjtJQTBFRSx1QkFDUyxTQUFvQixFQUNwQixrQkFBc0M7UUFGL0MsaUJBTUM7UUFMUSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFFN0MsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxZQUFZLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1FBQ3hFLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUM7SUFDdEUsQ0FBQztJQXRDRCxzQkFBYSxnQ0FBSztRQURsQixpQ0FBaUM7YUFDakMsVUFBbUIsS0FBWTtRQUMvQixDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFFRixzQkFBYSxrQ0FBTzthQUFwQixVQUFxQixPQUFvQjtRQUN6QyxDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFFRixzQkFBYSxrQ0FBTzthQUFwQixVQUFxQixLQUFjO1lBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBRUQsc0JBQWEsZ0NBQUs7YUFBbEIsVUFBbUIsS0FBSztZQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQTZCRCxpQ0FBUyxHQURULFVBQ1UsTUFBTTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7WUFBRSxPQUFPO1FBQ3RDLElBQUksUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUNoQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUFFLE9BQU87UUFFeEQsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVwRCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsbUNBQVcsR0FEWCxVQUNZLE1BQU07UUFDaEIsd0JBQXdCLFlBQXFCLEVBQUUsUUFBZ0I7WUFDN0QsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuSSxDQUFDO1FBRUQsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsRUFBRTtZQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksT0FBTztRQUNqQixJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFDckIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZO2dCQUN4RCxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVk7Z0JBQ2xELE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO2FBQzlDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7Z0JBcEhGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ3RCLE1BQU0sRUFBRSxFQUFFO29CQUNWLFFBQVEsRUFBRSw2akNBeUJUO2lCQUNGOzs7O2dCQXRDUSxTQUFTO2dCQUNULGtCQUFrQjs7O2tDQTBDeEIsWUFBWSxTQUFDLGlCQUFpQjttQ0FDOUIsWUFBWSxTQUFDLGtCQUFrQjswQ0FDL0IsWUFBWSxTQUFDLHlCQUF5Qjt1Q0FDdEMsWUFBWSxTQUFDLHNCQUFzQjtvQ0FDbkMsU0FBUyxTQUFDLFVBQVU7d0JBR3BCLEtBQUs7MEJBR0wsS0FBSzswQkFHTCxLQUFLO3dCQUlMLEtBQUs7aUNBSUwsTUFBTTsyQkFDTixNQUFNOzZCQUNOLE1BQU07K0JBQ04sTUFBTTtpQ0FDTixNQUFNO3lCQUNOLE1BQU07MkJBQ04sTUFBTTt3QkFDTixNQUFNO3VCQUNOLE1BQU07NkJBQ04sTUFBTTs4QkFDTixNQUFNOzJCQUNOLE1BQU07MkJBQ04sTUFBTTttQ0FDTixNQUFNOytCQUNOLE1BQU07d0JBQ04sTUFBTTs4QkFDTixNQUFNOzRCQVVOLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7OEJBV3hDLFlBQVksU0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUF3QjdDLG9CQUFDO0NBQUEsQUFySEQsSUFxSEM7U0F0RlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlRHJhZ2dlZEVsZW1lbnQgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IFRyZWVWaWV3cG9ydENvbXBvbmVudCB9IGZyb20gJy4vdHJlZS12aWV3cG9ydC5jb21wb25lbnQnO1xuXG5pbXBvcnQgaW5jbHVkZXMgZnJvbSAnbG9kYXNoL2luY2x1ZGVzJztcbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC9waWNrJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnVHJlZSwgdHJlZS1yb290JyxcbiAgcHJvdmlkZXJzOiBbVHJlZU1vZGVsXSxcbiAgc3R5bGVzOiBbXSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDx0cmVlLXZpZXdwb3J0ICN2aWV3cG9ydD5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImFuZ3VsYXItdHJlZS1jb21wb25lbnRcIlxuICAgICAgICAgICAgICAgICAgW2NsYXNzLm5vZGUtZHJhZ2dpbmddPVwidHJlZURyYWdnZWRFbGVtZW50LmlzRHJhZ2dpbmcoKVwiXG4gICAgICAgICAgICAgICAgICBbY2xhc3MuYW5ndWxhci10cmVlLWNvbXBvbmVudC1ydGxdPVwidHJlZU1vZGVsLm9wdGlvbnMucnRsXCI+XG4gICAgICAgICAgICAgIDx0cmVlLW5vZGUtY29sbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwidHJlZU1vZGVsLnJvb3RzXCJcbiAgICAgICAgICAgICAgICAgICAgICBbbm9kZXNdPVwidHJlZU1vZGVsLnJvb3RzXCJcbiAgICAgICAgICAgICAgICAgICAgICBbdHJlZU1vZGVsXT1cInRyZWVNb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgW3RlbXBsYXRlc109XCJ7XG4gICAgICAgICAgICBsb2FkaW5nVGVtcGxhdGU6IGxvYWRpbmdUZW1wbGF0ZSxcbiAgICAgICAgICAgIHRyZWVOb2RlVGVtcGxhdGU6IHRyZWVOb2RlVGVtcGxhdGUsXG4gICAgICAgICAgICB0cmVlTm9kZVdyYXBwZXJUZW1wbGF0ZTogdHJlZU5vZGVXcmFwcGVyVGVtcGxhdGUsXG4gICAgICAgICAgICB0cmVlTm9kZUZ1bGxUZW1wbGF0ZTogdHJlZU5vZGVGdWxsVGVtcGxhdGVcbiAgICAgICAgICB9XCI+XG4gICAgICAgICAgICAgIDwvdHJlZS1ub2RlLWNvbGxlY3Rpb24+XG4gICAgICAgICAgICAgIDx0cmVlLW5vZGUtZHJvcC1zbG90XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJlbXB0eS10cmVlLWRyb3Atc2xvdFwiXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJ0cmVlTW9kZWwuaXNFbXB0eVRyZWUoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2Ryb3BJbmRleF09XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICBbbm9kZV09XCJ0cmVlTW9kZWwudmlydHVhbFJvb3RcIj5cbiAgICAgICAgICAgICAgPC90cmVlLW5vZGUtZHJvcC1zbG90PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC90cmVlLXZpZXdwb3J0PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBfbm9kZXM6IGFueVtdO1xuICBfb3B0aW9uczogVHJlZU9wdGlvbnM7XG5cbiAgQENvbnRlbnRDaGlsZCgnbG9hZGluZ1RlbXBsYXRlJykgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKCd0cmVlTm9kZVRlbXBsYXRlJykgdHJlZU5vZGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZCgndHJlZU5vZGVXcmFwcGVyVGVtcGxhdGUnKSB0cmVlTm9kZVdyYXBwZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZCgndHJlZU5vZGVGdWxsVGVtcGxhdGUnKSB0cmVlTm9kZUZ1bGxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQFZpZXdDaGlsZCgndmlld3BvcnQnKSB2aWV3cG9ydENvbXBvbmVudDogVHJlZVZpZXdwb3J0Q29tcG9uZW50O1xuXG4gIC8vIFdpbGwgYmUgaGFuZGxlZCBpbiBuZ09uQ2hhbmdlc1xuICBASW5wdXQoKSBzZXQgbm9kZXMobm9kZXM6IGFueVtdKSB7XG4gIH07XG5cbiAgQElucHV0KCkgc2V0IG9wdGlvbnMob3B0aW9uczogVHJlZU9wdGlvbnMpIHtcbiAgfTtcblxuICBASW5wdXQoKSBzZXQgZm9jdXNlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzKHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMudHJlZU1vZGVsLnNldFN0YXRlKHN0YXRlKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSB0b2dnbGVFeHBhbmRlZDtcbiAgQE91dHB1dCgpIGFjdGl2YXRlO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTtcbiAgQE91dHB1dCgpIG5vZGVBY3RpdmF0ZTtcbiAgQE91dHB1dCgpIG5vZGVEZWFjdGl2YXRlO1xuICBAT3V0cHV0KCkgc2VsZWN0O1xuICBAT3V0cHV0KCkgZGVzZWxlY3Q7XG4gIEBPdXRwdXQoKSBmb2N1cztcbiAgQE91dHB1dCgpIGJsdXI7XG4gIEBPdXRwdXQoKSB1cGRhdGVEYXRhO1xuICBAT3V0cHV0KCkgaW5pdGlhbGl6ZWQ7XG4gIEBPdXRwdXQoKSBtb3ZlTm9kZTtcbiAgQE91dHB1dCgpIGNvcHlOb2RlO1xuICBAT3V0cHV0KCkgbG9hZE5vZGVDaGlsZHJlbjtcbiAgQE91dHB1dCgpIGNoYW5nZUZpbHRlcjtcbiAgQE91dHB1dCgpIGV2ZW50O1xuICBAT3V0cHV0KCkgc3RhdGVDaGFuZ2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHRyZWVNb2RlbDogVHJlZU1vZGVsLFxuICAgIHB1YmxpYyB0cmVlRHJhZ2dlZEVsZW1lbnQ6IFRyZWVEcmFnZ2VkRWxlbWVudCkge1xuXG4gICAgdHJlZU1vZGVsLmV2ZW50TmFtZXMuZm9yRWFjaCgobmFtZSkgPT4gdGhpc1tuYW1lXSA9IG5ldyBFdmVudEVtaXR0ZXIoKSk7XG4gICAgdHJlZU1vZGVsLnN1YnNjcmliZVRvU3RhdGUoKHN0YXRlKSA9PiB0aGlzLnN0YXRlQ2hhbmdlLmVtaXQoc3RhdGUpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JvZHk6IGtleWRvd24nLCBbJyRldmVudCddKVxuICBvbktleWRvd24oJGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLnRyZWVNb2RlbC5pc0ZvY3VzZWQpIHJldHVybjtcbiAgICBpZiAoaW5jbHVkZXMoWydpbnB1dCcsICd0ZXh0YXJlYSddLFxuICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpKSByZXR1cm47XG5cbiAgICBjb25zdCBmb2N1c2VkTm9kZSA9IHRoaXMudHJlZU1vZGVsLmdldEZvY3VzZWROb2RlKCk7XG5cbiAgICB0aGlzLnRyZWVNb2RlbC5wZXJmb3JtS2V5QWN0aW9uKGZvY3VzZWROb2RlLCAkZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYm9keTogbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZWRvd24oJGV2ZW50KSB7XG4gICAgZnVuY3Rpb24gaXNPdXRzaWRlQ2xpY2soc3RhcnRFbGVtZW50OiBFbGVtZW50LCBub2RlTmFtZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gIXN0YXJ0RWxlbWVudCA/IHRydWUgOiBzdGFydEVsZW1lbnQubG9jYWxOYW1lID09PSBub2RlTmFtZSA/IGZhbHNlIDogaXNPdXRzaWRlQ2xpY2soc3RhcnRFbGVtZW50LnBhcmVudEVsZW1lbnQsIG5vZGVOYW1lKTtcbiAgICB9XG5cbiAgICBpZiAoaXNPdXRzaWRlQ2xpY2soJGV2ZW50LnRhcmdldCwgJ3RyZWUtcm9vdCcpKSB7XG4gICAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1cyhmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLm9wdGlvbnMgfHwgY2hhbmdlcy5ub2Rlcykge1xuICAgICAgdGhpcy50cmVlTW9kZWwuc2V0RGF0YSh7XG4gICAgICAgIG9wdGlvbnM6IGNoYW5nZXMub3B0aW9ucyAmJiBjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlLFxuICAgICAgICBub2RlczogY2hhbmdlcy5ub2RlcyAmJiBjaGFuZ2VzLm5vZGVzLmN1cnJlbnRWYWx1ZSxcbiAgICAgICAgZXZlbnRzOiBwaWNrKHRoaXMsIHRoaXMudHJlZU1vZGVsLmV2ZW50TmFtZXMpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzaXplQ2hhbmdlZCgpIHtcbiAgICB0aGlzLnZpZXdwb3J0Q29tcG9uZW50LnNldFZpZXdwb3J0KCk7XG4gIH1cbn1cbiJdfQ==