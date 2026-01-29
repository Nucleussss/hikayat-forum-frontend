// lib/fetcher.ts
export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    credentials: "same-origin",
    ...init,
  });

  // Check for errors in the response
  if (!res.ok) {
    let errorMessage = `Request failed with status ${res.status}`;
    
    // Try to get the error message from the response body
    try {
      const errorData = await res.json();
      errorMessage =
        errorData.message ||
        errorData.error ||
        errorData.msg ||
        errorMessage;
    } catch {
      // Response is not JSON — ignore and keep generic message
      
    }
    throw new Error(errorMessage);
  }

  return res.json();
}