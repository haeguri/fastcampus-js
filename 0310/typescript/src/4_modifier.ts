class ParentPlayer {
    public id: string;
    private level: number;
    protected items: string[];

    constructor(id: string, level: number) {
        this.id = id;
        this.level = level;
    } 
}

class ChildPlayer extends ParentPlayer{
    constructor(id: string, level: number, items: string[]){
        super(id, level);
        // this.level = 123; // Error.
        this.items = items;
    }
}

const pPlayer = new ParentPlayer('parent', 99);
pPlayer.id
// pPlayer.level = 99 // Error
// pPlayer.items = ['food'] // Error

const cPlayer = new ChildPlayer('child', 12, ['boots', 'sword']);
cPlayer.id
// cPlayer.level = 12; // Error
// cPlayer.items = ['boots']; // Error
