import {Vec3} from "./Vec3";
export  class Vec2 {
    x: number; y: number;
    constructor(x: any, y: number) {
        this.x = x
        this.y = y
    }
    static fromObj(obj: any) {
        return new Vec2(obj.x, obj.y)
    }
    //投影
    mod(v: Vec2) { return v.muln(this.dot(v) / v.dot(v)) }
    //点积
    dot(v: Vec2) { return this.x * v.x + this.y * v.y }
    //加
    add(v: Vec2) { return new Vec2(this.x + v.x, this.y + v.y) }
    //减
    sub(v: Vec2) { return new Vec2(this.x - v.x, this.y - v.y) }
    //向量乘
    mul(v: Vec2) { return new Vec2(this.x * v.x, this.y * v.y) }
    //向量除
    div(v: Vec2) { return new Vec2(this.x / v.x, this.y / v.y) }
    //夹角
    ang(v: Vec2) { return Math.atan2(this.x * v.y - this.y * v.x, this.dot(v)) }
    //数乘
    muln(v: number) { return new Vec2(this.x * v, this.y * v) }
    //数除
    divn(v: number) { return new Vec2(this.x / v, this.y / v) }
    //旋转
    rotate(ang: number) { return this.muln(Math.cos(ang)).add(new Vec2(-this.y, this.x).muln(Math.sin(ang))) }
    //旋转至
    rotate2(v: Vec2, t: number) { return this.rotate(this.ang(v) * t) }
    //长度1
    normal() { return this.divn(this.len()) }
    //长
    len() { return Math.sqrt(this.dot(this)) }
    //转文本
    toString() { return `${this.x} ${this.y}` }
    //角转ve3
    ator() { return new Vec3(Math.cos(this.x) * Math.cos(this.y), Math.sin(this.x) * Math.cos(this.y), Math.sin(this.y)) }





}