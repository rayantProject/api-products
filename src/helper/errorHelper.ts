import { Request, Response } from 'express';

export const errorHandler = (req: Request, res: Response, err: unknown) => {
    if (err instanceof Error) return res.status(500).json({ error: err.message });
    return res.status(500).json({ error: 'Something went wrong' });
};
