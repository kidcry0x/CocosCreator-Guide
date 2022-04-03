
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