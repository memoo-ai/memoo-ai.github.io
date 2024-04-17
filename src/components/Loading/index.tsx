import styles from './index.module.scss';

const LoadingPage = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingIndicator} />
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default LoadingPage;
