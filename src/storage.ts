import {open,type FileHandle} from "node:fs/promises"
import {normalize} from "pathe"

class temp_storage {
    path: string = ""
    file:FileHandle | null = null

    constructor(path:string) {
        this.path = normalize(path)
    }

    private async open() {
        if (this.file == null) {
            this.file = await open(this.path, "w")
        }
    }

    
}