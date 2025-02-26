export const GET = async (request: Request) => {
  try {
    const response = await fetch('http://localhost:3000/static/data.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return new Response('문장을 불러오지 못했습니다.', { status: 404 });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
};
