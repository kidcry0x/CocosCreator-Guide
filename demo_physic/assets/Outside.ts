import Button from "./Button";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Outside extends cc.Component {

    @property([Button])
    btn: Button[] = [];

    onCollisionEnter(other, self): void {
        this.btn[0].removeCur();
        cc.error("RA NGOAI")
    }
}
