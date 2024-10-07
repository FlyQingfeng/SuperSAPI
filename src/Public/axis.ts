import {vec3} from "../Public/vec3";

export default class axis {
    x: vec3; y: vec3; z: vec3;
    constructor(x: vec3, y: vec3, z: vec3) {
        this.x = x
        this.y = y
        this.z = z
    }
    static bin(ang: vec3, src: vec3) {
        let sx = Math.sin(ang.x)
        let cx = Math.cos(ang.x)
        let sy = Math.sin(ang.y)
        let cy = Math.cos(ang.y)
        let sz = Math.sin(ang.z)
        let cz = Math.cos(ang.z)
        return new axis(new vec3(cx * cy, sx * cy, sy).muln(src.x),
            new vec3(cx * sz * sy - sx * cz, sx * sz * sy + cx * cz, sz * cy).muln(src.y),
            new vec3(cx * cz * sy + sy * sz, sx * cz * sz + cx * sz, cz * cy).muln(src.z))
    }
//入轴向量
    dot(v: vec3) { return this.x.muln(v.x).add(this.y.muln(v.y)).add(this.z.muln(v.z)) }
//叠加轴
    plus(a: axis) { return new axis(this.dot(a.x), this.dot(a.y), this.dot(a.z)) }

    toString() { return `[${this.x}] [${this.y}] [${this.z}]` }
    
}
