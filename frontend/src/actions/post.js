const FETCH_POSTS = 'fetch_posts';
const FETCH_POST = 'fetch_post';
const CREATE_POST = 'create_post';
const EDIT_POST = 'edit_post';
const DELETE_POST = 'delete_post';
const VOTE_POST = 'vote_post';
const POST_SORT_ORDER = 'post_sort_order';

const FETCH_CATEGORIES = 'fetch_categories';
const FETCH_CATEGORY_POSTS = 'fetch_category_posts';

const FETCH_POST_COMMENTS = 'fetch_post_comments';
const FETCH_POST_COMMENTS_COUNT = 'fetch_post_comments_count';
const FETCH_COMMENT_POST = 'fetch_comment_post';
const CREATE_COMMENT_POST = 'create_comment_post';
const EDIT_COMMENT_POST = 'edit_comment_post';
const DELETE_COMMENT_POST = 'delete_comment_post';
const VOTE_COMMENT = 'vote_comment';


/*
Actions for posts
*/

export function fetchPosts() {

    return dispatch => {
        axios.get(`${ROOT_URL}/posts`)
            .then(res => dispatch(fetchPostsSuccess(res.data)));

    }
}

export function fetchPost(id) {

    return dispatch => {
        axios.get(`${ROOT_URL}/posts/${id}`)
            .then(res => dispatch(fetchPostSuccess(res.data)));

    }
}

export function createPost(values, callback) {
    const { title, body, author, category } = values;

    const data = {
        id: guid(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    }

    return dispatch => {
        axios.post(`${ROOT_URL}/posts`, data)
            .then(res => {
                callback();
                dispatch(createPostSuccess(res.data));
            });

    }
}

export function editPost(id, values, callback) {

    return dispatch => {
        axios.put(`${ROOT_URL}/posts/${id}`, values)
            .then(res => {
                callback();
                dispatch(editPostSuccess(res.data))
            });

    }
}

export function deletePost(id, callback) {

    return dispatch => {
        axios.delete(`${ROOT_URL}/posts/${id}`)
            .then(res => {
                callback();
                dispatch(deletePostSuccess(id));
            });
    }
}

export function voteForPost(id, vote) {
    return dispatch => {
        axios.post(`${ROOT_URL}/posts/${id}`, { option: vote })
            .then(res => dispatch({ type: VOTE_POST, payload: res.data }))
    }
}

export function postSortOrder(sortType) {
    return {
        type: POST_SORT_ORDER,
        payload: sortType
    }
}

function fetchPostsSuccess(data) {
    return {
        type: FETCH_POSTS,
        payload: data
    };
}

function fetchPostSuccess(data) {
    return {
        type: FETCH_POST,
        payload: data
    };
}

function createPostSuccess(data) {
    return {
        type: CREATE_POST,
        payload: data
    };
}

function editPostSuccess(data) {
    return {
        type: EDIT_POST,
        payload: data
    }
}

function deletePostSuccess(data) {
    return {
        type: DELETE_POST,
        payload: data
    }
}