"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sgMail = require('@sendgrid/mail');
const validator = require('email-validator');
require('dotenv').config();
function sendMail(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const parsedBody = Object.assign({}, req);
        let sendResult;
        try {
            // console.log('req', req);
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const default_email = process.env.DEFAULT_EMAIL;
            let email;
            parsedBody.phone = `${parsedBody.phone}`;
            if (validator.validate(parsedBody.email)) {
                email = parsedBody.email;
            }
            else {
                email = default_email;
            }
            delete parsedBody.email;
            if (validator.validate(email)) {
                const msg = {
                    to: email,
                    from: 'sber.inapp@yandex.ru',
                    subject: 'Письмо от авто рассылки',
                    text: JSON.stringify(parsedBody),
                };
                yield sgMail.send(msg)
                    .then((res) => {
                    sendResult = { success: true, error: null };
                })
                    .catch(e => {
                    console.log('sendMail error', e);
                    sendResult = { success: false, error: e };
                });
            }
        }
        catch (e) {
            console.log('sendMail module general error', e);
            sendResult = { success: false, error: e };
        }
        return sendResult;
    });
}
exports.sendMail = sendMail;
//# sourceMappingURL=sendMail.js.map