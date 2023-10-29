import styles from './MiniCard.module.css';
import {PiShootingStarFill} from 'react-icons/pi';

const MiniCard = (props) => {
    return(
        <div className={styles.mini_card}>
            <PiShootingStarFill className={styles.icon}/>
            <h6 className={styles.description}> {props.description}</h6>
            <p className={styles.number}>{props.number}</p>
        </div>
    );
}

export default MiniCard;