export const fetchData = async (server) => {
    try {
      const response = await fetch(server);
      const jsonData = await response.json();
      return jsonData.data;
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };