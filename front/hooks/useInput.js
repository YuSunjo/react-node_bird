//커스텀 훅 계속 반복되는 사용 때문에 사용

import {useState, useCallback} from 'react';

export default (initialValue= null) => {
    const [value, setValue] = useState(initialValue);
    const handler = useCallback( (e) => {
        setValue(e.target.value)
    },[]);
    return [value, handler];
}