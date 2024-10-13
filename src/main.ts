import { mEntity } from "ownCode/mEntity";
import * as SuperSAPI from "./SuperSAPI";
import { mPlayer } from "ownCode/mPlayer";

SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Entity,mEntity)

SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Player,mPlayer)

SuperSAPI.System.init()