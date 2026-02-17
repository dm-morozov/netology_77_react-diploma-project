import styles from './Spinner.module.css'

const Spinner = () => {
  return (
    <div className={styles.spinnerWrap}>
      <div className={styles.spinner} aria-label="Загрузка..." />
    </div>
  )
}

export default Spinner
