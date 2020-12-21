import { Button, Popover , Card } from 'antd'
import {RetweetOutlined,HeartOutlined,MessageOutlined ,EllipsisOutlined,HeartTwoTone} from '@ant-design/icons'
import PropTypes from 'prop-types'
import React ,{useState,useCallback} from 'react'
import {} from 'react-redux'
import { useSelector,useDispatch } from 'react-redux'
import Avatar from 'antd/lib/avatar/avatar'
import PostImages from './PostImages'


function PostCard({ post }) {
    //optional chaning
    // const { me } = useSelector((state) => state.user);
    // const id = me?.id;
    const id = useSelector((state) => state.user.me?.id);

    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev)
    },[]);
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev)
    },[]);
    return (
        <div style={{marginBottom : 20}}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet"/>,
                    liked 
                        ?   <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike}/>
                        :   <HeartOutlined key ="heart" onClick={onToggleLike}/>,
                    <MessageOutlined key="comment" onClick={onToggleComment} />,
                    <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id ? (
                            <>
                                <Button>수정</Button>
                                <Button type="danger">삭제</Button>
                            </> 
                            ) : <Button>신고</Button>}
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>

                ]}
            >
                <Card.Meta 
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
            {commentFormOpened && 
            <div>
                댓글 부분    
            </div>}
            {/* <CommentForm />
            <Comments /> */}
        </div>
    )
}

//object 는 shape으로 구체적으로 적을 수 있다. 
PostCard.propTypes= {
    post: PropTypes.shape({
        id:PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt:PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard
