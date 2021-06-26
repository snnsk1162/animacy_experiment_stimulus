///////重要パラメータ///////////
const displayTarget = true; //ターゲットの表示・非表示
const v = 3; //動点の速さ 2~6
const p = 120; //角度変化量の最大値(度)
////////////////////////////////



//ターゲットクラス
class Target {
  constructor(name, centralAngle, radius) {
    this.name = name; //ターゲットの名前
    this.centralAngle = centralAngle; //ターゲットの位置の中心角
    this.radius = radius; //ターゲットの位置の半径
    this.pointSize = 10; //ターゲット点の大きさ
    this.isPassed = false; //通過したかどうかのフラグ
  }

  //ターゲット点の座標getter
  get position() {
    const targetX = cos(radians(this.centralAngle)) * this.radius;
    const targetY = sin(radians(this.centralAngle)) * this.radius;
    return createVector(targetX, targetY);
  }


  //ターゲット点描画メソッド
  plt() {
    fill(0);
    circle(this.position.x, this.position.y, this.pointSize);
  }

  //次フレームの動点の座標計算メソッド(vは速さ，pは角度変化量の最大値(単位は度))
  calcNextPos(fromX, fromY, v, p) {
    //動点とターゲットの距離
    const d_x = this.position.x - fromX;
    const d_y = this.position.y - fromY;
    
    //ターゲットに近づいたら通過に変更
    if ((abs(d_x) <= 6) & (abs(d_y) <= 6)) {
      this.isPassed = true;
      console.log(str(this.name) + "通過");
    }

    //新しい点の座標算出
    const rad = Math.atan2(d_y, d_x) + random(-1, 1) * radians(p); //atan2はアークタンジェント
    const newX = fromX + v * cos(rad);
    const newY = fromY + v * sin(rad);

    //新しい点の座標を返す
    return createVector(newX, newY);
  }
}

const r = 150; //ターゲットが表示される円周の半径
const Target1 = new Target("Target1", Math.random() * 360, r); //ターゲット①を設定
const Target2 = new Target("Target2", Math.random() * 360, r); //ターゲット②を設定
const stopPoint = new Target("Stop", Math.random() * 360, Math.random() * r); //終着点を設定
const s = 12; //動点の点の大きさ
let pos; //動点の座標を格納する変数

function setup() {
  createCanvas(400, 400);
  frameRate(60);
  pos = createVector(0, 0); //動点のスタート位置
}

function draw() {
  translate(width * 0.5, height * 0.5);
  background(200);//背景色
  noStroke();

  //ターゲット表示の有無
  if (displayTarget) {
    Target1.plt(); //ターゲット①を表示
    Target2.plt(); //ターゲット②を表示
    // stopPoint.plt();//終着点を表示
  }

  fill(255);
  if (Target1.isPassed == false) {
    circle(pos.x, pos.y, s);
    pos = Target1.calcNextPos(pos.x, pos.y, v, p);
  } else if (Target2.isPassed == false) {
    circle(pos.x, pos.y, s);
    pos = Target2.calcNextPos(pos.x, pos.y, v, p);
  } else if (stopPoint.isPassed == false) {
    circle(pos.x, pos.y, s);
    pos = stopPoint.calcNextPos(pos.x, pos.y, v, p);
  } else {
    //終着点で停止
    circle(pos.x, pos.y, s);
  }
}
