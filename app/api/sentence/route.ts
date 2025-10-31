import { readFile } from 'fs/promises';
import { join } from 'path';

export const GET = async (request: Request) => {
  try {
    // public 폴더의 sentences.json 파일 읽기
    const filePath = join(process.cwd(), 'public', 'sentences.json');
    const fileContents = await readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error loading sentences:', error);
    return new Response('문장을 불러오지 못했습니다.', {
      status: 500,
    });
  }
};
