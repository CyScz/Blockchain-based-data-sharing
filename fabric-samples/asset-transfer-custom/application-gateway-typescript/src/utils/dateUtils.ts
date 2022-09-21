function getDateTimeString(timestamp: Date): string {
    const h = timestamp.getHours().toString();
    const m = timestamp.getMinutes().toString();
    const s = timestamp.getSeconds().toString();
    const D = timestamp.getDay().toString();
    const M = timestamp.getMonth().toString();
    const Y = timestamp.getFullYear().toString();
    return `${Y}-${M}-${D}_${h}${m}${s}`;
}

function getTimeWithMs(timestamp: Date) {
    const h = timestamp.getHours().toString();
    const m = timestamp.getMinutes().toString();
    const s = timestamp.getSeconds().toString();
    const ms = timestamp.getMilliseconds().toString();
    return `${h}:${m}:${s}:${ms}`;
}

export {getDateTimeString, getTimeWithMs}
