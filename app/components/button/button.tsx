import React, {FC} from 'react';
import styles from './button.module.css'

interface Props {
    text: string,
    handleClick: React.MouseEventHandler
    active?: boolean
}

const Button: FC<Props> = ({text, handleClick , active}) => {
    return (
        <button className={`${styles.btn} ${active ? styles.active : ''}`} onClick={handleClick}>
            {text}
        </button>
    );
};

export default Button;