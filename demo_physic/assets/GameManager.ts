// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    arrow: cc.Prefab = null;

    start(): void {
        this.schedule(() => {
            let node = cc.instantiate(this.arrow);
            cc.find("Canvas").addChild(node);
            node.position = cc.v3(-350, 800);
            node.zIndex = cc.macro.MIN_ZINDEX;
        }, 1);
    }
}
