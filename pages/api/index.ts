import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({
        Owner: '100ms Live!',
        ENV: process.env.VERCEL_ENV,
        VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF,
        VERCEL_GIT_COMMIT_MESSAGE: process.env.VERCEL_GIT_COMMIT_MESSAGE,
        VERCEL_GIT_REPO_SLUG: process.env.VERCEL_GIT_REPO_SLUG
    });
}
