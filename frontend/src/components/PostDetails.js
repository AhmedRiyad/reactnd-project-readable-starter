import React from 'react';
import {Header, Feed, Comment, Form, Icon, Button} from 'semantic-ui-react'
import Post from './Post';
import userImage from './../assets/images/no_image_user.png'; // Tell Webpack this JS file uses this image


const PostDetails = (props) => {
    return (
        <div>
            <Feed>
                <Post/>
            </Feed>
            <Comment.Group>
                <Header as='h3' dividing>Comments</Header>

                <Comment>
                    <Comment.Avatar src={userImage}/>
                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                            <Icon name='triangle up' link/>
                            5
                            <Icon name='triangle down' style={{marginLeft: '3px'}} link/>
                            <a>Edit</a>
                            <a style={{marginLeft: '5px'}} color='red'>Delete</a>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>

                <Form reply>
                    <Form.TextArea/>
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary/>
                </Form>
            </Comment.Group>
        </div>
    )
};

PostDetails.propTypes = {};


export default PostDetails;