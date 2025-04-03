
// This is a temporary stub for React Query functionality
// to be used until we can properly integrate React Query

export const useQuery = (options: any) => {
  console.warn('React Query is temporarily disabled');
  return {
    data: null,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(null),
  };
};

export const useMutation = (options: any) => {
  console.warn('React Query is temporarily disabled');
  return {
    mutate: () => {},
    isLoading: false,
    error: null,
  };
};

// For any component that still imports QueryClientProvider
export const QueryClientProvider = ({ children }: { children: React.ReactNode }) => children;
export const QueryClient = function() { return {}; };
