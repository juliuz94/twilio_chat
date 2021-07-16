import styles from './styles.module.css'
import Header from '../Header'

const ErrorPage = () => {
  return (
    <section>
      <Header />
      <div className={styles.row}>
        <div className={styles.left_col}>
          <h1>¿Tienes una cita médica?</h1>
        </div>  
        <div className={styles.right_col}>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage