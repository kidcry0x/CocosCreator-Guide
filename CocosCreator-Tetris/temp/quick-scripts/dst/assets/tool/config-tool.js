
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/tool/config-tool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'be8f2VLg8pCoJ/bChpa4GQh', 'config-tool');
// tool/config-tool.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Tool = /** @class */ (function (_super) {
    __extends(Tool, _super);
    function Tool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buttons = undefined;
        _this.clickData = [];
        return _this;
    }
    Tool.prototype.onLoad = function () {
        this.initData();
        this.registerEvent();
        this.clear();
    };
    Tool.prototype.initData = function () {
        for (var i = 0; i < 4; i++) {
            this.clickData[i] = [];
            for (var j = 0; j < 4; j++) {
                this.clickData[i][j] = false;
            }
        }
    };
    Tool.prototype.outData = function () {
        // cc.log(this.clickData)
        var data = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.clickData[i][j]) {
                    data.push(cc.v2(i, j));
                }
            }
        }
        // 做偏移后转字符串
        var str = '[';
        data.forEach(function (v, index) {
            var x = v.x - 1;
            var y = v.y - 1;
            str += "cc.v2(" + x + ", " + y + ")";
            if (index !== data.length - 1) {
                str += ', ';
            }
        });
        str += ']';
        cc.log(str);
    };
    Tool.prototype.clear = function () {
        var _this = this;
        this.buttons.children.forEach(function (node, index) {
            var bk = node.children[0];
            bk.color = cc.color(220, 220, 220);
            var pos = _this.indexToRowCol(index);
            _this.clickData[pos.x][pos.y] = false;
        });
    };
    Tool.prototype.onButtonClick = function (index, node) {
        var bk = node.children[0];
        bk.color = cc.Color.GREEN;
        var pos = this.indexToRowCol(index);
        this.clickData[pos.x][pos.y] = true;
    };
    Tool.prototype.registerEvent = function () {
        var _this = this;
        this.buttons.children.forEach(function (node, index) {
            node.on(cc.Node.EventType.TOUCH_END, function (event) {
                _this.onButtonClick(index, event.target);
            });
        });
    };
    /** 0-15 转化为数据坐标 */
    Tool.prototype.indexToRowCol = function (index) {
        var row = Math.floor(index / 4);
        var col = index % 4;
        // cc.warn(row, col)
        return cc.v2(row, col);
    };
    __decorate([
        property(cc.Node)
    ], Tool.prototype, "buttons", void 0);
    Tool = __decorate([
        ccclass
    ], Tool);
    return Tool;
}(cc.Component));
exports.default = Tool;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcdG9vbFxcY29uZmlnLXRvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBOEVDO1FBM0VHLGFBQU8sR0FBWSxTQUFTLENBQUE7UUFFNUIsZUFBUyxHQUFnQixFQUFFLENBQUE7O0lBeUUvQixDQUFDO0lBdkVHLHFCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDcEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2hCLENBQUM7SUFFRCx1QkFBUSxHQUFSO1FBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQTthQUMvQjtTQUNKO0lBQ0wsQ0FBQztJQUVELHNCQUFPLEdBQVA7UUFDSSx5QkFBeUI7UUFDekIsSUFBTSxJQUFJLEdBQWMsRUFBRSxDQUFBO1FBQzFCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsSUFBSSxJQUFJLENB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eUNBQ1U7SUFIWCxJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBOEV4QjtJQUFELFdBQUM7Q0E5RUQsQUE4RUMsQ0E5RWlDLEVBQUUsQ0FBQyxTQUFTLEdBOEU3QztrQkE5RW9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvb2wgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnV0dG9uczogY2MuTm9kZSA9IHVuZGVmaW5lZFxyXG5cclxuICAgIGNsaWNrRGF0YTogYm9vbGVhbltdW10gPSBbXVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpXHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KClcclxuICAgICAgICB0aGlzLmNsZWFyKClcclxuICAgIH1cclxuXHJcbiAgICBpbml0RGF0YSAoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrRGF0YVtpXSA9IFtdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrRGF0YVtpXVtqXSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3V0RGF0YSAoKSB7XHJcbiAgICAgICAgLy8gY2MubG9nKHRoaXMuY2xpY2tEYXRhKVxyXG4gICAgICAgIGNvbnN0IGRhdGE6IGNjLlZlYzJbXSA9IFtdXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xpY2tEYXRhW2ldW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKGNjLnYyKGksIGopKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWBmuWBj+enu+WQjui9rOWtl+espuS4slxyXG4gICAgICAgIGxldCBzdHIgPSAnWydcclxuICAgICAgICBkYXRhLmZvckVhY2goKHYsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHggPSB2LnggLSAxXHJcbiAgICAgICAgICAgIGNvbnN0IHkgPSB2LnkgLSAxXHJcbiAgICAgICAgICAgIHN0ciArPSBgY2MudjIoJHt4fSwgJHt5fSlgXHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gZGF0YS5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBzdHIgKz0gJywgJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBzdHIgKz0gJ10nXHJcbiAgICAgICAgY2MubG9nKHN0cilcclxuICAgIH1cclxuXHJcbiAgICBjbGVhciAoKSB7XHJcbiAgICAgICAgdGhpcy5idXR0b25zLmNoaWxkcmVuLmZvckVhY2goKG5vZGUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJrID0gbm9kZS5jaGlsZHJlblswXVxyXG4gICAgICAgICAgICBiay5jb2xvciA9IGNjLmNvbG9yKDIyMCwgMjIwLCAyMjApXHJcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHRoaXMuaW5kZXhUb1Jvd0NvbChpbmRleClcclxuICAgICAgICAgICAgdGhpcy5jbGlja0RhdGFbcG9zLnhdW3Bvcy55XSA9IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkJ1dHRvbkNsaWNrIChpbmRleDogbnVtYmVyLCBub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgY29uc3QgYmsgPSBub2RlLmNoaWxkcmVuWzBdXHJcbiAgICAgICAgYmsuY29sb3IgPSBjYy5Db2xvci5HUkVFTlxyXG4gICAgICAgIGNvbnN0IHBvcyA9IHRoaXMuaW5kZXhUb1Jvd0NvbChpbmRleClcclxuICAgICAgICB0aGlzLmNsaWNrRGF0YVtwb3MueF1bcG9zLnldID0gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyRXZlbnQgKCkge1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5jaGlsZHJlbi5mb3JFYWNoKChub2RlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQnV0dG9uQ2xpY2soaW5kZXgsIGV2ZW50LnRhcmdldClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiAwLTE1IOi9rOWMluS4uuaVsOaNruWdkOaghyAqL1xyXG4gICAgaW5kZXhUb1Jvd0NvbCAoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoaW5kZXggLyA0KVxyXG4gICAgICAgIGNvbnN0IGNvbCA9IGluZGV4ICUgNFxyXG4gICAgICAgIC8vIGNjLndhcm4ocm93LCBjb2wpXHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHJvdywgY29sKVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=