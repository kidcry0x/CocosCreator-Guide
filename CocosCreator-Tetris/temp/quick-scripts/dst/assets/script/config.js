
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