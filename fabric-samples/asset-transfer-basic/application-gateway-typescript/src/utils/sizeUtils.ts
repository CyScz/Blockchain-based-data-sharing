const unitSize = {
    B: 1,
    KB: 1 * 1024,
    MB: 1 * 1024 * 1000,
    GB: 1 * 1024 * 1000 * 1000,
    TB: 1 * 1024 * 1000 * 1000 * 1000,
}

function getSizeFromB(size: number, to: number){
    return size/to;
}

export {unitSize, getSizeFromB}
