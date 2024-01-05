import ChangePasswordForm from "../components/ChangePasswordForm"
import styles from "../styles/ChangePasswordPage.module.css"

export default function Login() {
    
    return (
        <div className={styles.generalContainer}>
            <div className={styles.card}>
                <div className={styles.logoContainer}>
                <img src="images/cs-loginSoyMomoImage.svg" width={100} height={100} className={styles.momoImg} alt="SoyMomo logo"/>
                </div>


                <h1 className={styles.title}>Change Password</h1>
                


                <ChangePasswordForm/>
                <a href="/">
                    <h3 className={styles.link}>Volver a inicio</h3>
                </a>
                <img src="images/cs-loginSoyMomoLogo.svg" width={100} height={100} className={styles.logo} alt="logo"/>

            </div>
        </div>
    )
}