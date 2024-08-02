import RestMethod from "@/enums/rest_method";

/**
 * Customized fetch method for easy reuse
 */
export default function fetcher({url, method, headers, body}: {url: string, method: RestMethod, headers?: HeadersInit | undefined, body?: BodyInit | undefined}): Promise<Response> {
    return fetch(url, {method: method, headers: headers === undefined ? {
        'Content-Type': 'application/json',
      } : headers, body});
}

/**
 * Header with Authorization
 * @param token 
 */
export const headerWithAuthorization = (token: string) => {
  return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': "http://localhost:3000",
        'Access-Control-Allow-Headers': "Content-Type, Authorization",
        'Access-Control-Allow-Methods': "POST, GET"
      }

}
