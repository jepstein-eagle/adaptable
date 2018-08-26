declare module "redux-storage-decorator-migrate" {
    import { StorageEngine } from "redux-storage";

    export default function (engine: StorageEngine, currentVersionNumber: Number, key: string, migrations: any[]): StorageEngine;
}