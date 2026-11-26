import type {
  CatalogData,
  ContactSubmission,
  PyqPaper,
  SearchResultItem,
  StudyNote,
} from '../shared/types';

async function requestJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errMsg = typeof data?.error === 'string' ? data.error : `Request failed (${response.status})`;
    throw new Error(errMsg);
  }
  return data as T;
}

export const api = {
  getCatalog(options?: { bypassCache?: boolean }): Promise<CatalogData> {
    if (options?.bypassCache) {
      return requestJson<CatalogData>(`/api/catalog?fresh=${Date.now()}`, {
        cache: 'no-store',
      });
    }
    return requestJson<CatalogData>('/api/catalog');
  },

  search(query: string): Promise<{ query: string; results: SearchResultItem[] }> {
    return requestJson<{ query: string; results: SearchResultItem[] }>(
      `/api/search?q=${encodeURIComponent(query)}`
    );
  },

  uploadSubjectNote(
    subjectCode: string,
    payload: {
      title: string;
      unitNumber?: number;
      authorName: string;
      license: StudyNote['license'];
      summary: string;
      contentMarkdown: string;
      resourceUrl?: string;
      confirmedOriginal: boolean;
    }
  ): Promise<StudyNote> {
    return requestJson<StudyNote>(`/api/subjects/${encodeURIComponent(subjectCode)}/notes`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  uploadSubjectPyq(
    subjectCode: string,
    payload: {
      title: string;
      examYear: number;
      examSession: PyqPaper['examSession'];
      paperType: PyqPaper['paperType'];
      authorNote: string;
      questionsText: string;
      resourceUrl?: string;
      confirmedOriginal: boolean;
    }
  ): Promise<PyqPaper> {
    return requestJson<PyqPaper>(`/api/subjects/${encodeURIComponent(subjectCode)}/pyqs`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  submitContact(payload: {
    name: string;
    email: string;
    category: ContactSubmission['category'];
    subjectContext?: string;
    message: string;
  }): Promise<{ ok: boolean; id: string; message: string }> {
    return requestJson('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
