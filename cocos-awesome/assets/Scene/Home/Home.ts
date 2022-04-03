import BackHomeBtn from './BackHomeBtn';
const { ccclass, property } = cc._decorator;
const LOAD_SCENE_MIN_SEC: number = 1.2;
enum sceneList {
  'Water_spread' = 'Water_spread',
  'Specular_gloss' = 'Specular_gloss',
  'Dissolve_color' = 'Dissolve_color',
  'Follow_spot' = 'Follow_spot',
  'Metaball' = 'Metaball',
  'Circle_avatar' = 'Circle_avatar',
  'Scratch_ticket' = 'Scratch_ticket',
  'Coin_fly_to_wallet' = 'Coin_fly_to_wallet',
  'Moving_ghost' = 'Moving_ghost',
  'Magnifying_mirror' = 'Magnifying_mirror',
  'Typer' = 'Typer',
  'Bullet_Tracking' = 'Bullet_Tracking',
  'Infinite_bg_scroll' = 'Infinite_bg_scroll',
  'Change_clothes' = 'Change_clothes',
  'Screen_vibrating' = 'Screen_vibrating',
  'Joystick' = 'Joystick',
  'Filter' = 'Filter',
  'Mosaic' = 'Mosaic',
  'Photo_gallery' = 'Photo_gallery'
}

@ccclass
export default class Home extends cc.Component {
  @property(cc.Node)
  loadingNode: cc.Node = null;
  @property(cc.ProgressBar)
  loadingProgress: cc.ProgressBar = null;
  @property(cc.Node)
  scrollContent: cc.Node = null;
  @property(cc.Prefab)
  scrollItemPrefab: cc.Prefab = null;

  onLoad() {
    this.initScrollItem();
  }

  start() {
    this.judgeJump();
  }

  judgeJump() {
    const sceneName = this.getQueryStringByName('sceneName');
    const isSameVisit = window['isSameVisit'];

    if (!sceneName) return;
    if (isSameVisit) return;

    if (sceneList[sceneName]) {
      window['isSameVisit'] = true;
      this.loadScene(sceneName);
    }
  }

  getQueryStringByName(name) {
    let result = window.location.search.match(new RegExp('[?&]' + name + '=([^&]+)', 'i'));
    return result == null || result.length < 1 ? '' : result[1];
  }

  initScrollItem() {
    for (let key in sceneList) {
      let scrollItem = cc.instantiate(this.scrollItemPrefab);

      scrollItem.getChildByName('label').getComponent(cc.Label).string = sceneList[key];
      scrollItem.on(
        cc.Node.EventType.TOUCH_END,
        () => {
          cc.tween(scrollItem)
            .to(0.1, { scale: 1.05 })
            .to(0.1, { scale: 1 })
            .start();
          this.loadScene(key);
        },
        this
      );

      this.scrollContent.addChild(scrollItem);
    }
  }

  beginLoad: boolean = false;
  finishLoadFlag: boolean = false;
  loadTime: number = 0;
  loadSceneName: string = '';
  loadScene(key) {
    if (this.beginLoad) return;
    this.loadingProgress.progress = 0;
    this.loadingNode.active = true;
    this.beginLoad = true;
    this.loadSceneName = key;

    cc.director.preloadScene(
      key,
      (completedCount, totalCount) => {
        // 还是做假进度条吧，缓存之后太快了，一闪而过的体验不好
        // this.loadingProgress.progress = completedCount / totalCount;
      },
      (error, asset) => {
        if (!error) {
          this.finishLoadFlag = true;
        } else {
          this.loadingNode.active = false;
          this.beginLoad = false;
          this.loadTime = 0;
        }
      }
    );
  }

  update(dt) {
    if (!this.beginLoad) return;

    if (this.loadTime >= LOAD_SCENE_MIN_SEC && this.finishLoadFlag) {
      this.loadingProgress.progress = 1;
      BackHomeBtn.instance.toggleActive(true);
      cc.director.loadScene(this.loadSceneName);
    } else {
      this.loadTime += dt;
      this.loadingProgress.progress = Math.min(this.loadTime / LOAD_SCENE_MIN_SEC, this.finishLoadFlag ? 1 : 0.9);
    }
  }
}
