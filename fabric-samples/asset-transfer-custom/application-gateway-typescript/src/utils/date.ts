const format = {minimumIntegerDigits: 2, useGrouping: false}

function getDateTimeString(timestamp: Date): string {
    const h = timestamp.getHours().toLocaleString('fr-CH', format);
    const m = timestamp.getMinutes().toLocaleString('fr-CH', format);
    const s = timestamp.getSeconds().toLocaleString('fr-CH', format);
    const D = timestamp.getDate().toLocaleString('fr-CH', format);
    const M = (timestamp.getMonth() + 1).toLocaleString('fr-CH', format);
    const Y = timestamp.getFullYear().toString();
    return `${Y}-${M}-${D}_${h}${m}${s}`;
}

function getTimeWithMs(timestamp: Date) {
    const h = timestamp.getHours().toLocaleString('fr-CH', format);
    const m = timestamp.getMinutes().toLocaleString('fr-CH', format);
    const s = timestamp.getSeconds().toLocaleString('fr-CH', format);
    const ms = timestamp.getMilliseconds().toLocaleString('fr-CH', {minimumIntegerDigits: 3, useGrouping: false});
    return `${h}:${m}:${s}.${ms}`;
}

export {getDateTimeString, getTimeWithMs}
