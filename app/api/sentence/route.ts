export const GET = async (request: Request) => {
  try {
    const response = await fetch('http://localhost:3000/static/data.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response) {
      throw new Error('No data');
    }

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
