import { fetchCurrencyPairs } from '../fetchs';
import { HttpClient } from '@utils/types';

describe('fetchCurrencyPairs', () => {
  const mockHttpClient = {
    get: jest.fn(),
  } as jest.Mocked<HttpClient>; 

  const baseUrl = 'https://api.example.com';

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should handle empty or invalid API response', async () => {
    const mockResponse = {
      data: {}, // Respuesta vacía
    };
  
    mockHttpClient.get.mockResolvedValue(mockResponse);
  
    const result = await fetchCurrencyPairs(mockHttpClient, baseUrl);
  
    expect(mockHttpClient.get).toHaveBeenCalledWith(`${baseUrl}/pairs`);
    expect(result).toEqual([]); // Esperamos un array vacío
  });

  it('should throw an error if baseUrl is invalid', async () => {
    const invalidBaseUrl = '';
  
    await expect(fetchCurrencyPairs(mockHttpClient, invalidBaseUrl)).rejects.toThrow(
      'Invalid baseUrl'
    );
  });

  it('should fetch and transform currency pairs correctly', async () => {
    // Mock de la respuesta de la API
    const mockResponse = {
      data: {
        'AUDUSD': 'AUD-USD',
        'EURUSD': 'EUR-USD',
        'GBPUSD': 'GBP-USD',
        'USDJPY': 'USD-JPY',
        'USDMXN': 'USD-MXN'
      },
    };

    mockHttpClient.get.mockResolvedValue(mockResponse);

    const result = await fetchCurrencyPairs(mockHttpClient, baseUrl);

    expect(mockHttpClient.get).toHaveBeenCalledWith(`${baseUrl}/pairs`);
    expect(result).toEqual([
      { id: 'AUDUSD', label: 'AUD-USD' },
      { id: 'EURUSD', label: 'EUR-USD' },
      { id: 'GBPUSD', label: 'GBP-USD' },
      { id: 'USDJPY', label: 'USD-JPY' },
      { id: 'USDMXN', label: 'USD-MXN' },
    ]);
  });

  it('should throw an error if the API call fails', async () => {
    // Mock de un error en la API
    const mockError = new Error('Network error');
    mockHttpClient.get.mockRejectedValue(mockError);

    await expect(fetchCurrencyPairs(mockHttpClient, baseUrl)).rejects.toThrow('Network error');
  });
});