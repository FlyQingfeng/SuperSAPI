import { Vec2 } from "./Vec2";
export class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static fromObj(obj) {
        return new Vec3(obj.x, obj.y, obj.z);
    }
    //投影
    mod(v) { return v.muln(this.dot(v) / v.dot(v)); }
    //点积
    dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
    //加
    add(v) { return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z); }
    //减
    sub(v) { return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z); }
    //向量乘
    mul(v) { return new Vec3(this.x * v.x, this.y * v.y, this.z * v.z); }
    //向量除
    div(v) { return new Vec3(this.x / v.x, this.y / v.y, this.z / v.z); }
    //叉乘
    pow(v) { return new Vec3(this.y * this.z - v.y * v.z, this.z * this.x - v.z * v.x, this.x * this.y - v.x * v.y); }
    //夹角
    ang(v) { return Math.acos(this.normal().dot(v.normal())); }
    //数乘
    muln(v) { return new Vec3(this.x * v, this.y * v, this.z * v); }
    //数除
    divn(v) { return new Vec3(this.x / v, this.y / v, this.z / v); }
    //绕轴旋转
    rotate(ax, ang) { let di = this.mod(ax), rx = this.sub(di); return rx.muln(Math.cos(ang)).add(rx.pow(di.normal()).muln(Math.sin(ang))).add(di); }
    //旋转至
    rotate2(v, t) { return this.rotate(this.pow(v), this.ang(v) * t); }
    //长度1
    normal() { return this.divn(this.len()); }
    //长
    len() { return Math.sqrt(this.dot(this)); }
    //转文本
    toString() { return `${this.x} ${this.y} ${this.z}`; }
    //转角向量
    tor() { return new Vec2(Math.atan2(this.z, this.x), Math.atan2(this.y, Math.sqrt(this.x * this.x + this.z + this.z))); }
}
