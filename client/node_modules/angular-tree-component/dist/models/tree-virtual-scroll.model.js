var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { observable, computed, action, autorun, reaction } from 'mobx';
import { TreeModel } from './tree.model';
import { TREE_EVENTS } from '../constants/events';
var Y_OFFSET = 500; // Extra pixels outside the viewport, in each direction, to render nodes in
var Y_EPSILON = 150; // Minimum pixel change required to recalculate the rendered nodes
var TreeVirtualScroll = /** @class */ (function () {
    function TreeVirtualScroll(treeModel) {
        var _this = this;
        this.treeModel = treeModel;
        this.yBlocks = 0;
        this.x = 0;
        this.viewportHeight = null;
        this.viewport = null;
        treeModel.virtualScroll = this;
        this._dispose = [autorun(function () { return _this.fixScroll(); })];
    }
    Object.defineProperty(TreeVirtualScroll.prototype, "y", {
        get: function () {
            return this.yBlocks * Y_EPSILON;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeVirtualScroll.prototype, "totalHeight", {
        get: function () {
            return this.treeModel.virtualRoot ? this.treeModel.virtualRoot.height : 0;
        },
        enumerable: true,
        configurable: true
    });
    TreeVirtualScroll.prototype.fireEvent = function (event) {
        this.treeModel.fireEvent(event);
    };
    TreeVirtualScroll.prototype.init = function () {
        var _this = this;
        var fn = this.recalcPositions.bind(this);
        fn();
        this._dispose = this._dispose.concat([
            reaction(function () { return _this.treeModel.roots; }, fn),
            reaction(function () { return _this.treeModel.expandedNodeIds; }, fn),
            reaction(function () { return _this.treeModel.hiddenNodeIds; }, fn)
        ]);
        this.treeModel.subscribe(TREE_EVENTS.loadNodeChildren, fn);
    };
    TreeVirtualScroll.prototype.isEnabled = function () {
        return this.treeModel.options.useVirtualScroll;
    };
    TreeVirtualScroll.prototype._setYBlocks = function (value) {
        this.yBlocks = value;
    };
    TreeVirtualScroll.prototype.recalcPositions = function () {
        this.treeModel.virtualRoot.height = this._getPositionAfter(this.treeModel.getVisibleRoots(), 0);
    };
    TreeVirtualScroll.prototype._getPositionAfter = function (nodes, startPos) {
        var _this = this;
        var position = startPos;
        nodes.forEach(function (node) {
            node.position = position;
            position = _this._getPositionAfterNode(node, position);
        });
        return position;
    };
    TreeVirtualScroll.prototype._getPositionAfterNode = function (node, startPos) {
        var position = node.getSelfHeight() + startPos;
        if (node.children && node.isExpanded) { // TBD: consider loading component as well
            position = this._getPositionAfter(node.visibleChildren, position);
        }
        node.height = position - startPos;
        return position;
    };
    TreeVirtualScroll.prototype.clear = function () {
        this._dispose.forEach(function (d) { return d(); });
    };
    TreeVirtualScroll.prototype.setViewport = function (viewport) {
        Object.assign(this, {
            viewport: viewport,
            x: viewport.scrollLeft,
            yBlocks: Math.round(viewport.scrollTop / Y_EPSILON),
            viewportHeight: viewport.getBoundingClientRect ? viewport.getBoundingClientRect().height : 0
        });
    };
    TreeVirtualScroll.prototype.scrollIntoView = function (node, force, scrollToMiddle) {
        if (scrollToMiddle === void 0) { scrollToMiddle = true; }
        if (node.options.scrollContainer) {
            var scrollContainer = node.options.scrollContainer;
            var scrollContainerHeight = scrollContainer.getBoundingClientRect().height;
            var scrollContainerTop = scrollContainer.getBoundingClientRect().top;
            var nodeTop = this.viewport.getBoundingClientRect().top + node.position - scrollContainerTop;
            if (force || // force scroll to node
                nodeTop < scrollContainer.scrollTop || // node is above scroll container
                nodeTop + node.getSelfHeight() > scrollContainer.scrollTop + scrollContainerHeight) { // node is below container
                scrollContainer.scrollTop = scrollToMiddle ?
                    nodeTop - scrollContainerHeight / 2 : // scroll to middle
                    nodeTop; // scroll to start
            }
        }
        else {
            if (force || // force scroll to node
                node.position < this.y || // node is above viewport
                node.position + node.getSelfHeight() > this.y + this.viewportHeight) { // node is below viewport
                if (this.viewport) {
                    this.viewport.scrollTop = scrollToMiddle ?
                        node.position - this.viewportHeight / 2 : // scroll to middle
                        node.position; // scroll to start
                    this._setYBlocks(Math.floor(this.viewport.scrollTop / Y_EPSILON));
                }
            }
        }
    };
    TreeVirtualScroll.prototype.getViewportNodes = function (nodes) {
        var _this = this;
        if (!nodes)
            return [];
        var visibleNodes = nodes.filter(function (node) { return !node.isHidden; });
        if (!this.isEnabled())
            return visibleNodes;
        if (!this.viewportHeight || !visibleNodes.length)
            return [];
        // Search for first node in the viewport using binary search
        // Look for first node that starts after the beginning of the viewport (with buffer)
        // Or that ends after the beginning of the viewport
        var firstIndex = binarySearch(visibleNodes, function (node) {
            return (node.position + Y_OFFSET > _this.y) ||
                (node.position + node.height > _this.y);
        });
        // Search for last node in the viewport using binary search
        // Look for first node that starts after the end of the viewport (with buffer)
        var lastIndex = binarySearch(visibleNodes, function (node) {
            return node.position - Y_OFFSET > _this.y + _this.viewportHeight;
        }, firstIndex);
        var viewportNodes = [];
        for (var i = firstIndex; i <= lastIndex; i++) {
            viewportNodes.push(visibleNodes[i]);
        }
        return viewportNodes;
    };
    TreeVirtualScroll.prototype.fixScroll = function () {
        var maxY = Math.max(0, this.totalHeight - this.viewportHeight);
        if (this.y < 0)
            this._setYBlocks(0);
        if (this.y > maxY)
            this._setYBlocks(maxY / Y_EPSILON);
    };
    TreeVirtualScroll.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TreeVirtualScroll.ctorParameters = function () { return [
        { type: TreeModel }
    ]; };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], TreeVirtualScroll.prototype, "yBlocks", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], TreeVirtualScroll.prototype, "x", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], TreeVirtualScroll.prototype, "viewportHeight", void 0);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TreeVirtualScroll.prototype, "y", null);
    __decorate([
        computed,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], TreeVirtualScroll.prototype, "totalHeight", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TreeVirtualScroll.prototype, "_setYBlocks", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TreeVirtualScroll.prototype, "recalcPositions", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TreeVirtualScroll.prototype, "setViewport", null);
    __decorate([
        action,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", void 0)
    ], TreeVirtualScroll.prototype, "scrollIntoView", null);
    return TreeVirtualScroll;
}());
export { TreeVirtualScroll };
function binarySearch(nodes, condition, firstIndex) {
    if (firstIndex === void 0) { firstIndex = 0; }
    var index = firstIndex;
    var toIndex = nodes.length - 1;
    while (index !== toIndex) {
        var midIndex = Math.floor((index + toIndex) / 2);
        if (condition(nodes[midIndex])) {
            toIndex = midIndex;
        }
        else {
            if (index === midIndex)
                index = toIndex;
            else
                index = midIndex;
        }
    }
    return index;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxELElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLDJFQUEyRTtBQUNqRyxJQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxrRUFBa0U7QUFFekY7SUFpQkUsMkJBQW9CLFNBQW9CO1FBQXhDLGlCQUdDO1FBSG1CLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFiNUIsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLE1BQUMsR0FBRyxDQUFDLENBQUM7UUFDTixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUNsQyxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBV2QsU0FBUyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFoQixDQUFnQixDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBWFMsc0JBQUksZ0NBQUM7YUFBTDtZQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFFUyxzQkFBSSwwQ0FBVzthQUFmO1lBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsQ0FBQzs7O09BQUE7SUFPRCxxQ0FBUyxHQUFULFVBQVUsS0FBSztRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxnQ0FBSSxHQUFKO1FBQUEsaUJBV0M7UUFWQyxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQyxFQUFFLEVBQUUsQ0FBQztRQUNMLElBQUksQ0FBQyxRQUFRLEdBQ1IsSUFBSSxDQUFDLFFBQVE7WUFDaEIsUUFBUSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBcEIsQ0FBb0IsRUFBRSxFQUFFLENBQUM7WUFDeEMsUUFBUSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBOUIsQ0FBOEIsRUFBRSxFQUFFLENBQUM7WUFDbEQsUUFBUSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBNUIsQ0FBNEIsRUFBRSxFQUFFLENBQUM7VUFDakQsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQscUNBQVMsR0FBVDtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7SUFDakQsQ0FBQztJQUVlLHVDQUFXLEdBQW5CLFVBQW9CLEtBQUs7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVPLDJDQUFlLEdBQWY7UUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEcsQ0FBQztJQUVPLDZDQUFpQixHQUF6QixVQUEwQixLQUFLLEVBQUUsUUFBUTtRQUF6QyxpQkFRQztRQVBDLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUV4QixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtZQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixRQUFRLEdBQUcsS0FBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxpREFBcUIsR0FBN0IsVUFBOEIsSUFBSSxFQUFFLFFBQVE7UUFDMUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUUvQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLDBDQUEwQztZQUNoRixRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDbkU7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDbEMsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUdELGlDQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTyx1Q0FBVyxHQUFYLFVBQVksUUFBUTtRQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNsQixRQUFRLFVBQUE7WUFDUixDQUFDLEVBQUUsUUFBUSxDQUFDLFVBQVU7WUFDdEIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDbkQsY0FBYyxFQUFFLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTywwQ0FBYyxHQUFkLFVBQWUsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUFxQjtRQUFyQiwrQkFBQSxFQUFBLHFCQUFxQjtRQUN2RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFO1lBQ2hDLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO1lBQ3JELElBQU0scUJBQXFCLEdBQUcsZUFBZSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO1lBQzdFLElBQU0sa0JBQWtCLEdBQUcsZUFBZSxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ3ZFLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQztZQUUvRixJQUFJLEtBQUssSUFBSSx1QkFBdUI7Z0JBQ2xDLE9BQU8sR0FBRyxlQUFlLENBQUMsU0FBUyxJQUFJLGlDQUFpQztnQkFDeEUsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxlQUFlLENBQUMsU0FBUyxHQUFHLHFCQUFxQixFQUFFLEVBQUUsMEJBQTBCO2dCQUNoSCxlQUFlLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxDQUFDO29CQUMxQyxPQUFPLEdBQUcscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7b0JBQ3pELE9BQU8sQ0FBQyxDQUFDLGtCQUFrQjthQUM5QjtTQUNGO2FBQU07WUFDTCxJQUFJLEtBQUssSUFBSSx1QkFBdUI7Z0JBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSx5QkFBeUI7Z0JBQ25ELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLHlCQUF5QjtnQkFDaEcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CO3dCQUM3RCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCO29CQUVqQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztpQkFDbkU7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVELDRDQUFnQixHQUFoQixVQUFpQixLQUFLO1FBQXRCLGlCQTZCQztRQTVCQyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRXRCLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQWQsQ0FBYyxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFBRSxPQUFPLFlBQVksQ0FBQztRQUUzQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFFNUQsNERBQTREO1FBQzVELG9GQUFvRjtRQUNwRixtREFBbUQ7UUFDbkQsSUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLFlBQVksRUFBRSxVQUFDLElBQUk7WUFDakQsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxHQUFHLEtBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILDJEQUEyRDtRQUMzRCw4RUFBOEU7UUFDOUUsSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFlBQVksRUFBRSxVQUFDLElBQUk7WUFDaEQsT0FBTyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsR0FBRyxLQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUM7UUFDakUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRWYsSUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyQztRQUVELE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxxQ0FBUyxHQUFUO1FBQ0UsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFakUsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJO1lBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Z0JBdEpGLFVBQVU7Ozs7Z0JBTkYsU0FBUzs7SUFVSjtRQUFYLFVBQVU7O3NEQUFhO0lBQ1o7UUFBWCxVQUFVOztnREFBTztJQUNOO1FBQVgsVUFBVTs7NkRBQXVCO0lBR3hCO1FBQVQsUUFBUTs7OzhDQUVSO0lBRVM7UUFBVCxRQUFROzs7d0RBRVI7SUE0Qk87UUFBUCxNQUFNOzs7O3dEQUVOO0lBRU87UUFBUCxNQUFNOzs7OzREQUVOO0lBMkJPO1FBQVAsTUFBTTs7Ozt3REFPTjtJQUVPO1FBQVAsTUFBTTs7OzsyREEyQk47SUF1Q0gsd0JBQUM7Q0FBQSxBQXZKRCxJQXVKQztTQXRKWSxpQkFBaUI7QUF3SjlCLHNCQUFzQixLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQWM7SUFBZCwyQkFBQSxFQUFBLGNBQWM7SUFDcEQsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDO0lBQ3ZCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRS9CLE9BQU8sS0FBSyxLQUFLLE9BQU8sRUFBRTtRQUN4QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWpELElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO1lBQzlCLE9BQU8sR0FBRyxRQUFRLENBQUM7U0FDcEI7YUFDSTtZQUNILElBQUksS0FBSyxLQUFLLFFBQVE7Z0JBQUUsS0FBSyxHQUFHLE9BQU8sQ0FBQzs7Z0JBQ25DLEtBQUssR0FBRyxRQUFRLENBQUM7U0FDdkI7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9ic2VydmFibGUsIGNvbXB1dGVkLCBhY3Rpb24sIGF1dG9ydW4sIHJlYWN0aW9uIH0gZnJvbSAnbW9ieCc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuL3RyZWUubW9kZWwnO1xuaW1wb3J0IHsgVFJFRV9FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcblxuY29uc3QgWV9PRkZTRVQgPSA1MDA7IC8vIEV4dHJhIHBpeGVscyBvdXRzaWRlIHRoZSB2aWV3cG9ydCwgaW4gZWFjaCBkaXJlY3Rpb24sIHRvIHJlbmRlciBub2RlcyBpblxuY29uc3QgWV9FUFNJTE9OID0gMTUwOyAvLyBNaW5pbXVtIHBpeGVsIGNoYW5nZSByZXF1aXJlZCB0byByZWNhbGN1bGF0ZSB0aGUgcmVuZGVyZWQgbm9kZXNcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyZWVWaXJ0dWFsU2Nyb2xsIHtcbiAgcHJpdmF0ZSBfZGlzcG9zZTogYW55O1xuXG4gIEBvYnNlcnZhYmxlIHlCbG9ja3MgPSAwO1xuICBAb2JzZXJ2YWJsZSB4ID0gMDtcbiAgQG9ic2VydmFibGUgdmlld3BvcnRIZWlnaHQgPSBudWxsO1xuICB2aWV3cG9ydCA9IG51bGw7XG5cbiAgQGNvbXB1dGVkIGdldCB5KCkge1xuICAgIHJldHVybiB0aGlzLnlCbG9ja3MgKiBZX0VQU0lMT047XG4gIH1cblxuICBAY29tcHV0ZWQgZ2V0IHRvdGFsSGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLnRyZWVNb2RlbC52aXJ0dWFsUm9vdCA/IHRoaXMudHJlZU1vZGVsLnZpcnR1YWxSb290LmhlaWdodCA6IDA7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyZWVNb2RlbDogVHJlZU1vZGVsKSB7XG4gICAgdHJlZU1vZGVsLnZpcnR1YWxTY3JvbGwgPSB0aGlzO1xuICAgIHRoaXMuX2Rpc3Bvc2UgPSBbYXV0b3J1bigoKSA9PiB0aGlzLmZpeFNjcm9sbCgpKV07XG4gIH1cblxuICBmaXJlRXZlbnQoZXZlbnQpIHtcbiAgICB0aGlzLnRyZWVNb2RlbC5maXJlRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBmbiA9IHRoaXMucmVjYWxjUG9zaXRpb25zLmJpbmQodGhpcyk7XG5cbiAgICBmbigpO1xuICAgIHRoaXMuX2Rpc3Bvc2UgPSBbXG4gICAgICAuLi50aGlzLl9kaXNwb3NlLFxuICAgICAgcmVhY3Rpb24oKCkgPT4gdGhpcy50cmVlTW9kZWwucm9vdHMsIGZuKSxcbiAgICAgIHJlYWN0aW9uKCgpID0+IHRoaXMudHJlZU1vZGVsLmV4cGFuZGVkTm9kZUlkcywgZm4pLFxuICAgICAgcmVhY3Rpb24oKCkgPT4gdGhpcy50cmVlTW9kZWwuaGlkZGVuTm9kZUlkcywgZm4pXG4gICAgXTtcbiAgICB0aGlzLnRyZWVNb2RlbC5zdWJzY3JpYmUoVFJFRV9FVkVOVFMubG9hZE5vZGVDaGlsZHJlbiwgZm4pO1xuICB9XG5cbiAgaXNFbmFibGVkKCkge1xuICAgIHJldHVybiB0aGlzLnRyZWVNb2RlbC5vcHRpb25zLnVzZVZpcnR1YWxTY3JvbGw7XG4gIH1cblxuICBAYWN0aW9uIHByaXZhdGUgX3NldFlCbG9ja3ModmFsdWUpIHtcbiAgICB0aGlzLnlCbG9ja3MgPSB2YWx1ZTtcbiAgfVxuXG4gIEBhY3Rpb24gcmVjYWxjUG9zaXRpb25zKCkge1xuICAgIHRoaXMudHJlZU1vZGVsLnZpcnR1YWxSb290LmhlaWdodCA9IHRoaXMuX2dldFBvc2l0aW9uQWZ0ZXIodGhpcy50cmVlTW9kZWwuZ2V0VmlzaWJsZVJvb3RzKCksIDApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UG9zaXRpb25BZnRlcihub2Rlcywgc3RhcnRQb3MpIHtcbiAgICBsZXQgcG9zaXRpb24gPSBzdGFydFBvcztcblxuICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIG5vZGUucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgIHBvc2l0aW9uID0gdGhpcy5fZ2V0UG9zaXRpb25BZnRlck5vZGUobm9kZSwgcG9zaXRpb24pO1xuICAgIH0pO1xuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBvc2l0aW9uQWZ0ZXJOb2RlKG5vZGUsIHN0YXJ0UG9zKSB7XG4gICAgbGV0IHBvc2l0aW9uID0gbm9kZS5nZXRTZWxmSGVpZ2h0KCkgKyBzdGFydFBvcztcblxuICAgIGlmIChub2RlLmNoaWxkcmVuICYmIG5vZGUuaXNFeHBhbmRlZCkgeyAvLyBUQkQ6IGNvbnNpZGVyIGxvYWRpbmcgY29tcG9uZW50IGFzIHdlbGxcbiAgICAgIHBvc2l0aW9uID0gdGhpcy5fZ2V0UG9zaXRpb25BZnRlcihub2RlLnZpc2libGVDaGlsZHJlbiwgcG9zaXRpb24pO1xuICAgIH1cbiAgICBub2RlLmhlaWdodCA9IHBvc2l0aW9uIC0gc3RhcnRQb3M7XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9kaXNwb3NlLmZvckVhY2goKGQpID0+IGQoKSk7XG4gIH1cblxuICBAYWN0aW9uIHNldFZpZXdwb3J0KHZpZXdwb3J0KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICB2aWV3cG9ydCxcbiAgICAgIHg6IHZpZXdwb3J0LnNjcm9sbExlZnQsXG4gICAgICB5QmxvY2tzOiBNYXRoLnJvdW5kKHZpZXdwb3J0LnNjcm9sbFRvcCAvIFlfRVBTSUxPTiksXG4gICAgICB2aWV3cG9ydEhlaWdodDogdmlld3BvcnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID8gdmlld3BvcnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IDogMFxuICAgIH0pO1xuICB9XG5cbiAgQGFjdGlvbiBzY3JvbGxJbnRvVmlldyhub2RlLCBmb3JjZSwgc2Nyb2xsVG9NaWRkbGUgPSB0cnVlKSB7XG4gICAgaWYgKG5vZGUub3B0aW9ucy5zY3JvbGxDb250YWluZXIpIHtcbiAgICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lciA9IG5vZGUub3B0aW9ucy5zY3JvbGxDb250YWluZXI7XG4gICAgICBjb25zdCBzY3JvbGxDb250YWluZXJIZWlnaHQgPSBzY3JvbGxDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgY29uc3Qgc2Nyb2xsQ29udGFpbmVyVG9wID0gc2Nyb2xsQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgIGNvbnN0IG5vZGVUb3AgPSB0aGlzLnZpZXdwb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIG5vZGUucG9zaXRpb24gLSBzY3JvbGxDb250YWluZXJUb3A7XG5cbiAgICAgIGlmIChmb3JjZSB8fCAvLyBmb3JjZSBzY3JvbGwgdG8gbm9kZVxuICAgICAgICBub2RlVG9wIDwgc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCB8fCAvLyBub2RlIGlzIGFib3ZlIHNjcm9sbCBjb250YWluZXJcbiAgICAgICAgbm9kZVRvcCArIG5vZGUuZ2V0U2VsZkhlaWdodCgpID4gc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCArIHNjcm9sbENvbnRhaW5lckhlaWdodCkgeyAvLyBub2RlIGlzIGJlbG93IGNvbnRhaW5lclxuICAgICAgICBzY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wID0gc2Nyb2xsVG9NaWRkbGUgP1xuICAgICAgICAgIG5vZGVUb3AgLSBzY3JvbGxDb250YWluZXJIZWlnaHQgLyAyIDogLy8gc2Nyb2xsIHRvIG1pZGRsZVxuICAgICAgICAgIG5vZGVUb3A7IC8vIHNjcm9sbCB0byBzdGFydFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZm9yY2UgfHwgLy8gZm9yY2Ugc2Nyb2xsIHRvIG5vZGVcbiAgICAgICAgbm9kZS5wb3NpdGlvbiA8IHRoaXMueSB8fCAvLyBub2RlIGlzIGFib3ZlIHZpZXdwb3J0XG4gICAgICAgIG5vZGUucG9zaXRpb24gKyBub2RlLmdldFNlbGZIZWlnaHQoKSA+IHRoaXMueSArIHRoaXMudmlld3BvcnRIZWlnaHQpIHsgLy8gbm9kZSBpcyBiZWxvdyB2aWV3cG9ydFxuICAgICAgICBpZiAodGhpcy52aWV3cG9ydCkge1xuICAgICAgICAgIHRoaXMudmlld3BvcnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9NaWRkbGUgP1xuICAgICAgICAgIG5vZGUucG9zaXRpb24gLSB0aGlzLnZpZXdwb3J0SGVpZ2h0IC8gMiA6IC8vIHNjcm9sbCB0byBtaWRkbGVcbiAgICAgICAgICBub2RlLnBvc2l0aW9uOyAvLyBzY3JvbGwgdG8gc3RhcnRcblxuICAgICAgICAgIHRoaXMuX3NldFlCbG9ja3MoTWF0aC5mbG9vcih0aGlzLnZpZXdwb3J0LnNjcm9sbFRvcCAvIFlfRVBTSUxPTikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0Vmlld3BvcnROb2Rlcyhub2Rlcykge1xuICAgIGlmICghbm9kZXMpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IHZpc2libGVOb2RlcyA9IG5vZGVzLmZpbHRlcigobm9kZSkgPT4gIW5vZGUuaXNIaWRkZW4pO1xuXG4gICAgaWYgKCF0aGlzLmlzRW5hYmxlZCgpKSByZXR1cm4gdmlzaWJsZU5vZGVzO1xuXG4gICAgaWYgKCF0aGlzLnZpZXdwb3J0SGVpZ2h0IHx8ICF2aXNpYmxlTm9kZXMubGVuZ3RoKSByZXR1cm4gW107XG5cbiAgICAvLyBTZWFyY2ggZm9yIGZpcnN0IG5vZGUgaW4gdGhlIHZpZXdwb3J0IHVzaW5nIGJpbmFyeSBzZWFyY2hcbiAgICAvLyBMb29rIGZvciBmaXJzdCBub2RlIHRoYXQgc3RhcnRzIGFmdGVyIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHZpZXdwb3J0ICh3aXRoIGJ1ZmZlcilcbiAgICAvLyBPciB0aGF0IGVuZHMgYWZ0ZXIgdGhlIGJlZ2lubmluZyBvZiB0aGUgdmlld3BvcnRcbiAgICBjb25zdCBmaXJzdEluZGV4ID0gYmluYXJ5U2VhcmNoKHZpc2libGVOb2RlcywgKG5vZGUpID0+IHtcbiAgICAgIHJldHVybiAobm9kZS5wb3NpdGlvbiArIFlfT0ZGU0VUID4gdGhpcy55KSB8fFxuICAgICAgICAgICAgIChub2RlLnBvc2l0aW9uICsgbm9kZS5oZWlnaHQgPiB0aGlzLnkpO1xuICAgIH0pO1xuXG4gICAgLy8gU2VhcmNoIGZvciBsYXN0IG5vZGUgaW4gdGhlIHZpZXdwb3J0IHVzaW5nIGJpbmFyeSBzZWFyY2hcbiAgICAvLyBMb29rIGZvciBmaXJzdCBub2RlIHRoYXQgc3RhcnRzIGFmdGVyIHRoZSBlbmQgb2YgdGhlIHZpZXdwb3J0ICh3aXRoIGJ1ZmZlcilcbiAgICBjb25zdCBsYXN0SW5kZXggPSBiaW5hcnlTZWFyY2godmlzaWJsZU5vZGVzLCAobm9kZSkgPT4ge1xuICAgICAgcmV0dXJuIG5vZGUucG9zaXRpb24gLSBZX09GRlNFVCA+IHRoaXMueSArIHRoaXMudmlld3BvcnRIZWlnaHQ7XG4gICAgfSwgZmlyc3RJbmRleCk7XG5cbiAgICBjb25zdCB2aWV3cG9ydE5vZGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IGZpcnN0SW5kZXg7IGkgPD0gbGFzdEluZGV4OyBpKyspIHtcbiAgICAgIHZpZXdwb3J0Tm9kZXMucHVzaCh2aXNpYmxlTm9kZXNbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiB2aWV3cG9ydE5vZGVzO1xuICB9XG5cbiAgZml4U2Nyb2xsKCkge1xuICAgIGNvbnN0IG1heFkgPSBNYXRoLm1heCgwLCB0aGlzLnRvdGFsSGVpZ2h0IC0gdGhpcy52aWV3cG9ydEhlaWdodCk7XG5cbiAgICBpZiAodGhpcy55IDwgMCkgdGhpcy5fc2V0WUJsb2NrcygwKTtcbiAgICBpZiAodGhpcy55ID4gbWF4WSkgdGhpcy5fc2V0WUJsb2NrcyhtYXhZIC8gWV9FUFNJTE9OKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBiaW5hcnlTZWFyY2gobm9kZXMsIGNvbmRpdGlvbiwgZmlyc3RJbmRleCA9IDApIHtcbiAgbGV0IGluZGV4ID0gZmlyc3RJbmRleDtcbiAgbGV0IHRvSW5kZXggPSBub2Rlcy5sZW5ndGggLSAxO1xuXG4gIHdoaWxlIChpbmRleCAhPT0gdG9JbmRleCkge1xuICAgIGxldCBtaWRJbmRleCA9IE1hdGguZmxvb3IoKGluZGV4ICsgdG9JbmRleCkgLyAyKTtcblxuICAgIGlmIChjb25kaXRpb24obm9kZXNbbWlkSW5kZXhdKSkge1xuICAgICAgdG9JbmRleCA9IG1pZEluZGV4O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmIChpbmRleCA9PT0gbWlkSW5kZXgpIGluZGV4ID0gdG9JbmRleDtcbiAgICAgIGVsc2UgaW5kZXggPSBtaWRJbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZGV4O1xufVxuIl19