import * as sp from "./Player/SuperPlayer";
import * as se from "./Entity/SuperEntity";
import * as run from "./Runtime";
import * as mc from "@minecraft/server";
export const MC = mc;
export const Player = sp.SuperPlayer;
export const Entity = se.SuperEntity;
export const SuperSystem = run.SuperSystem;
export const NativeClassType = run.NativeClassType;
export const ClassManager = run.ClassManager;
export let System = run.runtime;
