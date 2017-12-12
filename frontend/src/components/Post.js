import React from 'react';
import {Feed, Icon, Label} from 'semantic-ui-react'


const FeedEvent = (props) => {
    return (
        <Feed.Event>
            <Feed.Label className='votes'>
                <Feed.Like>
                    <Icon name='triangle up' link/>
                </Feed.Like>
                5
                <Feed.Like>
                    <Icon name='triangle down' link/>
                </Feed.Like>
            </Feed.Label>
            <Feed.Content>
                <Feed.Summary>
                    <a>Udacity is the best place to learn React</a>
                    <br/>
                    <Feed.Date>submitted 3 days ago by <a>Joe Henderson</a></Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                    Ours is a life of constant reruns. We're always circling back to where we'd we started,
                    then starting all
                    over again. Even if we don't run extra laps that day, we surely will come back for more
                    of the same another
                    day soon.
                </Feed.Extra>
                <Feed.Meta>
                    <Feed.Summary>
                        <a>2 comments</a>
                    </Feed.Summary>
                </Feed.Meta>
                <br/>
                <Feed.Meta>
                    <Label color='purple' as='a'>Candy</Label>
                    <Label color='purple' as='a'>Candy</Label>
                    <Label color='purple' as='a'>Candy</Label>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    )
};

FeedEvent.propTypes = {};


export default FeedEvent;