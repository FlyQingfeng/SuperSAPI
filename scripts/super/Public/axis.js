import { Vec3 } from "./Vec3";
export default class Axis {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static bin(ang, src) {
        let sx = Math.sin(ang.x);
        let cx = Math.cos(ang.x);
        let sy = Math.sin(ang.y);
        let cy = Math.cos(ang.y);
        let sz = Math.sin(ang.z);
        let cz = Math.cos(ang.z);
        return new Axis(new Vec3(cx * cy, sx * cy, sy).muln(src.x), new Vec3(cx * sz * sy - sx * cz, sx * sz * sy + cx * cz, sz * cy).muln(src.y), new Vec3(cx * cz * sy + sy * sz, sx * cz * sz + cx * sz, cz * cy).muln(src.z));
    }
    //入轴向量
    dot(v) { return this.x.muln(v.x).add(this.y.muln(v.y)).add(this.z.muln(v.z)); }
    //叠加轴
    plus(a) { return new Axis(this.dot(a.x), this.dot(a.y), this.dot(a.z)); }
    toString() { return `[${this.x}] [${this.y}] [${this.z}]`; }
}
