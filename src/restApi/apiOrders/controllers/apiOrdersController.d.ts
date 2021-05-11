import { Response, Request, NextFunction } from 'express';
/**
 * Получить данные по счету. Вначале счет создается операцией
 * POST invoices или POST cards, затем вызывается эта операция
 * для получения данных счета и продолжения операции
 *
 */
export declare const invoicesGet: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => Promise<void>;
/**
 * Создать счет на оплату для клиента. Для счета может быть
 * указан набор платежных систем, разрешенных для оплаты. Если
 * не указана ни одна, то клиенту будет предоставлен выбор.
 *
 * Оплата может быть инициирована немедленно, если дана соотв.
 * команда.
 *
 */
export declare const invoicesPost: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => Promise<void>;
export declare const invoiceRoutes: {
    method: string;
    endPoint: string;
    controller: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => Promise<void>;
}[];
