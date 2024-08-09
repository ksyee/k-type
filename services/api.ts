export const fetchSentence = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/sentence', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('문장을 불러오지 못했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching sentence:', error);
    throw error;
  }
};
