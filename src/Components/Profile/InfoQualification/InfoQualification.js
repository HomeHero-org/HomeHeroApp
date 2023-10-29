import styles from "./InfoQualification.module.css";
import { FaRegStar, FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
const InfoQualification = (props) => {
    const start_container = [];
    for (let i = 1; i <= 5; i++) {
        if (props.userQualification > i) {
            start_container.push(<FaStar className={styles.star} />);
        } else if (Math.floor((props.userQualification * 10) % 10) > 4) {
            start_container.push(
                <FaRegStarHalfStroke className={styles.star} />
            );
        } else {
            start_container.push(<FaRegStar className={styles.star} />);
        }
    }
    const { t } = useTranslation();
    return (
        <section className={styles.info_qualification}>
            <h1 className={styles.main_title}>{t('yourAverageRating')}</h1>
            <section className={styles.star_rate_group}>
                <h2>{props.userQualification}/5</h2>
                <div className={styles.start_container}>{start_container}</div>
                <p className={styles.qualification_quantity}>
                    <strong>{t('receivedRatings')} </strong>{" "}
                    {props.qualificationQuantity}{" "}
                </p>
            </section>
            <section className={styles.last_comments}>
                <h1 className={styles.main_title}>{t('recentReceivedComments')}</h1>
                <div className={styles.comment}>
                    <p className={styles.head_comment}>
                        <strong>{t('relatedRequest')}</strong> Request Name
                    </p>
                    <p className={styles.head_comment}>
                        <strong>{t('personServed')}</strong> User Name
                    </p>
                    <p className={styles.comment_content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras vestibulum, leo vel faucibus sollicitudin, magna
                        turpis suscipit neque, ac bibendum urna augue vel leo.
                        Sed scelerisque, orci auctor congue luctus, orci risus
                        ornare mauris, sed egestas odio felis ac ex. Mauris
                        consequat eu velit eu facilisis. Vivamus suscipit, magna
                        quis pellentesque volutpat, arcu diam porttitor erat,
                        eget pulvinar augue nulla eu tortor. Aenean condimentum
                        velit elit, quis ultrices lorem dignissim sed. Etiam sed
                        nisl dolor.{" "}
                    </p>
                    <time datetime="2023-10-20">20 de octubre de 2023</time>
                </div>
                <div className={styles.comment}>
                    <p className={styles.head_comment}>
                        <strong>{t('relatedRequest')}</strong> Request Name
                    </p>
                    <p className={styles.head_comment}>
                        <strong>{t('personServed')}</strong> User Name
                    </p>
                    <p className={styles.comment_content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras vestibulum, leo vel faucibus sollicitudin, magna
                        turpis suscipit neque, ac bibendum urna augue vel leo.
                        Sed scelerisque, orci auctor congue luctus, orci risus
                        ornare mauris, sed egestas odio felis ac ex. Mauris
                        consequat eu velit eu facilisis. Vivamus suscipit, magna
                        quis pellentesque volutpat, arcu diam porttitor erat,
                        eget pulvinar augue nulla eu tortor. Aenean condimentum
                        velit elit, quis ultrices lorem dignissim sed. Etiam sed
                        nisl dolor.{" "}
                    </p>
                    <time datetime="2023-10-20">20 de octubre de 2023</time>
                </div>
                <div className={styles.comment}>
                    <p className={styles.head_comment}>
                        <strong>{t('relatedRequest')}</strong> Request Name
                    </p>
                    <p className={styles.head_comment}>
                        <strong>{t('personServed')}</strong> User Name
                    </p>
                    <p className={styles.comment_content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras vestibulum, leo vel faucibus sollicitudin, magna
                        turpis suscipit neque, ac bibendum urna augue vel leo.
                        Sed scelerisque, orci auctor congue luctus, orci risus
                        ornare mauris, sed egestas odio felis ac ex. Mauris
                        consequat eu velit eu facilisis. Vivamus suscipit, magna
                        quis pellentesque volutpat, arcu diam porttitor erat,
                        eget pulvinar augue nulla eu tortor. Aenean condimentum
                        velit elit, quis ultrices lorem dignissim sed. Etiam sed
                        nisl dolor.
                    </p>
                    <time datetime="2023-10-20">20 de octubre de 2023</time>
                </div>
            </section>
        </section>
    );
};

export default InfoQualification;
