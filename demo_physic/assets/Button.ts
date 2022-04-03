
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Button extends cc.Component {

    private _cur;

    onLoad(): void {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    }

    onCollisionEnter(other, self): void 
    {
        this._cur = other.node;
    }

    onDestroyArrow(): void {
        if (this._cur) {
            this._cur.destroy();
            //or
            //this._cur.active = false;
            this.removeCur();
            cc.error("BOOM");
        }
    }

    removeCur(): void {
        this._cur = null;
    }
}
