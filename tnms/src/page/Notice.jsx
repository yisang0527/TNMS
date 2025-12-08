// Notice.jsx

import styles from "./Notice.module.css";

import NoticeText from "../component/NoticeComponent/NoticeText";

export default function Notice() {
    return (
        <div className={styles.wrapper}>
            <div className="max-w-[1500px] mx-auto pt-[100px] pb-[200px]">
                <NoticeText />
            </div>
        </div>
    )
}