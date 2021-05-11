"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transformData(rawBody) {
    // console.log('transform data req', rawBody);
    try {
        // processedEvent = rawBody;
        // old yandex function
        // if (typeof event.payload === 'string') {
        //   processedEvent = JSON.parse(event.payload);
        // }
        // console.log('input: ', processedEvent.body);
        const t2 = rawBody.replace(/\r?\n|\r/g, '')
            .replace(' }', '}')
            .replace(',}', '}');
        const indexOfPhoneStart = t2.indexOf('+7');
        const phoneNumber = t2.slice(indexOfPhoneStart, indexOfPhoneStart + 12);
        const correctedJson = t2.replace(phoneNumber, `"${phoneNumber}"`);
        // console.log('correctedJson: ', JSON.parse(correctedJson));
        return JSON.parse(correctedJson);
    }
    catch (e) {
        console.log('error processing', e);
    }
    return null;
}
exports.transformData = transformData;
//# sourceMappingURL=transformData.js.map