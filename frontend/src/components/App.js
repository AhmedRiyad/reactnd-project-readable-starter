import React, {Component} from 'react';
import '../App.css';
import {fetchPosts} from '../ReadableAPI';
import {Container, Dropdown, Menu} from 'semantic-ui-react'
import {
    BrowserRouter as Router,
    Link,
    withRouter,
    Route,
    Switch
} from 'react-router-dom';
import ListPosts from './ListPosts';
import PostDetails from './PostDetails';
import Navigation from './Navigation';
import {fetchCategories} from '../actions/category';
import {connect} from 'react-redux';


class App extends Component {
    state = {};

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {

        return (

            <div>

                {/*<Route path="/(.+)" render={(() =>*/}
                {/*<Navigation/>*/}
                {/*)}/>*/}
                <Navigation/>

                <Container text>
                    <Switch>
                        {/*<Route*/}
                        {/*exact path="/posts/new" render={() => (*/}
                        {/*<EditPost/>*/}
                        {/*)}*/}
                        {/*/>*/}
                        <Route
                            exact path="/:category?" render={(props) => (
                            <ListPosts category={props.match.params.category}/>
                        )}
                        />
                        <Route
                            exact path="/:category/:postId" render={() => (
                            <PostDetails/>
                        )}
                        />
                        {/*<Route*/}
                        {/*exact path="/:category/:postId/edit" render={() => (*/}
                        {/*<EditPost/>*/}
                        {/*)}*/}
                        {/*/>*/}
                    </Switch>
                </Container>


            </div>
        )
    }
}


const mapStateToProps = ({categories}) => {
    return {
        categories: categories.items,
        hasError: categories.hasError,
        isLoading: categories.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: (url) => dispatch(fetchCategories())
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
