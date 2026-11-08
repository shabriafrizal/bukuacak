// Base URL of the Bukuacak API.
//
// The old Heroku deployment (bukuacak-9bdcb4ef2605.herokuapp.com) no longer
// exists, so this points at the self-hosted server. Override it per environment
// with VITE_API_BASE_URL (see .env.example).
const DEFAULT_API_BASE_URL = "https://srv.shabriafrizal.art/bukuacak/api/v1";

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/+$/, "");

/**
 * Build an absolute API URL, e.g. buildApiUrl("book", { page: 2 }).
 */
export const buildApiUrl = (path = "", query) => {
  const normalizedPath = path.replace(/^\/+/, "");
  const url = new URL(`${API_BASE_URL}/${normalizedPath}`);

  if (query instanceof URLSearchParams) {
    query.forEach((value, key) => {
      if (value) url.searchParams.set(key, value);
    });
  } else if (query && typeof query === "object") {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url;
};

export class ApiError extends Error {
  constructor(message, { status, payload } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

/**
 * Fetch JSON from the API with a clear error for network problems, non-2xx
 * responses and HTML error pages.
 */
export const fetchJson = async (path, { query, signal, ...options } = {}) => {
  let response;

  try {
    response = await fetch(buildApiUrl(path, query), { signal, ...options });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new ApiError(
      "Tidak dapat terhubung ke server Bukuacak. Periksa koneksi internetmu.",
      { payload: error }
    );
  }

  const raw = await response.text();
  let data = null;

  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    throw new ApiError(
      data?.message ||
        `Server Bukuacak membalas dengan status ${response.status}.`,
      { status: response.status, payload: data }
    );
  }

  if (data === null) {
    throw new ApiError("Respons server Bukuacak tidak dapat dibaca.", {
      status: response.status,
    });
  }

  return data;
};
