import fs from 'node:fs/promises';
import {join} from 'node:path';

export const getCwd = () => {
    const {pathname} = new URL(import.meta.url)
    return join(pathname, '..', '..');
}

export const getFileContent = async (filename) => {
    const path = join(getCwd(), filename);
    return await fs.readFile(path, 'utf8')
}
