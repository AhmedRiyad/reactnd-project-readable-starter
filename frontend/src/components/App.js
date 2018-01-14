import React, {Component} from 'react';
import '../App.css';
import {Container} from 'semantic-ui-react'
import {
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
                            exact path="/:category/:postId" render={(props) => (
                            <PostDetails postId={props.match.params.postId}/>
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
        fetchCategories: () => dispatch(fetchCategories())
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
