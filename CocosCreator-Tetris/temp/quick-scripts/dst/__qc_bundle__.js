
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_reversed_rotateTo');
require('./assets/script/config');
require('./assets/script/enum');
require('./assets/script/main');
require('./assets/script/music');
require('./assets/script/render');
require('./assets/script/touch');
require('./assets/tool/config-tool');

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
//------QC-SOURCE-SPLIT------

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBaUM7QUFDakMsbUNBQTZCO0FBQzdCLCtCQUFtRTtBQUU3RCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQTtBQVl6QztJQUFrQyx3QkFBWTtJQUE5QztRQUFBLHFFQXVPQztRQXBPRyxpQkFBVyxHQUFXLFNBQVMsQ0FBQTtRQUcvQixnQkFBVSxHQUFZLFNBQVMsQ0FBQTtRQUUvQixXQUFXO1FBQ1gsZUFBUyxHQUFrQixFQUFFLENBQUE7UUFFN0IsV0FBVztRQUNYLGtCQUFZLEdBQXFCO1lBQzdCLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkIsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsZ0JBQVMsQ0FBQyxJQUFJO1NBQ3hCLENBQUE7UUFFRCxXQUFXO1FBQ1gsVUFBSSxHQUFXLENBQUMsQ0FBQTtRQUVoQixhQUFhO1FBQ2IsWUFBTSxHQUFZLEtBQUssQ0FBQTs7SUFpTjNCLENBQUM7SUEvTUcscUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBRUQsb0JBQUssR0FBTDtRQUNJLFdBQVc7UUFDWCxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMvQyxDQUFDO0lBRUQsNEJBQWEsR0FBYjtRQUFBLGlCQWlCQztRQWhCRyw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQVUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsS0FBSSxDQUFDLHVCQUF1QixFQUFFLENBQUE7UUFDbEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1FB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QUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFBO1FBQ2YsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1lBQ2IsT0FBTztZQUNQLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtTQUNsQjtJQUNMLENBQUM7SUFFRCxXQUFXO0lBQ1gscUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBbE9EO1FBREMsUUFBUSxDQUFDLGdCQUFNLENBQUM7NkNBQ2M7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDYTtJQU5kLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0F1T3hCO0lBQUQsV0FBQztDQXZPRCxBQXVPQyxDQXZPaUMsRUFBRSxDQUFDLFNBQVMsR0F1TzdDO2tCQXZPb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiXHJcbmltcG9ydCBSZW5kZXIgZnJvbSBcIi4vcmVuZGVyXCJcclxuaW1wb3J0IHsgVG91Y2hFdmVudCwgSXRlbUNvbG9yLCBOb2RlVXJsLCBNdXNpY0V2ZW50IH0gZnJvbSBcIi4vZW51bVwiXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvclxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDdXJyZW50U2hhcGVEYXRhIHtcclxuICAgIC8qKiDmjIflkJHlvZPliY3lvaLnirbkuK3lv4MgKi9cclxuICAgIGNlbnRlcjogY2MuVmVjMixcclxuICAgIC8qKiDlvZPliY3lvaLnirbnv7vovazkuIvmoIfvvIwwLTPvvIzlj6/ku6Xnv7vovawgNCDnp43lvaLmgIEgKi9cclxuICAgIGluZGV4OiBudW1iZXIsXHJcbiAgICAvKiog5LuA5LmI6aKc6Imy55qE5pa55Z2XICovXHJcbiAgICBjb2xvcjogSXRlbUNvbG9yXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShSZW5kZXIpXHJcbiAgICByZW5kZXJDbGFzczogUmVuZGVyID0gdW5kZWZpbmVkXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzdGFydFBhbmVsOiBjYy5Ob2RlID0gdW5kZWZpbmVkXHJcblxyXG4gICAgLyoqIOS6jOe7tOaVsOe7hCAqL1xyXG4gICAgZGF0YUFycmF5OiBJdGVtQ29sb3JbXVtdID0gW11cclxuXHJcbiAgICAvKiog5b2T5YmN5b2i54q2ICovXHJcbiAgICBjdXJyZW50U2hhcGU6IEN1cnJlbnRTaGFwZURhdGEgPSB7XHJcbiAgICAgICAgY2VudGVyOiBjYy52MigwLCAwKSxcclxuICAgICAgICBpbmRleDogMCxcclxuICAgICAgICBjb2xvcjogSXRlbUNvbG9yLk5VTExcclxuICAgIH1cclxuXHJcbiAgICAvKiog6K6h5pe25Y+Y6YePICovXHJcbiAgICB0aW1lOiBudW1iZXIgPSAwXHJcblxyXG4gICAgLyoqIOa4uOaIj+i/m+ihjOW8gOWFsyAqL1xyXG4gICAgaXNPcGVuOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIC8vIOa4uOaIj+mfs+S5kCBCR01cclxuICAgICAgICBjYy5maW5kKE5vZGVVcmwuTXVzaWMpLmVtaXQoTXVzaWNFdmVudC5CR00pXHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJFdmVudCAoKSB7XHJcbiAgICAgICAgLy8gdG91Y2gg6ISa5pys5Lyg5p2l5LiK5LiL5bem5Y+z5LqL5Lu277yM5LiK77ya5Y+Y5b2i77yM5LiL77ya5LiL5LiA5Liq5qC85a2Q77yM5bem5Y+z77ya5bem5Y+z56e75Yqo5LiA5Liq5qC85a2QXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKFRvdWNoRXZlbnQuVVAsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VDdXJyZW50U2hhcGVJbmRleCgpXHJcbiAgICAgICAgfSwgdGhpcylcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKFRvdWNoRXZlbnQuRE9XTiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUN1cnJlbnRTaGFwZVBvcyhjYy52MigxLCAwKSlcclxuICAgICAgICB9LCB0aGlzKVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUub24oVG91Y2hFdmVudC5MRUZULCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQ3VycmVudFNoYXBlUG9zKGNjLnYyKDAsIC0xKSlcclxuICAgICAgICB9LCB0aGlzKVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUub24oVG91Y2hFdmVudC5SSUdIVCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUN1cnJlbnRTaGFwZVBvcyhjYy52MigwLCAxKSlcclxuICAgICAgICB9LCB0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDngrnlh7vlvIDlp4vmuLjmiI/mjInpkq7lkI7op6blj5EgKi9cclxuICAgIGdhbWVTdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydFBhbmVsLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpXHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKVxyXG4gICAgICAgIHRoaXMucmFuZG9tT25lU2hhcGUoKVxyXG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIGluaXREYXRhICgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5yb3c7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFBcnJheVtpXSA9IFtdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29uZmlnLmNvbDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFBcnJheVtpXVtqXSA9IEl0ZW1Db2xvci5OVUxMXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmaj+acuueUn+aIkCAqL1xyXG4gICAgcmFuZG9tT25lU2hhcGUgKCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNoYXBlLmNlbnRlci5zZXQoY29uZmlnLnN0YXJ0UG9zKVxyXG4gICAgICAgIC8vIOmaj+acuuexu+Wei1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNoYXBlLmNvbG9yID0gTWF0aC5mbG9vcigxICsgNyAqIE1hdGgucmFuZG9tKCkpXHJcbiAgICAgICAgLy8g6ZqP5py65byA5aeL55qE5LiL5qCHXHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2hhcGUuaW5kZXggPSBNYXRoLmZsb29yKDQgKiBNYXRoLnJhbmRvbSgpKVxyXG4gICAgICAgIC8vIOajgOa1i+a4uOaIj+e7k+adn1xyXG4gICAgICAgIGlmICh0aGlzLmlzQ3VycmVudERhdGFPSyh0aGlzLmN1cnJlbnRTaGFwZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50RGF0YSh0aGlzLmN1cnJlbnRTaGFwZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy53YXJuKCfmuLjmiI/nu5PmnZ8nKVxyXG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudERhdGEodGhpcy5jdXJyZW50U2hhcGUpXHJcbiAgICAgICAgICAgIGNjLmZpbmQoTm9kZVVybC5NdXNpYykuZW1pdChNdXNpY0V2ZW50LkdBTUVfT1ZFUilcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g5pi+56S65ri45oiP5byA5aeL6I+c5Y2VXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UGFuZWwuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9LCAyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5qC55o2u5b2T5YmN5Lit5b+D54K55ZKM5b2i54q257G75Z6L5riF6Zmk5pWw5o2uICovXHJcbiAgICBjbGVhckN1cnJlbnREYXRhIChjdXJyZW50U2hhcGU6IEN1cnJlbnRTaGFwZURhdGEpIHtcclxuICAgICAgICBjb25zdCB7IGNlbnRlciwgY29sb3IsIGluZGV4IH0gPSBjdXJyZW50U2hhcGVcclxuICAgICAgICBjb25zdCBzaGFwZSA9IGBzaGFwZSR7Y29sb3J9YFxyXG4gICAgICAgIGNvbnN0IHNoYXBlRGF0YTogY2MuVmVjMltdW10gPSBjb25maWdbc2hhcGVdXHJcbiAgICAgICAgc2hhcGVEYXRhW2luZGV4XS5mb3JFYWNoKGVsZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGNlbnRlci54ICsgZWxlLnhcclxuICAgICAgICAgICAgY29uc3QgY29sID0gY2VudGVyLnkgKyBlbGUueVxyXG4gICAgICAgICAgICB0aGlzLmRhdGFBcnJheVtyb3ddW2NvbF0gPSBJdGVtQ29sb3IuTlVMTFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOagueaNruW9k+WJjeS4reW/g+eCueWSjOW9oueKtuexu+Wei+WKoOWFpeaVsOaNriAqL1xyXG4gICAgc2V0Q3VycmVudERhdGEgKGN1cnJlbnRTaGFwZTogQ3VycmVudFNoYXBlRGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHsgY2VudGVyLCBjb2xvciwgaW5kZXggfSA9IGN1cnJlbnRTaGFwZVxyXG4gICAgICAgIGNvbnN0IHNoYXBlID0gYHNoYXBlJHtjb2xvcn1gXHJcbiAgICAgICAgY29uc3Qgc2hhcGVEYXRhOiBjYy5WZWMyW11bXSA9IGNvbmZpZ1tzaGFwZV1cclxuICAgICAgICBzaGFwZURhdGFbaW5kZXhdLmZvckVhY2goZWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gY2VudGVyLnggKyBlbGUueFxyXG4gICAgICAgICAgICBjb25zdCBjb2wgPSBjZW50ZXIueSArIGVsZS55XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUFycmF5W3Jvd11bY29sXSA9IGNvbG9yXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDliLfmlrDop4blm75cclxuICAgICAgICB0aGlzLnJlbmRlcigpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWIpOaWreS8oOWFpeS4reW/g+eCueWSjOW9oueKtuexu+Wei+aYr+WQpuWQiOeQhiAqL1xyXG4gICAgaXNDdXJyZW50RGF0YU9LIChjdXJyZW50U2hhcGU6IEN1cnJlbnRTaGFwZURhdGEpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB7IGNlbnRlciwgY29sb3IsIGluZGV4IH0gPSBjdXJyZW50U2hhcGVcclxuICAgICAgICBjb25zdCBzaGFwZSA9IGBzaGFwZSR7Y29sb3J9YFxyXG4gICAgICAgIGNvbnN0IHNoYXBlRGF0YTogY2MuVmVjMltdW10gPSBjb25maWdbc2hhcGVdXHJcbiAgICAgICAgY29uc3Qgc2hhcGVJbmRleERhdGU6IGNjLlZlYzJbXSA9IHNoYXBlRGF0YVtpbmRleF1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoYXBlSW5kZXhEYXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGNlbnRlci54ICsgc2hhcGVJbmRleERhdGVbaV0ueFxyXG4gICAgICAgICAgICBpZiAocm93IDwgMCB8fCByb3cgPj0gY29uZmlnLnJvdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgY29sID0gY2VudGVyLnkgKyBzaGFwZUluZGV4RGF0ZVtpXS55XHJcbiAgICAgICAgICAgIGlmIChjb2wgPCAwIHx8IGNvbCA+PSBjb25maWcuY29sKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhQXJyYXlbcm93XVtjb2xdICE9PSBJdGVtQ29sb3IuTlVMTCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuXHJcbiAgICAvKiog5pON5L2c5Y+Y5b2i6YC76L6RICovXHJcbiAgICBjaGFuZ2VDdXJyZW50U2hhcGVJbmRleCAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckN1cnJlbnREYXRhKHRoaXMuY3VycmVudFNoYXBlKVxyXG4gICAgICAgIHRoaXMuY3VycmVudFNoYXBlLmluZGV4ICs9IHRoaXMuY3VycmVudFNoYXBlLmluZGV4ID09PSAzID8gLTMgOiAxXHJcbiAgICAgICAgaWYgKHRoaXMuaXNDdXJyZW50RGF0YU9LKHRoaXMuY3VycmVudFNoYXBlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnREYXRhKHRoaXMuY3VycmVudFNoYXBlKVxyXG4gICAgICAgICAgICBjYy5maW5kKE5vZGVVcmwuTXVzaWMpLmVtaXQoTXVzaWNFdmVudC5BQ1RJT04pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2Mud2Fybign5pON5L2c5LiN5ZCI55CGJylcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2hhcGUuaW5kZXggKz0gdGhpcy5jdXJyZW50U2hhcGUuaW5kZXggPT09IDAgPyAzIDogLTFcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaTjeS9nOmAu+i+kSAqL1xyXG4gICAgY2hhbmdlQ3VycmVudFNoYXBlUG9zICh2OiBjYy5WZWMyKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckN1cnJlbnREYXRhKHRoaXMuY3VycmVudFNoYXBlKVxyXG4gICAgICAgIHRoaXMuY3VycmVudFNoYXBlLmNlbnRlci54ICs9IHYueFxyXG4gICAgICAgIHRoaXMuY3VycmVudFNoYXBlLmNlbnRlci55ICs9IHYueVxyXG4gICAgICAgIGlmICh0aGlzLmlzQ3VycmVudERhdGFPSyh0aGlzLmN1cnJlbnRTaGFwZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50RGF0YSh0aGlzLmN1cnJlbnRTaGFwZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy53YXJuKCfmk43kvZzkuI3lkIjnkIYnKVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTaGFwZS5jZW50ZXIueCAtPSB2LnhcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2hhcGUuY2VudGVyLnkgLT0gdi55XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmo4DmtYvmtojpmaTooYwgKi9cclxuICAgIGNoZWNrTGluZXMgKCkge1xyXG4gICAgICAgIC8vIOS7juS4i+W+gOS4iu+8jOWGmeS4gOS4qiB3aGlsZSDmo4DmtYvmiYDmnInmu6HnmoTooYxcclxuICAgICAgICBsZXQgcm93OiBudW1iZXIgPSBjb25maWcucm93IC0gMVxyXG4gICAgICAgIC8vIOaciea2iOmZpFxyXG4gICAgICAgIGxldCBpc0VsaW1pbmF0ZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgICAgIHdoaWxlIChyb3cgIT09IDApIHtcclxuICAgICAgICAgICAgbGV0IGlzRnVsbDogYm9vbGVhbiA9IHRydWVcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb25maWcuY29sOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGFBcnJheVtyb3ddW2pdID09PSBJdGVtQ29sb3IuTlVMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRnVsbCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5aaC5p6c6K+l6KGM5ruh5LqG77yM5raI6Zmk5pys6KGM77yM5omA5pyJ5pWw5o2u5LiL56e777yM5YaN5qOA5rWL5LiA5qyhXHJcbiAgICAgICAgICAgIGlmIChpc0Z1bGwpIHtcclxuICAgICAgICAgICAgICAgIGlzRWxpbWluYXRlZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgPSByb3c7IHAgPiAwOyBwLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBxID0gMDsgcSA8IGNvbmZpZy5jb2w7IHErKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFBcnJheVtwXVtxXSA9IHRoaXMuZGF0YUFycmF5W3AgLSAxXVtxXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvdy0tXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzRWxpbWluYXRlZCkge1xyXG4gICAgICAgICAgICBjYy5maW5kKE5vZGVVcmwuTXVzaWMpLmVtaXQoTXVzaWNFdmVudC5FTElNSU5BVEUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDoh6rliqjkuIvokL3pgLvovpEgKi9cclxuICAgIGF1dG9Eb3duICgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQ3VycmVudERhdGEodGhpcy5jdXJyZW50U2hhcGUpXHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2hhcGUuY2VudGVyLnggKz0gMVxyXG4gICAgICAgIGlmICh0aGlzLmlzQ3VycmVudERhdGFPSyh0aGlzLmN1cnJlbnRTaGFwZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50RGF0YSh0aGlzLmN1cnJlbnRTaGFwZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy53YXJuKCfml6Dms5XkuIvnp7vliqjvvIzkuIvkuIDkuKonKVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTaGFwZS5jZW50ZXIueCAtPSAxXHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudERhdGEodGhpcy5jdXJyZW50U2hhcGUpXHJcbiAgICAgICAgICAgIC8vIOa2iOmZpOmAu+i+kVxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrTGluZXMoKVxyXG4gICAgICAgICAgICAvLyDkuIvkuIDkuKrlvaLnirZcclxuICAgICAgICAgICAgdGhpcy5yYW5kb21PbmVTaGFwZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZSArPSBkdFxyXG4gICAgICAgIGlmICh0aGlzLnRpbWUgPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZSA9IDBcclxuICAgICAgICAgICAgLy8g5LiL6JC96YC76L6RXHJcbiAgICAgICAgICAgIHRoaXMuYXV0b0Rvd24oKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5Yi35paw6KeG5Zu+ICovXHJcbiAgICByZW5kZXIgKCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyQ2xhc3MucmVuZGVyKHRoaXMuZGF0YUFycmF5KVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_reversed_rotateTo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd7a19SVByhPjpzG+kGDZ8/Z', 'use_reversed_rotateTo');
// migration/use_reversed_rotateTo.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only used for projects compatible with v2.1.0/v2.1.1/v2.2.1/v2.2.2 versions.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Action in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0/v2.1.1/v2.2.1/v2.2.2 版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Action，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
cc.RotateTo._reverse = true;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfcmV2ZXJzZWRfcm90YXRlVG8uanMiXSwibmFtZXMiOlsiY2MiLCJSb3RhdGVUbyIsIl9yZXZlcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxRQUFILENBQVlDLFFBQVosR0FBdUIsSUFBdkIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFRoaXMgc2NyaXB0IGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IENvY29zIENyZWF0b3IgYW5kIGlzIG9ubHkgdXNlZCBmb3IgcHJvamVjdHMgY29tcGF0aWJsZSB3aXRoIHYyLjEuMC92Mi4xLjEvdjIuMi4xL3YyLjIuMiB2ZXJzaW9ucy5cclxuICogWW91IGRvIG5vdCBuZWVkIHRvIG1hbnVhbGx5IGFkZCB0aGlzIHNjcmlwdCBpbiBhbnkgb3RoZXIgcHJvamVjdC5cclxuICogSWYgeW91IGRvbid0IHVzZSBjYy5BY3Rpb24gaW4geW91ciBwcm9qZWN0LCB5b3UgY2FuIGRlbGV0ZSB0aGlzIHNjcmlwdCBkaXJlY3RseS5cclxuICogSWYgeW91ciBwcm9qZWN0IGlzIGhvc3RlZCBpbiBWQ1Mgc3VjaCBhcyBnaXQsIHN1Ym1pdCB0aGlzIHNjcmlwdCB0b2dldGhlci5cclxuICpcclxuICog5q2k6ISa5pys55SxIENvY29zIENyZWF0b3Ig6Ieq5Yqo55Sf5oiQ77yM5LuF55So5LqO5YW85a65IHYyLjEuMC92Mi4xLjEvdjIuMi4xL3YyLjIuMiDniYjmnKznmoTlt6XnqIvvvIxcclxuICog5L2g5peg6ZyA5Zyo5Lu75L2V5YW25a6D6aG555uu5Lit5omL5Yqo5re75Yqg5q2k6ISa5pys44CCXHJcbiAqIOWmguaenOS9oOeahOmhueebruS4reayoeeUqOWIsCBBY3Rpb27vvIzlj6/nm7TmjqXliKDpmaTor6XohJrmnKzjgIJcclxuICog5aaC5p6c5L2g55qE6aG555uu5pyJ5omY566h5LqOIGdpdCDnrYnniYjmnKzlupPvvIzor7flsIbmraTohJrmnKzkuIDlubbkuIrkvKDjgIJcclxuICovXHJcblxyXG5jYy5Sb3RhdGVUby5fcmV2ZXJzZSA9IHRydWU7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/enum.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3f519Rww+BNCqgfId5+X30+', 'enum');
// script/enum.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeUrl = exports.MusicEvent = exports.TouchEvent = exports.ItemColor = void 0;
/** 不渲染与7个颜色 */
var ItemColor;
(function (ItemColor) {
    ItemColor[ItemColor["NULL"] = 0] = "NULL";
    ItemColor[ItemColor["Color1"] = 1] = "Color1";
    ItemColor[ItemColor["Color2"] = 2] = "Color2";
    ItemColor[ItemColor["Color3"] = 3] = "Color3";
    ItemColor[ItemColor["Color4"] = 4] = "Color4";
    ItemColor[ItemColor["Color5"] = 5] = "Color5";
    ItemColor[ItemColor["Color6"] = 6] = "Color6";
    ItemColor[ItemColor["Color7"] = 7] = "Color7";
})(ItemColor = exports.ItemColor || (exports.ItemColor = {}));
/** 触摸事件-上下左右滑动 */
var TouchEvent;
(function (TouchEvent) {
    TouchEvent["UP"] = "touch-up";
    TouchEvent["DOWN"] = "touch-down";
    TouchEvent["LEFT"] = "touch-left";
    TouchEvent["RIGHT"] = "touch-right";
})(TouchEvent = exports.TouchEvent || (exports.TouchEvent = {}));
/** 音效事件 */
var MusicEvent;
(function (MusicEvent) {
    MusicEvent["BGM"] = "bgm";
    MusicEvent["ACTION"] = "action";
    MusicEvent["GAME_OVER"] = "over";
    /** 方块消除 */
    MusicEvent["ELIMINATE"] = "eliminate";
})(MusicEvent = exports.MusicEvent || (exports.MusicEvent = {}));
/** 节点路径 */
var NodeUrl;
(function (NodeUrl) {
    NodeUrl["Canvas"] = "Canvas";
    NodeUrl["Music"] = "Music";
})(NodeUrl = exports.NodeUrl || (exports.NodeUrl = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxlbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZUFBZTtBQUNmLElBQVksU0FTWDtBQVRELFdBQVksU0FBUztJQUNqQix5Q0FBUSxDQUFBO0lBQ1IsNkNBQU0sQ0FBQTtJQUNOLDZDQUFNLENBQUE7SUFDTiw2Q0FBTSxDQUFBO0lBQ04sNkNBQU0sQ0FBQTtJQUNOLDZDQUFNLENBQUE7SUFDTiw2Q0FBTSxDQUFBO0lBQ04sNkNBQU0sQ0FBQTtBQUNWLENBQUMsRUFUVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVNwQjtBQUVELGtCQUFrQjtBQUNsQixJQUFZLFVBS1g7QUFMRCxXQUFZLFVBQVU7SUFDbEIsNkJBQWUsQ0FBQTtJQUNmLGlDQUFtQixDQUFBO0lBQ25CLGlDQUFtQixDQUFBO0lBQ25CLG1DQUFxQixDQUFBO0FBQ3pCLENBQUMsRUFMVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUtyQjtBQUVELFdBQVc7QUFDWCxJQUFZLFVBTVg7QUFORCxXQUFZLFVBQVU7SUFDbEIseUJBQVcsQ0FBQTtJQUNYLCtCQUFpQixDQUFBO0lBQ2pCLGdDQUFrQixDQUFBO0lBQ2xCLFdBQVc7SUFDWCxxQ0FBdUIsQ0FBQTtBQUMzQixDQUFDLEVBTlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFNckI7QUFFRCxXQUFXO0FBQ1gsSUFBWSxPQUdYO0FBSEQsV0FBWSxPQUFPO0lBQ2YsNEJBQWlCLENBQUE7SUFDakIsMEJBQWUsQ0FBQTtBQUNuQixDQUFDLEVBSFcsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBR2xCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIOS4jea4suafk+S4jjfkuKrpopzoibIgKi9cclxuZXhwb3J0IGVudW0gSXRlbUNvbG9yIHtcclxuICAgIE5VTEwgPSAwLFxyXG4gICAgQ29sb3IxLFxyXG4gICAgQ29sb3IyLFxyXG4gICAgQ29sb3IzLFxyXG4gICAgQ29sb3I0LFxyXG4gICAgQ29sb3I1LFxyXG4gICAgQ29sb3I2LFxyXG4gICAgQ29sb3I3LFxyXG59XHJcblxyXG4vKiog6Kem5pG45LqL5Lu2LeS4iuS4i+W3puWPs+a7keWKqCAqL1xyXG5leHBvcnQgZW51bSBUb3VjaEV2ZW50IHtcclxuICAgIFVQID0gJ3RvdWNoLXVwJyxcclxuICAgIERPV04gPSAndG91Y2gtZG93bicsXHJcbiAgICBMRUZUID0gJ3RvdWNoLWxlZnQnLFxyXG4gICAgUklHSFQgPSAndG91Y2gtcmlnaHQnXHJcbn1cclxuXHJcbi8qKiDpn7PmlYjkuovku7YgKi9cclxuZXhwb3J0IGVudW0gTXVzaWNFdmVudCB7XHJcbiAgICBCR00gPSAnYmdtJyxcclxuICAgIEFDVElPTiA9ICdhY3Rpb24nLFxyXG4gICAgR0FNRV9PVkVSID0gJ292ZXInLFxyXG4gICAgLyoqIOaWueWdl+a2iOmZpCAqL1xyXG4gICAgRUxJTUlOQVRFID0gJ2VsaW1pbmF0ZSdcclxufVxyXG5cclxuLyoqIOiKgueCuei3r+W+hCAqL1xyXG5leHBvcnQgZW51bSBOb2RlVXJsIHtcclxuICAgIENhbnZhcyA9ICdDYW52YXMnLFxyXG4gICAgTXVzaWMgPSAnTXVzaWMnXHJcbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/music.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3191eohAoRNvoRxvyeY4GTM', 'music');
// script/music.ts

Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("./enum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Music = /** @class */ (function (_super) {
    __extends(Music, _super);
    function Music() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgm = undefined;
        _this.effects = [];
        return _this;
    }
    Music.prototype.onLoad = function () {
        this.registerEvent();
    };
    Music.prototype.registerEvent = function () {
        var _this = this;
        // 对应所有音频的类型
        this.node.on(enum_1.MusicEvent.BGM, function () { return cc.audioEngine.play(_this.bgm, true, 0.3); }, this);
        this.node.on(enum_1.MusicEvent.ACTION, function () { return cc.audioEngine.playEffect(_this.effects[0], false); }, this);
        this.node.on(enum_1.MusicEvent.GAME_OVER, function () { return cc.audioEngine.playEffect(_this.effects[1], false); }, this);
        this.node.on(enum_1.MusicEvent.ELIMINATE, function () { return cc.audioEngine.playEffect(_this.effects[2], false); }, this);
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], Music.prototype, "bgm", void 0);
    __decorate([
        property({ type: [cc.AudioClip] })
    ], Music.prototype, "effects", void 0);
    Music = __decorate([
        ccclass
    ], Music);
    return Music;
}(cc.Component));
exports.default = Music;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxtdXNpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQW1DO0FBRTdCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFBO0FBR3pDO0lBQW1DLHlCQUFZO0lBQS9DO1FBQUEscUVBb0JDO1FBakJHLFNBQUcsR0FBaUIsU0FBUyxDQUFBO1FBRzdCLGFBQU8sR0FBbUIsRUFBRSxDQUFBOztJQWNoQyxDQUFDO0lBWkcsc0JBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBRUQsNkJBQWEsR0FBYjtRQUFBLGlCQU1DO1FBTEcsWUFBWTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGlCQUFVLENBQUMsR0FBRyxFQUFFLGNBQU0sT0FBQSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsRUFBeEMsQ0FBd0MsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNsRixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBVSxDQUFDLE1BQU0sRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBakQsQ0FBaUQsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUM5RixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBVSxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBakQsQ0FBaUQsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNqRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBVSxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBakQsQ0FBaUQsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNyRyxDQUFDO0lBZkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO3NDQUNMO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7MENBQ1I7SUFOWCxLQUFLO1FBRHpCLE9BQU87T0FDYSxLQUFLLENBb0J6QjtJQUFELFlBQUM7Q0FwQkQsQUFvQkMsQ0FwQmtDLEVBQUUsQ0FBQyxTQUFTLEdBb0I5QztrQkFwQm9CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNdXNpY0V2ZW50IH0gZnJvbSBcIi4vZW51bVwiXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvclxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVzaWMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGUgOiBjYy5BdWRpb0NsaXAgfSlcclxuICAgIGJnbTogY2MuQXVkaW9DbGlwID0gdW5kZWZpbmVkXHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZSA6IFtjYy5BdWRpb0NsaXBdIH0pXHJcbiAgICBlZmZlY3RzOiBjYy5BdWRpb0NsaXBbXSA9IFtdXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyRXZlbnQgKCkge1xyXG4gICAgICAgIC8vIOWvueW6lOaJgOaciemfs+mikeeahOexu+Wei1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihNdXNpY0V2ZW50LkJHTSwgKCkgPT4gY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmJnbSwgdHJ1ZSwgMC4zKSwgdGhpcylcclxuICAgICAgICB0aGlzLm5vZGUub24oTXVzaWNFdmVudC5BQ1RJT04sICgpID0+IGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5lZmZlY3RzWzBdLCBmYWxzZSksIHRoaXMpXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKE11c2ljRXZlbnQuR0FNRV9PVkVSLCAoKSA9PiBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuZWZmZWN0c1sxXSwgZmFsc2UpLCB0aGlzKVxyXG4gICAgICAgIHRoaXMubm9kZS5vbihNdXNpY0V2ZW50LkVMSU1JTkFURSwgKCkgPT4gY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmVmZmVjdHNbMl0sIGZhbHNlKSwgdGhpcylcclxuICAgIH1cclxuXHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/config.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd436cfLvcBFOZas0mcYONrI', 'config');
// script/config.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
/** 游戏配置 */
exports.config = {
    /** 方格宽 */
    blockWidth: 90,
    /** 方格高 */
    blockHeight: 80,
    /** 小动物宽 */
    itemWidth: 78,
    /** 小动物高 */
    itemHeight: 67,
    /** 行数 */
    row: 12,
    /** 列数 */
    col: 7,
    /** 每次新生成形状时的中心位置 */
    startPos: cc.v2(1, 3),
    // 形状数据,以（1，1）为中心参考
    /** 长条形 */
    shape1: [
        [cc.v2(0, -1), cc.v2(0, 0), cc.v2(0, 1), cc.v2(0, 2)],
        [cc.v2(-1, 0), cc.v2(0, 0), cc.v2(1, 0), cc.v2(2, 0)],
        [cc.v2(0, -1), cc.v2(0, 0), cc.v2(0, 1), cc.v2(0, 2)],
        [cc.v2(-1, 0), cc.v2(0, 0), cc.v2(1, 0), cc.v2(2, 0)]
    ],
    /** 方形 */
    shape2: [
        [cc.v2(-1, -1), cc.v2(-1, 0), cc.v2(0, -1), cc.v2(0, 0)],
        [cc.v2(-1, -1), cc.v2(-1, 0), cc.v2(0, -1), cc.v2(0, 0)],
        [cc.v2(-1, -1), cc.v2(-1, 0), cc.v2(0, -1), cc.v2(0, 0)],
        [cc.v2(-1, -1), cc.v2(-1, 0), cc.v2(0, -1), cc.v2(0, 0)]
    ],
    /** T形 */
    shape3: [
        [cc.v2(0, -1), cc.v2(-1, 0), cc.v2(0, 0), cc.v2(0, 1)],
        [cc.v2(1, 0), cc.v2(-1, 0), cc.v2(0, 0), cc.v2(0, 1)],
        [cc.v2(0, -1), cc.v2(1, 0), cc.v2(0, 0), cc.v2(0, 1)],
        [cc.v2(0, -1), cc.v2(-1, 0), cc.v2(0, 0), cc.v2(1, 0)]
    ],
    /** L形 */
    shape4: [
        [cc.v2(-1, 0), cc.v2(0, 0), cc.v2(1, 0), cc.v2(1, 1)],
        [cc.v2(1, -1), cc.v2(0, -1), cc.v2(0, 0), cc.v2(0, 1)],
        [cc.v2(-1, -1), cc.v2(-1, 0), cc.v2(0, 0), cc.v2(1, 0)],
        [cc.v2(-1, 1), cc.v2(0, -1), cc.v2(0, 0), cc.v2(0, 1)]
    ],
    /** 翻转L */
    shape5: [
        [cc.v2(-1, 0), cc.v2(0, 0), cc.v2(1, 0), cc.v2(1, -1)],
        [cc.v2(-1, -1), cc.v2(0, -1), cc.v2(0, 0), cc.v2(0, 1)],
        [cc.v2(-1, 0), cc.v2(-1, 1), cc.v2(0, 0), cc.v2(1, 0)],
        [cc.v2(0, -1), cc.v2(0, 0), cc.v2(0, 1), cc.v2(1, 1)]
    ],
    /** S形 */
    shape6: [
        [cc.v2(-1, 0), cc.v2(-1, 1), cc.v2(0, -1), cc.v2(0, 0)],
        [cc.v2(-1, -1), cc.v2(0, -1), cc.v2(0, 0), cc.v2(1, 0)],
        [cc.v2(-1, 0), cc.v2(-1, 1), cc.v2(0, -1), cc.v2(0, 0)],
        [cc.v2(-1, -1), cc.v2(0, -1), cc.v2(0, 0), cc.v2(1, 0)]
    ],
    /** 翻转S */
    shape7: [
        [cc.v2(-1, -1), cc.v2(-1, 0), cc.v2(0, 0), cc.v2(0, 1)],
        [cc.v2(1, -1), cc.v2(-1, 0), cc.v2(0, 0), cc.v2(0, -1)],
        [cc.v2(-1, -1), cc.v2(-1, 0), cc.v2(0, 0), cc.v2(0, 1)],
        [cc.v2(1, -1), cc.v2(-1, 0), cc.v2(0, 0), cc.v2(0, -1)]
    ]
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxXQUFXO0FBQ0UsUUFBQSxNQUFNLEdBQUc7SUFDbEIsVUFBVTtJQUNWLFVBQVUsRUFBRSxFQUFFO0lBQ2QsVUFBVTtJQUNWLFdBQVcsRUFBRSxFQUFFO0lBQ2YsV0FBVztJQUNYLFNBQVMsRUFBRSxFQUFFO0lBQ2IsV0FBVztJQUNYLFVBQVUsRUFBRSxFQUFFO0lBQ2QsU0FBUztJQUNULEdBQUcsRUFBRSxFQUFFO0lBQ1AsU0FBUztJQUNULEdBQUcsRUFBRSxDQUFDO0lBQ04sb0JBQW9CO0lBQ3BCLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckIsbUJBQW1CO0lBQ25CLFVBQVU7SUFDVixNQUFNLEVBQUU7UUFDSixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDeEQ7SUFDRCxTQUFTO0lBQ1QsTUFBTSxFQUFFO1FBQ0osQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzNEO0lBQ0QsU0FBUztJQUNULE1BQU0sRUFBRTtRQUNKLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDekQ7SUFDRCxTQUFTO0lBQ1QsTUFBTSxFQUFFO1FBQ0osQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDekQ7SUFDRCxVQUFVO0lBQ1YsTUFBTSxFQUFFO1FBQ0osQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDeEQ7SUFDRCxTQUFTO0lBQ1QsTUFBTSxFQUFFO1FBQ0osQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUMxRDtJQUNELFVBQVU7SUFDVixNQUFNLEVBQUU7UUFDSixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFEO0NBQ0osQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiDmuLjmiI/phY3nva4gKi9cclxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcclxuICAgIC8qKiDmlrnmoLzlrr0gKi9cclxuICAgIGJsb2NrV2lkdGg6IDkwLFxyXG4gICAgLyoqIOaWueagvOmrmCAqL1xyXG4gICAgYmxvY2tIZWlnaHQ6IDgwLFxyXG4gICAgLyoqIOWwj+WKqOeJqeWuvSAqL1xyXG4gICAgaXRlbVdpZHRoOiA3OCxcclxuICAgIC8qKiDlsI/liqjnianpq5ggKi9cclxuICAgIGl0ZW1IZWlnaHQ6IDY3LFxyXG4gICAgLyoqIOihjOaVsCAqL1xyXG4gICAgcm93OiAxMixcclxuICAgIC8qKiDliJfmlbAgKi9cclxuICAgIGNvbDogNyxcclxuICAgIC8qKiDmr4/mrKHmlrDnlJ/miJDlvaLnirbml7bnmoTkuK3lv4PkvY3nva4gKi9cclxuICAgIHN0YXJ0UG9zOiBjYy52MigxLCAzKSxcclxuICAgIC8vIOW9oueKtuaVsOaNrizku6XvvIgx77yMMe+8ieS4uuS4reW/g+WPguiAg1xyXG4gICAgLyoqIOmVv+adoeW9oiAqL1xyXG4gICAgc2hhcGUxOiBbXHJcbiAgICAgICAgW2NjLnYyKDAsIC0xKSwgY2MudjIoMCwgMCksIGNjLnYyKDAsIDEpLCBjYy52MigwLCAyKV0sXHJcbiAgICAgICAgW2NjLnYyKC0xLCAwKSwgY2MudjIoMCwgMCksIGNjLnYyKDEsIDApLCBjYy52MigyLCAwKV0sXHJcbiAgICAgICAgW2NjLnYyKDAsIC0xKSwgY2MudjIoMCwgMCksIGNjLnYyKDAsIDEpLCBjYy52MigwLCAyKV0sXHJcbiAgICAgICAgW2NjLnYyKC0xLCAwKSwgY2MudjIoMCwgMCksIGNjLnYyKDEsIDApLCBjYy52MigyLCAwKV1cclxuICAgIF0sXHJcbiAgICAvKiog5pa55b2iICovXHJcbiAgICBzaGFwZTI6IFtcclxuICAgICAgICBbY2MudjIoLTEsIC0xKSwgY2MudjIoLTEsIDApLCBjYy52MigwLCAtMSksIGNjLnYyKDAsIDApXSxcclxuICAgICAgICBbY2MudjIoLTEsIC0xKSwgY2MudjIoLTEsIDApLCBjYy52MigwLCAtMSksIGNjLnYyKDAsIDApXSxcclxuICAgICAgICBbY2MudjIoLTEsIC0xKSwgY2MudjIoLTEsIDApLCBjYy52MigwLCAtMSksIGNjLnYyKDAsIDApXSxcclxuICAgICAgICBbY2MudjIoLTEsIC0xKSwgY2MudjIoLTEsIDApLCBjYy52MigwLCAtMSksIGNjLnYyKDAsIDApXVxyXG4gICAgXSxcclxuICAgIC8qKiBU5b2iICovXHJcbiAgICBzaGFwZTM6IFtcclxuICAgICAgICBbY2MudjIoMCwgLTEpLCBjYy52MigtMSwgMCksIGNjLnYyKDAsIDApLCBjYy52MigwLCAxKV0sXHJcbiAgICAgICAgW2NjLnYyKDEsIDApLCBjYy52MigtMSwgMCksIGNjLnYyKDAsIDApLCBjYy52MigwLCAxKV0sXHJcbiAgICAgICAgW2NjLnYyKDAsIC0xKSwgY2MudjIoMSwgMCksIGNjLnYyKDAsIDApLCBjYy52MigwLCAxKV0sXHJcbiAgICAgICAgW2NjLnYyKDAsIC0xKSwgY2MudjIoLTEsIDApLCBjYy52MigwLCAwKSwgY2MudjIoMSwgMCldXHJcbiAgICBdLFxyXG4gICAgLyoqIEzlvaIgKi9cclxuICAgIHNoYXBlNDogW1xyXG4gICAgICAgIFtjYy52MigtMSwgMCksIGNjLnYyKDAsIDApLCBjYy52MigxLCAwKSwgY2MudjIoMSwgMSldLFxyXG4gICAgICAgIFtjYy52MigxLCAtMSksIGNjLnYyKDAsIC0xKSwgY2MudjIoMCwgMCksIGNjLnYyKDAsIDEpXSxcclxuICAgICAgICBbY2MudjIoLTEsIC0xKSwgY2MudjIoLTEsIDApLCBjYy52MigwLCAwKSwgY2MudjIoMSwgMCldLFxyXG4gICAgICAgIFtjYy52MigtMSwgMSksIGNjLnYyKDAsIC0xKSwgY2MudjIoMCwgMCksIGNjLnYyKDAsIDEpXVxyXG4gICAgXSxcclxuICAgIC8qKiDnv7vovaxMICovXHJcbiAgICBzaGFwZTU6IFtcclxuICAgICAgICBbY2MudjIoLTEsIDApLCBjYy52MigwLCAwKSwgY2MudjIoMSwgMCksIGNjLnYyKDEsIC0xKV0sXHJcbiAgICAgICAgW2NjLnYyKC0xLCAtMSksIGNjLnYyKDAsIC0xKSwgY2MudjIoMCwgMCksIGNjLnYyKDAsIDEpXSxcclxuICAgICAgICBbY2MudjIoLTEsIDApLCBjYy52MigtMSwgMSksIGNjLnYyKDAsIDApLCBjYy52MigxLCAwKV0sXHJcbiAgICAgICAgW2NjLnYyKDAsIC0xKSwgY2MudjIoMCwgMCksIGNjLnYyKDAsIDEpLCBjYy52MigxLCAxKV1cclxuICAgIF0sXHJcbiAgICAvKiogU+W9oiAqL1xyXG4gICAgc2hhcGU2OiBbXHJcbiAgICAgICAgW2NjLnYyKC0xLCAwKSwgY2MudjIoLTEsIDEpLCBjYy52MigwLCAtMSksIGNjLnYyKDAsIDApXSxcclxuICAgICAgICBbY2MudjIoLTEsIC0xKSwgY2MudjIoMCwgLTEpLCBjYy52MigwLCAwKSwgY2MudjIoMSwgMCldLFxyXG4gICAgICAgIFtjYy52MigtMSwgMCksIGNjLnYyKC0xLCAxKSwgY2MudjIoMCwgLTEpLCBjYy52MigwLCAwKV0sXHJcbiAgICAgICAgW2NjLnYyKC0xLCAtMSksIGNjLnYyKDAsIC0xKSwgY2MudjIoMCwgMCksIGNjLnYyKDEsIDApXVxyXG4gICAgXSxcclxuICAgIC8qKiDnv7vovaxTICovXHJcbiAgICBzaGFwZTc6IFtcclxuICAgICAgICBbY2MudjIoLTEsIC0xKSwgY2MudjIoLTEsIDApLCBjYy52MigwLCAwKSwgY2MudjIoMCwgMSldLFxyXG4gICAgICAgIFtjYy52MigxLCAtMSksIGNjLnYyKC0xLCAwKSwgY2MudjIoMCwgMCksIGNjLnYyKDAsIC0xKV0sXHJcbiAgICAgICAgW2NjLnYyKC0xLCAtMSksIGNjLnYyKC0xLCAwKSwgY2MudjIoMCwgMCksIGNjLnYyKDAsIDEpXSxcclxuICAgICAgICBbY2MudjIoMSwgLTEpLCBjYy52MigtMSwgMCksIGNjLnYyKDAsIDApLCBjYy52MigwLCAtMSldXHJcbiAgICBdXHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------
