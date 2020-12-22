//page들의 공통되는 것을 처리
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
//head를 바꾸고 싶으면 Head안에서 바꾸면 됨
import Head from 'next/head';
import wrapper from '../store/configureStore';
import withReduxSaga from 'next-redux-saga'
//next에서는 Provider을 안해줘도 됨

const App = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
    )
}

//점검 하는게 좋음 
App.propTypes = {
    Component: PropTypes.elementType.isRequired
}

export default wrapper.withRedux(withReduxSaga(App));