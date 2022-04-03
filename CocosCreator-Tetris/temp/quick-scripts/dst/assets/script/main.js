
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '52073YquUJE1Zi+6Jw3DGup', 'main');
// script/main.ts

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var render_1 = require("./render");
var enum_1 = require("./enum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderClass = undefined;
        _this.startPanel = undefined;
        /** 二维数组 */
        _this.dataArray = [];
        /** 当前形状 */
        _this.currentShape = {
            center: cc.v2(0, 0),
            index: 0,
            color: enum_1.ItemColor.NULL
        };
        /** 计时变量 */
        _this.time = 0;
        /** 游戏进行开关 */
        _this.isOpen = false;
        return _this;
    }
    Main.prototype.onLoad = function () {
        this.registerEvent();
    };
    Main.prototype.start = function () {
        // 游戏音乐 BGM
        cc.find(enum_1.NodeUrl.Music).emit(enum_1.MusicEvent.BGM);
    };
    Main.prototype.registerEvent = function () {
        var _this = this;
        // touch 脚本传来上下左右事件，上：变形，下：下一个格子，左右：左右移动一个格子
        this.node.on(enum_1.TouchEvent.UP, function () {
            _this.changeCurrentShapeIndex();
        }, this);
        this.node.on(enum_1.TouchEvent.DOWN, function () {
            _this.changeCurrentShapePos(cc.v2(1, 0));
        }, this);
        this.node.on(enum_1.TouchEvent.LEFT, function () {
            _this.changeCurrentShapePos(cc.v2(0, -1));
        }, this);
        this.node.on(enum_1.TouchEvent.RIGHT, function () {
            _this.changeCurrentShapePos(cc.v2(0, 1));
        }, this);
    };
    /** 点击开始游戏按钮后触发 */
    Main.prototype.gameStart = function () {
        this.startPanel.active = false;
        this.initData();
        this.render();
        this.randomOneShape();
        this.isOpen = true;
    };
    Main.prototype.initData = function () {
        for (var i = 0; i < config_1.config.row; i++) {
            this.dataArray[i] = [];
            for (var j = 0; j < config_1.config.col; j++) {
                this.dataArray[i][j] = enum_1.ItemColor.NULL;
            }
        }
    };
    /** 随机生成 */
    Main.prototype.randomOneShape = function () {
        var _this = this;
        this.currentShape.center.set(config_1.config.startPos);
        // 随机类型
        this.currentShape.color = Math.floor(1 + 7 * Math.random());
        // 随机开始的下标
        this.currentShape.index = Math.floor(4 * Math.random());
        // 检测游戏结束
        if (this.isCurrentDataOK(this.currentShape)) {
            this.setCurrentData(this.currentShape);
        }
        else {
            cc.warn('游戏结束');
            this.isOpen = false;
            this.setCurrentData(this.currentShape);
            cc.find(enum_1.NodeUrl.Music).emit(enum_1.MusicEvent.GAME_OVER);
            this.scheduleOnce(function () {
                // 显示游戏开始菜单
                _this.startPanel.active = true;
            }, 2);
        }
    };
    /** 根据当前中心点和形状类型清除数据 */
    Main.prototype.clearCurrentData = function (currentShape) {
        var _this = this;
        var center = currentShape.center, color = currentShape.color, index = currentShape.index;
        var shape = "shape" + color;
        var shapeData = config_1.config[shape];
        shapeData[index].forEach(function (ele) {
            var row = center.x + ele.x;
            var col = center.y + ele.y;
            _this.dataArray[row][col] = enum_1.ItemColor.NULL;
        });
    };
    /** 根据当前中心点和形状类型加入数据 */
    Main.prototype.setCurrentData = function (currentShape) {
        var _this = this;
        var center = currentShape.center, color = currentShape.color, index = currentShape.index;
        var shape = "shape" + color;
        var shapeData = config_1.config[shape];
        shapeData[index].forEach(function (ele) {
            var row = center.x + ele.x;
            var col = center.y + ele.y;
            _this.dataArray[row][col] = color;
        });
        // 刷新视图
        this.render();
    };
    /** 判断传入中心点和形状类型是否合理 */
    Main.prototype.isCurrentDataOK = function (currentShape) {
        var center = currentShape.center, color = currentShape.color, index = currentShape.index;
        var shape = "shape" + color;
        var shapeData = config_1.config[shape];
        var shapeIndexDate = shapeData[index];
        for (var i = 0; i < shapeIndexDate.length; i++) {
            var row = center.x + shapeIndexDate[i].x;
            if (row < 0 || row >= config_1.config.row) {
                return false;
            }
            var col = center.y + shapeIndexDate[i].y;
            if (col < 0 || col >= config_1.config.col) {
                return false;
            }
            if (this.dataArray[row][col] !== enum_1.ItemColor.NULL) {
                return false;
            }
        }
        return true;
    };
    /** 操作变形逻辑 */
    Main.prototype.changeCurrentShapeIndex = function () {
        this.clearCurrentData(this.currentShape);
        this.currentShape.index += this.currentShape.index === 3 ? -3 : 1;
        if (this.isCurrentDataOK(this.currentShape)) {
            this.setCurrentData(this.currentShape);
            cc.find(enum_1.NodeUrl.Music).emit(enum_1.MusicEvent.ACTION);
        }
        else {
            cc.warn('操作不合理');
            this.currentShape.index += this.currentShape.index === 0 ? 3 : -1;
        }
    };
    /** 操作逻辑 */
    Main.prototype.changeCurrentShapePos = function (v) {
        this.clearCurrentData(this.currentShape);
        this.currentShape.center.x += v.x;
        this.currentShape.center.y += v.y;
        if (this.isCurrentDataOK(this.currentShape)) {
            this.setCurrentData(this.currentShape);
        }
        else {
            cc.warn('操作不合理');
            this.currentShape.center.x -= v.x;
            this.currentShape.center.y -= v.y;
        }
    };
    /** 检测消除行 */
    Main.prototype.checkLines = function () {
        // 从下往上，写一个 while 检测所有满的行
        var row = config_1.config.row - 1;
        // 有消除
        var isEliminated = false;
        while (row !== 0) {
            var isFull = true;
            for (var j = 0; j < config_1.config.col; j++) {
                if (this.dataArray[row][j] === enum_1.ItemColor.NULL) {
                    isFull = false;
                }
            }
            // 如果该行满了，消除本行，所有数据下移，再检测一次
            if (isFull) {
                isEliminated = true;
                for (var p = row; p > 0; p--) {
                    for (var q = 0; q < config_1.config.col; q++) {
                        this.dataArray[p][q] = this.dataArray[p - 1][q];
                    }
                }
            }
            else {
                row--;
            }
        }
        if (isEliminated) {
            cc.find(enum_1.NodeUrl.Music).emit(enum_1.MusicEvent.ELIMINATE);
        }
    };
    /** 自动下落逻辑 */
    Main.prototype.autoDown = function () {
        this.clearCurrentData(this.currentShape);
        this.currentShape.center.x += 1;
        if (this.isCurrentDataOK(this.currentShape)) {
            this.setCurrentData(this.currentShape);
        }
        else {
            cc.warn('无法下移动，下一个');
            this.currentShape.center.x -= 1;
            this.setCurrentData(this.currentShape);
            // 消除逻辑
            this.checkLines();
            // 下一个形状
            this.randomOneShape();
        }
    };
    Main.prototype.update = function (dt) {
        if (!this.isOpen) {
            return;
        }
        this.time += dt;
        if (this.time > 1) {
            this.time = 0;
            // 下落逻辑
            this.autoDown();
        }
    };
    /** 刷新视图 */
    Main.prototype.render = function () {
        this.renderClass.render(this.dataArray);
    };
    __decorate([
        property(render_1.default)
    ], Main.prototype, "renderClass", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "startPanel", void 0);
    Main = __decorate([
        ccclass
    ], Main);
    return Main;
}(cc.Component));
exports.default = Main;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBaUM7QUFDakMsbUNBQTZCO0FBQzdCLCtCQUFtRTtBQUU3RCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQTtBQVl6QztJQUFrQyx3QkFBWTtJQUE5QztRQUFBLHFFQXVPQztRQXBPRyxpQkFBVyxHQUFXLFNBQVMsQ0FBQTtRQUcvQixnQkFBVSxHQUFZLFNBQVMsQ0FBQTtRQUUvQixXQUFXO1FBQ1gsZUFBUyxHQUFrQixFQUFFLENBQUE7UUFFN0IsV0FBVztRQUNYLGtCQUFZLEdBQXFCO1lBQzdCLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkIsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsZ0JBQVMsQ0FBQyxJQUFJO1NBQ3hCLENBQUE7UUFFRCxXQUFXO1FBQ1gsVUFBSSxHQUFXLENBQUMsQ0FBQTtRQUVoQixhQUFhO1FBQ2IsWUFBTSxHQUFZLEtBQUssQ0FBQTs7SUFpTjNCLENBQUM7SUEvTUcscUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBRUQsb0JBQUssR0FBTDtRQUNJLFdBQVc7UUFDWCxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMvQyxDQUFDO0lBRUQsNEJBQWEsR0FBYjtRQUFBLGlCQWlCQztRQWhCRyw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQVUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsS0FBSSxDQUFDLHVCQUF1QixFQUFFLENBQUE7UUFDbEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRVIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDMUIsS0FBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDM0MsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRVIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDMUIsS0FBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM1QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFUixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBVSxDQUFDLEtBQUssRUFBRTtZQUMzQixLQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMzQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDWixDQUFDO0lBRUQsa0JBQWtCO0lBQ2xCLHdCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFDOUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ2IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO0lBQ3RCLENBQUM7SUFFRCx1QkFBUSxHQUFSO1FBQ0ksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUE7YUFDeEM7U0FDSjtJQUNMLENBQUM7SUFFRCxXQUFXO0lBQ1gsNkJBQWMsR0FBZDtRQUFBLGlCQW1CQztRQWxCRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzdDLE9BQU87UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDM0QsVUFBVTtRQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZELFNBQVM7UUFDVCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1NBQ3pDO2FBQU07WUFDSCxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7WUFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDdEMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxXQUFXO2dCQUNYLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtZQUNqQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDUjtJQUNMLENBQUM7SUFFRCx1QkFBdUI7SUFDdkIsK0JBQWdCLEdBQWhCLFVBQWtCLFlBQThCO1FBQWhELGlCQVNDO1FBUlcsSUFBQSxNQUFNLEdBQW1CLFlBQVksT0FBL0IsRUFBRSxLQUFLLEdBQVksWUFBWSxNQUF4QixFQUFFLEtBQUssR0FBSyxZQUFZLE1BQWpCLENBQWlCO1FBQzdDLElBQU0sS0FBSyxHQUFHLFVBQVEsS0FBTyxDQUFBO1FBQzdCLElBQU0sU0FBUyxHQUFnQixlQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDeEIsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQzVCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUM1QixLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFBO1FBQzdDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELHVCQUF1QjtJQUN2Qiw2QkFBYyxHQUFkLFVBQWdCLFlBQThCO1FBQTlDLGlCQVdDO1FBVlcsSUFBQSxNQUFNLEdBQW1CLFlBQVksT0FBL0IsRUFBRSxLQUFLLEdBQVksWUFBWSxNQUF4QixFQUFFLEtBQUssR0FBSyxZQUFZLE1BQWpCLENBQWlCO1FBQzdDLElBQU0sS0FBSyxHQUFHLFVBQVEsS0FBTyxDQUFBO1FBQzdCLElBQU0sU0FBUyxHQUFnQixlQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDeEIsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQzVCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUM1QixLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQTtRQUNwQyxDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU87UUFDUCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUVELHVCQUF1QjtJQUN2Qiw4QkFBZSxHQUFmLFVBQWlCLFlBQThCO1FBQ25DLElBQUEsTUFBTSxHQUFtQixZQUFZLE9BQS9CLEVBQUUsS0FBSyxHQUFZLFlBQVksTUFBeEIsRUFBRSxLQUFLLEdBQUssWUFBWSxNQUFqQixDQUFpQjtRQUM3QyxJQUFNLEtBQUssR0FBRyxVQUFRLEtBQU8sQ0FBQTtRQUM3QixJQUFNLFNBQVMsR0FBZ0IsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzVDLElBQU0sY0FBYyxHQUFjLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNsRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDMUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxlQUFNLENBQUMsR0FBRyxFQUFFO2dCQUM5QixPQUFPLEtBQUssQ0FBQTthQUNmO1lBQ0QsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksZUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDOUIsT0FBTyxLQUFLLENBQUE7YUFDZjtZQUNELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxnQkFBUyxDQUFDLElBQUksRUFBRTtnQkFDN0MsT0FBTyxLQUFLLENBQUE7YUFDZjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRUQsYUFBYTtJQUNiLHNDQUF1QixHQUF2QjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDdEMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDakQ7YUFBTTtZQUNILEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3BFO0lBQ0wsQ0FBQztJQUVELFdBQVc7SUFDWCxvQ0FBcUIsR0FBckIsVUFBdUIsQ0FBVTtRQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3hDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7U0FDekM7YUFBTTtZQUNILEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDcEM7SUFDTCxDQUFDO0lBRUQsWUFBWTtJQUNaLHlCQUFVLEdBQVY7UUFDSSx5QkFBeUI7UUFDekIsSUFBSSxHQUFHLEdBQVcsZUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDaEMsTUFBTTtRQUNOLElBQUksWUFBWSxHQUFZLEtBQUssQ0FBQTtRQUNqQyxPQUFPLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDZCxJQUFJLE1BQU0sR0FBWSxJQUFJLENBQUE7WUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxnQkFBUyxDQUFDLElBQUksRUFBRTtvQkFDM0MsTUFBTSxHQUFHLEtBQUssQ0FBQTtpQkFDakI7YUFDSjtZQUNELDJCQUEyQjtZQUMzQixJQUFJLE1BQU0sRUFBRTtnQkFDUixZQUFZLEdBQUcsSUFBSSxDQUFBO2dCQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDbEQ7aUJBQ0o7YUFDSjtpQkFBTTtnQkFDSCxHQUFHLEVBQUUsQ0FBQTthQUNSO1NBQ0o7UUFDRCxJQUFJLFlBQVksRUFBRTtZQUNkLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1NBQ3BEO0lBQ0wsQ0FBQztJQUVELGFBQWE7SUFDYix1QkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQy9CLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7U0FDekM7YUFBTTtZQUNILEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUN0QyxPQUFPO1lBQ1AsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQ2pCLFFBQVE7WUFDUixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7U0FDeEI7SUFDTCxDQUFDO0lBRUQscUJBQU0sR0FBTixVQUFRLEVBQVU7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLE9BQU07U0FDVDtRQUNELElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFBO1FBQ2YsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1lBQ2IsT0FBTztZQUNQLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtTQUNsQjtJQUNMLENBQUM7SUFFRCxXQUFXO0lBQ1gscUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBbE9EO1FBREMsUUFBUSxDQUFDLGdCQUFNLENBQUM7NkNBQ2M7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDYTtJQU5kLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0F1T3hCO0lBQUQsV0FBQztDQXZPRCxBQXVPQyxDQXZPaUMsRUFBRSxDQUFDLFNBQVMsR0F1TzdDO2tCQXZPb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiXHJcbmltcG9ydCBSZW5kZXIgZnJvbSBcIi4vcmVuZGVyXCJcclxuaW1wb3J0IHsgVG91Y2hFdmVudCwgSXRlbUNvbG9yLCBOb2RlVXJsLCBNdXNpY0V2ZW50IH0gZnJvbSBcIi4vZW51bVwiXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvclxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDdXJyZW50U2hhcGVEYXRhIHtcclxuICAgIC8qKiDmjIflkJHlvZPliY3lvaLnirbkuK3lv4MgKi9cclxuICAgIGNlbnRlcjogY2MuVmVjMixcclxuICAgIC8qKiDlvZPliY3lvaLnirbnv7vovazkuIvmoIfvvIwwLTPvvIzlj6/ku6Xnv7vovawgNCDnp43lvaLmgIEgKi9cclxuICAgIGluZGV4OiBudW1iZXIsXHJcbiAgICAvKiog5LuA5LmI6aKc6Imy55qE5pa55Z2XICovXHJcbiAgICBjb2xvcjogSXRlbUNvbG9yXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShSZW5kZXIpXHJcbiAgICByZW5kZXJDbGFzczogUmVuZGVyID0gdW5kZWZpbmVkXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzdGFydFBhbmVsOiBjYy5Ob2RlID0gdW5kZWZpbmVkXHJcblxyXG4gICAgLyoqIOS6jOe7tOaVsOe7hCAqL1xyXG4gICAgZGF0YUFycmF5OiBJdGVtQ29sb3JbXVtdID0gW11cclxuXHJcbiAgICAvKiog5b2T5YmN5b2i54q2ICovXHJcbiAgICBjdXJyZW50U2hhcGU6IEN1cnJlbnRTaGFwZURhdGEgPSB7XHJcbiAgICAgICAgY2VudGVyOiBjYy52MigwLCAwKSxcclxuICAgICAgICBpbmRleDogMCxcclxuICAgICAgICBjb2xvcjogSXRlbUNvbG9yLk5VTExcclxuICAgIH1cclxuXHJcbiAgICAvKiog6K6h5pe25Y+Y6YePICovXHJcbiAgICB0aW1lOiBudW1iZXIgPSAwXHJcblxyXG4gICAgLyoqIOa4uOaIj+i/m+ihjOW8gOWFsyAqL1xyXG4gICAgaXNPcGVuOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIC8vIOa4uOaIj+mfs+S5kCBCR01cclxuICAgICAgICBjYy5maW5kKE5vZGVVcmwuTXVzaWMpLmVtaXQoTXVzaWNFdmVudC5CR00pXHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJFdmVudCAoKSB7XHJcbiAgICAgICAgLy8gdG91Y2gg6ISa5pys5Lyg5p2l5LiK5LiL5bem5Y+z5LqL5Lu277yM5LiK77ya5Y+Y5b2i77yM5LiL77ya5LiL5LiA5Liq5qC85a2Q77yM5bem5Y+z77ya5bem5Y+z56e75Yqo5LiA5Liq5qC85a2QXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKFRvdWNoRXZlbnQuVVAsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VDdXJyZW50U2hhcGVJbmRleCgpXHJcbiAgICAgICAgfSwgdGhpcylcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKFRvdWNoRXZlbnQuRE9XTiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUN1cnJlbnRTaGFwZVBvcyhjYy52MigxLCAwKSlcclxuICAgICAgICB9LCB0aGlzKVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUub24oVG91Y2hFdmVudC5MRUZULCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQ3VycmVudFNoYXBlUG9zKGNjLnYyKDAsIC0xKSlcclxuICAgICAgICB9LCB0aGlzKVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUub24oVG91Y2hFdmVudC5SSUdIVCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUN1cnJlbnRTaGFwZVBvcyhjYy52MigwLCAxKSlcclxuICAgICAgICB9LCB0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDngrnlh7vlvIDlp4vmuLjmiI/mjInpkq7lkI7op6blj5EgKi9cclxuICAgIGdhbWVTdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydFBhbmVsLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpXHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKVxyXG4gICAgICAgIHRoaXMucmFuZG9tT25lU2hhcGUoKVxyXG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIGluaXREYXRhICgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5yb3c7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFBcnJheVtpXSA9IFtdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29uZmlnLmNvbDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFBcnJheVtpXVtqXSA9IEl0ZW1Db2xvci5OVUxMXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmaj+acuueUn+aIkCAqL1xyXG4gICAgcmFuZG9tT25lU2hhcGUgKCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNoYXBlLmNlbnRlci5zZXQoY29uZmlnLnN0YXJ0UG9zKVxyXG4gICAgICAgIC8vIOmaj+acuuexu+Wei1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNoYXBlLmNvbG9yID0gTWF0aC5mbG9vcigxICsgNyAqIE1hdGgucmFuZG9tKCkpXHJcbiAgICAgICAgLy8g6ZqP5py65byA5aeL55qE5LiL5qCHXHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2hhcGUuaW5kZXggPSBNYXRoLmZsb29yKDQgKiBNYXRoLnJhbmRvbSgpKVxyXG4gICAgICAgIC8vIOajgOa1i+a4uOaIj+e7k+adn1xyXG4gICAgICAgIGlmICh0aGlzLmlzQ3VycmVudERhdGFPSyh0aGlzLmN1cnJlbnRTaGFwZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50RGF0YSh0aGlzLmN1cnJlbnRTaGFwZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy53YXJuKCfmuLjmiI/nu5PmnZ8nKVxyXG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudERhdGEodGhpcy5jdXJyZW50U2hhcGUpXHJcbiAgICAgICAgICAgIGNjLmZpbmQoTm9kZVVybC5NdXNpYykuZW1pdChNdXNpY0V2ZW50LkdBTUVfT1ZFUilcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g5pi+56S65ri45oiP5byA5aeL6I+c5Y2VXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UGFuZWwuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9LCAyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5qC55o2u5b2T5YmN5Lit5b+D54K55ZKM5b2i54q257G75Z6L5riF6Zmk5pWw5o2uICovXHJcbiAgICBjbGVhckN1cnJlbnREYXRhIChjdXJyZW50U2hhcGU6IEN1cnJlbnRTaGFwZURhdGEpIHtcclxuICAgICAgICBjb25zdCB7IGNlbnRlciwgY29sb3IsIGluZGV4IH0gPSBjdXJyZW50U2hhcGVcclxuICAgICAgICBjb25zdCBzaGFwZSA9IGBzaGFwZSR7Y29sb3J9YFxyXG4gICAgICAgIGNvbnN0IHNoYXBlRGF0YTogY2MuVmVjMltdW10gPSBjb25maWdbc2hhcGVdXHJcbiAgICAgICAgc2hhcGVEYXRhW2luZGV4XS5mb3JFYWNoKGVsZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGNlbnRlci54ICsgZWxlLnhcclxuICAgICAgICAgICAgY29uc3QgY29sID0gY2VudGVyLnkgKyBlbGUueVxyXG4gICAgICAgICAgICB0aGlzLmRhdGFBcnJheVtyb3ddW2NvbF0gPSBJdGVtQ29sb3IuTlVMTFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOagueaNruW9k+WJjeS4reW/g+eCueWSjOW9oueKtuexu+Wei+WKoOWFpeaVsOaNriAqL1xyXG4gICAgc2V0Q3VycmVudERhdGEgKGN1cnJlbnRTaGFwZTogQ3VycmVudFNoYXBlRGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHsgY2VudGVyLCBjb2xvciwgaW5kZXggfSA9IGN1cnJlbnRTaGFwZVxyXG4gICAgICAgIGNvbnN0IHNoYXBlID0gYHNoYXBlJHtjb2xvcn1gXHJcbiAgICAgICAgY29uc3Qgc2hhcGVEYXRhOiBjYy5WZWMyW11bXSA9IGNvbmZpZ1tzaGFwZV1cclxuICAgICAgICBzaGFwZURhdGFbaW5kZXhdLmZvckVhY2goZWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gY2VudGVyLnggKyBlbGUueFxyXG4gICAgICAgICAgICBjb25zdCBjb2wgPSBjZW50ZXIueSArIGVsZS55XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUFycmF5W3Jvd11bY29sXSA9IGNvbG9yXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDliLfmlrDop4blm75cclxuICAgICAgICB0aGlzLnJlbmRlcigpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWIpOaWreS8oOWFpeS4reW/g+eCueWSjOW9oueKtuexu+Wei+aYr+WQpuWQiOeQhiAqL1xyXG4gICAgaXNDdXJyZW50RGF0YU9LIChjdXJyZW50U2hhcGU6IEN1cnJlbnRTaGFwZURhdGEpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB7IGNlbnRlciwgY29sb3IsIGluZGV4IH0gPSBjdXJyZW50U2hhcGVcclxuICAgICAgICBjb25zdCBzaGFwZSA9IGBzaGFwZSR7Y29sb3J9YFxyXG4gICAgICAgIGNvbnN0IHNoYXBlRGF0YTogY2MuVmVjMltdW10gPSBjb25maWdbc2hhcGVdXHJcbiAgICAgICAgY29uc3Qgc2hhcGVJbmRleERhdGU6IGNjLlZlYzJbXSA9IHNoYXBlRGF0YVtpbmRleF1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoYXBlSW5kZXhEYXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGNlbnRlci54ICsgc2hhcGVJbmRleERhdGVbaV0ueFxyXG4gICAgICAgICAgICBpZiAocm93IDwgMCB8fCByb3cgPj0gY29uZmlnLnJvdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgY29sID0gY2VudGVyLnkgKyBzaGFwZUluZGV4RGF0ZVtpXS55XHJcbiAgICAgICAgICAgIGlmIChjb2wgPCAwIHx8IGNvbCA+PSBjb25maWcuY29sKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhQXJyYXlbcm93XVtjb2xdICE9PSBJdGVtQ29sb3IuTlVMTCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuXHJcbiAgICAvKiog5pON5L2c5Y+Y5b2i6YC76L6RICovXHJcbiAgICBjaGFuZ2VDdXJyZW50U2hhcGVJbmRleCAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckN1cnJlbnREYXRhKHRoaXMuY3VycmVudFNoYXBlKVxyXG4gICAgICAgIHRoaXMuY3VycmVudFNoYXBlLmluZGV4ICs9IHRoaXMuY3VycmVudFNoYXBlLmluZGV4ID09PSAzID8gLTMgOiAxXHJcbiAgICAgICAgaWYgKHRoaXMuaXNDdXJyZW50RGF0YU9LKHRoaXMuY3VycmVudFNoYXBlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnREYXRhKHRoaXMuY3VycmVudFNoYXBlKVxyXG4gICAgICAgICAgICBjYy5maW5kKE5vZGVVcmwuTXVzaWMpLmVtaXQoTXVzaWNFdmVudC5BQ1RJT04pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2Mud2Fybign5pON5L2c5LiN5ZCI55CGJylcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2hhcGUuaW5kZXggKz0gdGhpcy5jdXJyZW50U2hhcGUuaW5kZXggPT09IDAgPyAzIDogLTFcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaTjeS9nOmAu+i+kSAqL1xyXG4gICAgY2hhbmdlQ3VycmVudFNoYXBlUG9zICh2OiBjYy5WZWMyKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckN1cnJlbnREYXRhKHRoaXMuY3VycmVudFNoYXBlKVxyXG4gICAgICAgIHRoaXMuY3VycmVudFNoYXBlLmNlbnRlci54ICs9IHYueFxyXG4gICAgICAgIHRoaXMuY3VycmVudFNoYXBlLmNlbnRlci55ICs9IHYueVxyXG4gICAgICAgIGlmICh0aGlzLmlzQ3VycmVudERhdGFPSyh0aGlzLmN1cnJlbnRTaGFwZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50RGF0YSh0aGlzLmN1cnJlbnRTaGFwZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy53YXJuKCfmk43kvZzkuI3lkIjnkIYnKVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTaGFwZS5jZW50ZXIueCAtPSB2LnhcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2hhcGUuY2VudGVyLnkgLT0gdi55XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmo4DmtYvmtojpmaTooYwgKi9cclxuICAgIGNoZWNrTGluZXMgKCkge1xyXG4gICAgICAgIC8vIOS7juS4i+W+gOS4iu+8jOWGmeS4gOS4qiB3aGlsZSDmo4DmtYvmiYDmnInmu6HnmoTooYxcclxuICAgICAgICBsZXQgcm93OiBudW1iZXIgPSBjb25maWcucm93IC0gMVxyXG4gICAgICAgIC8vIOaciea2iOmZpFxyXG4gICAgICAgIGxldCBpc0VsaW1pbmF0ZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgICAgIHdoaWxlIChyb3cgIT09IDApIHtcclxuICAgICAgICAgICAgbGV0IGlzRnVsbDogYm9vbGVhbiA9IHRydWVcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb25maWcuY29sOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGFBcnJheVtyb3ddW2pdID09PSBJdGVtQ29sb3IuTlVMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRnVsbCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5aaC5p6c6K+l6KGM5ruh5LqG77yM5raI6Zmk5pys6KGM77yM5omA5pyJ5pWw5o2u5LiL56e777yM5YaN5qOA5rWL5LiA5qyhXHJcbiAgICAgICAgICAgIGlmIChpc0Z1bGwpIHtcclxuICAgICAgICAgICAgICAgIGlzRWxpbWluYXRlZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgPSByb3c7IHAgPiAwOyBwLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBxID0gMDsgcSA8IGNvbmZpZy5jb2w7IHErKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFBcnJheVtwXVtxXSA9IHRoaXMuZGF0YUFycmF5W3AgLSAxXVtxXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvdy0tXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzRWxpbWluYXRlZCkge1xyXG4gICAgICAgICAgICBjYy5maW5kKE5vZGVVcmwuTXVzaWMpLmVtaXQoTXVzaWNFdmVudC5FTElNSU5BVEUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDoh6rliqjkuIvokL3pgLvovpEgKi9cclxuICAgIGF1dG9Eb3duICgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQ3VycmVudERhdGEodGhpcy5jdXJyZW50U2hhcGUpXHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2hhcGUuY2VudGVyLnggKz0gMVxyXG4gICAgICAgIGlmICh0aGlzLmlzQ3VycmVudERhdGFPSyh0aGlzLmN1cnJlbnRTaGFwZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50RGF0YSh0aGlzLmN1cnJlbnRTaGFwZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy53YXJuKCfml6Dms5XkuIvnp7vliqjvvIzkuIvkuIDkuKonKVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTaGFwZS5jZW50ZXIueCAtPSAxXHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudERhdGEodGhpcy5jdXJyZW50U2hhcGUpXHJcbiAgICAgICAgICAgIC8vIOa2iOmZpOmAu+i+kVxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrTGluZXMoKVxyXG4gICAgICAgICAgICAvLyDkuIvkuIDkuKrlvaLnirZcclxuICAgICAgICAgICAgdGhpcy5yYW5kb21PbmVTaGFwZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZSArPSBkdFxyXG4gICAgICAgIGlmICh0aGlzLnRpbWUgPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZSA9IDBcclxuICAgICAgICAgICAgLy8g5LiL6JC96YC76L6RXHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0Rvd24oKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5Yi35paw6KeG5Zu+ICovXHJcbiAgICByZW5kZXIgKCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyQ2xhc3MucmVuZGVyKHRoaXMuZGF0YUFycmF5KVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=