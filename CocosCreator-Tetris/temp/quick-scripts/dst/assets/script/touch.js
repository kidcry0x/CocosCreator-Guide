
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/touch.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f95c8LJcWhP+IxmovtHpMFw', 'touch');
// script/touch.ts

Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("./enum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Touch = /** @class */ (function (_super) {
    __extends(Touch, _super);
    function Touch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.aimNode = undefined;
        return _this;
    }
    Touch.prototype.onLoad = function () {
        this.registerEvent();
    };
    Touch.prototype.registerEvent = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            var startPoint = e.getStartLocation();
            var endPonit = e.getLocation();
            // 起点与终点相减
            var v = endPonit.sub(startPoint);
            // 转弧度
            var radians = Math.atan2(v.y, v.x);
            // 弧度转角度
            var degrees = cc.misc.radiansToDegrees(radians);
            /** 将角度划分 8 块区域，方便处理，注意恰好 360 度 */
            var index = Math.floor(degrees / 45);
            _this.emitEventByIndex(index);
        }, this);
    };
    Touch.prototype.emitEventByIndex = function (index) {
        // 8 方向判断
        if (index === 0 || index === -1) {
            this.aimNode.emit(enum_1.TouchEvent.RIGHT);
        }
        else if (index === 1 || index === 2) {
            this.aimNode.emit(enum_1.TouchEvent.UP);
        }
        else if (index === -2 || index === -3) {
            this.aimNode.emit(enum_1.TouchEvent.DOWN);
        }
        else if (index === -4 || index === 3 || index === 4) {
            this.aimNode.emit(enum_1.TouchEvent.LEFT);
        }
        else {
            cc.error("\u65E0\u6B64\u65B9\u5411" + index);
        }
    };
    __decorate([
        property(cc.Node)
    ], Touch.prototype, "aimNode", void 0);
    Touch = __decorate([
        ccclass
    ], Touch);
    return Touch;
}(cc.Component));
exports.default = Touch;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx0b3VjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQW1DO0FBRTdCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFBO0FBR3pDO0lBQW1DLHlCQUFZO0lBQS9DO1FBQUEscUVBd0NDO1FBckNHLGFBQU8sR0FBWSxTQUFTLENBQUE7O0lBcUNoQyxDQUFDO0lBbkNHLHNCQUFNLEdBQU47UUFDRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQUVELDZCQUFhLEdBQWI7UUFBQSxpQkFjQztRQWJHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxVQUFDLENBQXNCO1lBQzdELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1lBQ3JDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUM5QixVQUFVO1lBQ1YsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUNoQyxNQUFNO1lBQ04sSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNsQyxRQUFRO1lBQ1IsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUMvQyxrQ0FBa0M7WUFDbEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUE7WUFDcEMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2hDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFFRCxnQ0FBZ0IsR0FBaEIsVUFBa0IsS0FBYTtRQUMzQixTQUFTO1FBQ1QsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3RDO2FBQU0sSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUNuQzthQUFNLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ3JDO2FBQU0sSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDckM7YUFBTTtZQUNILEVBQUUsQ0FBQyxLQUFLLENBQUMsNkJBQU8sS0FBTyxDQUFDLENBQUE7U0FDM0I7SUFDTCxDQUFDO0lBbkNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MENBQ1U7SUFIWCxLQUFLO1FBRHpCLE9BQU87T0FDYSxLQUFLLENBd0N6QjtJQUFELFlBQUM7Q0F4Q0QsQUF3Q0MsQ0F4Q2tDLEVBQUUsQ0FBQyxTQUFTLEdBd0M5QztrQkF4Q29CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb3VjaEV2ZW50IH0gZnJvbSBcIi4vZW51bVwiXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvclxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG91Y2ggZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYWltTm9kZTogY2MuTm9kZSA9IHVuZGVmaW5lZFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyRXZlbnQgKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIChlOiBjYy5FdmVudC5FdmVudFRvdWNoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydFBvaW50ID0gZS5nZXRTdGFydExvY2F0aW9uKClcclxuICAgICAgICAgICAgbGV0IGVuZFBvbml0ID0gZS5nZXRMb2NhdGlvbigpXHJcbiAgICAgICAgICAgIC8vIOi1t+eCueS4jue7iOeCueebuOWHj1xyXG4gICAgICAgICAgICBsZXQgdiA9IGVuZFBvbml0LnN1YihzdGFydFBvaW50KVxyXG4gICAgICAgICAgICAvLyDovazlvKfluqZcclxuICAgICAgICAgICAgbGV0IHJhZGlhbnMgPSBNYXRoLmF0YW4yKHYueSwgdi54KVxyXG4gICAgICAgICAgICAvLyDlvKfluqbovazop5LluqZcclxuICAgICAgICAgICAgbGV0IGRlZ3JlZXMgPSBjYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocmFkaWFucylcclxuICAgICAgICAgICAgLyoqIOWwhuinkuW6puWIkuWIhiA4IOWdl+WMuuWfn++8jOaWueS+v+WkhOeQhu+8jOazqOaEj+aBsOWlvSAzNjAg5bqmICovXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoZGVncmVlcyAvIDQ1KVxyXG4gICAgICAgICAgICB0aGlzLmVtaXRFdmVudEJ5SW5kZXgoaW5kZXgpXHJcbiAgICAgICAgfSwgdGhpcylcclxuICAgIH1cclxuXHJcbiAgICBlbWl0RXZlbnRCeUluZGV4IChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gOCDmlrnlkJHliKTmlq1cclxuICAgICAgICBpZiAoaW5kZXggPT09IDAgfHwgaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWltTm9kZS5lbWl0KFRvdWNoRXZlbnQuUklHSFQpXHJcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMSB8fCBpbmRleCA9PT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmFpbU5vZGUuZW1pdChUb3VjaEV2ZW50LlVQKVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IC0yIHx8IGluZGV4ID09PSAtMykge1xyXG4gICAgICAgICAgICB0aGlzLmFpbU5vZGUuZW1pdChUb3VjaEV2ZW50LkRPV04pXHJcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gLTQgfHwgaW5kZXggPT09IDMgfHwgaW5kZXggPT09IDQpIHtcclxuICAgICAgICAgICAgdGhpcy5haW1Ob2RlLmVtaXQoVG91Y2hFdmVudC5MRUZUKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKGDml6DmraTmlrnlkJEke2luZGV4fWApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=