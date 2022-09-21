export class Asset {
    ID = '';
    Filename = '';
    Size = 0;
    Hash = '';
    Sender = '';
    SplitRatio = 0;
    OnChainHash = '';
    OnChainData = '';
    OffChainHash = '';
    OffChainIpfsCid = '';

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
            + ', OnChainHash: ' + this.OnChainHash
            + ', OnChainData: (not included)'
            + ', OffChainHash: ' + this.OffChainHash
            + ', OffChainIpfsCid: ' + this.OffChainIpfsCid
            + ' ]';
    }
}
