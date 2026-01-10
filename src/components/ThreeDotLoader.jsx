import styles from "./threedotloader.module.css";

export default function ThreeDotLoader() {
    return (
        <div className={styles.container}>
            <div className={styles.loader}></div>
        </div>
    )
}
