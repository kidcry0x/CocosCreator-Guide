
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/render.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'af5cbAjVx9L459whaT0CJ9E', 'render');
// script/render.ts

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Render = /** @class */ (function (_super) {
    __extends(Render, _super);
    function Render() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = undefined;
        _this.itemSpriteFrames = [];
        /** 游戏层上应该铺满节点，然后根据数据渲染 */
        _this.itemArray = [];
        return _this;
    }
    Render.prototype.onLoad = function () {
        this.init();
    };
    Render.prototype.init = function () {
        var height = config_1.config.row * config_1.config.blockHeight;
        var width = config_1.config.col * config_1.config.blockWidth;
        // 初始化所有节点
        for (var i = 0; i < config_1.config.row; i++) {
            this.itemArray[i] = [];
            for (var j = 0; j < config_1.config.col; j++) {
                var x = -width / 2 + config_1.config.blockWidth / 2 + j * config_1.config.blockWidth;
                var y = height / 2 - config_1.config.blockHeight / 2 - i * config_1.config.blockHeight;
                var item = this.createItem(x, y);
                this.itemArray[i][j] = item;
            }
        }
    };
    /** 根据传入二维数组进行渲染 */
    Render.prototype.render = function (dataArray) {
        for (var i = 0; i < config_1.config.row; i++) {
            for (var j = 0; j < config_1.config.col; j++) {
                var color = dataArray[i][j];
                // 拖入图片 0-6，颜色枚举 1-7
                this.itemArray[i][j].getComponent(cc.Sprite).spriteFrame = this.itemSpriteFrames[color - 1];
            }
        }
    };
    Render.prototype.createItem = function (x, y) {
        var item = cc.instantiate(this.item);
        this.node.addChild(item);
        item.setPosition(x, y);
        item.setContentSize(config_1.config.itemWidth, config_1.config.itemHeight);
        return item;
    };
    __decorate([
        property(cc.Prefab)
    ], Render.prototype, "item", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], Render.prototype, "itemSpriteFrames", void 0);
    Render = __decorate([
        ccclass
    ], Render);
    return Render;
}(cc.Component));
exports.default = Render;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxyZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFpQztBQUczQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQTtBQUd6QztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQWdEQztRQTdDRyxVQUFJLEdBQWMsU0FBUyxDQUFBO1FBRzNCLHNCQUFnQixHQUFxQixFQUFFLENBQUE7UUFFdkMsMEJBQTBCO1FBQzFCLGVBQVMsR0FBZ0IsRUFBRSxDQUFBOztJQXVDL0IsQ0FBQztJQXJDRyx1QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVELHFCQUFJLEdBQUo7UUFDSSxJQUFNLE1BQU0sR0FBRyxlQUFNLENBQUMsR0FBRyxHQUFHLGVBQU0sQ0FBQyxXQUFXLENBQUE7UUFDOUMsSUFBTSxLQUFLLEdBQUcsZUFBTSxDQUFDLEdBQUcsR0FBRyxlQUFNLENBQUMsVUFBVSxDQUFBO1FBQzVDLFVBQVU7UUFDVixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDakMsSUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLGVBQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxlQUFNLENBQUMsVUFBVSxDQUFBO2dCQUNwRSxJQUFNLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLGVBQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxlQUFNLENBQUMsV0FBVyxDQUFBO2dCQUN0RSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUE7YUFDOUI7U0FDSjtJQUNMLENBQUM7SUFFRCxtQkFBbUI7SUFDbkIsdUJBQU0sR0FBTixVQUFRLFNBQXdCO1FBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqQyxJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzdCLG9CQUFvQjtnQkFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFBO2FBQzlGO1NBQ0o7SUFDTCxDQUFDO0lBRUQsMkJBQVUsR0FBVixVQUFZLENBQVMsRUFBRSxDQUFTO1FBQzVCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBTSxDQUFDLFNBQVMsRUFBRSxlQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDeEQsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBNUNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0NBQ087SUFHM0I7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7b0RBQ1k7SUFOdEIsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQWdEMUI7SUFBRCxhQUFDO0NBaERELEFBZ0RDLENBaERtQyxFQUFFLENBQUMsU0FBUyxHQWdEL0M7a0JBaERvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCJcclxuaW1wb3J0IHsgSXRlbUNvbG9yIH0gZnJvbSBcIi4vZW51bVwiXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvclxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgaXRlbTogY2MuUHJlZmFiID0gdW5kZWZpbmVkXHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBpdGVtU3ByaXRlRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW11cclxuXHJcbiAgICAvKiog5ri45oiP5bGC5LiK5bqU6K+l6ZO65ruh6IqC54K577yM54S25ZCO5qC55o2u5pWw5o2u5riy5p+TICovXHJcbiAgICBpdGVtQXJyYXk6IGNjLk5vZGVbXVtdID0gW11cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCAoKSB7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gY29uZmlnLnJvdyAqIGNvbmZpZy5ibG9ja0hlaWdodFxyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gY29uZmlnLmNvbCAqIGNvbmZpZy5ibG9ja1dpZHRoXHJcbiAgICAgICAgLy8g5Yid5aeL5YyW5omA5pyJ6IqC54K5XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWcucm93OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtQXJyYXlbaV0gPSBbXVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbmZpZy5jb2w7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IC13aWR0aCAvIDIgKyBjb25maWcuYmxvY2tXaWR0aCAvIDIgKyBqICogY29uZmlnLmJsb2NrV2lkdGhcclxuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBoZWlnaHQgLyAyIC0gY29uZmlnLmJsb2NrSGVpZ2h0IC8gMiAtIGkgKiBjb25maWcuYmxvY2tIZWlnaHRcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmNyZWF0ZUl0ZW0oeCwgeSlcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbUFycmF5W2ldW2pdID0gaXRlbVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmoLnmja7kvKDlhaXkuoznu7TmlbDnu4Tov5vooYzmuLLmn5MgKi9cclxuICAgIHJlbmRlciAoZGF0YUFycmF5OiBJdGVtQ29sb3JbXVtdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWcucm93OyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb25maWcuY29sOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gZGF0YUFycmF5W2ldW2pdXHJcbiAgICAgICAgICAgICAgICAvLyDmi5blhaXlm77niYcgMC0277yM6aKc6Imy5p6a5Li+IDEtN1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtQXJyYXlbaV1bal0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLml0ZW1TcHJpdGVGcmFtZXNbY29sb3IgLSAxXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUl0ZW0gKHg6IG51bWJlciwgeTogbnVtYmVyKTogY2MuTm9kZSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW0pXHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGl0ZW0pXHJcbiAgICAgICAgaXRlbS5zZXRQb3NpdGlvbih4LCB5KVxyXG4gICAgICAgIGl0ZW0uc2V0Q29udGVudFNpemUoY29uZmlnLml0ZW1XaWR0aCwgY29uZmlnLml0ZW1IZWlnaHQpXHJcbiAgICAgICAgcmV0dXJuIGl0ZW1cclxuICAgIH1cclxufVxyXG4iXX0=