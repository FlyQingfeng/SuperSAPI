import {vec2} from "../Public/vec2";
export class vec3 {
    x: number; y: number; z: number;

    constructor(x: any, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }
    static fromObj(obj: any) {
        return new vec3(obj.x, obj.y, obj.z)
    }
    //投影
    mod(v: vec3) { return v.muln(this.dot(v) / v.dot(v)) }
    //点积
    dot(v: vec3) { return this.x * v.x + this.y * v.y + this.z * v.z }
    //加
    add(v: vec3) { return new vec3(this.x + v.x, this.y + v.y, this.z + v.z) }
    //减
    sub(v: vec3) { return new vec3(this.x - v.x, this.y - v.y, this.z - v.z) }
    //向量乘
    mul(v: vec3) { return new vec3(this.x * v.x, this.y * v.y, this.z * v.z) }
    //向量除
    div(v: vec3) { return new vec3(this.x / v.x, this.y / v.y, this.z / v.z) }
    //叉乘
    pow(v: vec3) { return new vec3(this.y * this.z - v.y * v.z, this.z * this.x - v.z * v.x, this.x * this.y - v.x * v.y) }
    //夹角
    ang(v: vec3) { return Math.acos(this.normal().dot(v.normal())) }
    //数乘
    muln(v: number) { return new vec3(this.x * v, this.y * v, this.z * v) }
    //数除
    divn(v: number) { return new vec3(this.x / v, this.y / v, this.z / v) }
    //绕轴旋转
    rotate(ax: vec3, ang: number) { let di = this.mod(ax), rx = this.sub(di); return rx.muln(Math.cos(ang)).add(rx.pow(di.normal()).muln(Math.sin(ang))).add(di) }
    //旋转至
    rotate2(v: vec3, t: number) { return this.rotate(this.pow(v), this.ang(v) * t) }
    //长度1
    normal() { return this.divn(this.len()) }
    //长
    len() { return Math.sqrt(this.dot(this)) }
    //转文本
    toString() { return `${this.x} ${this.y} ${this.z}` }
    //转角向量
    tor() { return new vec2(Math.atan2(this.z, this.x), Math.atan2(this.y, Math.sqrt(this.x * this.x + this.z + this.z))) }
}