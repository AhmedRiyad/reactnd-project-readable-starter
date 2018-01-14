import {api, headers} from './constants';


export const CATEGORIES_IS_LOADING = 'CATEGORIES_IS_LOADING';
export const CATEGORIES_FETCH_DATA_SUCCESS = 'CATEGORIES_FETCH_DATA_SUCCESS';
export const CATEGORIES_HAS_ERROR = 'CATEGORIES_HAS_ERROR';

export function categoriesIsLoading(isLoading) {
    return {
        type: CATEGORIES_IS_LOADING,
        isLoading
    };
}

export function categoriesFetchDataSuccess(categories) {
    return {
        type: CATEGORIES_FETCH_DATA_SUCCESS,
        categories
    };
}

export function categoriesHasError(hasError) {
    return {
        type: CATEGORIES_HAS_ERROR,
        hasError
    };
}

export function fetchCategories() {
    return (dispatch) => {
        dispatch(categoriesIsLoading(true));
        fetch(`${api}/categories`, {headers})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(categoriesIsLoading(false));

                return response.json();
            })
            .then((data) => dispatch(categoriesFetchDataSuccess(data.categories)))
            .catch(() => dispatch(categoriesHasError(true)));
    };
}