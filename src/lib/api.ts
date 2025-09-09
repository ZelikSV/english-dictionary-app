export const API_URL = '/api';

// WORDS URLS
export const GET_WORDS_URL = `${API_URL}/words`;

export const SET_WORD_URL = `${API_URL}/words/new`;

export const SET_WORDS_BULK_URL = `${API_URL}/words/bulk`;

export const UPDATE_WORD_URL = `${API_URL}/words`;

export const DELETE_WORD_URL = `${API_URL}/words`;

// WORDS GROUPS URLS
export const GET_WORDS_GROUPS_URL = `${API_URL}/words-groups`;
export const SET_WORDS_GROUPS_URL = `${API_URL}/words-groups`;
export const UPDATE_WORDS_GROUPS_URL = (id: string) => `${API_URL}/words-groups/${id}`;
export const DELETE_WORDS_GROUPS_URL = (id: string) => `${API_URL}/words-groups/${id}`;
