export class Asset {
    ID = '';
    Filename = '';
    Size = 0;
    Hash = '';
    Sender = '';
    SplitRatio = 0;
    ChunkAHash = '';
    ChunkAData = '';
    ChunkBHash = '';
    ChunkBIpfsCid = '';

    constructor(values = {}) {
        Object.assign(this, values);
    }

    toString(): string {
        return 'Asset['
            + ' ID: ' + this.ID
            + ', Filename: ' + this.Filename
            + ', Size: ' + this.Size
            + ', Hash: ' + this.Hash
            + ', Sender: ' + this.Sender
            + ', SplitRatio: ' + this.SplitRatio
            + ', ChunkAHash: ' + this.ChunkAHash
            + ', ChunkAData: (not included)'
            + ', ChunkBHash: ' + this.ChunkBHash
            + ', ChunkBIpfsCid: ' + this.ChunkBIpfsCid
            + ' ]';
    }
}
