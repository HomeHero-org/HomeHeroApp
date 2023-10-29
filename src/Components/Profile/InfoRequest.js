import styles from "./InfoRequest.module.css";
import MiniCard from "./MiniCard/MiniCard";
import { useTranslation } from 'react-i18next';

const InfoRequest = () => {
    const { t } = useTranslation();
    return (
        <section className={styles.info_request}>
            <MiniCard description={t('active_requests')} number={1222} /> 
            <MiniCard description={t('completed_requests')} number={6} />
            <MiniCard description={t('pending_ratings')} number={6} />
            <MiniCard description={t('help_done_october')} number={7} />
            <MiniCard description={t('help_done_this_week')} number={3012} />
            <MiniCard description={t('help_done_today')} number={1854} />
        </section>
    );
};

export default InfoRequest;
