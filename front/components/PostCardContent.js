import React, {} from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';


//**정규 표현식  --split에서는 ()를 넣어줘야함 --구글링해서 찾기
const PostCardContent = ({ postData}) => {       //첫번째 게시글 #익스프레스
    return (
        <div>
            {postData.split(/(#[^\s#]+)/g).map((v,i) => {
                if (v.match(/(#[^\s#]+)/g)) {
                    return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
                }
                return v;
            })}
        </div>
    )
}

PostCardContent.PropTypes = {
    postData: PropTypes.string.isRequired,
};

export default PostCardContent
