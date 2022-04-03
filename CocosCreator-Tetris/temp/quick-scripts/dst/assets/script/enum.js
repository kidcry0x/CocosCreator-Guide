
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