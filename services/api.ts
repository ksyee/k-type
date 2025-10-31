export const fetchSentences = async () => {
  try {
    const response = await fetch('/api/sentence/', {
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
    console.error('Error fetching sentences:', error);
    throw error;
  }
};
